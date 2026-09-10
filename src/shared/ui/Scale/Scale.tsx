// Scale.tsx
import React, { useMemo } from 'react';

interface ScaleProps {
    value: number;
    min?: number;
    max?: number;
    label?: string;
    size?: number;
}

const TICK_COUNT = 11;

const START_ANGLE = -180;
const END_ANGLE = 0;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export const Scale: React.FC<ScaleProps> = ({
    value,
    min = 0,
    max = 100,
    label,
    size = 220,
}) => {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;
    const strokeWidth = size * 0.08;

    const clampedValue = Math.max(min, Math.min(max, value));
    const progress = (clampedValue - min) / (max - min);

    const needleAngle = START_ANGLE + progress * (END_ANGLE - START_ANGLE);
    const needleLength = r - strokeWidth / 2 - size * 0.04;
    const needleTip = polarToCartesian(cx, cy, needleLength, needleAngle);

    const ticks = useMemo(() => {
        return Array.from({ length: TICK_COUNT }, (_, i) => {
            const t = i / (TICK_COUNT - 1);
            const angle = START_ANGLE + t * (END_ANGLE - START_ANGLE);
            const outer = polarToCartesian(cx, cy, r + strokeWidth / 2, angle);
            const inner = polarToCartesian(cx, cy, r - strokeWidth / 2, angle);
            return { outer, inner };
        });
    }, [cx, cy, r, strokeWidth]);

    // Дуга — без отступа по краям (butt linecap = квадратные концы)
    const arcPath = describeArc(cx, cy, r, START_ANGLE, END_ANGLE);

    const displayLabel = label ?? `${clampedValue}/${max}`;
    const svgHeight = size / 2 + size * 0.22;

    return (
        <div className="inline-flex flex-col items-center">
            <svg
                width={size}
                height={svgHeight}
                viewBox={`0 0 ${size} ${svgHeight}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="scale-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="25%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#eab308" />
                        <stop offset="75%" stopColor="#84cc16" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>

                {/* Фоновая дуга */}
                <path
                    d={arcPath}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                />

                {/* Цветная дуга */}
                <path
                    d={arcPath}
                    fill="none"
                    stroke="url(#scale-gradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                />

                {/* 11 делений */}
                {ticks.map((tick, i) => (
                    <line
                        key={i}
                        x1={tick.outer.x}
                        y1={tick.outer.y}
                        x2={tick.inner.x}
                        y2={tick.inner.y}
                        stroke="white"
                        strokeWidth={size * 0.009}
                    />
                ))}

                {/* Стрелка — использует CSS-переменную text-secondary */}
                <line
                    x1={cx}
                    y1={cy}
                    x2={needleTip.x}
                    y2={needleTip.y}
                    stroke="var(--color-text-secondary)"
                    strokeWidth={size * 0.012}
                    strokeLinecap="round"
                />

                {/* Центральная точка */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={size * 0.022}
                    fill="var(--color-text-secondary)"
                />

                {/* Подпись */}
                <text
                    x={cx}
                    y={cy + size * 0.13}
                    textAnchor="middle"
                    fontFamily="Russo One, sans-serif"
                    fontSize={size * 0.07}
                    fontWeight="400"
                    fill="var(--color-text-primary)"
                >
                    {displayLabel}
                </text>
            </svg>
        </div>
    );
};
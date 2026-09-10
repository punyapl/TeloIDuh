import { motion } from "motion/react";

export const Tagline = () => {
    return (
        <div className="py-[50px] overflow-hidden bg-background-secondary flex">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                {[0, 1].map((i) => (
                    <div key={i} className="flex items-center font-quote max-md:text-lg uppercase text-design-elements">
                        {["ЖИЗНЬ", "ЗДОРОВЬЕ", "ЧИСТОТА", "СПОКОЙСТВИЕ", "ЛЕГКОСТЬ", "УВЕРЕННОСТЬ", "ЧЕТКИЙ ПЛАН"].map((word, i) => (
                            <div key={i}>
                                <span key={word} className="px-4 max-md:px-2">{word}</span>
                                <span className="px-4 max-md:px-2">•</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

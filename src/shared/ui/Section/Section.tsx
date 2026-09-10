import { AriaRole, ReactNode, } from 'react'

type SectionProps = {
    role?: AriaRole
    children?: ReactNode;
    SectionClassName?: string;
    ContainerClassName?: string;
    id?: string;
}
export const Section = (props: SectionProps) => {
    const { role, children, SectionClassName, ContainerClassName, id, } = props;

    return (
        <section id={id} role={role} className={`w-full  ${SectionClassName ?? ''}`}>
            <div className={`m-auto max-w-[1344px] ${ContainerClassName ?? ''}`}>
                {children}
            </div>
        </section>
    )
}
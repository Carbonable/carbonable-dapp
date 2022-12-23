interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

const footerCssClass = 'rounded-xl flex justify-center p-2 items-center justify-center text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 ';
const secondaryButton = 'font-inter uppercase rounded-full px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3 ';

export function LinkFooter({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={footerCssClass + className} rel="noreferrer">{children}</a>;
}

export function LinkSecondary({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={secondaryButton + className} rel="noreferrer">{children}</a>;
}



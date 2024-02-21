interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

const footerCssClass = 'rounded-xl flex justify-center p-2 items-center justify-center text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 ';
const secondaryButton = 'font-inter uppercase rounded-lg px-4 py-2 text-xs text-neutal-100 border border-opacityLight-10 tracking-wide bg-opacityLight-5 hover:bg-opacityLight-10 md:px-6 md:py-3 xl:text-sm  ';
const greenActionButton = 'font-inter uppercase rounded-lg px-4 py-2 text-xs text-neutral-100 border border-neutral-500 bg-greenish-600 tracking-wide hover:bg-greenish-500 md:px-6 md:py-3 xl:text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-greenish-700 disabled:hover:bg-greenish-700 ';

export function LinkFooter({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={footerCssClass + className} rel="noreferrer">{children}</a>;
}

export function LinkSecondary({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={secondaryButton + className} rel="noreferrer">{children}</a>;
}

export function GreenLinkButton({ href, children, className }: LinkButtonProps) {
    return <a href={href} className={greenActionButton + className}>{children}</a>;
}

export function FarmingGreenLinkButton({ href, children, className}: LinkButtonProps) {
    return <a href={href} className={`font-inter text-white text-sm rounded-lg bg-greenish-600 px-4 py-3 hover:bg-greenish-500 ` + className}>{children}</a>;
}

export function TransparentLinkButton({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" rel="noreferrer" className={`font-inter text-white text-sm font-medium rounded-lg bg-opacityLight-20 border border-opacityLight-30 px-4 py-3 hover:bg-opacityLight-30 uppercase ` + className}>{children}</a>;
}


interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

const footerCssClass = 'text-black/50 rounded-xl flex align-center justify-center p-2 bg-white flex items-center justify-center hover:bg-gradient-to-r from-green to-lightblue  '

export function LinkFooter({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={footerCssClass + className} rel="noreferrer">{children}</a>;
}


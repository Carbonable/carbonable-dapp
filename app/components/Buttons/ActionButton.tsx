interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: any;
}

const modalCssClass = 'font-inter text-black/50 uppercase rounded-full px-6 py-2 font-bold text-sm hover:bg-gradient-to-r from-green to-lightblue ';
const badgeButton= "cursor-pointer h-12 w-20 rounded-full bg-beaige "

export default function WalletButton({ children, className, onClick }: ButtonProps) {
    return <button className={modalCssClass + className} onClick = {() => { onClick(true); }}>{children}</button>;
}

export function BadgeMint({ children, className, onClick }: ButtonProps) {
    return <button className={badgeButton + className} onClick = {() => { onClick(true); }}>{children}</button>;
}
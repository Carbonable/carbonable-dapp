interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: any;
}

const secondaryButton = 'font-inter uppercase rounded-full px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3';
const whitelistCssClass = 'font-inter text-black/50 uppercase rounded-full p-3 font-bold hover:bg-gradient-to-r from-green to-lightblue ';
const greenButtonCssClass = 'font-inter text-black/50 uppercase bg-green rounded-full px-6 py-2 font-semibold hover:bg-gradient-to-r from-green to-lightblue text-sm ';

export default function WalletButton({ children, className, onClick }: ButtonProps) {
    return <button className={secondaryButton + className} onClick = {() => { onClick(true); }}>{children}</button>;
}


export function WhitelistButton({ children, className, onClick }: ButtonProps) {
    return <button className={whitelistCssClass + className} onClick = {() => { onClick(true); }}>{children}</button>;
}

export function MintButton({ children, className, onClick }: ButtonProps) {
    return <button className={greenButtonCssClass + className} onClick = {() => { onClick(true); }}>{children}</button>;
}


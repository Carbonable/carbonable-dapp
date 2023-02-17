interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const secondaryButton = 'font-inter uppercase rounded-full px-4 py-2 text-xs text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 md:px-6 md:py-3 xl:text-sm ';
const whitelistCssClass = 'font-inter text-black/50 uppercase rounded-full p-3 font-bold hover:bg-gradient-to-r from-green to-lightblue ';
const greenButtonCssClass = 'font-inter text-black/50 uppercase bg-green rounded-full px-6 py-2 font-semibold hover:bg-gradient-to-r from-green to-lightblue text-sm ';
const badgeButton= "cursor-pointer h-12 w-20 rounded-full bg-beaige "
const greenActionButton = 'font-inter uppercase rounded-full p-4 text-sm text-neutral-100 bg-greenish-600 text-center hover:bg-greenish-500 outine-none ';

export default function SecondaryButton({ children, className, onClick }: ButtonProps) {
    return <button className={secondaryButton + className} onClick={onClick}>{children}</button>;
}


export function WaitinglistButton({ children, className, onClick }: ButtonProps) {
    return <button className={whitelistCssClass + className} onClick={onClick}>{children}</button>;
}

export function MintButton({ children, className, onClick }: ButtonProps) {
    return <button className={greenButtonCssClass + className} onClick={onClick}>{children}</button>;
}

export function BadgeMint({ children, className, onClick }: ButtonProps) {
    return <button className={badgeButton + className} onClick={onClick}>{children}</button>;
}

export function GreenButton({ children, className, onClick }: ButtonProps) {
    return <button className={greenActionButton + className} onClick={onClick}>{children}</button>;
}

export function FarmingButton({ children, className, onClick, disabled }: ButtonProps) {
    return <button className={`font-inter text-white text-sm rounded-lg bg-opacityLight-5 px-4 py-3 hover:bg-opacityLight-5/10 ${disabled ? "cursor-not-allowed bg-transparent border border-neutral-700 hover:bg-transparent" : ""} ` + className} onClick={onClick}>{children}</button>;
}


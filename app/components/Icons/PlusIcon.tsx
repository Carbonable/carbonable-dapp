interface IconProps {
    className: string;
} 
export default function PlusIconWhite( {className}: IconProps) {
    return <img src="/assets/images/icons/plus-icon-white.svg" alt="plus" className={className}/>
}

export function PlusIconBlack( {className}: IconProps) {
    return <img src="/assets/images/icons/plus-icon-black.svg" alt="plus" className={className}/>
}
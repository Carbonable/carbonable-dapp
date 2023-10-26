// Description: Filter button component
interface FilterButtonInterface {
    children: string,
    onClick: () => void,
    active: boolean,
    disabled?: boolean
}

/**
 * 
 * @param children: string
 * @param onClick: () => void
 * @param active: boolean 
 * @returns JSX.Element
 * 
 */
export default function FilterButton({children, onClick, active, disabled}: FilterButtonInterface) {
    return (
        <button
            className={`font-inter py-2 mr-2 text-sm md:text-base md:px-4 ${active ? "text-neutral-50 bg-opacityLight-5 cursor-pointer rounded-lg px-4" : "px-2"} disabled:text-neutral-400 disabled:cursor-not-allowed disabled:font-extralight`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
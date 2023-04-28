import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Transaction({title, description, link}: {title: string, description: string, link?: string}) {
    return (
        <div className="w-full text-neutral-100 pl-1">
            <div>{title}</div>
            <div className="text-sm text-neutral-300 flex items-center justify-start">
                {description}
                {link !== undefined && <a href={link} target="_blank" rel="noreferrer"><ArrowTopRightOnSquareIcon className="w-6 pl-2 hover:text-neutral-200" /></a>}
            </div>
        </div>
    )
}
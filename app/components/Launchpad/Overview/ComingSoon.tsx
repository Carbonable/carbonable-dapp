import { GreenButton } from "~/components/Buttons/ActionButton";
import { useState } from "react";
import NewsletterDialog from "~/components/Newsletter/Newsletter";

export default function ComingSoon () {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <GreenButton className="w-full" onClick={() => setIsOpen(true)}>Be alerted when the sale opens</GreenButton>
            <NewsletterDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
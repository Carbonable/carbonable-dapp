import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import StripeElements from "./StripeElements";

export default function CreditCardPayment({ setIsOpen }: {setIsOpen: (isOpen: boolean) => void}) {
    const [email, setEmail] = useState<string>('');

    return (
        <>
            <div>
                <PersonalInformation
                    email={email}
                    setEmail={setEmail}
                />
            </div>
            <div className="mt-8">
                <StripeElements email={email} />
            </div>
        </>
    )
}
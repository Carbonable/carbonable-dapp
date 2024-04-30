import { useState } from "react";
import { EMAIL_REGEX } from "~/utils/constant";

interface PersonalInformationProps {
    email: string;
    setEmail: (email: string) => void;
}

export default function PersonalInformation({ email, setEmail }: PersonalInformationProps) {
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

    const handleChange = (event: any) => {
        const email = event.target.value;
        // Check if the email address is valid
        setIsEmailValid(EMAIL_REGEX.test(email))

        // Update the email address
        setEmail(email);
    }

    return (
        <>
            <div className="border rounded-lg border-opacityLight-20">
                <div className="flex justify-between bg-opacityLight-5 py-2 px-3">
                    <div className="uppercase text-sm flex-grow">Personal information</div>
                </div>
                <div className="flex items-center py-4 px-2 gap-x-3 border-t border-opacityLight-20">
                    <input
                        type="text"
                        placeholder="Email address"
                        value={email}
                        onChange={handleChange}
                        className={`w-full py-2 px-4 border ${isEmailValid ? "border-opacityLight-20": "border-darkRed"} rounded-lg bg-opacityLight-5 text-neutral-100 outline-none focus:border-opacityLight-30`}
                    />
                </div>
            </div>
        </>
    )
}
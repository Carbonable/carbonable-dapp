import { useMemo, useState } from "react";
import Currencies from "./Currencies";
import { useNotifications } from "~/root";
import mainnetTokens from "~/config/tokens/mainnet-tokens.json";
import goerliTokens from "~/config/tokens/goerli-tokens.json";
import sepoliaTokens from "~/config/tokens/sepolia-tokens.json";
import { type Token } from "~/types/tokens";
import PaymentDetails from "./PaymentDetails";
import { GreenButton } from "~/components/Buttons/ActionButton";


export default function CheckoutDetails() {
    const { defaultNetwork } = useNotifications();
    const tokens: Token[] = useMemo(() => {
        let config: Token[] = [];
        switch (defaultNetwork) {
          case 'mainnet':
            config = mainnetTokens.tokens as Token[];
            break;
          case 'goerli':
            config = goerliTokens.tokens as Token[];
            break;
          case 'sepolia':
            config = sepoliaTokens.tokens as Token[];
            break;
          default:
            config = mainnetTokens.tokens as Token[];
            break;
        }
        return config;
    }, [defaultNetwork]);

    const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);

    const handleClick = () => {
        console.log('Transaction confirmed');
    }

    return (
        <>
            <div className="w-full">
                <Currencies 
                    tokens={tokens}
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                />
            </div>
            <div className="w-full mt-4">
                <PaymentDetails selectedToken={selectedToken} />
            </div>
            <div className="mt-4">
                <GreenButton className="w-full" onClick={handleClick}>Confirm transaction</GreenButton>
            </div>
        </>
    )
}
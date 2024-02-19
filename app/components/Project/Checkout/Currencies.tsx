import { useState } from "react";
import { type Token } from "~/types/tokens";

export default function Currencies({ tokens, selectedToken, setSelectedToken }: { tokens: Token[], selectedToken: Token, setSelectedToken: (token: Token) => void }){
    return (
        <div className="border rounded-lg border-opacityLight-20">
            <div className="flex justify-between bg-opacityLight-5 py-2 px-4">
                <div className="uppercase text-sm flex-grow">Currency</div>
                {selectedToken?.powered_by !== undefined &&
                    <img src={`/assets/images/mint/${selectedToken.powered_by}.svg`} alt={selectedToken.powered_by} />
                }
            </div>
            <div className="flex items-center py-4 px-6 gap-x-3 border-t border-opacityLight-20">
                {tokens && tokens.map((token, index) => (
                    <ImageComponent 
                        token={token} 
                        selectedToken={selectedToken}
                        setSelectedToken={setSelectedToken}
                        key={index} 
                    />
                ))}
            </div>
        </div>
    )
}

function ImageComponent({ token, selectedToken, setSelectedToken }: { token: Token, selectedToken: Token, setSelectedToken: (token: Token) => void}) {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedToken(token)}
        className="transition-all duration-300 ease-in-out transform"
      >
        <img
          src={token === selectedToken ? `/assets/images/mint/tokens/${token.symbol}-selected.svg` : (isHovered ? `/assets/images/mint/tokens/${token.symbol}-hover.svg` : `/assets/images/mint/tokens/${token.symbol}.svg`)}
          alt={token.symbol}
          className="cursor-pointer"
        />
      </div>
    );
  }
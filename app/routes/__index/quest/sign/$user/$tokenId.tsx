import { ec } from "starknet";
import { pedersen } from "starknet/dist/utils/hash";
import { sign } from "starknet/dist/utils/ellipticCurve";

import eligibleUsers from "../../../../../../public/eligibleUsers.json";
import type { LoaderArgs } from "@remix-run/node";


export async function loader({ params }: LoaderArgs) {
    const user = params.user
    const privateKey = process.env.QUEST_SIGNER_PRIVATE_KEY;
    const starkKeyPair = ec.getKeyPair(privateKey || '0x0');
    const res = {
        low: '',
        high: ''
    };
    if (user) {
        for (let index = 0; index < eligibleUsers.length; index++) {
            const token = eligibleUsers[index];
            const whitelistedUser = token.user;
            const tokenId = token.token_id;
            if (tokenId.toString() == params.tokenId) {
                if (simplifyAddress(whitelistedUser) == simplifyAddress(user)) {
                    const message = pedersen([user.toLowerCase(), tokenId]);
                    const signature = sign(starkKeyPair, message)
                    res.low = signature[0];
                    res.high = signature[1];
                }
            }
        }
        return res;
    }
};

function simplifyAddress(hex: string) {
    // Remove the firsts zeros and the 0x
    return hex.replace(/^0x0*/, '').toLowerCase();
}
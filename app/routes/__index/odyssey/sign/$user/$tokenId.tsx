import { ec } from "starknet";

import type { LoaderArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { simplifyAddress } from "~/utils/utils";



export async function loader({ params }: LoaderArgs) {
    const user = params.user
    const privateKey = process.env.QUEST_SIGNER_PRIVATE_KEY;
    const starkKeyPair = ec.starkCurve.getStarkKey(privateKey || '0x0');
    let res;

    const whitelist = await db.badgeWhitelist.findFirst();
    let eligibleUsers: any[] = [];

    if (whitelist?.whitelist) {
        eligibleUsers = whitelist.whitelist as Array<{ user: string, token_id: number }>;
    }

    if (user) {
        for (let index = 0; index < eligibleUsers.length; index++) {
            const token = eligibleUsers[index];
            const whitelistedUser = token.user;
            const tokenId = token.token_id;
            if (tokenId.toString() === params.tokenId && simplifyAddress(whitelistedUser) === simplifyAddress(user)) {
                const message = ec.starkCurve.pedersen(user.toLowerCase(), tokenId);
                res = ec.starkCurve.sign(message, starkKeyPair);
                return res;
            }
        }
        return res;
    }
};

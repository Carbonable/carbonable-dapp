import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import moment from "moment";
import blocks from "~/demo/allocations.json";

/**
 * Save email adress of the user in Airtable
 * 
 * @param { ActionArgs } request
 * @returns { json } Returns a json containing either the error message or the success message
 */
export async function action({ request }: ActionArgs) {
    const formData = (await request.formData());
    const cc = formData.get("cc");
    const blockId = formData.get("block_id");
    const name = formData.get("name");
    let ipfs = formData.get("ipfs");

    try {
        const blockData = blocks.find((blockData: any) => blockData.id.toString() === blockId);

        if (ipfs === null || ipfs === "") {
            ipfs = "QmQZq4AJNMwqPNWs31iu2p2Cema6GVdrNgi8x4QKohirjn/card.png";
        }

        if (blockData === undefined || name === null || cc === null || blockId === null || ipfs === null) {
            throw new Error("Can't add allocation to this block");
        }

        const carbonCreditPurchased = blockData?.carbon_credit_purchased.find((allocation: any) => allocation.project_name.toLowerCase() === name.toString().toLowerCase());

        // If an allocation is added from a new project
        if (carbonCreditPurchased === undefined) {

            // Add the allocation to the block
            blockData.carbon_credit_purchased.push({
                project_name: name.toString(),
                color: "#878A94",
                image: ipfs.toString(),
                carbon_credit_allocated: parseInt(cc.toString())
            });

            // Add the transaction to the block at first position
            blockData.transactions.unshift(addTransactionToBlock(name.toString(), cc));

            // Replace the block inside the list of blocks
            const newBlocks = blocks.map(function(a) {
                return a.id === parseInt(blockId.toString()) ? blockData : a;
            });

            return json({newBlocks});
        }

        carbonCreditPurchased.carbon_credit_allocated += parseInt(cc.toString());

        // Replace the allocation inside the list of allocations
        const newPurchased = blockData.carbon_credit_purchased.map(function(a) {
            return a.project_name === carbonCreditPurchased.project_name ? carbonCreditPurchased : a;
        });

        blockData.carbon_credit_purchased = newPurchased;

        // Add the transaction to the block at first position
        blockData.transactions.unshift(addTransactionToBlock(name.toString(), cc));

        // Replace the block inside the list of blocks
        const newBlocks = blocks.map(function(a) {
            return a.id === parseInt(blockId.toString()) ? blockData : a;
        });

        return json({newBlocks});

    } catch (error) {
        return json({ error });
    }
}

function addTransactionToBlock(name: string, cc: any) {
    return {
        date: moment(new Date()).format("YY.MM.DD"),
        source: name,
        quantity: parseInt(cc.toString()),
        type: "Added"
    };
}
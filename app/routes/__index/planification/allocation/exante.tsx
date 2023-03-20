import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import moment from "moment";
import blocks from "~/demo/allocations.json";
import projectsList from "~/demo/projects.json";

/**
 * Save email adress of the user in Airtable
 * 
 * @param { ActionArgs } request
 * @returns { json } Returns a json containing either the error message or the success message
 */
export async function action({ request }: ActionArgs) {
    const formData = (await request.formData());
    const project = formData.get("project");
    const cc = formData.get("cc");
    const blockId = formData.get("block_id");

    try {
        const projectData = projectsList.find((projectData: any) => projectData.value === project);
        const blockData = blocks.find((blockData: any) => blockData.id.toString() === blockId)
        const allocation = blockData?.allocations.find((allocation: any) => allocation.project_name === projectData?.value);

        if (blockData === undefined || projectData === undefined || cc === null || blockId === null) {
            throw new Error("Can't add allocation to this block");
        }

        // If an allocation is added from a new project
        if (allocation === undefined) {

            // Add the allocation to the block
            blockData.allocations.push({
                project_name: projectData.value,
                color: projectData.color,
                image: projectData.image,
                carbon_credit_allocated: parseInt(cc.toString())
            });

            // Add the transaction to the block at first position
            blockData.transactions.unshift(addTransactionToBlock(projectData, cc));

            // Replace the block inside the list of blocks
            const newBlocks = blocks.map(function(a) {
                return a.id === parseInt(blockId.toString()) ? blockData : a;
            });

            return json({newBlocks});
        }

        allocation.carbon_credit_allocated += parseInt(cc.toString());

        // Replace the allocation inside the list of allocations
        const newAllocations = blockData.allocations.map(function(a) {
            return a.project_name === allocation.project_name ? allocation : a;
        });

        blockData.allocations = newAllocations;

        // Add the transaction to the block at first position
        blockData.transactions.unshift(addTransactionToBlock(projectData, cc));

        // Replace the block inside the list of blocks
        const newBlocks = blocks.map(function(a) {
            return a.id === parseInt(blockId.toString()) ? blockData : a;
        });

        return json({newBlocks});

    } catch (error) {
        return json({ error });
    }
}

function addTransactionToBlock(projectData: any, cc: any) {
    return {
        date: moment(new Date()).format("YY.MM.DD"),
        source: projectData.value,
        quantity: parseInt(cc.toString()),
        type: "Added"
    };
}
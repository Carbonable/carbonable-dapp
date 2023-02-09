import type { Project } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useAccount } from "@starknet-react/core";
import ProjectIdentification from "~/components/Farming/ProjectIdentification";
import { userPrefs } from "~/cookie";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        // If the user has selected a network, use that. Otherwise, use the default network.
        const selectedNetwork = await db.network.findFirst({
            where: {
                ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });

        // Find the project by slug and network.
        const project = await db.project.findFirst({
            where: {
            slug: params.slug,
            network: selectedNetwork || undefined, 
            },  
        });

        // If the project is not found, or is not display, throw a 404.
        if (project === null || project.isDisplay === false){
            throw new Response("Not Found", {status: 404})
        }

        return json({project, selectedNetwork});
    } catch (e) {
        throw new Response("Not Found", {status: 404})
    }
};

export default function FarmingPage() {
    const data = useLoaderData();
    const project: Project = data.project;
    // TODO: Replace with real data
    const { status } = useAccount();

    return (
        <div className="relative w-full">
            <div className="w-full bg-mint py-8 px-4">
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <ProjectIdentification project={project} deposited={undefined} status={status} displayDeposited={false} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        Repartition
                    </div>
                </div>
            </div>
        </div>
    )
}
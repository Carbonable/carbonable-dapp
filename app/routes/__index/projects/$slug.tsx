import { db } from "~/utils/db.server";
import type { LoaderFunction} from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectOverview from "~/components/Project/ProjectOverview";
import type { Project } from "@prisma/client";
import { userPrefs } from "~/cookie";

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    try {
      const cookieHeader = request.headers.get("Cookie");
        const cookie = (await userPrefs.parse(cookieHeader)) || {};

        const selectedNetwork = await db.network.findFirst({
            where: {
              ...(cookie.selected_network !== undefined ? { id: cookie.selected_network } : { isDefault: true }), 
            }
        });
      const project = await db.project.findFirst({
        where: {
          slug: params.slug,
          network: selectedNetwork || undefined, 
        },  
      });

      if (project === null || project.isDisplay === false){
        throw new Response("Not Found", {status: 404})
      }
  
      return json<Project>(project);

    } catch {
      throw new Response("Not Found", {status: 404})
    }
};

export default function ProjectPage() {
  const project = useLoaderData<unknown>() as Project;
    return (
        <div className="xl:w-10/12 xl:mx-auto 2xl:w-9/12">
          <ProjectOverview project={project} />
        </div>
    )
}
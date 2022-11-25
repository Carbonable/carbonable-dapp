import { db } from "~/utils/db.server";
import type { LoaderFunction} from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectOverview from "~/components/Project/ProjectOverview";
import type { Projects } from "@prisma/client";

export const loader: LoaderFunction = async ({
    params,
  }) => {
    const project = await db.projects.findUnique({
        where: {
          slug: params.slug,
        },  
    })

    if (project === null){
      throw new Response("Not Found", {status: 404})
    }

    return json<Projects>(project);
};

export default function Project() {
  const project = useLoaderData<unknown>() as Projects;
    return (
        <div className="xl:w-10/12 xl:mx-auto 2xl:w-9/12">
          <ProjectOverview project={project} />
        </div>
    )
}
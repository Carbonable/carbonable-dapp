import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({
    request, 
  }) => {
    try {
        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");

        const project = await fetch(`${process.env.DMRV_API}/${slug}`, {});

        return json(await project.json());
    } catch (e) {
        console.error(e)
        return json([]);
    }
};
import { db } from "~/utils/db.server";
import type { LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ProjectOverview from "~/components/Project/Overview/ProjectOverview";
import type { ProjectWhitelist } from "@prisma/client";
import { client } from "~/utils/sanity/client";
import ContentContainer from "~/components/Project/Content/ContentWrapper";
import type { SanityContent } from "~/utils/sanity/types";
import { urlFor } from "~/utils/sanity/image";
import type { LaunchpadProps, MintProps, ProjectProps } from ".";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    try {
      const projects = await fetch(`${process.env.INDEXER_URL}/launchpad/details/${params.slug}`, {});
      const project = await projects.json();

      // If the project is not found, or is not display, throw a 404.
      if (project === null || project === undefined){
        throw new Response("Not Found", {status: 404})
      }

      // Find the whitelist for the project.
      const whitelist = await db.projectWhitelist.findFirst({
        select: {
          whitelist: true,
        },
        where: {
          projectId: project.data.project.id,
        },
      });

      const content = await client.fetch(
        `*[_type == "project" && slug.current == $slug]`,
        { slug: params.slug }
      );
  
      return json({project, content, whitelist});

    } catch (e) {
      throw new Response("Not Found", {status: 404})
    }
};

export const meta: V2_MetaFunction = ({ data }) => {
  if(data === undefined || data.content.length === 0 ) return [];

  const content: SanityContent = data.content[0];
  const tags = content.seo.ogarticletag.split(" ") || [];

  return [
    { title:  content.seo.title},
    { name: "description", content: content.seo.description},
    { name: "keywords", content: content.seo.keywords},
    { name: "image", content: urlFor(content.seo.image).width(500).url() || "https://carbonable.github.io/socials/social.jpg"},
    { property: "og:title", content: content.seo.ogtitle},
    { property: "og:description", content: content.seo.ogdescription},
    { property: "og:image", content: urlFor(content.seo.ogimage).width(500).url() || "https://carbonable.github.io/socials/social.jpg"},
    { property: "og:url", content: content.seo.ogurl || `https://app.carbonable.io/launchpad/${content.slug.current}`},
    { property: "og:type", content: content.seo.ogtype},
    { property: "og:article:author", content: content.seo.ogarticleauthor},
    { property: "og:article:published_time", content: content.seo.ogarticlepublishedtime},
    { property: "og:article:section", content: content.seo.ogarticlesection},
    { property: "og:article:tag", content: tags.map((tag) => tag)},
    { property: "twitter:card", content: content.seo.twittercard},
    { property: "twitter:domain", content: content.seo.twitterdomain},
    { property: "twitter:title", content: content.seo.twittertitle},
    { property: "twitter:description", content: content.seo.twitterdescription},
    { property: "twitter:image", content: urlFor(content.seo.twitterimage).width(500).url() || "https://carbonable.github.io/socials/social.jpg"},
    { property: "twitter:url", content: content.seo.twitterurl || `https://app.carbonable.io/launchpad/${content.slug.current}`}
  ]
};

export default function ProjectPage() {
  const data = useLoaderData();
  const [project, setProject] = useState<ProjectProps>(data.project.data.project);
  const [launchpad, setLaunchpad] = useState<LaunchpadProps>(data.project.data.launchpad);
  const [mint, setMint] = useState<MintProps>(data.project.data.mint);
  const content: SanityContent = data.content[0];
  const whitelist: ProjectWhitelist = data.whitelist?.whitelist;
  const fetcher = useFetcher();

  useEffect(() => {
        setTimeout(() => {
          fetcher.load(`/launchpad/refresh?slug=${project.slug}`);
        }, 4000);
  }, []);

  useEffect(() => {
    if (fetcher.data === undefined) return;

    const data = fetcher.data.data;
    setProject(data.project);
    setLaunchpad(data.launchpad);
    setMint(data.mint);
  }, [fetcher.data]);

  return (
      <div className="w-full">
        <ProjectOverview project={project} launchpad={launchpad} mint={mint} whitelist={whitelist} hasReports={content?.reports.length > 0} />
        <div className="mt-20 w-11/12 mx-auto px-2 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
          { content !== undefined && <ContentContainer content={content} /> }
        </div>
      </div>
  )
}
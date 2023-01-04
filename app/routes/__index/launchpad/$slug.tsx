import { db } from "~/utils/db.server";
import type { LoaderFunction, MetaFunction} from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectOverview from "~/components/Project/Overview/ProjectOverview";
import type { Project, ProjectWhitelist } from "@prisma/client";
import { userPrefs } from "~/cookie";
import { client } from "~/utils/sanity/client";
import ContentContainer from "~/components/Project/Content/ContentWrapper";
import type { SanityContent } from "~/utils/sanity/types";
import { urlFor } from "~/utils/sanity/image";

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

      // Find the whitelist for the project.
      const whitelist = await db.projectWhitelist.findFirst({
        select: {
          whitelist: true,
        },
        where: {
          projectId: project.id,
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

export const meta: MetaFunction = ({ data }) => {
  if(data === undefined || data.content.length === 0 ) return {};

  const content: SanityContent = data.content[0];
  const tags = content.seo.ogarticletag.split(" ") || [];

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    image: urlFor(content.seo.image).width(500).url() || "https://carbonable.io/assets/images/social/social.jpg",
    "og:title": content.seo.ogtitle,
    "og:description": content.seo.ogdescription,
    "og:image": urlFor(content.seo.ogimage).width(500).url() || "https://carbonable.io/assets/images/social/social.jpg",
    "og:url": content.seo.ogurl || `https://app.carbonable.io/launchpad/${content.slug.current}`,
    "og:type": content.seo.ogtype,
    "og:article:author": content.seo.ogarticleauthor,
    "og:article:published_time": content.seo.ogarticlepublishedtime,
    "og:article:section": content.seo.ogarticlesection,
    "og:article:tag": tags.map((tag) => tag),
    "twitter:card": content.seo.twittercard,
    "twitter:domain": content.seo.twitterdomain,
    "twitter:title": content.seo.twittertitle,
    "twitter:description": content.seo.twitterdescription,
    "twitter:image": urlFor(content.seo.twitterimage).width(500).url() || "https://carbonable.io/assets/images/social/social.jpg",
    "twitter:url": content.seo.twitterurl || `https://app.carbonable.io/launchpad/${content.slug.current}`
  };
};

export default function ProjectPage() {
  const data = useLoaderData();
  const project: Project = data.project;
  const content: SanityContent = data.content[0];
  const whitelist: ProjectWhitelist = data.whitelist.whitelist;
  return (
      <div className="xl:w-10/12 xl:mx-auto 2xl:w-9/12 2xl:max-w-6xl">
        <ProjectOverview project={project} whitelist={whitelist} />
        <div className="mt-20 w-11/12 mx-auto">
          { content !== undefined && <ContentContainer content={content} /> }
        </div>
      </div>
  )
}
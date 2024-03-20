import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { json, type LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, type V2_MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import Content from "~/components/Project/Content/Content";
import ContentWrapper from "~/components/Project/Content/ContentWrapper";
import ProjectWrapper from "~/components/Project/ProjectWrapper";
import ProjectOverview from "~/components/Project/Selection/ProjectOverview";
import { client } from "~/utils/sanity/client";
import { urlFor } from "~/utils/sanity/image";
import { type SanityContent } from "~/utils/sanity/types";

export const loader: LoaderFunction = async ({ params, request }) => {
    try {
      const projects = await fetch(`${process.env.INDEXER_URL}/launchpad/details/${params.slug}`, {});
      const project = await projects.json();

      const canAccessPresale = 
        process.env.PRESALE_OPEN === "true" &&
        process.env.PRESALE_TOKEN ?
          request.url.includes(`?access=${process.env.PRESALE_TOKEN}`) :
          false;

      // If the project is not found, or is not display, throw a 404.
      if (project === null || project === undefined){
        throw new Response("Not Found", {status: 404})
      }

      const content = await client.fetch(
        `*[_type == "project" && slug.current == $slug]`,
        { slug: params.slug }
      );
  
      return json({ project,
                    content,
                    mapboxKey: process.env.MAPBOX,
                    trackingActivated: process.env.TRACKING_ACTIVATED === "true",
                    graphQLEndpoint: process.env.GRAPHQL_ENDPOINT,
                    canAccessPresale,
                  });

    } catch (e) {
      console.error(e)
      throw new Response("Not Found", {status: 404})
    }
}

export const meta: V2_MetaFunction = ({ data }) => {
    if (data === undefined || data.content === undefined || data.content.length === 0 ) return [];
  
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

export default function Index() {
    const { project, content, mapboxKey, trackingActivated, graphQLEndpoint, canAccessPresale } = useLoaderData();
    const [launchpad, setLaunchpad] = useState(project.data.launchpad);
    const [mint, setMint] = useState(project.data.mint);
    const [projectData, setProjectData] = useState(project.data.project);
    const fetcher = useFetcher();

    const graphQLClient = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: graphQLEndpoint,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
      cache: new InMemoryCache(),
    });

    useEffect(() => {
      async function refreshData() {
        fetcher.load(`/launchpad/refresh?slug=${project.data.project.slug}`);
      }
  
      const interval = setInterval(() => {
        refreshData();
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (fetcher.data === undefined) return;
  
      const data = fetcher.data.data;
  
      setProjectData(data.project);
      setLaunchpad(data.launchpad);
      setMint(data.mint);
    }, [fetcher.data]);

    return (
      <div className="w-full">
        <ApolloProvider client={graphQLClient}>
          <ProjectWrapper 
            project={projectData}
            launchpad={launchpad}
            mint={mint}
            canAccessPresale={canAccessPresale}
          >
            <ProjectOverview />
          </ProjectWrapper>
          <div className="mt-20 w-11/12 mx-auto px-2 xl:w-10/12 2xl:w-9/12 2xl:max-w-6xl">
              <ContentWrapper
                content={content[0]}
                mapboxKey={mapboxKey}
                trackingActivated={trackingActivated}
                slug={project.data.project.slug}
              >
                <Content />
              </ContentWrapper>
          </div>
        </ApolloProvider>
      </div>
    )
}
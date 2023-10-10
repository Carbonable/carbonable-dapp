import _ from "lodash";
import { useState } from "react";
import { GreenButton } from "../Buttons/ActionButton";
import NewsletterDialog from "../Newsletter/Newsletter";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({projects, setRefreshData}: {projects: any[], setRefreshData: (b: boolean) => void}) {
    const migratedProjects = _.filter(projects, project => project.tokens.some((token: any) => token.hasOwnProperty("value")));
    const projectsToMigrate = _.filter(projects, project => project.tokens.some((token: any) => !token.hasOwnProperty("value")));
    const [isOpen, setIsOpen] = useState(false);

    if (projects.filter((project) => project.tokens.length > 0).length === 0) {
        return (
            <div className="ml-2 mt-2">
                You don't have any assets yet. Go to <a href="/launchpad" className="text-greenish-500 mt-1 hover:text-neutral-100">Launchpad</a> to invest during open sales.
                <br />
                <GreenButton className="w-fit mt-2" onClick={() => setIsOpen(true)}>Be alerted when a sale opens</GreenButton>
                <NewsletterDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        )
    }

    return (
        <>
            { projectsToMigrate.length > 0 && 
                <>
                    <div className="uppercase font-trash text-bold text-sm text-left md:pl-1 2xl:text-base mt-2">Assets to migrate</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 select-none">
                        {projectsToMigrate.map((project) => (
                            <ProjectCard key={project.id} project={project} toMigrate={true} setRefreshData={setRefreshData} />
                        ))}
                    </div>
                </>
            }
            { migratedProjects.length > 0 && 
                <>
                    {projectsToMigrate.length > 0 && <div className="uppercase font-trash text-bold text-sm text-left md:pl-1 2xl:text-base mt-8">Migrated assets</div> }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 select-none">
                        {migratedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} setRefreshData={setRefreshData} />
                        ))}
                    </div>
                </>
            }
        </>
    )
}
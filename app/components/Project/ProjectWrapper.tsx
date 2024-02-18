import { createContext, useContext } from "react";
import type { LaunchpadProps, ProjectProps } from "~/types/project";

type ProjectContextType = {
    project: ProjectProps
    launchpad: LaunchpadProps
};

type ProjectWrapperProps = {
    children?: React.ReactNode;
    project: ProjectProps
    launchpad: LaunchpadProps
};

const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export default function ProjectWrapper({ children, project, launchpad }: ProjectWrapperProps) {

    if (project === undefined) return null;

    return (
        <ProjectContext.Provider value={{project, launchpad}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject() {
    return useContext(ProjectContext);
}
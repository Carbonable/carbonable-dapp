import { createContext, useContext, useState } from "react";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/types/project";

type ProjectContextType = {
    project: ProjectProps;
    launchpad: LaunchpadProps;
    mint: MintProps;
    quantity: number | null ;
    setQuantity: (quantity: number | null) => void;
};

type ProjectWrapperProps = {
    children?: React.ReactNode;
    project: ProjectProps;
    launchpad: LaunchpadProps;
    mint: MintProps;
};

const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export default function ProjectWrapper({ children, project, launchpad, mint }: ProjectWrapperProps) {
    const [quantity, setQuantity] = useState<number | null>(1);

    if (project === undefined) return null;

    return (
        <ProjectContext.Provider value={{project, launchpad, quantity, setQuantity, mint}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject() {
    return useContext(ProjectContext);
}
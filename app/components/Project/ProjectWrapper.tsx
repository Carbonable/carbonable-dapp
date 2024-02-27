import { createContext, useContext, useState } from "react";
import { type BoostForValue } from "~/graphql/__generated__/graphql";
import type { LaunchpadProps, MintProps, ProjectProps } from "~/types/project";

type ProjectContextType = {
    project: ProjectProps;
    launchpad: LaunchpadProps;
    mint: MintProps;
    quantity: number | null ;
    setQuantity: (quantity: number | null) => void;
    boost: BoostForValue | undefined;
    setBoost: (boost: BoostForValue | undefined) => void;
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
    const [boost, setBoost] = useState<BoostForValue | undefined>(undefined);

    if (project === undefined) return null;

    return (
        <ProjectContext.Provider value={{project, launchpad, quantity, setQuantity, mint, boost, setBoost}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject() {
    return useContext(ProjectContext);
}
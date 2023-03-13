import { Tab } from "@headlessui/react";
import { useState } from "react";
import { CustomLegend } from "../Common/Graph";
import Tabs from "../Common/Tabs";
import ActionLogs from "./ActionLogs";
import FundingAllocation from "./FundingAllocation";
import AllocationGraph from "./Graph"
import ProjectedDecarbonation from "./ProjectedDecarbonation";
import ProjectsImpact from "./ProjectsImpact";
import ProjectsMetrics from "./ProjectsMetrics";

export default function Summary({summaryKPI}: {summaryKPI: any}) {
    const graphTabs = ["Year", "3Y", "5Y"];
    const [graphYears, setGraphYears] = useState(1);

    const legendPayload = [
        {
            name: "Carbon Emission",
            color: "#334566",
        },
        {
            name: "Ex Post",
            color: "#046B4D",
        },
        {
            name: "Ex Ante",
            color: "#06A475",
        },
        {
            name: "Target",
            color: "#D0D1D6",
        }
    ]

    const handleGraphChange = (index: number) => {
        switch (index) {
            case 0:
                setGraphYears(1);
                break;
            case 1:
                setGraphYears(3);
                break;
            case 2:
                setGraphYears(5);
                break;
        }
    }

    return (
        <div className="relative w-full md:px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <GlobalKPI title="Invested amount" kpi={parseInt(summaryKPI.global.invested_amount).toLocaleString('en')} unit="$" />
                <GlobalKPI title="Generated CC" kpi={parseInt(summaryKPI.global.generated_cc).toLocaleString('en')} unit="t" />
                <GlobalKPI title="Forecasted CC" kpi={parseInt(summaryKPI.global.forecasted_cc).toLocaleString('en')} unit="t" />
                <GlobalKPI title="# of projects" kpi={summaryKPI.global.number_of_projects} />
            </div>
            <div className="w-full relative">
                <div className="relative">
                    <Title title="PROJECTED DECARBONATION" />
                    <div className="flex justify-between items-center md:px-12 mt-8 flex-wrap">
                        <div className="text-neutral-300 text-sm lg:text-lg font-inter mb-4 text-left w-full md:w-fit md:mb-0">
                            <CustomLegend payload={legendPayload} />
                        </div>
                        <div className="text-right">
                            <Tab.Group
                                onChange={(index) => {
                                    handleGraphChange(index);
                                }}
                            >
                                <Tab.List className="flex rounded-lg bg-transparent border border-neutral-500 w-fit mx-auto">
                                    <Tabs tabs={graphTabs} />
                                </Tab.List>
                            </Tab.Group>
                        </div>
                    </div>
                    <AllocationGraph yearStep={graphYears} data={summaryKPI.graph_data} isFullScreen={true} />
                    <div className="mt-12 md:px-8">
                        <ProjectedDecarbonation projections={summaryKPI.projected_decarbonation} />
                    </div>
                </div>
                <div className="mt-12">
                    <Title title="PROJECTS FUNDING ALLOCATION" />
                    <div className="mt-12">
                        <FundingAllocation allocations={summaryKPI.funding_allocations} />
                    </div>
                </div>
                <div className="mt-12">
                    <Title title="PROJECTS METRICS" />
                    <div className="mt-12">
                        <ProjectsMetrics metrics={summaryKPI.projects_metrics} />
                    </div>
                </div>
                <div className="mt-12">
                    <Title title="PROJECTS IMPACT" />
                    <div className="mt-12">
                        <ProjectsImpact impacts={summaryKPI.impacts} />
                    </div>
                </div>
                <div className="mt-12">
                    <Title title="ACTION LOGS" />
                    <div className="mt-12">
                        <ActionLogs logs={summaryKPI.action_logs} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function GlobalKPI({title, kpi, unit}: {title: string, kpi: any, unit?: string}) {
    return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2">
                {unit} {kpi}
            </div>
        </div>
    )
}

function Title({title}: {title: string}) {
    return (
        <div className="text-neutral-100 text-xl font-bold pb-2 border-b border-neutral-500 mt-20">{title}</div>
    )
}

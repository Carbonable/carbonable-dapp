import { LinkSecondary } from "~/components/Buttons/LinkButton";
import type { Report } from "~/utils/sanity/types";

export default function Reports({reports}: {reports: Report[]}) {
    return (
        <>
            <div id="impactreports" className="mt-4 flex w-full font-inter text-neutral-300 uppercase text-xs md:text-sm">
                <div className="w-5/12 px-1">Report name</div>
                <div className="w-4/12 px-1">Last update</div>
                <div className="w-3/12"></div>
            </div>
            <div>
                { reports.map((report, index) => (
                    <div key={`report_${index}`} className="w-full flex text-neutral-100 font-inter uppercase mt-1 items-center text-sm md:text-base">
                        <div className="w-5/12 overflow-hidden text-ellipsis whitespace-nowrap px-1">{report.name}</div>
                        <div className="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap px-1">{report.date}</div>
                        <div className="w-3/12 flex justify-end">
                            <LinkSecondary href={report.link}>Download</LinkSecondary>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
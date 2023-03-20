import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { CustomLegend } from "../../Common/Graph";

export default function ProjectsMetrics({metrics}: {metrics: any}) {
    return (
        <div className="relative mt-4 font-inter grid grid-cols-3 gap-10">
            <div className="col-span-3 md:col-span-1">
                <ProjectsColors colors={metrics.colors} />
            </div>
            <div className="col-span-3 md:col-span-1">
                <ProjectsTypes types={metrics.types} />
            </div>
            <div className="col-span-3 md:col-span-1">
                <ProjectsLocations locations={metrics.locations} />
            </div>
        </div>
    )
}

function ProjectsTypes({types}: {types: any[]}) {
    const CustomizedLabel = ({ x, y, value }: any) => {
        return (
            <text x={x + 5} y={y - 16} fill="#878A94" className="text-xs">
                {`${value}%`}
            </text>
        );
    };

    return  (
        <div>
            <Title title="Projects Types" />
            <div className="w-full h-full md:mt-4">
                <ResponsiveContainer width="100%" aspect={1}>
                    <BarChart 
                        data={types}
                        margin={{
                            top: 50,
                            right: 0,
                            left: 0,
                            bottom: 10,
                          }}
                          barGap={52}
                    >
                        <Bar dataKey="removal" fill="#29A46F" barSize={32} radius={[10, 10, 0, 0]} name="Removal" label={<CustomizedLabel />} />
                        <Bar dataKey="avoidance" fill="#145136" barSize={32} radius={[10, 10, 0, 0]} name="Avoidance" label={<CustomizedLabel />} />
                    </BarChart>
                </ResponsiveContainer>
                <div className="text-neutral-300 text-xs font-inter md:mt-4 lg:mt-2 flex justify-center gap-x-8">
                    <div className="pl-2">Removal</div>
                    <div>Avoidance</div>
                </div>
            </div>
        </div>
    )
}


function ProjectsColors({colors}: {colors: any[]}) {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central" className="text-sm">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const legendPayload = [
        {
            name: "Green",
            color: "#29A46F",
        },
        {
            name: "Blue",
            color: "#9EBAF0",
        },
        {
            name: "Agroforestry",
            color: "#CFBD70",
        }
    ]

    return  (
        <div>
            <Title title="Projects Colors" />
            <div className="w-full h-full md:mt-4">
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie
                            data={colors}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={110}
                            innerRadius={60}
                            dataKey="value"
                        >
                            {colors.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="text-neutral-300 text-sm lg:text-lg font-inter text-center w-fit mx-auto md:mt-2 lg:mt-0">
                    <CustomLegend payload={legendPayload} />
                </div>
            </div>
        </div>
    )
}


function ProjectsLocations({locations}: {locations: any[]}) {
    return  (
        <div>
            <Title title="Projects Locations" />
            <div className="w-full h-full md:mt-4 md:max-h-72 md:overflow-x-scroll lg:max-h-full lg:overflow-auto">
                {locations.map((location: any, index: number) => (
                    <LocationDetails key={index} location={location} />
                ))}
            </div>
        </div>
    )
}

function LocationDetails({location}: {location: any}) {
    return (
        <div className="flex justify-start px-4 mt-8 w-full">
            <div className="min-w-[32px]">
                <img
                    src={`https://flagcdn.com/w80/${location.iso_code}.png`}
                    srcSet={`https://flagcdn.com/w80/${location.iso_code}.png 2x`}
                    alt={location.name}
                    className="rounded-full w-[32px] h-[32px] object-cover" />
            </div>
            <div className="w-full pl-8">
                <div className="text-neutral-300 text-sm font-inter">{location.name}</div>
                <div className="flex items-center mt-1">
                    <div className="w-full bg-opacityLight-5 rounded-full h-2">
                        <div className="bg-greenish-700 h-2 rounded-full" style={{width: `${location.percentage}%`}}></div>
                    </div>
                    <div className="text-neutral-300 text-xs font-inter ml-3">{location.percentage}%</div>
                </div>
                
            </div>
        </div>
    )
}

function Title({title}: {title: string}) {
    return (
        <div className="text-neutral-300 text-sm text-center w-full">{title}</div>
    )
}
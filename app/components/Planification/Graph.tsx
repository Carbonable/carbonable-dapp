import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { shortenNumber } from "~/utils/utils";

export default function AllocationGraph({yearStep, data, isFullScreen}: {yearStep: number, data: any[], isFullScreen?: boolean}) {

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {

            return (
                <div className="px-8 pt-4 pb-4 bg-neutral-700 font-inter rounded-lg text-xs font-extralight text-center text-neutral-100">
                    <p>{`Carbon emission: t ${shortenNumber(payload[0].value)}k`}</p>
                    <p>{`CO² contribution: t ${shortenNumber(parseInt(payload[1].value + payload[2].value))}k`}</p>
                    <p>{`Neutrality: ${payload[3].value}%`}</p>
                </div>
            );
        }
      
        return null;
    };

    return (
        <div className={`w-full px-0 mt-8`}>
            <ResponsiveContainer width="100%" aspect={2.2}>
                <ComposedChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Inter',
                    }}
                >
                    <CartesianGrid stroke="#2B2E36" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" label={{ value: 'Kilo t', angle: -90, position: 'insideLeft' }}  />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Target (%)', angle: 90, position: 'insideRight' }} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    {!isFullScreen && <Legend /> }
                    <Bar dataKey="emission" name="Emission" yAxisId="left" barSize={10} fill="#334566" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="ex_post" name="Ex Post" yAxisId="left" stackId="a" barSize={10} fill="#046B4D" />
                    <Bar dataKey="ex_ante" name="Ex Ante" yAxisId="left" stackId="a" barSize={10} fill="#06A475" radius={[10, 10, 0, 0]} />
                    <Line type="monotone" name="Target" yAxisId="right" dataKey="target" stroke="#D0D1D6" strokeWidth={2} dot={false} activeDot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

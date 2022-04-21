import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis, ResponsiveContainer
} from "recharts";
import {useContext} from "react";
import {HistoryContext} from "./History";

export function ChartContainer({pointsByCategory}) {
    const { categories} = useContext(HistoryContext);

    // Array construction to build the radar chart
    let data = [];
    pointsByCategory.forEach(categoryPoint => {
        categories.every(category => {
            if (categoryPoint.category.id === category.id){
                data.push ({
                    subject: category.label,
                    A: categoryPoint.finalPoints,
                    fullMark: 100
                })
                return false
            }
            return true
            }
        )
    })

    return (
        <ResponsiveContainer width="100%" height={400} className="border rounded mb-0">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} margin={{ top: 0, left: 150, right: 150, bottom: 0 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Check1" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}
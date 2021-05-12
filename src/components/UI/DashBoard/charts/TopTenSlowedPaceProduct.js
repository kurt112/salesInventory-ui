import React, {Fragment} from "react";
import Title from "./Title";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip,  ResponsiveContainer } from 'recharts';


const TopTenSlowPaceProduct = ({data}) => {


    const renderTooltip = (props) => {
        const { active, payload } = props;

        if (active && payload && payload.length) {
            const data = payload[0] && payload[0].payload;

            return (
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #999',
                        margin: 0,
                        padding: 10,
                    }}
                >
                    <p><b>Product Name:</b>{data.product}</p>
                    <p>
                        <span><b>Date Arrived: </b></span>
                        {data.value}
                    </p>
                </div>
            );
        }

        return null;
    };

    const range = [16, 225];

    return (
        <Fragment>
            <Title>Top 10 Slowed Pace Products: </Title>
           <div>
               {
                   data.map(e => {
                       return <ResponsiveContainer key={e.date} width="100%" height={60}>
                           <ScatterChart
                               width={800}
                               height={60}
                               margin={{
                                   top: 10,
                                   right: 0,
                                   bottom: 0,
                                   left: 0,
                               }}
                           >
                               <XAxis
                                   type="category"
                                   dataKey="product"
                                   name="product"
                                   interval={0}
                                   tickLine={{ transform: 'translate(0, -6)' }}
                               />
                               <YAxis
                                   type="number"
                                   dataKey="index"
                                   height={10}
                                   width={e.date.length + 80}
                                   tick={false}
                                   tickLine={false}
                                   axisLine={false}
                                   label={{ value: e.date, position: 'insideBottomRight' }}
                               />
                               <ZAxis type="number" dataKey="value"  range={range} />
                               <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                               <Scatter data={e.products} fill="#8884d8" />
                           </ScatterChart>
                       </ResponsiveContainer>
                   })
               }

           </div>
        </Fragment>
    )
}

export default  TopTenSlowPaceProduct
import React, {Fragment} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import Title from './Title';

export default function TopTenSelledProduct({data}) {

    return (
        <Fragment>
            <Title>Top 10 Selled Products: </Title>
            <ResponsiveContainer width={'100%'}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={10}
                >
                    <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Bar dataKey="pv" fill="#8884d8" background={{fill: '#eee'}}/>
                </BarChart>
            </ResponsiveContainer>
        </Fragment>
    );
}
import React from 'react';
import {
  PieChart, Pie
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];

function UserRatio() {
    return (
        <div>
            <PieChart width={800} height={500}>
        <Pie dataKey="value" startAngle={180} endAngle={0} data={data} cx={400} cy={200} outerRadius={100} fill="#8884d8" label />
      </PieChart>
        </div>
    )
}

export default UserRatio

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie, Cell,
} from 'recharts';
import { Row } from 'antd';


function DashBoardGraph() {

    const [Products, setProducts] = useState([])

    const COLORS = ['#FF8996', '#FFC288', '#FFFAAF', '#A4FFA2','#A1B6FF','#E3A2FF'];

    const data = [
        { name: '아우터', value: 400 },
        { name: '상의', value: 300 },
        { name: '바지', value: 300 },
        { name: '원피스', value: 200 },
        { name: '치마', value: 100 },
        { name: '신발', value: 300 },
    ];
    
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const name = data.name
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}{name}
        </text>
    );
    };


    useEffect(() => {

        let body ={

        }
        
        getProduct(body)

    }, [])

    const getProduct = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                  const continentSold = response.data.productInfo.map((p) => {
                    return p.continents;
                  });
                  continentSold.forEach(element => {
                    
                  });
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })
    }

    const data1 = [
        {
          name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
          name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
          name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
          name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
          name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
          name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
      ];

    return (
        <div>
            <Row justify="space-around">                
            <div>
                <h1 style={{marginLeft: '50px'}}>판매량</h1><br/>
                <LineChart width={750} height={500} data={data1}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={Date.now()} padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </div>

            <div>
                <h1 style={{marginLeft: '50px'}}>카테고리별 판매량</h1><br/> 
                <PieChart width={800} height={500}>
                    <Pie
                    data={data}
                    cx={400}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value" 
                    >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                    </Pie>
                </PieChart>
            </div>
            </Row>
            
        </div>
    )
}

export default DashBoardGraph

"use client";

import {useEffect, useState} from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, ArrowBigRight, Footprints, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Markdown from 'react-markdown';
import { Area, AreaChart, PieChart, BarChart ,Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Rectangle, Cell, Pie, Label } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

function DashboardPage() {

    const [checkingData, setCheckingData] = useState(true);
    const [dataExists, setDataExists] = useState(true);
    const [data, setData] = useState({
        keyBusinessInsights: {
            primaryInsights: [""],
            quickStats: [{key: "", value: ""}]
        },
        keyPerformanceMetrics: [{number: 0, title: "", description: ""}],
        businessRecommendations: { actionableInsights: [""], nextSteps: [""]},
        analytics: [ {name: "", count: 0, mean: 0, std: 0, min: 0, "25%": 0, "50%": 0, "75%": 0, max: 0}],
        lineChart: false,
        barChart: false,
        pieChart: false,
        donutChart: false,
        lineChartData: { title: "", data: [{name: "", value: 0}] },
        barChartData: { title: "", data: [{name: "", value: 0}]},
        pieChartData: { title: "", colorCodes: [""],  data: [{name: "", value: 0}] },
        donutChartData: { title: "", colorCodes: [""], data: [{name: "", value: 0}] }
    });
    const RADIAN = Math.PI / 180;

    interface PieLabelRenderProps {
      cx: number;
      cy: number;
      midAngle: number;
      innerRadius: number;
      outerRadius: number;
      percent: number;
      value: number;
    }

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
      const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
      );
    };

    useEffect(()=>{
        const checkData = async () => {

          try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-table`);
            setDataExists(response.data.status);

            if(response.data.status){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard-data`);
                setData(response.data);
                console.log(response.data);
            }
          }finally{
            setCheckingData(false);
          }
        }

        checkData();
    }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        
        {/* title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            Instant Insights, Smarter Decisions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform business data into actionable intelligence with AI. Get real-time analytics, predictive insights, and comprehensive reports through natural language queries for faster, data-driven decisions.            
          </p>
        </div>

        {(!dataExists && !checkingData) && <p className="text-center pb-3 text-destructive font-bold">Please upload your data for analysis.</p>}

        {checkingData && <div className="container mx-auto px-4 py-8">
          <Card className="bg-card border-border text-primary-foreground">
            <CardContent className="flex items-center justify-center space-x-4 p-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-lg font-medium">Getting business insights...</p>
            </CardContent>
          </Card>
        </div>}

        {(!checkingData && dataExists) && <div>
          {/* Key Business Insights */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Key Business Insights
            </h2>
            
            {/* primary insights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Primary Insights</h3>
              <div className="bg-card rounded-lg border border-border p-6">
                <ul className="space-y-4">
                  
                  {/* insight */}
                  {data.keyBusinessInsights.primaryInsights.map((feature, index)=>(
                      <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <CircleCheck  className="text-primary-foreground text-sm" />
                          </div>
                          <h4 className="font-semibold text-foreground">
                              {feature}
                          </h4>
                      </li>
                  ))}

                </ul>
              </div>
            </div>

              
          {/* quick stats */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="bg-card rounded-lg border border-border p-6">
                <ul className="space-y-4">
                  
                  {/* stat */}
                  {data.keyBusinessInsights.quickStats.map((feature,index)=>(
                      <li key={index} className="flex items-center space-x-3">
                          <div className="justify-between items-start py-2 border-b border-muted/30">
                              <span className="text-lg font-bold mr-2 text-primary">{feature.key}:</span>
                              <span className="font-bold text-accent">{feature.value}</span>
                          </div>
                      </li>
                  ))}
                
                </ul>
              </div>
            </div>
          </div>


          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Key Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              
              {/* metric */}
              {data.keyPerformanceMetrics.map((feature,index)=>(
                  <Card key={index} className="bg-card text-center border-border">
                      <CardContent className="px-4 justify-items-center">
                          <div className="flex text-primary items-center mb-4 text-4xl font-bold">
                              {feature.number}
                          </div>
                          <div className="text-2xl font-bold text-foreground mb-1">{feature.title}</div>
                          <div className="text-sm text-muted-foreground">{feature.description}</div>
                      </CardContent>
                  </Card>  
              ))}  
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Analytics
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Numeric Summary Statistics</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pl-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/80">
                        <TableHead className="w-[100px] text-muted-foreground"></TableHead>
                        <TableHead className="text-muted-foreground">Count</TableHead>
                        <TableHead className="text-muted-foreground">Mean</TableHead>
                        <TableHead className="text-muted-foreground">Std</TableHead>
                        <TableHead className="text-muted-foreground">Min</TableHead>
                        <TableHead className="text-muted-foreground">25%</TableHead>
                        <TableHead className="text-muted-foreground">50%</TableHead>
                        <TableHead className="text-muted-foreground">75%</TableHead>
                        <TableHead className="text-right text-muted-foreground">Max</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.analytics.map((feature,index) => (
                        <TableRow key={feature.name} className="hover:bg-muted/20">
                          <TableCell className="font-medium text-foreground">{feature.name}</TableCell>
                          <TableCell className="text-foreground">{feature.count}</TableCell>
                          <TableCell className="text-foreground">{feature.mean}</TableCell>
                          <TableCell className="text-foreground">{feature.std}</TableCell>
                          <TableCell className="text-foreground">{feature.min}</TableCell>
                          <TableCell className="text-foreground">{feature["25%"]}</TableCell>
                          <TableCell className="text-foreground">{feature["50%"]}</TableCell>
                          <TableCell className="text-foreground">{feature["75%"]}</TableCell>
                          <TableCell className="text-right text-foreground">{feature.max}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          

          {/* Charts  */}
          {(data.barChart || data.lineChart || data.pieChart || data.donutChart) && <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Charts</h2>
            <div className="grid grid-cols-2 gap-5">

            {/* pie chart */}
            {data.pieChart && <div className="flex flex-col border border-border rounded-lg shadow-md hover:-translate-y-1 duration-300 hover:shadow-xl bg-card">
                <div className="text-center font-bold text-xl text-foreground my-2">{data.pieChartData.title}</div>
                <ChartContainer config={{}} className="w-full h-[300px]">
                  <PieChart width={400} height={400}>
                    <Pie data={data.pieChartData.data} dataKey="value" cx="50%" cy="50%"  fill="var(--primary)" labelLine={false} label={renderCustomizedLabel} >
                      {data.pieChartData.data.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={data.pieChartData.colorCodes[index % data.pieChartData.colorCodes.length]} />
                      ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                  </PieChart>
                </ChartContainer>
              </div>}
              
              {/* line chart */}
              {data.lineChart && <div className="flex flex-col border border-border rounded-lg shadow-md hover:-translate-y-1 duration-300 hover:shadow-xl bg-card">
                <div className="text-center font-bold text-xl text-foreground my-2">{data.lineChartData.title}</div>
                <ChartContainer config={{}} className="w-full h-[300px]">
                  <LineChart
                    width={500}
                    height={300}
                    data={data.lineChartData.data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid  strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                    <XAxis dataKey="name" stroke="var(--foreground)" />
                    <YAxis stroke="var(--foreground)" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}/>
                    <Legend />
                    
                    <Line type="monotone" dataKey="value" stroke="var(--primary)" activeDot={{ r: 8, fill: 'var(--accent)', stroke: 'var(--primary)' }} />
                  </LineChart>
                </ChartContainer>
              </div>}
              
              {/* bar chart */}
              {data.barChart && <div className="flex flex-col border border-border rounded-lg shadow-md hover:-translate-y-1 duration-300 hover:shadow-xl bg-card">
                <div className="text-center font-bold text-xl text-foreground my-2">{data.barChartData.title}</div>
                <ChartContainer config={{}} className="w-full h-[300px]">
                  <BarChart
                    width={500}
                    height={300}
                    data={data.barChartData.data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
                    <XAxis dataKey="name" stroke="var(--foreground)" />
                    <YAxis stroke="var(--foreground)" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}/>
                    <Legend />
                    <Bar dataKey="value" fill="var(--primary)" activeBar={<Rectangle fill="var(--accent)" stroke="var(--primary)" />} />
                  </BarChart>
                </ChartContainer>
              </div>}
              
              {/* donut chart */}
              {data.donutChart && <div className="flex flex-col border border-border rounded-lg shadow-md hover:-translate-y-1 duration-300 hover:shadow-xl bg-card">
                <div className="text-center font-bold text-xl text-foreground my-2">{data.donutChartData.title}</div>
                <ChartContainer config={{}} className="w-full h-[300px]">
                  <PieChart>
                    <Pie
                      data={data.donutChartData.data}
                      isAnimationActive={true}
                      innerRadius={80}
                      fill="var(--primary)"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.donutChartData.data.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={data.donutChartData.colorCodes[index % data.donutChartData.colorCodes.length]} />
                      ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                  </PieChart>
                </ChartContainer>
              </div>}

            </div>
          </div>}

          
          {/* busniess recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Business Recommendations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* actionalble insights */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Actionable Insights</h3>
                <div className="bg-card rounded-lg border border-border p-6">
                  <ul className="space-y-4">
                    
                    {/* insight */}
                    {data.businessRecommendations.actionableInsights.map((feature,index)=>(
                      <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                            <Icon icon="mdi:lightbulb" className="text-primary-foreground text-sm" />
                          </div>
                          <div>
                          {/* <p className="text-slate-600 text-sm">
                              {feature}
                          </p> */}
                          <Markdown>{feature}</Markdown>
                          </div>
                      </li>
                    ))}

                  </ul>
                </div>
              </div>

              {/* next steps */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
                <Card className="bg-card border-border">
                  <CardContent className="px-6">
                    <div className="space-y-4">
                      
                      {/* step */}
                      {data.businessRecommendations.nextSteps.map((feature,index)=>(
                          <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                                  <Footprints className="text-primary-foreground text-xs font-bold p-1"/>
                              </div>
                              <div>
                                  {/* <div className="font-normal text-slate-800">{feature}</div> */}
                                  <Markdown>{feature}</Markdown>
                              </div>
                          </div>
                      ))}

                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>}

        
      </div>
    </div>
  );
}

export default DashboardPage;

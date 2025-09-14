"use client";

import {useEffect, useState} from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, ArrowBigRight, Footprints } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

function DashboardPage() {

    const [dataExists, setDataExists] = useState(false);
    const [data, setData] = useState({
        keyBusinessInsights: {
            primaryInsights: [""],
            quickStats: [{key: "", value: ""}]
        },
        keyPerformanceMetrics: [{number: 0, title: "", description: ""}],
        businessRecommendations: { actionableInsights: [""], nextSteps: [""]},
        analytics: [ {name: "", count: 0, mean: 0, std: 0, min: 0, "25%": 0, "50%": 0, "75%": 0, max: 0}]
    });

    useEffect(()=>{
        const checkData = async () => {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-table`);
            setDataExists(response.data.status);

            if(response.data.status){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard-data`);
                setData(response.data);
            }
        }

        checkData();
    }, [])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        
        {/* title */}
        {/* <div className="mb-5">
          <div className="flex items-center justify-center">
            <div>
              <h1 className="text-5xl font-heading font-extrabold text-[#1e3a8a] mb-2">
                Dashboard
              </h1>
            </div>
          </div>
        </div>
        <hr className="mb-5"/> */}

        {!dataExists && <p className="text-center pb-3 text-red-600 font-bold">Please upload your data for analysis.</p>}

        {/* Key Business Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-[#1e3a8a] mb-6">
            Key Business Insights
          </h2>
          
          {/* primary insights */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Primary Insights</h3>
            <div className="bg-white rounded-lg border p-6">
              <ul className="space-y-4">
                
                {/* insight */}
                {data.keyBusinessInsights.primaryInsights.map((feature, index)=>(
                    <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#0891b2] rounded-full flex items-center justify-center flex-shrink-0">
                            <CircleCheck  className="text-white text-sm" />
                        </div>
                        <h4 className="font-semibold text-slate-800">
                            {feature}
                        </h4>
                    </li>
                ))}

              </ul>
            </div>
          </div>

            
        {/* quick stats */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Quick Stats</h3>
            <div className="bg-white rounded-lg border p-6">
              <ul className="space-y-4">
                
                {/* stat */}
                {data.keyBusinessInsights.quickStats.map((feature,index)=>(
                    <li key={index} className="flex items-center space-x-3">
                        <div className="justify-between items-start py-2 border-b border-muted/30">
                            <span className="text-lg font-bold mr-2 text-[#1e3a8a]">{feature.key}:</span>
                            <span className="font-bold text-[#0891b2]">{feature.value}</span>
                        </div>
                    </li>
                ))}
              
              </ul>
            </div>
          </div>
        </div>


        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-[#1e3a8a] mb-6">
            Key Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            {/* metric */}
            {data.keyPerformanceMetrics.map((feature,index)=>(
                <Card key={index} className="bg-white text-center">
                    <CardContent className="px-4 justify-items-center">
                        <div className="flex text-[#0891b2] items-center mb-4 text-4xl font-bold">
                            {feature.number}
                        </div>
                        <div className="text-2xl font-bold text-slate-800 mb-1">{feature.title}</div>
                        <div className="text-sm text-slate-600">{feature.description}</div>
                    </CardContent>
                </Card>  
            ))}  
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-[#1e3a8a] mb-6">
            Analytics
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-slate-800">Numeric Summary Statistics</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pl-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]"></TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Mean</TableHead>
                      <TableHead>Std</TableHead>
                      <TableHead>Min</TableHead>
                      <TableHead>25%</TableHead>
                      <TableHead>50%</TableHead>
                      <TableHead>75%</TableHead>
                      <TableHead className="text-right">Max</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.analytics.map((feature,index) => (
                      <TableRow key={feature.name}>
                        <TableCell className="font-medium">{feature.name}</TableCell>
                        <TableCell>{feature.count}</TableCell>
                        <TableCell>{feature.mean}</TableCell>
                        <TableCell>{feature.std}</TableCell>
                        <TableCell>{feature.min}</TableCell>
                        <TableCell>{feature["25%"]}</TableCell>
                        <TableCell>{feature["50%"]}</TableCell>
                        <TableCell>{feature["75%"]}</TableCell>
                        <TableCell className="text-right">{feature.max}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        
        {/* busniess recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-[#1e3a8a] mb-6">
            Business Recommendations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* actionalble insights */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Actionable Insights</h3>
              <div className="bg-white rounded-lg border p-6">
                <ul className="space-y-4">
                  
                  {/* insight */}
                  {data.businessRecommendations.actionableInsights.map((feature,index)=>(
                    <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                        <Icon icon="mdi:lightbulb" className="text-white text-sm" />
                        </div>
                        <div>
                        <p className="text-slate-600 text-sm">
                            {feature}
                        </p>
                        </div>
                    </li>
                  ))}

                </ul>
              </div>
            </div>

            {/* next steps */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Next Steps</h3>
              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="space-y-4">
                    
                    {/* step */}
                    {data.businessRecommendations.nextSteps.map((feature,index)=>(
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-[#0891b2] rounded-full flex items-center justify-center">
                                <Footprints className="text-white text-xs font-bold p-1"/>
                            </div>
                            <div>
                                <div className="font-normal text-slate-800">{feature}</div>
                            </div>
                        </div>
                    ))}

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

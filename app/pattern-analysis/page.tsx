"use client";

import {useState, useEffect} from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";
import { Loader2 } from "lucide-react";

function PatternAnalysisPage() {

    const [dataExists, setDataExists] = useState(false);
    const [haveTransactions, setHaveTransactions] = useState(false);
    const [foundPattern, setFoundPattern] = useState(false);
    const [issueNotFoundPattern, setIssueNotFoundPattern] = useState("");
    const [initialData, setInitialData] = useState({transactionsFound:0, avgItemsPerTransaction:0});
    const [patterns, setPatterns] = useState({
        significantPatternsCount: "",
        topAssociationPatterns: [{whenWeSee: "", weOftenFind: "", confidence: 0, lift: 0}],
        businessInsights: {
            keyFindings: [],
            recommendations: []
        }
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [minSupport, setMinSupport] = useState(0.05);
    const [initialChecking, setInitialChecking] = useState(false);

    useEffect(()=>{
        const checkData = async () => {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-table`);
            setDataExists(response.data.status);
             
            if(response.data.status){
                setInitialChecking(true);
                try{
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pattern-analysis-initial`);
                    setHaveTransactions(response.data.transactionalPatternsDetected);

                    if(response.data.transactionalPatternsDetected){
                        setInitialData(response.data.data)
                    }
                }finally{
                    setInitialChecking(false);
                }

                
            }
        }

        checkData();
    }, [])

    async function onAnalyze(){
        setIsAnalyzing(true);
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pattern-analysis-analyze`, {minSupport: minSupport});
            setFoundPattern(response.data.foundPatterns);
            
            if(response.data.foundPatterns){
                setPatterns(response.data.data);
            }else{
                setIssueNotFoundPattern(response.data.issueIfNoPatternsFound);
            }
        }finally{
            setIsAnalyzing(false);
        }
    }

    async function onSliderChange(value: number[]){
         setMinSupport(value[0]);
    }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-slate-800 mb-2">Universal Pattern Analysis</h1>
                  <p className="text-sm text-slate-600 tracking-wider">Pattern Analysis helps identify relationships and associations in your Retail/E-commerce Customer Analytics data. This works with any type of transactional or multi-value data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {!dataExists && <p className="mt-5 text-center pb-3 text-red-600 font-bold">Please upload your data for analysis.</p>}

        {initialChecking && 
            <div className="container mx-auto px-4 py-8">
              <Card className="bg-white border-blue-200 text-blue-700">
                <CardContent className="flex items-center justify-center space-x-4 p-6">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-lg font-medium">Checking for transactional patterns...</p>
                </CardContent>
              </Card>
            </div>
         }
         
         {(!haveTransactions && dataExists && !initialChecking) && <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card className="bg-orange-50 border-orange-200 text-orange-700">
              <CardContent className="flex items-center space-x-4 p-4">
                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <p className="font-medium">
                  No suitable transactional patterns detected in this dataset.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card className="bg-blue-50 border-blue-200 text-blue-700">
              <CardContent className="flex items-start space-x-4 p-4">
                <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-2">Pattern Analysis works best with data that has:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Comma-separated values in text fields</li>
                    <li>Multiple items per record</li>
                    <li>Categorical associations</li>
                  </ul>
                  <p className="font-medium mt-4 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>{`Customer purchases: "Product A, Product B, Product C"`}</li>
                    <li>{`Course enrollments: "Course 1, Course 2"`}</li>
                    <li>{`Skills: "Python, SQL, Excel"`}</li>
                    <li>{`Tags: "urgent, important, follow-up"`}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>}

      {(dataExists && haveTransactions)  && <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon icon="lucide:settings" className="w-5 h-5 text-cyan-500" />
                <span>Analysis Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    Minimum Support Value
                  </Label>
                  <div className="space-y-3">
                    <Slider onValueChange={onSliderChange} max={0.5} min={0.1} step={0.05} className="w-full" value={[minSupport]} />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0.1</span>
                      <span className="font-medium text-cyan-600">{minSupport.toFixed(2)} ({(minSupport * 100).toFixed(0)}%)</span>
                      <span>0.5</span>
                    </div>
                  </div>
                </div>
                <Button disabled={isAnalyzing} onClick={onAnalyze} className="cursor-pointer w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-medium py-3">
                  <Icon icon="lucide:play" className="w-4 h-4 mr-2" />
                  Analyze Patterns
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon icon="lucide:bar-chart-3" className="w-5 h-5 text-teal-500" />
                <span>Dataset Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Transactions Found</span>
                  <span className="text-lg font-bold text-slate-800">{initialData.transactionsFound}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Avg Items/Transaction</span>
                  <span className="text-lg font-bold text-slate-800">{initialData.avgItemsPerTransaction}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {(!foundPattern && issueNotFoundPattern.length>0)  && 
            <div className="grid grid-cols-1 gap-6 mb-8">
            <Card className="bg-orange-50 border-orange-200 text-orange-700">
              <CardContent className="flex items-center space-x-4 p-4">
                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <p className="font-medium">
                  {issueNotFoundPattern}
                </p>
              </CardContent>
            </Card>
          </div>
        }
        
        {foundPattern && <div>
            <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Icon icon="lucide:trophy" className="w-5 h-5 text-amber-500" />
                    <span>Top Association Patterns</span>
                </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                <div className="space-y-3">
                    
                    {/* pattern */}
                    {patterns.topAssociationPatterns.map((feature,index)=>(
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-100">
                            <div>
                                <p className="font-medium text-slate-800">{feature.whenWeSee} → {feature.weOftenFind}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-600">
                                Lift: <span className="font-semibold text-cyan-600">{feature.lift}</span>
                                </p>
                                <p className="text-sm text-slate-600">
                                Confidence: <span className="font-semibold text-teal-600">{feature.confidence}</span>
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
                </CardContent>
            </Card>
            </div>
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                <Icon icon="lucide:lightbulb" className="w-5 h-5 text-yellow-500" />
                <span>Business Insights</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <Icon icon="lucide:search" className="w-4 h-4 text-cyan-500" />
                    <span>Key Findings</span>
                    </h3>
                    <div className="space-y-3">
                    
                    {patterns.businessInsights.keyFindings.map((feature,index)=>(
                        <div key={index} className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                            <p className="text-sm text-slate-700">{feature}</p>
                        </div>
                    ))}

                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <Icon icon="lucide:target" className="w-4 h-4 text-teal-500" />
                    <span>Recommendations</span>
                    </h3>
                    <div className="space-y-3">
                    {patterns.businessInsights.recommendations.map((feature,index)=>(
                        <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-slate-700">{feature}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>}


      </main>}


    </div>
  );
}

export default PatternAnalysisPage;
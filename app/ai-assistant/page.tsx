"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function AIAssistantPage() {

  const [checkingData, setCheckingData] = useState(true);
  const [dataExists, setDataExists] = useState(false);
  const [question, setQuestion] = useState("");
  const [dataAnalyzed, setDataAnalyzed] = useState(false);
  const [smartQuestions, setSmartQuestions] = useState([{title:"" , question: ""}]);
  const [analysis, setAnalysis] = useState(
    {
      smartAnalysis: {analysis: "", confidence: 0},
      keyFindings: [],
      relevantStatistics: [{key: "", value: ""}],
      dataEvidence: {evidences: [], confidence: ""},
      actionableInsights: [{title: "", value: ""}],
      followUpQuestions: []
    })
  const [isAnalysing, setIsAnalysing] = useState(false);

  useEffect(()=>{
    const checkData = async ()=>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/check-table`);
        setDataExists(response.data.status);

        if(response.data.status){
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/smart-question-examples`);
          setSmartQuestions(response.data);
        }
    }

    checkData();
  }, [])

  function onQuestionChange(event : React.ChangeEvent<HTMLInputElement>){
    setQuestion(event.target.value);
  }

  async function askQuestion(){
    setIsAnalysing(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question-answer`, {question});
      setDataAnalyzed(true);
      setAnalysis(response.data);
      console.log(response.data);
      
    } finally {
      setIsAnalysing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-[#1e3a8a] mb-4">
            Welcome to Your AI Business Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant insights from your data with intelligent analysis. Ask questions in natural
            language and receive comprehensive business intelligence reports.
          </p>
        </div>

        {/* sample questions */}
        { dataExists && 
          <Card className="mb-8">
            <CardContent className="px-6 py-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="ph:lightbulb-bold" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1e3a8a]">Smart Question Examples</h3>
              </div>

              

              {smartQuestions.length > 1 ? 

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {smartQuestions.map((question, index) => (
                  <div key={index} onClick={()=>setQuestion(question.question)} className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="font-medium text-[#1e3a8a] mb-1">{question.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {question.question}
                      </div>
                    </div>
                  </div>
                ))}
              </div> : 
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <div className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Skeleton count={3}/>
                </div>
                <div className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Skeleton count={3}/>
                </div>
                <div className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Skeleton count={3}/>
                </div>
                <div className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Skeleton count={3}/>
                </div>
                <div className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Skeleton count={3}/>
                </div>
                <div className="h-auto p-4 text-left justify-start border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Skeleton count={3}/>
                </div>
              </div>
            }


            </CardContent>
          </Card>}

        {/* ask ai */}
        {(!dataExists && !checkingData) && <p className="text-center pb-3 text-red-600 font-bold">Please upload your data for analysis.</p>}
        <Card className="mb-8">
          <CardContent className="px-6 py-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-lg flex items-center justify-center mr-3">
                <Icon icon="ph:chat-circle-bold" className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e3a8a]">Ask Your Question</h3>
            </div>
            <div className="flex gap-4 items-center">
              <Input
                disabled={!dataExists || isAnalysing}
                onChange={onQuestionChange}
                value={question}
                className="flex-1 h-12 text-base border-2 focus:border-[#0891b2] transition-colors"
                placeholder="Type your business intelligence question here..."
              />
              <Button
                onClick={askQuestion}
                disabled={!dataExists || isAnalysing}
                size="lg"
                className="bg-gradient-to-r from-[#1e3a8a] to-[#0891b2] hover:from-[#1e40af] hover:to-[#0891b2] px-8"
              >
                <Icon icon="ph:paper-plane-right-bold" className="w-5 h-5 mr-2" />
                {isAnalysing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>

        
        { (dataExists && dataAnalyzed) && <div>

        {/* some analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* smart analysis */}
          <Card className="border-2 border-[#0891b2]/20">
            <CardContent className="px-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="ph:brain-bold" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a8a]">Smart Analysis</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">AI-Powered Insight</p>
                  <Markdown>
                    {analysis.smartAnalysis.analysis}
                  </Markdown>
                </div>
                <div className="flex items-center text-sm text-[#0891b2]">
                  <Icon icon="ph:check-circle-bold" className="w-4 h-4 mr-2" />
                  {`Analysis completed with ${analysis.smartAnalysis.confidence * 100}% confidence`}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* key findings  */}
          <Card className="border-2 border-[#1e3a8a]/20">
            <CardContent className="px-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="ph:star-bold" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a8a]">Key Findings</h3>
              </div>
              <div className="space-y-3">
                
                {/* finding */}
                {analysis.keyFindings.map((finding, index)=>(
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#0891b2] rounded-full mt-2" />
                    <p className="text-sm">
                      {finding}
                    </p>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

          {/* relevant statistics */}
          {analysis.relevantStatistics.length > 0 && <Card className="border-2 border-[#06b6d4]/20">
            <CardContent className="px-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="ph:chart-line-up-bold" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a8a]">Relevant Statistics</h3>
              </div>
              <div className="space-y-3">
                
                {analysis.relevantStatistics.map((feature,index)=>(
                  <div key={index} className="justify-between items-start py-2 border-b border-muted/30">
                    <div className="text-lg font-bold text-[#1e3a8a]">{feature.key}</div>
                    <div className="text-sm text-muted-foreground">{feature.value}</div>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>}

          {/* data evidence */}
          <Card className="border-2 border-[#3b82f6]/20">
            <CardContent className="px-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="ph:database-bold" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a8a]">Data Evidence</h3>
              </div>
              <div className="space-y-3">
                
                {analysis.dataEvidence.evidences.map((feature,index)=>(
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#0891b2] rounded-full mt-2" />
                    <div className="flex-1">
                      <span className="text-sm">{feature}</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <span className="text-sm font-bold">Confidence Level: </span>
                    <span 
                      className={`ml-2 text-sm font-medium ${analysis.dataEvidence.confidence === "high" ? "text-green-600" : analysis.dataEvidence.confidence === "low" ? "text-red-600" : "text-yellow-600"}`}
                    >{analysis.dataEvidence.confidence}</span>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* actional insights */}
        <Card className="mb-8 border-2 border-[#0891b2]/30">
          <CardContent className="px-6 py-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-lg flex items-center justify-center mr-3">
                <Icon icon="ph:target-bold" className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e3a8a]">Actionable Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* insight   */}
              {analysis.actionableInsights.map((feature,index)=>(
                <div key={index} className="p-4 bg-gradient-to-br from-[#1e3a8a]/5 to-[#0891b2]/5 rounded-lg border border-[#0891b2]/20">
                  <div className="flex items-center mb-3">
                    <Icon icon="ph:trend-up-bold" className="w-5 h-5 text-[#0891b2] mr-2" />
                    <span className="font-medium text-[#1e3a8a]">{feature.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.value}</p>
                </div>
              ))}
            
            </div>
          </CardContent>
        </Card>

        {/* follow up questions */}
        <Card>
          <CardContent className="px-6 py-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] rounded-lg flex items-center justify-center mr-3">
                <Icon icon="ph:chat-circle-dots-bold" className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e3a8a]">Follow-up Questions</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              
              {/* question */}
              {analysis.followUpQuestions.map((feature,index)=>(
                <div key={index} onClick={()=>setQuestion(feature)} className="p-2 px-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <Icon icon="ph:arrow-right-bold" className="w-4 h-4 text-[#1e3a8a]" />
                  <div className="text-sm font-medium">{feature}</div>
                </div>
              ))}
              
            </div>
          </CardContent>
        </Card>
        
        
        </div> }
      
      </div>
    </div>
  );
}

export default AIAssistantPage;

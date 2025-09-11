"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import axios from "axios";

export default function DisplayPage() {

  async function test(){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`);
    console.log(response);
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8"> 
        
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold text-slate-800">Display Page</h1>
            <p className="text-lg text-slate-600 mt-2">
              Upload and explore your CSV data with powerful analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Icon icon="material-symbols:upload-file" className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Upload card */}
        <Card className="border-2 border-dashed border-slate-300 hover:border-teal-400 transition-colors duration-300 bg-white/50 backdrop-blur-sm">
          <CardContent className="px-6 py-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                <Icon icon="material-symbols:cloud-upload" className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Upload your CSV file</h3>
                <p className="text-slate-600 mb-4">
                  Drag and drop your file here, or click to browse
                </p>
              </div>
              <Button onClick={test} className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                Choose File
              </Button>
              <p className="text-sm text-slate-500">Supported formats: CSV files up to 10MB</p>
            </div>
          </CardContent>
        </Card>

        

        {/* 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Icon icon="material-symbols:domain" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Domain</p>
                  <p className="text-xl font-bold text-slate-800">Sales Data</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Icon icon="material-symbols:table-rows" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Rows</p>
                  <p className="text-xl font-bold text-slate-800">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Icon icon="material-symbols:view-column" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Columns</p>
                  <p className="text-xl font-bold text-slate-800">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Icon icon="material-symbols:warning" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Missing Data</p>
                  <p className="text-xl font-bold text-slate-800">2.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="px-6 py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon icon="material-symbols:numbers" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Numeric Columns</p>
                  <p className="text-xl font-bold text-slate-800">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Table */}
        <Card className="bg-gradient-to-br from-white/80 via-white/70 to-slate-50/80 backdrop-blur-sm border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="font-heading text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">
                  Data Explorer
                </h2>
                <p className="text-slate-600 mt-1">
                  Advanced data exploration and insights platform
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-teal-50 to-cyan-50 px-3 py-2 rounded-lg border border-teal-100">
                  <Icon icon="material-symbols:filter-list" className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Rows left after filtering:
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-0 shadow-sm"
                  >
                    1,247
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-6 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Icon
                    icon="material-symbols:search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500"
                  />
                  <Input
                    className="pl-10 bg-white/80 backdrop-blur-sm border-slate-300 focus:border-teal-400 focus:ring-teal-400/20 shadow-sm"
                    placeholder="Search across all columns..."
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full lg:w-48 bg-white/80 backdrop-blur-sm border-slate-300 shadow-sm hover:border-teal-300 transition-colors">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full lg:w-auto bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:border-teal-300 transition-all duration-300 shadow-sm"
                  >
                    <Icon
                      icon="material-symbols:view-column"
                      className="w-4 h-4 mr-2 text-teal-600"
                    />
                    Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-64 bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl"
                >
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-slate-800">Toggle Columns</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="col-id" defaultChecked />
                        <Label htmlFor="col-id" className="text-sm">
                          ID
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="col-name" defaultChecked />
                        <Label htmlFor="col-name" className="text-sm">
                          Name
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="col-email" defaultChecked />
                        <Label htmlFor="col-email" className="text-sm">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="col-status" defaultChecked />
                        <Label htmlFor="col-status" className="text-sm">
                          Status
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="col-revenue" defaultChecked />
                        <Label htmlFor="col-revenue" className="text-sm">
                          Revenue
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="col-date" />
                        <Label htmlFor="col-date" className="text-sm">
                          Date
                        </Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-lg bg-white/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50/80 to-slate-100/60 border-b border-slate-200">
                    <TableHead className="font-semibold text-slate-700 bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                      ID
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                      Revenue
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-300 border-b border-slate-100">
                    <TableCell className="font-medium text-slate-800">001</TableCell>
                    <TableCell className="text-slate-700">John Smith</TableCell>
                    <TableCell className="text-slate-600">john.smith@example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-sm">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-800">$45,230</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-300 border-b border-slate-100">
                    <TableCell className="font-medium text-slate-800">002</TableCell>
                    <TableCell className="text-slate-700">Sarah Johnson</TableCell>
                    <TableCell className="text-slate-600">sarah.j@example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200 shadow-sm">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-800">$32,180</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-300 border-b border-slate-100">
                    <TableCell className="font-medium text-slate-800">003</TableCell>
                    <TableCell className="text-slate-700">Michael Brown</TableCell>
                    <TableCell className="text-slate-600">m.brown@example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-sm">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-800">$67,890</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-300 border-b border-slate-100">
                    <TableCell className="font-medium text-slate-800">004</TableCell>
                    <TableCell className="text-slate-700">Emily Davis</TableCell>
                    <TableCell className="text-slate-600">emily.davis@example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200 shadow-sm">
                        Inactive
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-800">$12,450</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-300 border-b border-slate-100">
                    <TableCell className="font-medium text-slate-800">005</TableCell>
                    <TableCell className="text-slate-700">David Wilson</TableCell>
                    <TableCell className="text-slate-600">d.wilson@example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-sm">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-800">$89,340</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-cyan-50/30 transition-all duration-300 border-b border-slate-100">
                    <TableCell className="font-medium text-slate-800">006</TableCell>
                    <TableCell className="text-slate-700">Lisa Anderson</TableCell>
                    <TableCell className="text-slate-600">lisa.a@example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200 shadow-sm">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-800">$54,720</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-50/50 to-slate-100/30 p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600">Showing 1 to 6 of 1,247 results</p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className="hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:border-teal-200 transition-all duration-300"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-300"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-300"
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className="hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:border-teal-200 transition-all duration-300"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>


        
      </div>
    </div>
  );
}

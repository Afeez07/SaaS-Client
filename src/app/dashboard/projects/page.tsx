"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Trash2 } from "lucide-react"
import { useData } from "@/lib/DataContext"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Project } from "@/types"
import { formatCurrency } from "@/lib/utils"

export default function ProjectsPage() {
  const { projects, deleteProject } = useData()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Sheet key={project.id}>
            <SheetTrigger asChild>
              <div 
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer transition-transform hover:-translate-y-1"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{project.subtitle}</p>
                        <p className="text-sm font-bold text-slate-800">{project.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">{project.date}</p>
                        <p className="text-sm font-bold text-[var(--brand)]">{formatCurrency(project.amount)}</p>
                      </div>
                    </div>
                    <Progress value={project.progress} className="mt-4" />
                  </CardContent>
                </Card>
              </div>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>{selectedProject?.title}</SheetTitle>
                <SheetDescription>{selectedProject?.subtitle}</SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Details</h4>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Due Date</span>
                      <span className="text-sm font-medium text-slate-900">{selectedProject?.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Amount</span>
                      <span className="text-sm font-bold text-[var(--brand)]">{selectedProject?.amount ? formatCurrency(selectedProject.amount) : ""}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Progress</h4>
                  <div className="flex items-center gap-4">
                    <Progress value={selectedProject?.progress} className="flex-1" />
                    <span className="text-sm font-medium text-slate-600">{selectedProject?.progress}%</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => {
                      if (selectedProject) deleteProject(selectedProject.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
            No projects found. Try adjusting your search or create a new one.
          </div>
        )}
      </div>
    </div>
  )
}

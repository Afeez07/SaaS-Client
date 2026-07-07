"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { Project } from "@/types"
import { mockProjects } from "@/lib/mock-data"

interface ProjectContextType {
  projects: Project[]
  addProject: (project: Omit<Project, "id">) => void
  deleteProject: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects)

  const addProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
    }
    setProjects((prev) => [newProject, ...prev])
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}

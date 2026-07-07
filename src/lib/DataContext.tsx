"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { Project, Service, Payment, SupportTicket } from "@/types"
import { mockProjects, mockServices, mockPayments, mockSupport } from "@/lib/mock-data"

interface DataContextType {
  projects: Project[]
  addProject: (project: Omit<Project, "id">) => void
  deleteProject: (id: string) => void

  services: Service[]
  addService: (service: Omit<Service, "id">) => void
  deleteService: (id: string) => void

  payments: Payment[]
  addPayment: (payment: Omit<Payment, "id">) => void
  deletePayment: (id: string) => void

  supportTickets: SupportTicket[]
  addSupportTicket: (ticket: Omit<SupportTicket, "id" | "active" | "comments">) => void
  deleteSupportTicket: (id: string) => void
  addCommentToTicket: (ticketId: string, text: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [services, setServices] = useState<Service[]>(mockServices)
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupport)

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const addProject = (data: Omit<Project, "id">) => setProjects((prev) => [{ ...data, id: generateId() }, ...prev])
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id))

  const addService = (data: Omit<Service, "id">) => setServices((prev) => [{ ...data, id: generateId() }, ...prev])
  const deleteService = (id: string) => setServices((prev) => prev.filter((p) => p.id !== id))

  const addPayment = (data: Omit<Payment, "id">) => setPayments((prev) => [{ ...data, id: generateId() }, ...prev])
  const deletePayment = (id: string) => setPayments((prev) => prev.filter((p) => p.id !== id))

  const addSupportTicket = (data: Omit<SupportTicket, "id" | "active" | "comments">) => {
    setSupportTickets((prev) => [{ ...data, id: generateId(), active: false, comments: [] }, ...prev])
  }
  const deleteSupportTicket = (id: string) => setSupportTickets((prev) => prev.filter((p) => p.id !== id))

  const addCommentToTicket = (ticketId: string, text: string) => {
    setSupportTickets((prev) => prev.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          comments: [
            ...ticket.comments,
            {
              id: generateId(),
              text,
              author: "You",
              date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })
            }
          ]
        }
      }
      return ticket
    }))
  }

  return (
    <DataContext.Provider value={{ 
      projects, addProject, deleteProject,
      services, addService, deleteService,
      payments, addPayment, deletePayment,
      supportTickets, addSupportTicket, deleteSupportTicket, addCommentToTicket
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Folder, FileText, Image as ImageIcon, MoreVertical, Upload, Plus, X, ArrowLeft, File, Trash2 } from "lucide-react"

type DocType = "pdf" | "folder" | "image" | "doc"

type Document = {
  id: number
  name: string
  type: DocType
  size: string
  date: string
  parentId: number | null
}

const initialDocuments: Document[] = [
  { id: 1, name: "Q3 Financial Report.pdf", type: "pdf", size: "2.4 MB", date: "Aug 12, 2024", parentId: null },
  { id: 2, name: "Brand Guidelines", type: "folder", size: "--", date: "Aug 10, 2024", parentId: null },
  { id: 3, name: "Hero Image Final.png", type: "image", size: "4.1 MB", date: "Aug 08, 2024", parentId: null },
  { id: 4, name: "Client Contracts", type: "folder", size: "--", date: "Aug 05, 2024", parentId: null },
  { id: 5, name: "Project Scope.docx", type: "doc", size: "1.2 MB", date: "Aug 01, 2024", parentId: null },
  { id: 6, name: "Meeting Assets", type: "folder", size: "--", date: "Jul 28, 2024", parentId: null },
  // Inside Brand Guidelines folder
  { id: 7, name: "Logo_V2.png", type: "image", size: "1.1 MB", date: "Aug 11, 2024", parentId: 2 },
  { id: 8, name: "Colors.pdf", type: "pdf", size: "0.5 MB", date: "Aug 11, 2024", parentId: 2 },
]

const getIconForType = (type: DocType) => {
  switch (type) {
    case 'folder': return Folder
    case 'image': return ImageIcon
    case 'pdf': return FileText
    case 'doc': return FileText
    default: return File
  }
}

const getColorForType = (type: DocType) => {
  switch (type) {
    case 'folder': return "text-amber-500"
    case 'image': return "text-indigo-500"
    case 'pdf': return "text-rose-500"
    case 'doc': return "text-blue-500"
    default: return "text-slate-500"
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [currentFolder, setCurrentFolder] = useState<number | null>(null)
  
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")

  const [isUploading, setIsUploading] = useState(false)
  const [uploadName, setUploadName] = useState("")

  const [viewingDoc, setViewingDoc] = useState<Document | null>(null)

  const currentDocs = documents.filter(d => d.parentId === currentFolder)
  const currentFolderName = currentFolder ? documents.find(d => d.id === currentFolder)?.name : "Documents"

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return
    const newDoc: Document = {
      id: Date.now(),
      name: newFolderName,
      type: "folder",
      size: "--",
      date: "Just now",
      parentId: currentFolder
    }
    setDocuments([...documents, newDoc])
    setNewFolderName("")
    setIsCreatingFolder(false)
  }

  const handleUpload = () => {
    if (!uploadName.trim()) return
    const isImage = uploadName.toLowerCase().endsWith('.png') || uploadName.toLowerCase().endsWith('.jpg')
    const isPdf = uploadName.toLowerCase().endsWith('.pdf')
    const type: DocType = isImage ? 'image' : isPdf ? 'pdf' : 'doc'

    const newDoc: Document = {
      id: Date.now(),
      name: uploadName,
      type: type,
      size: "1.0 MB",
      date: "Just now",
      parentId: currentFolder
    }
    setDocuments([...documents, newDoc])
    setUploadName("")
    setIsUploading(false)
  }

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id && d.parentId !== id))
    setViewingDoc(null)
  }

  return (
    <div className="space-y-6 pb-12 relative h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentFolder && (
            <button 
              onClick={() => setCurrentFolder(null)}
              className="text-slate-500 hover:text-[var(--brand)] transition-colors p-2 rounded-full hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <h2 className="text-2xl font-bold text-slate-800">{currentFolderName}</h2>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsUploading(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium py-2 px-4 rounded-md text-sm transition-colors shadow-sm"
          >
            <Upload className="h-4 w-4" /> Upload
          </button>
          <button 
            onClick={() => setIsCreatingFolder(true)}
            className="flex items-center gap-2 bg-[var(--brand)] hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" /> New Folder
          </button>
        </div>
      </div>

      {currentDocs.length === 0 ? (
        <Card className="h-64 flex flex-col items-center justify-center text-slate-400 border-dashed">
          <Folder className="h-12 w-12 mb-4 opacity-20" />
          <p>This folder is empty</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentDocs.map((doc) => {
            const Icon = getIconForType(doc.type)
            const colorClass = getColorForType(doc.type)
            return (
              <Card 
                key={doc.id} 
                className="hover:shadow-md transition-shadow cursor-pointer group" 
                onClick={() => {
                  if (doc.type === 'folder') {
                    setCurrentFolder(doc.id)
                  } else {
                    setViewingDoc(doc)
                  }
                }}
              >
                <CardContent className="p-6 relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }}
                    className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center ${colorClass}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm truncate w-32" title={doc.name}>{doc.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Modals Overlay */}
      {(isCreatingFolder || isUploading || viewingDoc) && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          
          {/* New Folder Modal */}
          {isCreatingFolder && (
            <Card className="w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Create New Folder</h3>
                <button onClick={() => setIsCreatingFolder(false)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
              </div>
              <CardContent className="p-6">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Folder Name" 
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors mb-4"
                />
                <button 
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="w-full bg-[var(--brand)] hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                >
                  Create Folder
                </button>
              </CardContent>
            </Card>
          )}

          {/* Upload Document Modal */}
          {isUploading && (
            <Card className="w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Upload Document</h3>
                <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
              </div>
              <CardContent className="p-6 text-center">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 mb-6 bg-slate-50">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm text-slate-600 mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-slate-400">Supports PDF, DOCX, PNG, JPG (Max 10MB)</p>
                </div>
                <div className="text-left mb-4">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Simulate upload filename:</label>
                  <input 
                    type="text" 
                    placeholder="e.g. My Presentation.pdf" 
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpload()}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>
                <button 
                  onClick={handleUpload}
                  disabled={!uploadName.trim()}
                  className="w-full bg-[var(--brand)] hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                >
                  Simulate Upload
                </button>
              </CardContent>
            </Card>
          )}

          {/* Document Viewer Modal */}
          {viewingDoc && (
            <div className="w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-slate-800 text-white">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-slate-300" />
                  <span className="font-medium">{viewingDoc.name}</span>
                  <span className="text-xs text-slate-400 ml-4">{viewingDoc.size}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-slate-300 hover:text-white transition-colors"><Upload className="h-4 w-4" /></button>
                  <button onClick={() => setViewingDoc(null)} className="text-slate-300 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 flex items-center justify-center p-8">
                {viewingDoc.type === 'image' ? (
                  <div className="bg-white p-4 shadow-sm rounded border border-slate-200 max-h-full max-w-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="h-24 w-24 opacity-20 mb-4" />
                    <p>Image Preview Placeholder</p>
                  </div>
                ) : (
                  <div className="w-full max-w-2xl h-full bg-white shadow-sm rounded border border-slate-200 p-12 overflow-y-auto">
                    <div className="h-4 bg-slate-100 rounded w-3/4 mb-8"></div>
                    <div className="h-3 bg-slate-100 rounded w-full mb-4"></div>
                    <div className="h-3 bg-slate-100 rounded w-full mb-4"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6 mb-4"></div>
                    <div className="h-3 bg-slate-100 rounded w-full mb-4"></div>
                    <div className="h-3 bg-slate-100 rounded w-4/5 mb-8"></div>
                    <div className="h-48 bg-slate-50 border border-slate-100 rounded w-full mb-8 flex items-center justify-center text-slate-300">Chart Placeholder</div>
                    <div className="h-3 bg-slate-100 rounded w-full mb-4"></div>
                    <div className="h-3 bg-slate-100 rounded w-full mb-4"></div>
                    <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

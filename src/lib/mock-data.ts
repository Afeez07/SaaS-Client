export const mockProjects = [
  {
    id: "1",
    title: "Company Identity & Branding",
    subtitle: "3 Logo Concepts",
    date: "3/30/20",
    amount: "$1,750",
    progress: 80, // percentage
  },
  {
    id: "2",
    title: "Company Website Redesign",
    subtitle: "companyname.com",
    date: "5/30/20",
    amount: "$12,000",
    progress: 40,
  },
]

export const mockServices = [
  {
    id: "1",
    title: "Google Ads Management",
    category: "PPC / SEM",
    frequency: "Monthly",
    amount: "$250",
  },
  {
    id: "2",
    title: "Managed WordPress Hosting",
    category: "Web Hosting",
    frequency: "Monthly",
    amount: "$35",
  },
  {
    id: "3",
    title: "Domain Name & Secure Certificate",
    category: "Domain / SSL",
    frequency: "Yearly",
    amount: "$50",
  },
]

export const mockPayments = [
  {
    id: "1",
    title: "Company Website Redesign",
    category: "Project Payment",
    date: "3/15/20",
    amount: "$4000",
  },
  {
    id: "2",
    title: "Company Identity & Branding",
    category: "Project Payment",
    date: "3/12/20",
    amount: "$675",
  },
  {
    id: "3",
    title: "Domain Name Registration",
    category: "Domain / SSL",
    date: "3/10/20",
    amount: "$25",
  },
]

export const mockSupport = [
  { 
    id: "1", 
    title: "Minor Updates to Team Page", 
    category: "Web Request", 
    date: "3/15/20", 
    comments: [
      { id: "c1", text: "I'll start working on this today.", author: "Stoodeo Support", date: "3/15/20" }
    ], 
    active: true 
  },
  { 
    id: "2", 
    title: "Create New Email Account", 
    category: "Email Accounts", 
    date: "3/12/20", 
    comments: [
      { id: "c2", text: "What should the address be?", author: "Stoodeo Support", date: "3/12/20" },
      { id: "c3", text: "hello@company.com please.", author: "You", date: "3/12/20" },
      { id: "c4", text: "Done!", author: "Stoodeo Support", date: "3/13/20" }
    ], 
    active: false 
  },
  { 
    id: "3", 
    title: "Add Ecommerce Ability to Website", 
    category: "Web Request", 
    date: "3/10/20", 
    comments: [
      { id: "c5", text: "Can we use Stripe?", author: "You", date: "3/10/20" },
      { id: "c6", text: "Yes, Stripe is perfect.", author: "Stoodeo Support", date: "3/11/20" }
    ], 
    active: false 
  },
]

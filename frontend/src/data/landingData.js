export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Departments', href: '#categories' },
  { label: 'Track Complaint', href: '/tracking' },
  { label: 'Admin', href: '/admin' },
]

export const heroHighlights = [
  { title: 'AI-Based Detection', icon: 'Ai' },
  { title: 'Auto Department Routing', icon: 'Routing' },
  { title: 'Real-Time Tracking', icon: 'Track' },
  { title: 'Severity-Based Priority', icon: 'Priority' },
]

export const trustStats = [
  { value: '8+', label: 'Complaint Categories' },
  { value: 'AI-Based', label: 'Issue Detection' },
  { value: 'Auto', label: 'Routing' },
  { value: 'Real-Time', label: 'Tracking' },
  { value: 'Severity', label: 'Priority Alerts' },
]

export const problems = [
  {
    title: 'Confusing department selection',
    description: 'Citizens struggle to identify the right government office for every issue.',
    icon: 'MapPin',
  },
  {
    title: 'Manual complaint writing',
    description: 'Users waste time drafting details instead of simply capturing the issue.',
    icon: 'Edit',
  },
  {
    title: 'Delayed response',
    description: 'Issues remain unresolved when complaints are routed incorrectly or too late.',
    icon: 'Clock',
  },
  {
    title: 'No clear tracking',
    description: 'Citizens cannot see progress after submitting a complaint.',
    icon: 'Activity',
  },
]

export const solutionSteps = [
  {
    title: 'Upload Image',
    description: 'Capture any public issue and upload it quickly.',
    step: '1',
  },
  {
    title: 'AI Analysis',
    description: 'Automatic category, severity, and location detection.',
    step: '2',
  },
  {
    title: 'Department Routing',
    description: 'Complaint routed to the right civic authority instantly.',
    step: '3',
  },
  {
    title: 'Track Status',
    description: 'Monitor resolution progress with a complaint ID.',
    step: '4',
  },
]

export const featureList = [
  { title: 'AI Image Captioning', description: 'Automatically describe issue photos for faster triage.' },
  { title: 'Complaint Category Detection', description: 'Classifies public issues like pothole, garbage, fire, and more.' },
  { title: 'Severity Prediction', description: 'Assigns priority levels based on hazard and impact.' },
  { title: 'Department Routing', description: 'Routes each complaint to the correct civic department.' },
  { title: 'AI Complaint Summary', description: 'Generates short, usable complaint text automatically.' },
  { title: 'Location Tagging', description: 'Attaches GPS-like location metadata for faster action.' },
  { title: 'Duplicate Detection', description: 'Identifies repeated issues to avoid redundant reports.' },
  { title: 'Multi-Department Routing', description: 'Handles complex cases involving several agencies.' },
  { title: 'Citizen Tracking', description: 'Real-time updates keep citizens informed on progress.' },
  { title: 'Admin Dashboard', description: 'Government teams can view, manage, and update complaints.' },
  { title: 'SLA / Escalation Ready', description: 'Supports priority handling and escalation workflows.' },
  { title: 'Gemini API Ready', description: 'Optional integration for advanced visual understanding.' },
]

export const categories = [
  { title: 'Pothole / Road Damage', department: 'Municipal Corporation', severity: 'Medium' },
  { title: 'Garbage Accumulation', department: 'Sanitation Dept.', severity: 'Low' },
  { title: 'Water Leakage', department: 'Water Works', severity: 'Medium' },
  { title: 'Damaged Electric Wire', department: 'Electricity Board', severity: 'High' },
  { title: 'Fire / Smoke', department: 'Fire Brigade', severity: 'Critical' },
  { title: 'Illegal Parking', department: 'Traffic Police', severity: 'Low' },
  { title: 'Fallen Tree', department: 'Forestry Dept.', severity: 'Medium' },
  { title: 'Dead Animal', department: 'Health Dept.', severity: 'Medium' },
  { title: 'Broken Streetlight', department: 'Electricity Board', severity: 'Low' },
  { title: 'Drainage Overflow', department: 'Public Works', severity: 'High' },
]

export const aiDemo = {
  caption: 'A damaged road with a large pothole and uneven pavement is visible.',
  category: 'Pothole / Road Damage',
  severity: 'Medium',
  department: 'Municipal Corporation / PWD',
  summary: 'A medium priority road damage complaint has been detected. Estimated repair response time is 48 hours.',
}

export const dashboardPreview = {
  stats: [
    { label: 'Total complaints', value: '1,240' },
    { label: 'Critical issues', value: '32' },
    { label: 'In progress', value: '68' },
    { label: 'Resolved', value: '1,088' },
  ],
  table: [
    { id: 'JAN2024-000123', issue: 'Pothole on MG Road', location: 'MG Road, Indore', dept: 'Municipal Corporation', severity: 'Medium', status: 'In Progress' },
    { id: 'JAN2024-000122', issue: 'Garbage on Scheme 54', location: 'Scheme 54, Indore', dept: 'Sanitation Dept.', severity: 'Low', status: 'Acknowledged' },
    { id: 'JAN2024-000121', issue: 'Water leakage in pipe', location: 'Vijay Nagar, Indore', dept: 'Water Works', severity: 'Medium', status: 'Resolved' },
    { id: 'JAN2024-000120', issue: 'Electric wire hanging', location: 'Raj Mohalla, Indore', dept: 'Electricity Board', severity: 'Critical', status: 'In Progress' },
  ],
}

export const timelineSteps = [
  { label: 'Submitted', description: 'Complaint recorded in the system.', status: 'completed' },
  { label: 'AI Verified', description: 'Issue type and severity analyzed.', status: 'completed' },
  { label: 'Routed', description: 'Assigned to the responsible department.', status: 'completed' },
  { label: 'Acknowledged', description: 'Authority has confirmed receipt.', status: 'active' },
  { label: 'In Progress', description: 'Work has started on the issue.', status: 'pending' },
  { label: 'Resolved', description: 'Issue completed and closed.', status: 'pending' },
]

export const techStacks = [
  'BLIP image captioning',
  'YOLO object detection',
  'Rule-based routing',
  'Gemini API optional',
  'Supabase / Firebase ready',
  'Vercel / Render deployment',
]

export const footerLinks = {
  product: [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
  ],
  categories: [
    { label: 'Pothole', href: '#categories' },
    { label: 'Garbage', href: '#categories' },
    { label: 'Water Leakage', href: '#categories' },
    { label: 'Fire / Smoke', href: '#categories' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
  ],
}

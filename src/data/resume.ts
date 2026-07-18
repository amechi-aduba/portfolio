import { documents } from './documents'

export const contact = {
  name: 'Amechi Aduba',
  email: 'amechia99@gmail.com',
  phone: '(914) 837-0883',
  phoneHref: 'tel:+19148370883',
  location: 'Cortlandt Manor, NY',
  github: 'https://github.com/amechi-aduba',
  linkedin: 'https://www.linkedin.com/in/amechi-aduba/',
  portfolio: 'https://portfolio-opal-nu-54.vercel.app/',
} as const

export const professionalSummary =
  'Technical support and software engineer with experience debugging Python, JavaScript/TypeScript, API, database, and deployment issues across healthcare, AI, and internal software products. Skilled at translating technical problems into clear guidance for users and non-technical stakeholders, documenting repeatable solutions, and automating manual workflows. Comfortable working independently in ambiguous environments, investigating root causes, escalating actionable bugs, and helping customers keep building.'

export const education = [
  {
    school: 'University of Pennsylvania, Online',
    degree: 'M.S.E. in Artificial Intelligence',
    date: 'Expected May 2028',
  },
  {
    school: 'Clark University, Worcester, MA',
    degree:
      "B.A. in Computer Science · Minor in Data Science · Dean's List & Honors: Fall 2023, Fall 2024",
    date: 'May 2026',
    detail:
      'Relevant coursework: AI (Graduate), Computer Networks (Graduate), Machine Learning, Web Development, Mobile Software Development',
    diplomaUrl: documents.clarkDiploma.url,
  },
] as const

export const skills = [
  {
    label: 'Languages',
    values: 'Python, Java, TypeScript/JavaScript, SQL, HTML/CSS',
  },
  {
    label: 'Support & Debugging',
    values:
      'Technical troubleshooting, root-cause analysis, issue reproduction, user guidance, documentation, RESTful API debugging',
  },
  {
    label: 'Developer Tools',
    values:
      'Git, GitHub, terminals, IDEs, GitHub Copilot, Docker fundamentals, CI/CD basics',
  },
  {
    label: 'Full-Stack & Data',
    values: 'React, FastAPI, Node.js, Django, Supabase, MySQL, Oracle, MongoDB, NoSQL',
  },
  {
    label: 'AI & Automation',
    values:
      'LLM API integration, prompt engineering, OpenAI-style APIs, Twilio automation, machine learning, NLP',
  },
] as const

export const experience = [
  {
    company: 'Penticton Pediatric',
    role: 'Software & Web Developer',
    date: 'June 2026 - Current',
    bullets: [
      'Owned a scheduling product from requirements through deployment for patients and therapists, troubleshooting production issues and translating staff feedback into clear fixes and workflow improvements.',
      'Built automated Twilio and Resend messaging that replaced repetitive reminder work, then documented the workflow so clinic staff could use and support it consistently.',
    ],
  },
  {
    company: 'Clark University',
    role: 'Research Assistant, Computer Science Department',
    date: 'June 2025 - May 2026',
    bullets: [
      'Debugged and validated a Java implementation of the Hierarchical Virtual Bitmap Estimator using unit tests, reproducible test data, and targeted checks for correctness, scalability, and edge cases.',
      'Built Java and Python analysis pipelines that automated repetitive experiments and made failures easier to reproduce, isolate, and explain.',
      'Documented technical findings with performance graphs and concise written explanations for faculty stakeholders, turning complex results into actionable next steps.',
    ],
  },
  {
    company: 'Helius Health AI',
    role: 'Web Development & Backend Intern',
    date: 'November 2024 - September 2025',
    bullets: [
      'Built and tested a React and TypeScript application backed by Supabase, troubleshooting UI, data retrieval, and RESTful API issues across a live healthcare product.',
      'Prototyped Python and Twilio engagement automation, investigated integration problems, and communicated findings clearly to the team during rapid product iteration.',
    ],
  },
  {
    company: 'Cantor Fitzgerald / BGC',
    role: 'Data Science Intern',
    date: 'June 2024 - August 2024',
    bullets: [
      'Developed an AI-driven automation tool for corporate actions processing, reducing manual steps while working directly with traders and QA to understand issues and explain technical behavior.',
      'Troubleshot and optimized complex Oracle SQL queries and validation scripts supporting live financial data feeds, documenting findings and escalating data-quality risks early.',
    ],
  },
] as const

export const resumeProjects = [
  {
    name: 'Meechify: AI Music Recommendation Platform',
    date: 'Jan 2026',
    bullets: [
      "Built and deployed a FastAPI and React/Vite application with Spotify OAuth, custom ranking logic, and Groq's OpenAI-compatible API, debugging authentication, API responses, and generated output end to end.",
      'Designed clear fallback behavior and response handling that translated raw listening data into readable user-facing insights.',
    ],
  },
  {
    name: 'Footee Vision: Computer-Vision Player Analytics Platform',
    date: 'June 2026',
    bullets: [
      'Built a FastAPI, OpenCV, PyTorch, and React pipeline for soccer-video analysis, diagnosing failures across detection, tracking, classification, and frontend integration.',
      'Documented known limitations transparently and made pragmatic fixes for shaky footage rather than overstating system reliability.',
    ],
  },
  {
    name: 'Hand Tracking Sketch Recognition: AI Game',
    date: 'Dec 2025',
    bullets: [
      'Built and debugged a real-time webcam application with MediaPipe and a KNN classifier, resolving camera, canvas, model-integration, and browser execution issues.',
    ],
  },
  {
    name: "Ballon d'Or Nominee Analysis: Predictive Analytics Dashboard",
    date: 'Dec 2024',
    bullets: [
      'Built a Python, Pandas, and Tableau analytics workflow that converted complex player data into understandable rankings and visual explanations for non-technical users.',
    ],
  },
] as const

export const activities =
  "Clark Varsity Men's Soccer · Clark BSU · ColorStack · MOCA (Men of Color Alliance) · Hack Diversity"

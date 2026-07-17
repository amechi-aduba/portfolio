import type { ProjectSlot } from '../types'

// Set each project's status to either 'in-progress' or 'complete'.
export const projectSlots = [
  {
    id: 'footee-vzn',
    title: 'Footee Vision',
    description: 'Footee Vision is a full-stack computer-vision app that analyzes amateur soccer highlight reels. It detects clips, tracks a selected player, and generates a tactical profile based on movement, involvement, and playing style.',
    stack: ['Python', 'React', 'Typescript', 'Vite', 'OpenCV', 'NumPy', 'TransNetV2', 'YOLO11m'],
    repositoryUrl: '',
    demoUrl: '',
    status: 'in-progress',
  },
  {
    id: 'dvsai',
    title: 'Draw vs AI game',
    description: "Draw Vs AI is a pictionary game against a model trained on Google's Quick! Draw dataset.",
    stack: ['Python', 'React', 'Vite', 'Javascript', 'Yoha', 'Tensorflow.js', 'Mediapipe', 'HTML,', 'CSS'],
    repositoryUrl: 'https://github.com/amechi-aduba/drawVSAI-react',
    demoUrl: 'http://drawvsai.vercel.app/',
    status: 'complete',
  },
  {
    id: 'mify',
    title: 'meechify',
    description: 'Meechify is an algorith that analyzes your Spotify listening profile, gives yoyou a score in various metrics, and gives you new songs and artists to listen to.',
    stack: ['Python', 'React', 'TypeScript', 'Vite', 'FastAPI', 'Spotify Web API', 'Last.fm API', 'MusicBrainz', 'ListenBrainz', 'Groq/Llama', 'REST APIs', 'CSS'],
    repositoryUrl: '',
    demoUrl: '',
    status: 'in-progress',
  },
  {
    id: 'footee-analytics',
    title: 'Footee Analytics',
    description: 'Footee Analytics is a soccer analytics site that gives you various amounts of data from the Premier League, LaLiga, Bundesliga, Ligue 1, Serie A, and MLS.',
    stack: ['Python', 'React', 'FastAPI', 'SQLAlchemy','Vite'],
    repositoryUrl: '',
    demoUrl: '',
    status: 'in-progress',
  },
  {
    id: 'bdor',
    title: 'Ballon D`or Calculator (2024)',
    description: 'The Ballon D`or Calculator is a data science project that recalculates the controversial 2024 Ballon D`or based on a remodeled mathematical scoring of various statistics from all nominees from the 2023-24 football season.',
    stack: ['Python', 'Pandas', 'Matplotlib'],
    repositoryUrl: 'https://github.com/amechi-aduba/ballondorcalculator',
    demoUrl: '',
    status: 'complete',
  },
] satisfies ProjectSlot[]

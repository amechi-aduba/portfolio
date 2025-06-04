import fakenewsImg from '/src/assets/img/fakenews.png';
import drawVsAIImg from '/src/assets/img/drawVsAI.png';
import ballonDorImg from '/src/assets/img/ballon_dor.png';
import newmacspImg from '/src/assets/img/newmacsp.png';
import piggybnkImg from '/src/assets/img/piggybnk.png';
import portfolioImg from '/src/assets/img/portfolio.png';

const Projects = [
  {
    id: 1,
    title: "News Classification",
    description: "A news classification project that uses machine learning to classify news articles into fake and real news.",
    image: fakenewsImg, // Replace with your actual image path
    technologies: ["Python", "JupyterNotebook","Scikit-learn", "Pandas", "Matplotlib", "NLTK", "Gradio"],
    demoUrl: "https://amechi21-fake-news-detector.hf.space/",
    githubUrl: "https://github.com/amechi-aduba/newsclassifier",
    featured: false
  },
  {
    id: 2,
    title: "Hand Tracking Draw vs AI game",
    description: "A pictionary game where the user draws with their hands on their webcam and the AI predicts what their drawing is! Created in both React and Python.",
    image: drawVsAIImg,
    technologies: ["React", "Python", "Google API", "Mediapipe","Tailwind CSS"],
    demoUrl: "https://your-demo-link.com",
    githubUrl: "https://github.com/yourusername/Draw vs AI",
    featured: true
  },
  {
    id: 3,
    title: "Ballon Dor Ranking",
    description: "A data science project that reranked the controversial 2024 ballon dor based on weighted statistics",
    image: ballonDorImg,
    technologies: ["Python", "JupyterNotebook", "MongoDB", "Pandas", "Matplotlib"],
    demoUrl: "https://your-demo-link.com",
    githubUrl: "https://github.com/amechi-aduba/ballondorcalculator",
    featured: true
  },
  {
    id: 4,
    title: "Newmac Score Predictor",
    description: "A group project which uses three separate machine learning models to create a score predictor for the NEWMAC Soccer League for Clark University's soccer team.",
    image: newmacspImg,
    technologies: ["Python", "JupyterNotebook", "Scikit-learn", "Pandas"],
    demoUrl: "https://your-demo-link.com",
    githubUrl: "https://github.com/amechi-aduba/The-NEWMAC-Score-Predictor-----CS-160-Final",
    featured: false
  },
  {
    id: 5,
    title: "PIGGYBNK Finance Management Website",
    description: "A finance management website that allows users to manage their finances and investments. Featuring a monetary tracker of spending and earnings, an interactive calendar, and an AI financial advisor.",
    image: piggybnkImg,
    technologies: ["JavaScript", "Python", "HTML", "OpenAI API"],
    demoUrl: "https://your-demo-link.com",
    githubUrl: "https://github.com/amechi-aduba/piggybnk-finance-management",
    featured: false
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Personal portfolio website featuring 3D animations, smooth scrolling, and responsive design showcasing my development skills.",
    image: portfolioImg,
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://portfolio-opal-nu-54.vercel.app",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false
  }
];

export default Projects;
  

/**
 * Portfolio Data Model & Content Source
 * Akhil Seshan — Senior Software Engineer (GenAI & Systems)
 *
 * Populated from latest resume:
 * Focus on GenAI, Large Language Models, Deep Learning, and High-Scale Systems.
 */

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  categoryBadge: string;
  description: string;
  techStack: string[];
  metrics: string;
  repoUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface Award {
  title: string;
  organization: string;
  year: string;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  summary: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Akhil Seshan",
    malayalamName: "അഖിൽ ശേഷൻ",
    title: "Senior Software Engineer",
    domain: "Generative AI, LLMs & High-Scale Systems",
    company: "FactSet",
    location: "Thodupuzha, Kerala, India",
    coordinates: "9.8959° N, 76.7184° E",
    email: "akhilseshan.mec@gmail.com",
    tagline: "Senior Software Engineer specializing in Generative AI, Large Language Models, and scalable backend systems at FactSet. Passionate about prompt reliability, deep learning architectures, and visual storytelling through travel and photography."
  },

  interests: {
    professional: ["Generative AI & LLMs", "Natural Language Processing", "Deep Learning", "High-Performance Go Systems", "Vector Search & Retrieval"],
    personal: ["Travel & Exploration", "Landscape & Street Photography", "Visual Composition"]
  },

  experience: [
    {
      role: "Senior Software Engineer",
      company: "FactSet",
      location: "Hyderabad, India (Remote / Hybrid)",
      period: "Oct 2024 — Present",
      summary: "Core contributor to Portfolio Commentary, a greenfield GenAI initiative generating human-like financial portfolio insights and building an intelligent AI assistant for the Portfolio Analytics platform.",
      highlights: [
        "Architected and maintained high-availability Go backend microservices integrating LLMs for automated portfolio commentary and interactive AI assistants with 100% service uptime.",
        "Engineered prompt tuning pipelines, output reliability frameworks, evaluation benchmarks, and automated narrative compliance verification.",
        "Collaborated with global financial consultants and product managers, diagnosing issues and driving GenAI roadmap enhancements via 24/7 on-call engineering."
      ]
    },
    {
      role: "Software Engineer",
      company: "FactSet",
      location: "Hyderabad, India",
      period: "Sep 2020 — Sep 2024",
      summary: "Engineered core modules and performance enhancements for the SPAR (Style, Performance and Risk) analytics application across financial web platforms.",
      highlights: [
        "Delivered critical features in SPAR, integrating interactive drawing engines and conditional formatting with >90% test coverage.",
        "Spearheaded team-wide build optimization initiatives reducing pipeline execution time by over 60%, and orchestrated legacy CI/CD migration from Jenkins to GitHub Actions.",
        "Mentored and led advanced Vue.js and Node.js training for 60+ new engineering hires across the organization."
      ]
    },
    {
      role: "Full-Stack Software Developer Intern",
      company: "Fourth Ambit",
      location: "Kochi, India",
      period: "Jul 2019 — Aug 2019",
      summary: "Architected a scalable student information management platform from scratch following comprehensive SDLC practices.",
      highlights: [
        "Designed clean full-stack architectural components for multi-college data orchestration."
      ]
    }
  ] as Experience[],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science and Engineering",
      institution: "Govt. Model Engineering College (MEC)",
      location: "Kochi, Kerala",
      period: "2016 — 2020",
      gpa: "8.06 / 10.0",
      summary: "Rigorous computer science curriculum covering data structures, algorithms, operating systems, compiler design, distributed systems, and deep learning."
    }
  ] as Education[],

  awards: [
    { title: "Incredible Award", organization: "FactSet", year: "FY 2024" },
    { title: "Star Award", organization: "FactSet", year: "FY 2023 & FY 2022" },
    { title: "Blue Ribbon Award", organization: "FactSet", year: "FY 2021" }
  ] as Award[],

  projects: [
    {
      id: "equity-insights",
      index: "01",
      title: "Equity Insights — NLP Sentiment & Price Prediction",
      category: "GENAI & FINANCIAL NLP",
      categoryBadge: "Predictive NLP",
      description: "A machine learning and text analytics system that analyzes high-volume financial news articles to extract market sentiment and predict equity price movements with >60% accuracy, empowering quantitative investment decisions.",
      techStack: ["Python", "NLP", "Text Analytics", "Sentiment Extraction", "Machine Learning"],
      metrics: "60%+ Directional Accuracy across large news corpora"
    },
    {
      id: "malayalam-font-gen",
      index: "02",
      title: "Malayalam Handwritten Font Synthesis & OCR",
      category: "DEEP LEARNING & COMPUTER VISION",
      categoryBadge: "Ensemble CNN",
      description: "Trained an ensemble deep learning architecture combining ResNet-18 and AlexNet to detect handwritten Malayalam characters with >72% accuracy. Built an algorithmic spell-checker stitching glyphs into complete words, improving end-to-end word prediction by 50%.",
      techStack: ["ResNet-18", "AlexNet", "PyTorch", "OpenCV", "Python"],
      metrics: "72% Character Detection, +50% Word Accuracy",
      repoUrl: "https://github.com/akhilseshan/MalayalamHandwritingRecognition"
    },
    {
      id: "precisely-biometrics",
      index: "03",
      title: "Precisely — Signature Biometric Validation API",
      category: "COMPUTER VISION & SECURITY",
      categoryBadge: "Biometric API",
      description: "High-precision signature validation API utilizing advanced image processing and a relative mathematical scoring algorithm to verify authenticity against sample reference databases with >67% accuracy.",
      techStack: ["Image Processing", "Mathematical Scoring", "Python", "REST API"],
      metrics: "67%+ Validation Accuracy"
    }
  ] as Project[],

  skills: {
    languages: ["Go", "Python", "C++", "TypeScript", "JavaScript", "C", "Bash", "SQL"],
    ai_and_ml: ["Large Language Models (LLMs)", "Generative AI", "Prompt Engineering & Tuning", "NLP", "Deep Learning", "Weaviate (Vector DB)", "Model Context Protocol (MCP)", "PyTorch"],
    frameworks_backend: ["Go Microservices", "gRPC", "Node.js", "Express.js", "Vue.js", "React.js", "Flask", "REST APIs"],
    cloud_devops: ["AWS", "Docker", "GitHub Actions", "Redis", "MongoDB", "Vite", "ESBuild", "CI/CD Automation", "Linux"]
  },

  socials: [
    { platform: "LinkedIn", handle: "akhil-seshan", url: "https://www.linkedin.com/in/akhil-seshan/", iconClass: "fa-brands fa-linkedin" },
    { platform: "GitHub", handle: "akhilseshan", url: "https://github.com/akhilseshan/", iconClass: "fa-brands fa-github" },
    { platform: "GitLab", handle: "akhilseshan", url: "https://gitlab.com/akhilseshan/", iconClass: "fa-brands fa-gitlab" },
    { platform: "Twitter / X", handle: "seshanakhil", url: "https://twitter.com/seshanakhil/", iconClass: "fa-brands fa-x-twitter" },
    { platform: "Medium Blog", handle: "@akhil_seshan", url: "https://medium.com/@akhil_seshan", iconClass: "fa-brands fa-medium" }
  ]
};

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
}

export const experienceContent: ExperienceItem[] = [
  {
    title: "Senior Developer",
    company: "Acme Corp",
    period: "2022 - Present",
    description: "Led development of core platform features and mentored junior developers.",
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built and shipped multiple product features from concept to production.",
  },
  {
    title: "Junior Developer",
    company: "TechCo",
    period: "2018 - 2020",
    description: "Developed frontend interfaces and contributed to backend API design.",
  },
];

export const projectsContent: ProjectItem[] = [
  {
    title: "Project Alpha",
    description: "A real-time collaboration platform with WebSocket-based sync.",
    tags: ["React", "Node.js", "WebSocket"],
  },
  {
    title: "Project Beta",
    description: "Mobile-first e-commerce app with AR product previews.",
    tags: ["React Native", "Three.js", "GraphQL"],
  },
  {
    title: "Project Gamma",
    description: "CLI tool for automated code review and linting.",
    tags: ["TypeScript", "AST", "CLI"],
  },
];

export const skillsContent = {
  languages: ["TypeScript", "JavaScript", "Python", "Go"],
  frontend: ["React", "Next.js", "Three.js", "CSS"],
  backend: ["Node.js", "PostgreSQL", "Redis", "Docker"],
  tools: ["Git", "Figma", "AWS", "CI/CD"],
};

export const contactContent = {
  email: "hello@example.com",
  github: "https://github.com/example",
  linkedin: "https://linkedin.com/in/example",
  message: "Feel free to reach out! I'm always open to new opportunities and collaborations.",
};

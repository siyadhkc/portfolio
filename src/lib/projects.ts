export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  variant: 'teal' | 'coral' | 'sand' | 'indigo' | 'blue';
  github: string;
  live: string;
  features: string[];
  tech: string[];
}

export const projects: Project[] = [
  {
    id: 'mockapi-pro',
    title: 'MockAPI Pro',
    subtitle: 'Self-Hosted API Mocking Platform for Developers',
    description: 'MockAPI Pro is a multi-tenant API mocking platform that enables developers to create dynamic mock endpoints, simulate latency, configure custom responses, and inspect request logs without relying on third-party services. Built using Django, React, PostgreSQL, Redis, Docker, and Nginx.',
    tags: ['Backend', 'SaaS', 'Open Source'],
    variant: 'teal',
    github: 'https://github.com/siyadhkc/mockapi-pro',
    live: 'https://mockapi.siyadhkc.app',
    features: [
      'Multi-tenant workspace architecture',
      'Dynamic endpoint generation',
      'Request and response logging',
      'Latency simulation',
      'PostgreSQL tenant isolation',
      'Docker-based deployment',
      'Secure API design principles'
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Nginx']
  },
  {
    id: 'env-guard',
    title: 'Env-Guard',
    subtitle: 'Prevent Secret Leaks Before They Reach GitHub',
    description: 'Env-Guard is an open-source security tool that scans source code repositories for exposed API keys, tokens, credentials, and sensitive configuration data before code reaches production or public repositories. Designed to improve secure development workflows and reduce credential leakage risks.',
    tags: ['Security', 'Open Source', 'CLI'],
    variant: 'coral',
    github: 'https://github.com/siyadhkc/env-guard',
    live: 'https://github.com/siyadhkc/env-guard',
    features: [
      'Secret detection engine',
      'Recursive filesystem scanning',
      'API key discovery',
      'Credential leak prevention',
      'Secure development workflow integration',
      'Developer-friendly CLI interface',
      'Pattern-based detection'
    ],
    tech: ['Python', 'Security Tooling', 'CLI']
  },
  {
    id: 'savor',
    title: 'Savor',
    subtitle: 'Multi-Tenant Food Delivery Platform',
    description: 'Savor is a full-stack food delivery ecosystem built with Django REST Framework and React, supporting customers, restaurants, delivery agents, and administrators. Features secure JWT authentication, real-time order tracking, Razorpay integration, analytics dashboards, PDF invoice generation, and role-based access control.',
    tags: ['Full Stack', 'SaaS', 'Platform'],
    variant: 'sand',
    github: 'https://github.com/siyadhkc/savor',
    live: 'https://savor.siyadhkc.app',
    features: [
      'JWT authentication and RBAC',
      'Customer and restaurant dashboards',
      'Delivery agent management',
      'Real-time order workflow',
      'Razorpay payment integration',
      'PDF invoice generation',
      'Order analytics dashboard'
    ],
    tech: ['Django', 'Django REST Framework', 'React', 'PostgreSQL', 'Razorpay', 'ReportLab']
  },
  {
    id: 'hireflow',
    title: 'HireFlow',
    subtitle: 'Modern Recruitment Management Platform',
    description: 'HireFlow is a full-stack recruitment platform enabling employers to manage job postings and candidates to track applications through a structured hiring workflow. Implements JWT authentication, role-based access control, secure REST APIs, and dedicated employer and candidate dashboards.',
    tags: ['Full Stack', 'Business Platform'],
    variant: 'indigo',
    github: 'https://github.com/siyadhkc/hireflow',
    live: 'https://hireflow.siyadhkc.app',
    features: [
      'Employer and candidate dashboards',
      'JWT authentication and RBAC',
      'Job application workflow',
      'REST API architecture',
      'Secure backend design',
      'Real-time application tracking'
    ],
    tech: ['Django', 'Django REST Framework', 'React', 'PostgreSQL', 'JWT']
  },
  {
    id: 'jray',
    title: 'JRay',
    subtitle: 'JSON Query & Transformation CLI',
    description: 'JRay is a lightweight command-line tool built with TypeScript and Bun for querying, filtering, flattening, and transforming JSON datasets. Designed to simplify JSON processing tasks commonly encountered in API development, automation, and data engineering workflows.',
    tags: ['Developer Tools', 'Open Source'],
    variant: 'blue',
    github: 'https://github.com/siyadhkc/jray',
    live: 'https://github.com/siyadhkc/jray',
    features: [
      'JSON querying and filtering',
      'Data transformation pipelines',
      'JSON flattening',
      'Automation support',
      'Fast CLI execution',
      'Lightweight and portable'
    ],
    tech: ['TypeScript', 'Bun', 'CLI']
  },
  {
    id: 'djforge',
    title: 'DJForge',
    subtitle: 'Django Project Scaffolding & Productivity Toolkit',
    description: 'DJForge is a Django productivity toolkit that automates project setup, application scaffolding, configuration management, and development workflows. Built to reduce boilerplate code and accelerate backend application development using Django best practices.',
    tags: ['Backend', 'Developer Tools', 'Open Source'],
    variant: 'blue',
    github: 'https://github.com/siyadhkc/djforge',
    live: 'https://github.com/siyadhkc/djforge',
    features: [
      'Project scaffolding automation',
      'Django app generation',
      'Boilerplate reduction',
      'Configuration management',
      'Django best practices',
      'Productivity-focused workflow'
    ],
    tech: ['Python', 'Django']
  }
];


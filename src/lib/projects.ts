export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  variant: 'teal' | 'coral' | 'sand' | 'indigo';
  github: string;
  live: string;
  features: string[];
  tech: string[];
}

export const projects: Project[] = [
  {
    id: 'mockapi-pro',
    title: 'MockAPI Pro',
    subtitle: 'Self-hostable mock API server with team workspaces, rule engine, and OpenAPI import.',
    description: 'MockAPI Pro is a robust solution for developers and teams needing reliable mock services during the development and testing phases. It provides a flexible rule engine to simulate complex API behaviors and supports OpenAPI imports for rapid prototyping.',
    tags: ['Django', 'React', 'Docker'],
    variant: 'teal',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Team workspaces for collaborative development',
      'Dynamic rule engine for custom API responses',
      'One-click OpenAPI (Swagger) import',
      'Full Docker support for easy deployment'
    ],
    tech: ['Django REST Framework', 'React', 'Redis', 'PostgreSQL', 'Docker Compose']
  },
  {
    id: 'vulnapi',
    title: 'VulnAPI',
    subtitle: 'Python-native REST API DAST scanner covering OWASP API Top 10 with interactive report.',
    description: 'VulnAPI is a security-focused tool designed to identify vulnerabilities in RESTful APIs. It automates the process of checking for OWASP API Top 10 risks, providing developers with actionable insights and interactive reports to harden their systems.',
    tags: ['Django', 'React', 'OWASP'],
    variant: 'coral',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Automated OWASP API Top 10 scanning',
      'Interactive security reports with remediation tips',
      'Customizable payload injection',
      'Passive and active scanning modes'
    ],
    tech: ['Python', 'Django', 'React', 'Celery', 'SQLite']
  },
  {
    id: 'django-secure',
    title: 'django-secure',
    subtitle: 'Drop-in DRF security hardening package for passive protection and audit logging.',
    description: 'django-secure is a lightweight but powerful package for Django REST Framework. It implements several passive security measures out-of-the-box, such as secure headers, audit logging for sensitive endpoints, and simplified rate limiting.',
    tags: ['Django', 'DRF', 'Security'],
    variant: 'sand',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Automatic security header configuration',
      'Comprehensive audit logging middleware',
      'Configurable IP-based rate limiting',
      'Seamless integration with existing DRF projects'
    ],
    tech: ['Django', 'Django REST Framework', 'Python']
  }
];

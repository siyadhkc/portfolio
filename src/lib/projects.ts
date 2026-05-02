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
    subtitle: 'A self-hostable mock server for teams who need reliable APIs during development.',
    description: 'I built MockAPI Pro to fix the bottlenecks I faced in my own development cycles. It handles complex rules and OpenAPI imports so teams can stop waiting on backend deploys and start coding against stable mocks.',
    tags: ['Django', 'React', 'Docker'],
    variant: 'teal',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Team workspaces for shared mocks',
      'Rule engine for simulating edge cases',
      'OpenAPI (Swagger) import support',
      'Docker-ready for local or cloud hosting'
    ],
    tech: ['Django REST Framework', 'React', 'Redis', 'PostgreSQL', 'Docker Compose']
  },
  {
    id: 'vulnapi',
    title: 'VulnAPI',
    subtitle: 'Python-native DAST scanner for REST APIs, built to automate OWASP security checks.',
    description: 'VulnAPI automates the security audits I found myself doing manually over and over. It scans for OWASP API Top 10 vulnerabilities and gives you a clear report on what needs fixing.',
    tags: ['Python', 'Security', 'OWASP'],
    variant: 'coral',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Automated scanning for API vulnerabilities',
      'Interactive reports with fix recommendations',
      'Payload injection testing',
      'Active and passive scanning modes'
    ],
    tech: ['Python', 'Django', 'React', 'Celery', 'SQLite']
  },
  {
    id: 'django-secure',
    title: 'django-secure',
    subtitle: 'A drop-in package for hardening Django REST APIs with passive defense layers.',
    description: 'Security shouldn\'t be an afterthought. I wrote this package to give DRF projects instant protection—secure headers, audit logging, and rate limiting—without rewriting the whole codebase.',
    tags: ['Django', 'DRF', 'Security'],
    variant: 'sand',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Instant security header configuration',
      'Middleware for detailed audit logging',
      'Configurable IP rate limiting',
      'Minimal setup for existing projects'
    ],
    tech: ['Django', 'Django REST Framework', 'Python']
  },
  {
    id: 'sentinel-api',
    title: 'Sentinel API',
    subtitle: 'Real-time security gateway that monitors and blocks threats before they hit your backend.',
    description: 'Sentinel acts as the first line of defense. It monitors traffic in real-time and automatically blocks malicious actors before they can even touch your application logic.',
    tags: ['Go', 'Redis', 'Security'],
    variant: 'blue',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Live threat detection and blocking',
      'Automated IP blacklisting',
      'Detailed audit logs for every event',
      'Real-time alerts via Slack/Discord'
    ],
    tech: ['Go', 'Redis', 'gRPC', 'Prometheus']
  }
];

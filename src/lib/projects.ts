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
    title: 'HyperMock Sandbox',
    subtitle: 'High-fidelity sandbox API emulation and network virtualization engine for distributed meshes.',
    description: 'HyperMock emulates complex multi-service microservice meshes. It compiles OpenAPI specifications into state-machine graphs, allowing simulation of extreme latency injection, packet loss, and contract drift verification in local sandboxed environments.',
    tags: ['Go', 'Rust', 'Docker'],
    variant: 'teal',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Stateful API emulation via OpenAPI compiled graphs',
      'Network drift simulation (jitter, latency, packet loss)',
      'Dynamic response computation using custom script runtimes',
      'Virtual network isolation for sandbox testing'
    ],
    tech: ['Go', 'WebAssembly', 'Redis', 'PostgreSQL', 'Docker Compose']
  },
  {
    id: 'vulnapi',
    title: 'VulnAPI Engine',
    subtitle: 'Distributed DAST & stateful fuzzer for GraphQL, gRPC, and REST API vulnerability discovery.',
    description: 'VulnAPI is an automated testing platform that analyzes auth-sequences, maps endpoints, and fuzzes payloads. It executes taint-checking and token signature bypass logic to identify business-logic flaws and injection exploits with zero false positives.',
    tags: ['Python', 'Security', 'Fuzzing'],
    variant: 'coral',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Stateful auth-sequence tracking (OAuth2/JWT)',
      'Automated protocol fuzzing (GraphQL, gRPC, REST)',
      'Cryptographic signature bypass verification',
      'Taint-analysis reporting for code vulnerability mapping'
    ],
    tech: ['Python', 'Django', 'Celery', 'Redis', 'PostgreSQL']
  },
  {
    id: 'django-secure',
    title: 'py-ebpf-guard',
    subtitle: 'Kernel-level security instrumentation for Python runtime environments using eBPF.',
    description: 'A drop-in security layer for Python applications. By compiling and loading eBPF programs into the Linux kernel, it hooks file-system access and system calls (syscalls) at the container level, blocking RCE and shell injections before they touch the interpreter.',
    tags: ['eBPF', 'C', 'Security'],
    variant: 'sand',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      'Kernel-level syscall hooking for Python containers',
      'RCE detection and execution blocking via eBPF filters',
      'Zero-overhead file and network access logging',
      'Drop-in integration for containerized Django/FastAPI apps'
    ],
    tech: ['eBPF', 'C', 'Python', 'Linux Kernel']
  },
  {
    id: 'sentinel-api',
    title: 'Sentinel API WAF',
    subtitle: 'High-performance API WAF & reverse proxy built in Go with a WebAssembly plugin engine.',
    description: 'Sentinel runs in front of backend clusters, handling 100k+ requests per second. It evaluates security filters compiled to WASM, automatically mitigating DDoS, credential stuffing, and injection attacks with under 1.2ms latency overhead.',
    tags: ['Go', 'WASM', 'Proxy'],
    variant: 'blue',
    github: 'https://github.com/siyadhkc',
    live: 'https://github.com/siyadhkc',
    features: [
      '100k+ req/sec routing with under 1.2ms latency overhead',
      'WASM-based dynamic security filter execution',
      'Real-time distributed rate-limiting via Redis cluster',
      'gRPC-native telemetry and alert dispatching'
    ],
    tech: ['Go', 'WebAssembly', 'Redis', 'gRPC', 'Prometheus']
  }
];


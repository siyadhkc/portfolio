import React from 'react';
import { motion } from 'framer-motion';

interface Article {
  title: string;
  excerpt: string;
  category: 'SECURITY' | 'BACKEND' | 'DEVOPS' | 'SYSTEMS';
  date: string;
  url: string;
  image?: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    title: "Hardening Django REST APIs: A Defensive Architecture Approach",
    excerpt: "A deep dive into securing DRF endpoints with passive protection layers, audit logging, and rate-limiting strategies that don't compromise developer velocity.",
    category: "SECURITY",
    date: "JAN 15, 2024",
    url: "https://medium.com/@siyadhkc",
    featured: true,
  },
  {
    title: "Building Scalable Microservices with Docker Compose and Nginx",
    excerpt: "My journey through containerizing complex distributed systems for high-traffic backend architectures using reverse proxies and container orchestration.",
    category: "DEVOPS",
    date: "AUG 20, 2023",
    url: "https://dev.to/siyadhkc",
  },
  {
    title: "The OWASP API Top 10: What Every Backend Engineer Must Know",
    excerpt: "A practical breakdown of the most exploited API vulnerabilities in production systems and how to systematically eliminate them at the framework level.",
    category: "SECURITY",
    date: "OCT 5, 2023",
    url: "https://medium.com/@siyadhkc",
  },
  {
    title: "Designing Fault-Tolerant Systems with Celery and Redis",
    excerpt: "How to architect task queues that survive network partitions, worker crashes, and message loss without sacrificing throughput or observability.",
    category: "BACKEND",
    date: "MAR 2, 2024",
    url: "https://dev.to/siyadhkc",
  },
  {
    title: "TCP/IP Internals for Application Developers",
    excerpt: "Understanding the network stack from the ground up — how data moves, where it can fail, and how it affects the performance of your application layer.",
    category: "SYSTEMS",
    date: "FEB 10, 2024",
    url: "https://medium.com/@siyadhkc",
  },
];

const categoryColor: Record<Article['category'], string> = {
  SECURITY: 'text-rose-500',
  BACKEND: 'text-[#1D91A1]',
  DEVOPS: 'text-amber-600',
  SYSTEMS: 'text-purple-500',
};

const Placeholder = ({ category }: { category: Article['category'] }) => {
  const gradients: Record<Article['category'], string> = {
    SECURITY: 'from-rose-950 via-rose-900/60 to-[#0a0a0a]',
    BACKEND: 'from-teal-950 via-teal-900/60 to-[#0a0a0a]',
    DEVOPS: 'from-amber-950 via-amber-900/60 to-[#0a0a0a]',
    SYSTEMS: 'from-purple-950 via-purple-900/60 to-[#0a0a0a]',
  };
  return <div className={`w-full h-full bg-gradient-to-br ${gradients[category]}`} />;
};

const ArticleCard = ({
  article,
  index,
  isFeatured = false,
}: {
  article: Article;
  index: number;
  isFeatured?: boolean;
}) => (
  <motion.a
    href={article.url}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    className="group block border-b border-black/[0.06] py-12 cursor-pointer relative overflow-hidden"
  >
    {/* Glass Hover Highlight */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10 transition-opacity duration-300"
    />
    {/* Row: image + content */}
    <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">

      {/* Image */}
      <div className={`w-full ${isFeatured ? 'md:w-[360px] h-[220px] md:h-[260px]' : 'md:w-[320px] h-[190px] md:h-[220px]'} shrink-0 overflow-hidden rounded-[4px] bg-[#111]`}>
        {article.image
          ? <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
          : <Placeholder category={article.category} />
        }
      </div>

      {/* Text content */}
      <div className="flex-1 flex flex-col justify-between min-h-[180px] md:min-h-[220px] py-1">

        {/* Top: category + date */}
        <div className="flex items-center gap-6 mb-6">
          <span className={`font-mono text-[9px] tracking-[0.3em] uppercase font-medium ${categoryColor[article.category]}`}>
            {article.category}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#C0C0C0] uppercase">
            {article.date}
          </span>
        </div>

        {/* Middle: title */}
        <h3 className={`font-serif ${isFeatured ? 'text-[1.7rem] md:text-[2rem]' : 'text-[1.4rem] md:text-[1.65rem]'} leading-[1.18] text-[#1A1A1A] group-hover:text-[#1D91A1] transition-colors duration-300 tracking-tight mb-6`}>
          {article.title}
        </h3>

        {/* Bottom: excerpt */}
        <p className="text-[#7C7C7C] text-[13px] leading-[1.7] font-sans max-w-[480px]">
          {article.excerpt}
        </p>

      </div>
    </div>
  </motion.a>
);

const SectionHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-6 mb-2">
    <span className="font-serif text-[1rem] text-[#1A1A1A] tracking-tight">{label}</span>
    <div className="flex-1 h-px bg-black/[0.08]" />
  </div>
);

export const Articles = () => {
  const featured = articles.filter((a) => a.featured);
  const recent   = articles.filter((a) => !a.featured);

  return (
    <div className="w-full max-w-[860px] mx-auto px-6 md:px-10">

      {/* Hero statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="pt-28 mt-12 pb-20"
      >
        <p className="font-serif text-[1.75rem] sm:text-[2.2rem] md:text-[2.65rem] text-[#1A1A1A] leading-[1.22] tracking-tight max-w-[560px]">
          Writing on backend systems, security architecture, and the craft of building production software.
        </p>
      </motion.div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-20">
          <SectionHeader label="Featured" />
          {featured.map((article, i) => (
            <ArticleCard key={article.title} article={article} index={i} isFeatured />
          ))}
        </div>
      )}

      {/* Recent */}
      <div className="mb-28">
        <SectionHeader label="Recent" />
        {recent.map((article, i) => (
          <ArticleCard key={article.title} article={article} index={i} />
        ))}
      </div>

    </div>
  );
};

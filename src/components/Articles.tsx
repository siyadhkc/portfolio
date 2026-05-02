import React, { memo } from 'react';
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

// ── Static data — module-level, never recreated on render ────────────────────
const articles: Article[] = [
  {
    title: 'Hardening Django REST APIs: A Defensive Architecture Approach',
    excerpt: "How I secure my DRF endpoints. No corporate jargon—just passive protection, audit logging, and rate-limiting that actually holds up.",
    category: 'SECURITY',
    date: 'JAN 15, 2024',
    url: 'https://medium.com/@siyadhkc',
    featured: true,
  },
  {
    title: 'Building Scalable Microservices with Docker Compose and Nginx',
    excerpt: 'The process of containerizing my distributed systems. Using Nginx as a reverse proxy to handle traffic without the headache.',
    category: 'DEVOPS',
    date: 'AUG 20, 2023',
    url: 'https://dev.to/siyadhkc',
  },
  {
    title: 'The OWASP API Top 10: What Every Backend Engineer Must Know',
    excerpt: 'A raw breakdown of the API vulnerabilities I see most often in the wild and how to systematically kill them at the source.',
    category: 'SECURITY',
    date: 'OCT 5, 2023',
    url: 'https://medium.com/@siyadhkc',
  },
  {
    title: 'Designing Fault-Tolerant Systems with Celery and Redis',
    excerpt: "Building task queues that don't fall apart when things go wrong. Handling crashes and message loss while keeping things fast.",
    category: 'BACKEND',
    date: 'MAR 2, 2024',
    url: 'https://dev.to/siyadhkc',
  },
  {
    title: 'TCP/IP Internals for Application Developers',
    excerpt: "Getting into the weeds of how data actually moves across the wire. Understanding the network stack so you can build better apps.",
    category: 'SYSTEMS',
    date: 'FEB 10, 2024',
    url: 'https://medium.com/@siyadhkc',
  },
];

// Pre-filtered arrays — computed once at module load, not on every render
const featuredArticles = articles.filter((a) => a.featured);
const recentArticles = articles.filter((a) => !a.featured);

const categoryColor: Record<Article['category'], string> = {
  SECURITY: 'text-rose-500',
  BACKEND: 'text-[#1D91A1]',
  DEVOPS: 'text-amber-600',
  SYSTEMS: 'text-purple-500',
};

const gradients: Record<Article['category'], string> = {
  SECURITY: 'from-rose-950 via-rose-900/60 to-[#0a0a0a]',
  BACKEND: 'from-teal-950 via-teal-900/60 to-[#0a0a0a]',
  DEVOPS: 'from-amber-950 via-amber-900/60 to-[#0a0a0a]',
  SYSTEMS: 'from-purple-950 via-purple-900/60 to-[#0a0a0a]',
};

// ── Sub-components memoized ───────────────────────────────────────────────────
const Placeholder = memo(({ category }: { category: Article['category'] }) => (
  <div className={`w-full h-full bg-gradient-to-br ${gradients[category]}`} />
));
Placeholder.displayName = 'Placeholder';

const SectionHeader = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-6 mb-2">
    <span className="font-bold text-[1.1rem] text-[#1A1A1A] tracking-tight">{label}</span>
    <div className="flex-1 h-px bg-black/[0.08]" />
  </div>
));
SectionHeader.displayName = 'SectionHeader';

const ArticleCard = memo(({
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
      className="absolute inset-0 bg-comet-cream/40 backdrop-blur-sm -z-10 transition-opacity duration-300"
    />
    <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
      {/* Image */}
      <div className={`w-full ${isFeatured ? 'md:w-[360px] h-[220px] md:h-[260px]' : 'md:w-[320px] h-[190px] md:h-[220px]'} shrink-0 overflow-hidden rounded-[4px] bg-[#111]`}>
        {article.image
          ? <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
          : <Placeholder category={article.category} />
        }
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col justify-between min-h-[180px] md:min-h-[220px] py-1">
        <div className="flex items-center gap-6 mb-6">
          <span className={`font-mono text-[9px] tracking-[0.3em] uppercase font-medium ${categoryColor[article.category]}`}>
            {article.category}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#C0C0C0] uppercase">{article.date}</span>
        </div>
        <h3 className={`font-bold ${isFeatured ? 'text-[1.7rem] md:text-[2rem]' : 'text-[1.4rem] md:text-[1.65rem]'} leading-[1.18] text-[#1A1A1A] group-hover:text-[#1D91A1] transition-colors duration-300 tracking-tight mb-6`}>
          {article.title}
        </h3>
        <p className="text-[#7C7C7C] text-[13px] leading-[1.7] font-sans max-w-[480px]">{article.excerpt}</p>
      </div>
    </div>
  </motion.a>
));
ArticleCard.displayName = 'ArticleCard';

// ── Articles page component ───────────────────────────────────────────────────
export const Articles = () => (
  <div className="w-full relative z-10">

    <div id="articles" style={{ scrollSnapAlign: 'start' }} className="relative z-10 w-full max-w-[860px] mx-auto px-6 md:px-10">
      {/* Hero statement */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 mt-12 pb-20"
    >
      <p className="font-light text-[1.75rem] sm:text-[2.2rem] md:text-[2.65rem] text-[#1A1A1A] leading-[1.22] tracking-tight max-w-[560px]">
        My thoughts on Python, web security, and whatever else I'm currently obsessing over.
      </p>

      <div className="flex flex-wrap gap-3 mt-10">
        {[
          { label: 'Dev.to', href: 'https://dev.to/siyadhkc' },
          { label: 'Substack', href: 'https://substack.com/@siyadhkc' },
          { label: 'Medium', href: 'https://medium.com/@siyadhkc' },
        ].map((platform) => (
          <a
            key={platform.label}
            href={platform.href}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full border border-black/[0.08] bg-comet-cream hover:bg-black hover:text-white hover:border-black transition-all duration-300 font-mono text-[10px] tracking-[0.2em] uppercase shadow-sm flex items-center gap-2"
          >
            {platform.label}
          </a>
        ))}
      </div>
    </motion.div>

    {/* Featured */}
    {featuredArticles.length > 0 && (
      <div className="mb-20">
        <SectionHeader label="Featured" />
        {featuredArticles.map((article, i) => (
          <ArticleCard key={article.title} article={article} index={i} isFeatured />
        ))}
      </div>
    )}

    {/* Recent */}
    <div className="mb-28">
      <SectionHeader label="Recent" />
      {recentArticles.map((article, i) => (
        <ArticleCard key={article.title} article={article} index={i} />
      ))}
    </div>
    </div>
  </div>
);

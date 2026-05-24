import React, { useState, useEffect, memo } from 'react';
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

// ── Static fallback data ─────────────────────────────────────────────────────
const staticArticles: Article[] = [
  {
    title: 'Hardening Django REST APIs: A Defensive Architecture Approach',
    excerpt: "How I secure my DRF endpoints. No corporate jargon—just passive protection, audit logging, and rate-limiting that actually holds up.",
    category: 'SECURITY',
    date: 'JAN 15, 2024',
    url: 'https://dev.to/siyadhkc',
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
    url: 'https://dev.to/siyadhkc',
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
    url: 'https://dev.to/siyadhkc',
  },
];

const categoryColor: Record<Article['category'], string> = {
  SECURITY: 'text-rose-500 font-semibold',
  BACKEND: 'text-indigo-600 font-semibold',
  DEVOPS: 'text-amber-600 font-semibold',
  SYSTEMS: 'text-purple-600 font-semibold',
};

const gradients: Record<Article['category'], string> = {
  SECURITY: 'from-rose-900/[0.02] via-gray-900/5 to-rose-900/[0.005]',
  BACKEND: 'from-indigo-900/[0.02] via-gray-900/5 to-cyan-900/[0.01]',
  DEVOPS: 'from-amber-900/[.02] via-gray-900/5 to-amber-900/[0.005]',
  SYSTEMS: 'from-purple-900/[0.02] via-gray-900/5 to-purple-900/[0.005]',
};

// Helpers for processing feeds
const getCategoryFromTags = (tags: string[] | string): Article['category'] => {
  const normalizedTags = Array.isArray(tags) 
    ? tags.map(t => t.toLowerCase()) 
    : (typeof tags === 'string' ? tags.toLowerCase().split(/[,\s]+/) : []);
    
  if (normalizedTags.some(t => ['security', 'pentest', 'hacking', 'owasp', 'cybersecurity', 'defense', 'vulnerability', 'cve'].includes(t))) {
    return 'SECURITY';
  }
  if (normalizedTags.some(t => ['docker', 'nginx', 'devops', 'ci/cd', 'kubernetes', 'gunicorn', 'ansible'].includes(t))) {
    return 'DEVOPS';
  }
  if (normalizedTags.some(t => ['linux', 'networking', 'systems', 'tcp/ip', 'hardware', 'cctv'].includes(t))) {
    return 'SYSTEMS';
  }
  return 'BACKEND';
};

const formatDate = (dateStr: string) => {
  try {
    const cleaned = dateStr.replace(/-/g, "/");
    const date = new Date(cleaned);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  } catch (e) {
    return 'OCT 5, 2023';
  }
};

// ── Sub-components memoized ───────────────────────────────────────────────────
const Placeholder = memo(({ category }: { category: Article['category'] }) => (
  <div className={`w-full h-full bg-gradient-to-br ${gradients[category]}`} />
));
Placeholder.displayName = 'Placeholder';

const SectionHeader = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-6 mb-4">
    <span className="font-bold text-[1.1rem] tracking-tight uppercase font-mono text-slate-500">{label}</span>
    <div className="flex-1 h-px bg-white/50" />
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
    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    className="group block border-b border-white/40 py-12 cursor-pointer relative overflow-hidden"
  >
    {/* Dynamic Glass Hover Highlight */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 bg-white/30 backdrop-blur-md -z-10 transition-opacity duration-300 rounded-2xl border border-white/50"
    />

    {isFeatured ? (
      /* ── Featured: full-width image banner on top, text below ── */
      <div className="flex flex-col gap-7 relative z-10 px-4">
        {/* Full-width uncropped image */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/50 group-hover:border-purple-500/25 transition-all duration-300 shadow-sm bg-white/20">
          {article.image
            ? <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            : <div className="w-full h-[260px]"><Placeholder category={article.category} /></div>
          }
        </div>

        {/* Text below image */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <span className={`font-mono text-[9px] tracking-[0.3em] uppercase font-bold ${categoryColor[article.category]}`}>
              {article.category}
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase font-semibold">{article.date}</span>
          </div>
          <h3 className="font-bold text-[1.7rem] md:text-[2rem] leading-[1.18] text-slate-800 tracking-tight">
            {article.title}
          </h3>
          <p className="text-slate-600 text-[13px] sm:text-sm leading-[1.7] font-sans font-semibold max-w-[680px]">{article.excerpt}</p>
        </div>
      </div>
    ) : (
      /* ── Regular: side thumbnail + text ── */
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 relative z-10 px-4 rounded-2xl transition-all">
        <div className="w-full md:w-[320px] h-[190px] md:h-[220px] shrink-0 overflow-hidden rounded-2xl bg-white/20 border border-white/50 group-hover:border-purple-500/25 transition-all duration-300 shadow-sm">
          {article.image
            ? <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
            : <Placeholder category={article.category} />
          }
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-[180px] md:min-h-[220px] py-1">
          <div>
            <div className="flex items-center gap-6 mb-5">
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase font-bold ${categoryColor[article.category]}`}>
                {article.category}
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase font-semibold">{article.date}</span>
            </div>
            <h3 className="font-bold text-[1.4rem] md:text-[1.65rem] leading-[1.18] text-slate-800 tracking-tight mb-4">
              {article.title}
            </h3>
          </div>
          <p className="text-slate-600 text-[13px] sm:text-sm leading-[1.7] font-sans max-w-[480px] font-semibold">{article.excerpt}</p>
        </div>
      </div>
    )}
  </motion.a>
));
ArticleCard.displayName = 'ArticleCard';

const SkeletonCard = memo(({ isFeatured = false }: { isFeatured?: boolean }) => (
  <div className="border-b border-white/30 py-12 flex flex-col md:flex-row md:items-start gap-8 md:gap-12 animate-pulse px-4">
    <div className={`w-full ${isFeatured ? 'md:w-[360px] h-[220px] md:h-[260px]' : 'md:w-[320px] h-[190px] md:h-[220px]'} shrink-0 rounded-2xl bg-white/40 border border-white/50 shadow-sm`} />
    <div className="flex-1 flex flex-col justify-between min-h-[180px] md:min-h-[220px] py-2">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-16 h-3 bg-slate-900/10 rounded animate-pulse" />
          <div className="w-20 h-3 bg-slate-900/10 rounded animate-pulse" />
        </div>
        <div className={`h-8 w-3/4 bg-slate-900/10 rounded animate-pulse ${isFeatured ? 'md:h-12' : 'md:h-8'}`} />
        <div className="h-4 w-1/2 bg-slate-900/10 rounded animate-pulse" />
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-3 w-full bg-slate-900/10 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-slate-900/10 rounded animate-pulse" />
      </div>
    </div>
  </div>
));
SkeletonCard.displayName = 'SkeletonCard';

// ── Articles page component ───────────────────────────────────────────────────
export const Articles = () => {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchArticles = async () => {
      try {
        const devToData = await fetch('https://dev.to/api/articles?username=siyadhkc&per_page=30').then(r => {
          if (!r.ok) throw new Error('Dev.to failed');
          return r.json();
        });

        let itemsList: Article[] = [];

        // Process Dev.to articles
        if (Array.isArray(devToData)) {
          const mapped: Article[] = devToData.map((item: any) => ({
            title: item.title,
            excerpt: item.description || '',
            category: getCategoryFromTags(item.tag_list || []),
            date: formatDate(item.published_at),
            url: item.url,
            image: item.cover_image || item.social_image || undefined,
            timestamp: new Date(item.published_at).getTime()
          } as any));
          itemsList = mapped;
        }

        // 3. Sort descending by timestamp
        itemsList.sort((a: any, b: any) => b.timestamp - a.timestamp);

        // 4. Mark the newest article as featured
        if (itemsList.length > 0) {
          itemsList[0].featured = true;
        }

        if (active) {
          if (itemsList.length > 0) {
            setArticlesList(itemsList);
          } else {
            setArticlesList(staticArticles);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching dynamic articles:', err);
        if (active) {
          setArticlesList(staticArticles);
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      active = false;
    };
  }, []);

  const featuredArticles = articlesList.filter(a => a.featured);
  const recentArticles = articlesList.filter(a => !a.featured);

  return (
    <div className="w-full relative z-10">
      <div id="articles" style={{ scrollSnapAlign: 'start' }} className="relative z-10 w-full max-w-[860px] mx-auto px-6 md:px-10">
        
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-28 mt-12 pb-20"
        >
          <p className="font-medium text-[1.75rem] sm:text-[2.2rem] md:text-[2.65rem] text-slate-900 leading-[1.22] tracking-tight max-w-[560px]">
            My thoughts on Python, web security, and whatever else I'm currently obsessing over.
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            <a
              href="https://dev.to/siyadhkc"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full border border-white/50 bg-white/20 hover:bg-slate-900 hover:text-white hover:border-transparent transition-all duration-300 font-mono text-[10px] tracking-[0.2em] uppercase shadow-sm flex items-center gap-2 text-slate-600 font-bold"
            >
              Dev.to
            </a>
          </div>
        </motion.div>

        {loading ? (
          // Skeleton Loader
          <div className="mb-28">
            <SectionHeader label="Loading articles..." />
            <SkeletonCard isFeatured />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
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
            {recentArticles.length > 0 && (
              <div className="mb-28">
                <SectionHeader label="Recent" />
                {recentArticles.map((article, i) => (
                  <ArticleCard key={article.title} article={article} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

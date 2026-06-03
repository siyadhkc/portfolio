import React, { useState, useEffect, memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  category: 'SECURITY' | 'BACKEND' | 'DEVOPS' | 'SYSTEMS';
  date: string;
  url: string;
  readingTime: number;
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
    readingTime: 5,
    featured: true,
  },
  {
    title: 'Building Scalable Microservices with Docker Compose and Nginx',
    excerpt: 'The process of containerizing my distributed systems. Using Nginx as a reverse proxy to handle traffic without the headache.',
    category: 'DEVOPS',
    date: 'AUG 20, 2023',
    url: 'https://dev.to/siyadhkc',
    readingTime: 4,
  },
  {
    title: 'The OWASP API Top 10: What Every Backend Engineer Must Know',
    excerpt: 'A raw breakdown of the API vulnerabilities I see most often in the wild and how to systematically kill them at the source.',
    category: 'SECURITY',
    date: 'OCT 5, 2023',
    url: 'https://dev.to/siyadhkc',
    readingTime: 6,
  },
  {
    title: 'Designing Fault-Tolerant Systems with Celery and Redis',
    excerpt: "Building task queues that don't fall apart when things go wrong. Handling crashes and message loss while keeping things fast.",
    category: 'BACKEND',
    date: 'MAR 2, 2024',
    url: 'https://dev.to/siyadhkc',
    readingTime: 5,
  },
  {
    title: 'TCP/IP Internals for Application Developers',
    excerpt: "Getting into the weeds of how data actually moves across the wire. Understanding the network stack so you can build better apps.",
    category: 'SYSTEMS',
    date: 'FEB 10, 2024',
    url: 'https://dev.to/siyadhkc',
    readingTime: 7,
  },
];

const categoryColor: Record<Article['category'], string> = {
  SECURITY: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  BACKEND:  'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  DEVOPS:   'text-amber-400 bg-amber-500/10 border-amber-500/20',
  SYSTEMS:  'text-violet-400 bg-violet-500/10 border-violet-500/20',
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

// ── Section header ────────────────────────────────────────────────────────────
const SectionHeader = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-8">
    <span className="font-bold text-[11px] tracking-[0.25em] uppercase font-mono text-zinc-500">{label}</span>
    <div className="flex-1 h-px bg-zinc-800" />
  </div>
));
SectionHeader.displayName = 'SectionHeader';

// ── Article card ──────────────────────────────────────────────────────────────
const ArticleCard = memo(({ article, isFeatured = false }: { article: Article; isFeatured?: boolean }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-start justify-between gap-5 border border-zinc-900 bg-zinc-950/10 hover:bg-zinc-950/40 hover:border-zinc-800 transition-all duration-300 rounded-xl ${
        isFeatured ? 'p-6 sm:p-8 border-violet-950/20' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[9px] sm:text-[10px]">
          <span className={`px-2 py-0.5 rounded border font-bold tracking-wider ${categoryColor[article.category]}`}>
            {article.category}
          </span>
          <span className="text-zinc-500 font-semibold">{article.date}</span>
          <span className="text-zinc-700 hidden xs:inline">•</span>
          <span className="text-zinc-500 font-semibold uppercase hidden xs:inline">{article.readingTime} MIN READ</span>
        </div>
        <h3 className={`font-sans font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors leading-tight ${
          isFeatured ? 'text-xl sm:text-[1.35rem]' : 'text-lg sm:text-[1.15rem]'
        }`}>
          {article.title}
        </h3>
        <p className="text-zinc-500 text-[13px] leading-relaxed max-w-[700px] line-clamp-2 sm:line-clamp-3">
          {article.excerpt}
        </p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-zinc-900/40 border border-zinc-900/60 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:border-zinc-800 group-hover:bg-zinc-900/80">
        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
});
ArticleCard.displayName = 'ArticleCard';

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = memo(() => (
  <div className="border border-zinc-900 bg-zinc-950/10 p-5 sm:p-6 rounded-xl animate-pulse space-y-4">
    <div className="flex gap-3 items-center">
      <div className="w-16 h-4 bg-zinc-900 rounded" />
      <div className="w-20 h-3 bg-zinc-900/60 rounded" />
      <div className="w-16 h-3 bg-zinc-900/60 rounded" />
    </div>
    <div className="h-6 w-3/4 bg-zinc-900 rounded" />
    <div className="h-4 w-5/6 bg-zinc-900/60 rounded" />
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
        const devToData = await fetch(`https://dev.to/api/articles?username=siyadhkc&per_page=30&nocache=${Date.now()}`).then(r => {
          if (!r.ok) throw new Error('Dev.to failed');
          return r.json();
        });

        let itemsList: (Article & { timestamp: number })[] = [];

        if (Array.isArray(devToData)) {
          const mapped = devToData.map((item) => {
            const val = item as Record<string, unknown>;
            const pubDate = String(val.published_at || val.published_timestamp || '');
            const parsedTimestamp = pubDate ? new Date(pubDate).getTime() : Date.now();
            
            return {
              title: String(val.title || ''),
              excerpt: String(val.description || ''),
              category: getCategoryFromTags((val.tag_list as string[]) || []),
              date: String(val.readable_publish_date || 'JUN 3').toUpperCase(),
              url: String(val.url || ''),
              readingTime: Number(val.reading_time_minutes || 3),
              image: val.cover_image ? String(val.cover_image) : (val.social_image ? String(val.social_image) : undefined),
              timestamp: isNaN(parsedTimestamp) ? Date.now() : parsedTimestamp
            };
          });
          itemsList = mapped;
        }

        itemsList.sort((a, b) => b.timestamp - a.timestamp);
        if (itemsList.length > 0) itemsList[0].featured = true;

        if (active) {
          setArticlesList(itemsList.length > 0 ? itemsList : staticArticles);
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
    return () => { active = false; };
  }, []);


  const featuredArticles = articlesList.filter(a => a.featured);
  const recentArticles   = articlesList.filter(a => !a.featured);

  return (
    <div className="w-full relative z-10">
      <div id="articles" className="relative z-10 w-full max-w-[860px] mx-auto px-6">

        {/* ── HERO BANNER ───────────────────────────────────────────────────── */}
        <div className="pt-28 pb-14 mt-4">

          {/* Top label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-bold">
              [ Articles ]
            </span>
            <div className="flex-1 h-px bg-zinc-800/60" />
            <a
              href="https://dev.to/siyadhkc"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-zinc-600 hover:text-cyan-400 uppercase transition-colors shrink-0 group"
            >
              dev.to
              <ArrowUpRight className="w-3 h-3 group-hover:text-cyan-400" />
            </a>
          </div>

          {/* Banner content row */}
          <div className="flex flex-col gap-5 max-w-[560px]">
              <h1 className="font-bold text-[2.2rem] sm:text-[2.8rem] leading-[1.1] tracking-tight">
                <span className="text-zinc-100">Writing on </span>
                <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  systems,
                </span>
                <br />
                <span className="text-zinc-100">security </span>
                <span className="text-zinc-500">&</span>
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> the backend.</span>
              </h1>

              <p className="text-zinc-500 text-[14px] leading-relaxed">
                Practical notes on Python internals, API hardening, distributed systems, and the dark corners of the network stack.
              </p>

              {/* Category tags */}
              <div className="flex flex-wrap gap-2">
                {(['SECURITY', 'BACKEND', 'DEVOPS', 'SYSTEMS'] as Article['category'][]).map((cat) => (
                  <span
                    key={cat}
                    className={`font-mono text-[9px] tracking-wider font-bold px-2.5 py-1 rounded border uppercase ${categoryColor[cat]}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
          </div>

          {/* Subtle divider */}
          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
        </div>

        {/* ── ARTICLE LIST ──────────────────────────────────────────────────── */}
        {loading ? (
          <div className="mb-20 flex flex-col gap-4">
            <SectionHeader label="FETCHING_ARTICLE_MANIFEST" />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <SectionHeader label="Featured Article" />
                <div className="flex flex-col gap-4">
                  {featuredArticles.map((article) => (
                    <ArticleCard key={article.title} article={article} isFeatured={true} />
                  ))}
                </div>
              </div>
            )}

            {recentArticles.length > 0 && (
              <div className="mb-20">
                <SectionHeader label="Recent Publications" />
                <div className="flex flex-col gap-4">
                  {recentArticles.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Articles;

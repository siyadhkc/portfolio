import React, { useState, useEffect, memo } from 'react';

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
  SECURITY: 'text-rose-400 font-semibold',
  BACKEND: 'text-cyan-400 font-semibold',
  DEVOPS: 'text-amber-400 font-semibold',
  SYSTEMS: 'text-violet-400 font-semibold',
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
    if (!dateStr) return 'OCT 5, 2023';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return 'OCT 5, 2023';
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  } catch {
    return 'OCT 5, 2023';
  }
};

const SectionHeader = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-8">
    <span className="font-bold text-[11px] tracking-[0.25em] uppercase font-mono text-zinc-500">{label}</span>
    <div className="flex-1 h-px bg-zinc-800" />
  </div>
));
SectionHeader.displayName = 'SectionHeader';

const ArticleCard = memo(({
  article,
}: {
  article: Article;
}) => (
  <a
    href={article.url}
    target="_blank"
    rel="noreferrer"
    className="group block border-b border-zinc-900 py-8 hover:bg-zinc-950/20 transition-colors duration-150 px-4 -mx-4 rounded-lg"
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 font-mono text-[10px]">
        <span className={`${categoryColor[article.category]}`}>
          [{article.category}]
        </span>
        <span className="text-zinc-650">{article.date}</span>
      </div>
      <h3 className="font-sans font-bold text-lg sm:text-[1.3rem] text-zinc-200 group-hover:text-cyan-400 transition-colors leading-tight">
        {article.title}
      </h3>
      <p className="text-zinc-400 text-[13px] leading-relaxed max-w-[700px]">{article.excerpt}</p>
    </div>
  </a>
));
ArticleCard.displayName = 'ArticleCard';

const SkeletonCard = memo(() => (
  <div className="border-b border-zinc-900 py-8 animate-pulse">
    <div className="flex gap-4 mb-2">
      <div className="w-16 h-3 bg-zinc-900 rounded" />
      <div className="w-20 h-3 bg-zinc-900 rounded" />
    </div>
    <div className="h-6 w-3/4 bg-zinc-900 rounded mb-2" />
    <div className="h-4 w-5/6 bg-zinc-900 rounded" />
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

        let itemsList: (Article & { timestamp: number })[] = [];

        // Process Dev.to articles
        if (Array.isArray(devToData)) {
          const mapped = devToData.map((item) => {
            const val = item as Record<string, unknown>;
            return {
              title: String(val.title || ''),
              excerpt: String(val.description || ''),
              category: getCategoryFromTags((val.tag_list as string[]) || []),
              date: formatDate(String(val.published_at || '')),
              url: String(val.url || ''),
              image: val.cover_image ? String(val.cover_image) : (val.social_image ? String(val.social_image) : undefined),
              timestamp: new Date(String(val.published_at || '')).getTime()
            };
          });
          itemsList = mapped;
        }

        // Sort descending by timestamp
        itemsList.sort((a, b) => b.timestamp - a.timestamp);

        // Mark the newest article as featured
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
      <div id="articles" className="relative z-10 w-full max-w-[800px] mx-auto px-6">
        
        {/* Simple Technical Header */}
        <div className="pt-28 mt-8 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-bold">
              [ Articles ]
            </span>
            <div className="flex-1 h-px bg-zinc-900" />
            <a
              href="https://dev.to/siyadhkc"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 hover:text-zinc-400 uppercase transition-colors shrink-0"
            >
              dev.to ↗
            </a>
          </div>
          <p className="font-sans text-[15px] text-zinc-500 max-w-[560px] leading-relaxed">
            Notes on Python, API security, and system internals.
          </p>
        </div>

        {loading ? (
          // Skeleton Loader
          <div className="mb-20">
            <SectionHeader label="FETCHING_ARTICLE_MANIFEST" />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* Featured */}
            {featuredArticles.length > 0 && (
              <div className="mb-12">
                <SectionHeader label="Featured Article" />
                {featuredArticles.map((article) => (
                  <ArticleCard key={article.title} article={article} />
                ))}
              </div>
            )}

            {/* Recent */}
            {recentArticles.length > 0 && (
              <div className="mb-20">
                <SectionHeader label="Recent Publications" />
                {recentArticles.map((article) => (
                  <ArticleCard key={article.title} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Articles;

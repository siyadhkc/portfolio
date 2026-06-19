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
  timestamp?: number; // FIX 3: declare on the type instead of casting via intersection
}

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
  SECURITY: 'text-[#9E3F35] bg-[#F7E9E5] border-[#E4BDB4] dark:text-[#F0A092] dark:bg-[#F0A092]/15 dark:border-[#F0A092]/25',
  BACKEND:  'text-[#0F7280] bg-[#E5F3F1] border-[#AEDBD5] dark:text-[#7ED6E1] dark:bg-[#7ED6E1]/15 dark:border-[#7ED6E1]/25',
  DEVOPS:   'text-[#7B651C] bg-[#F4EEDB] border-[#DCCB91] dark:text-[#E3CB7D] dark:bg-[#E3CB7D]/15 dark:border-[#E3CB7D]/25',
  SYSTEMS:  'text-[#475569] bg-[#E9ECE6] border-[#C9D0C2] dark:text-[#CBD5E1] dark:bg-[#CBD5E1]/15 dark:border-[#CBD5E1]/25',
};

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

const SectionHeader = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-8">
    <span className="font-bold text-[11px] tracking-[0.25em] uppercase font-mono text-[#6F6F64] dark:text-zinc-500">{label}</span>
    <div className="flex-1 h-px bg-[#E6E7DC] dark:bg-zinc-800" />
  </div>
));
SectionHeader.displayName = 'SectionHeader';

const ArticleCard = memo(({ article, isFeatured = false }: { article: Article; isFeatured?: boolean }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex flex-col sm:flex-row items-start justify-between gap-5 border border-[#E6E7DC] dark:border-zinc-900 bg-[#FBFBF7]/55 dark:bg-zinc-950/10 hover:bg-[#FBFBF7] dark:hover:bg-zinc-950/40 hover:border-[#D6D8CB] dark:hover:border-zinc-800 transition-all duration-300 rounded-xl ${
        isFeatured ? 'p-6 sm:p-8 border-[#D6D8CB] dark:border-[#6F735D]/25' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[9px] sm:text-[10px]">
          <span className={`px-2 py-0.5 rounded border font-bold tracking-wider ${categoryColor[article.category]}`}>
            {article.category}
          </span>
          <span className="text-[#6F6F64] font-semibold">{article.date}</span>
          <span className="text-[#B0B1A3] dark:text-zinc-700 hidden xs:inline">•</span>
          <span className="text-[#6F6F64] font-semibold uppercase hidden xs:inline">{article.readingTime} MIN READ</span>
        </div>
        <h3 className={`font-sans font-bold text-[#25251F] dark:text-zinc-100 group-hover:text-[#1D91A1] dark:group-hover:text-[#7ED6E1] transition-colors leading-tight ${
          isFeatured ? 'text-xl sm:text-[1.35rem]' : 'text-lg sm:text-[1.15rem]'
        }`}>
          {article.title}
        </h3>
        <p className="text-[#5F5F54] dark:text-zinc-500 text-[13px] leading-relaxed max-w-[700px] line-clamp-2 sm:line-clamp-3">
          {article.excerpt}
        </p>
      </div>
      {article.image ? (
        <div className={`hidden sm:block overflow-hidden rounded-3xl border border-[#E6E7DC] dark:border-zinc-800/70 shrink-0 bg-[#FBFBF7] dark:bg-zinc-950/20 ${
          isFeatured ? 'w-full h-40 sm:w-36 sm:h-24' : 'w-full h-36 sm:w-28 sm:h-20'
        }`}>
          <img
            src={article.image}
            alt={article.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="w-8 h-8 rounded-lg bg-[#FBFBF7] dark:bg-zinc-900/40 border border-[#E6E7DC] dark:border-zinc-900/60 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:border-[#D6D8CB] dark:group-hover:border-zinc-800 group-hover:bg-[#F2F4EA] dark:group-hover:bg-zinc-900/80">
        <ArrowUpRight className="w-4 h-4 text-[#6F6F64] dark:text-zinc-400 group-hover:text-[#1D91A1] dark:group-hover:text-[#7ED6E1] transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
});
ArticleCard.displayName = 'ArticleCard';

const SkeletonCard = memo(() => (
  <div className="border border-[#E6E7DC] dark:border-zinc-900 bg-[#FBFBF7]/55 dark:bg-zinc-950/10 p-5 sm:p-6 rounded-xl animate-pulse space-y-4">
    <div className="flex gap-3 items-center">
      <div className="w-16 h-4 bg-[#E6E7DC] dark:bg-zinc-900 rounded" />
      <div className="w-20 h-3 bg-[#ECEDE3] dark:bg-zinc-900/60 rounded" />
      <div className="w-16 h-3 bg-[#ECEDE3] dark:bg-zinc-900/60 rounded" />
    </div>
    <div className="h-6 w-3/4 bg-[#E6E7DC] dark:bg-zinc-900 rounded" />
    <div className="h-4 w-5/6 bg-[#ECEDE3] dark:bg-zinc-900/60 rounded" />
  </div>
));
SkeletonCard.displayName = 'SkeletonCard';

export const Articles = () => {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    // FIX 4: use AbortController to cancel in-flight requests on cleanup
    const controller = new AbortController();

    const fetchArticles = async () => {
      try {
        const devToData = await fetch(
          `https://dev.to/api/articles?username=siyadhkc&per_page=30&t=${Date.now()}`,
          {
            signal: controller.signal,
            cache: 'no-store', // FIX 1: bypass HTTP/browser cache entirely
          }
        ).then(r => {
          if (!r.ok) throw new Error('Dev.to failed');
          return r.json();
        });

        let itemsList: Article[] = [];

        if (Array.isArray(devToData)) {
          itemsList = devToData.map((item) => {
            const val = item as Record<string, unknown>;
            const pubDate = String(val.published_at || val.published_timestamp || '');
            const parsedTimestamp = pubDate ? new Date(pubDate).getTime() : Date.now();
            const safeTimestamp = isNaN(parsedTimestamp) ? Date.now() : parsedTimestamp;

            return {
              title: String(val.title || ''),
              excerpt: String(val.description || ''),
              category: getCategoryFromTags((val.tag_list as string[]) || []),
              // FIX 2: derive fallback date from actual timestamp, not hardcoded 'JUN 3'
              date: String(
                val.readable_publish_date ||
                new Date(safeTimestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              ).toUpperCase(),
              url: String(val.url || ''),
              readingTime: Number(val.reading_time_minutes || 3),
              image: val.cover_image
                ? String(val.cover_image)
                : val.social_image
                ? String(val.social_image)
                : undefined,
              timestamp: safeTimestamp,
            };
          });
        }

        // FIX 3: immutable sort + spread instead of mutating array element in place
        const sorted = [...itemsList].sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
        const finalList = sorted.map((a, i) => ({ ...a, featured: i === 0 }));

        if (active) {
          setArticlesList(finalList.length > 0 ? finalList : staticArticles);
          setLoading(false);
        }
      } catch (err) {
        // FIX 4: don't treat AbortError as a real error
        if ((err as Error).name === 'AbortError') return;
        console.error('Error fetching dynamic articles:', err);
        if (active) {
          setArticlesList(staticArticles);
          setLoading(false);
        }
      }
    };

    fetchArticles();

    // FIX 5: poll every 60s so the list stays updated without user interaction
    const intervalId = window.setInterval(fetchArticles, 60_000);

    // FIX 5: also refetch on tab/window focus and visibility restore (handles mobile background tabs)
    const onFocus = () => fetchArticles();
    const onVisible = () => { if (document.visibilityState === 'visible') fetchArticles(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      active = false;
      controller.abort();
      clearInterval(intervalId);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const featuredArticles = articlesList.filter(a => a.featured);
  const recentArticles   = articlesList.filter(a => !a.featured);

  return (
    <div className="w-full relative z-10">
      <div id="articles" className="relative z-10 w-full max-w-[860px] mx-auto px-6">
        <div className="pt-28 pb-14 mt-4">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6F6F64] dark:text-zinc-600 font-bold">
              [ Articles ]
            </span>
            <div className="flex-1 h-px bg-[#E6E7DC] dark:bg-zinc-800/60" />
            <a
              href="https://dev.to/siyadhkc"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#6F6F64] dark:text-zinc-600 hover:text-[#1D91A1] dark:hover:text-[#7ED6E1] uppercase transition-colors shrink-0 group"
            >
              dev.to
              <ArrowUpRight className="w-3 h-3 group-hover:text-[#1D91A1] dark:group-hover:text-[#7ED6E1]" />
            </a>
          </div>

          <div className="flex flex-col gap-5 max-w-[560px]">
            <h1 className="font-bold text-[2.2rem] sm:text-[2.8rem] leading-[1.1] tracking-tight">
              <span className="text-[#25251F] dark:text-zinc-100">Writing on </span>
              <span className="bg-gradient-to-r from-[#6F735D] via-[#1D91A1] to-[#6F735D] bg-clip-text text-transparent">
                systems,
              </span>
              <br />
              <span className="text-[#25251F] dark:text-zinc-100">security </span>
              <span className="text-[#8A897D] dark:text-zinc-500">&</span>
              <span className="bg-gradient-to-r from-[#1D91A1] to-[#6F735D] bg-clip-text text-transparent"> the backend.</span>
            </h1>
            <p className="text-[#5F5F54] dark:text-zinc-500 text-[14px] leading-relaxed">
              Practical notes on Python internals, API hardening, distributed systems, and the dark corners of the network stack.
            </p>
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

          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#E6E7DC] dark:via-zinc-800/60 to-transparent" />
        </div>

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
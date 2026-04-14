import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, Heart } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  platform: 'Medium' | 'Dev.to' | 'LinkedIn';
  url: string;
  date: string;
  readTime: string;
  likes?: string;
}

const ArticleCard = ({ title, excerpt, platform, url, date, readTime, likes }: ArticleCardProps) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#FDFDFC] border border-[#00000008] p-6 md:p-8 rounded-[2rem] flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#1D91A1]/20 transition-all duration-500"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D91A1]/10 to-[#E1EFEB]/30 flex items-center justify-center border border-[#1D91A1]/10">
            <BookOpen className="w-5 h-5 text-[#1D91A1]" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#8A8A85] uppercase">{platform}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#F7F7F2] border border-black/5 flex items-center justify-center group-hover:bg-[#1D91A1] group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <h3 className="font-sans text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-4 group-hover:text-[#1D91A1] transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-[#3E4240]/70 text-sm md:text-base leading-relaxed mb-8 flex-1">
        {excerpt}
      </p>

      <div className="flex items-center gap-6 pt-6 border-t border-black/[0.03]">
        <div className="flex items-center gap-2 text-[#8A8A85] font-mono text-[10px] uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          {readTime}
        </div>
        <div className="flex items-center gap-2 text-[#8A8A85] font-mono text-[10px] uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors" />
          {likes || 'Featured'}
        </div>
      </div>
    </motion.a>
  );
};

export const Articles = () => {
  const articles: ArticleCardProps[] = [
    {
      title: "Hardening Django APIs: A Defensive Approach",
      excerpt: "Deep dive into securing REST endpoints using passive protection layers and passive audit logging strategies.",
      platform: "Medium",
      url: "https://medium.com/@siyadhkc",
      date: "Oct 2023",
      readTime: "8 min read",
      likes: "1.2k"
    },
    {
      title: "Building Scalable Infrastructure with Docker",
      excerpt: "My journey through containerizing complex distributed systems for high-traffic backend architectures.",
      platform: "Dev.to",
      url: "https://dev.to/siyadhkc",
      date: "Aug 2023",
      readTime: "6 min read",
      likes: "850"
    },
    {
      title: "The Future of Offensive Security in Enterprise",
      excerpt: "Explaining the bridge between architectural patterns and vulnerability research in the modern age.",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/siyadhkc",
      date: "Jan 2024",
      readTime: "5 min read"
    }
  ];

  return (
    <section id="articles" className="py-24 px-4 md:px-8 w-full max-w-[1200px] mx-auto overflow-hidden">
      <div className="text-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-[#8A8A85] uppercase mb-4">Latest Thinking</p>
          <h2 className="font-serif text-[3.5rem] md:text-[5rem] text-[#131313] tracking-tight leading-tight mb-6">Written Work</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#1D91A1]/30 to-transparent mx-auto"></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
};

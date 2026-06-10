import React from 'react';

const rows = [
  {
    label: "Backend",
    value: "Django · DRF · Django Channels · Celery · Redis · PostgreSQL · JWT"
  },
  {
    label: "Frontend",
    value: "React · TailwindCSS · JavaScript · Vite"
  },
  {
    label: "DevOps",
    value: "Docker · Docker Compose · Nginx · Gunicorn · Linux · Git"
  },
  {
    label: "Testing",
    value: "Pytest · pytest-django · Factory Boy · Coverage"
  },
  {
    label: "Security",
    value: "OWASP API Top 10 · Web Pentesting · API Vulnerability Research"
  },
  {
    label: "Networking",
    value:
      "TCP/IP · Network Infrastructure · Enterprise Hardware · CCTV Systems"
  }
];

const Stack = () => {
  return (
    <section id="stack" className="scroll-mt-20">
      <header className="mb-5 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
          Stack
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-[#FBFBF7]/55 dark:bg-zinc-950/40 shadow-xl dark:shadow-2xl">
        <dl className="divide-y divide-zinc-200/50 dark:divide-zinc-900/50">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-y-1 border-zinc-200 dark:border-zinc-900/60 px-4 py-3.5 backdrop-blur-sm sm:grid-cols-3 sm:px-5"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                {row.label}
              </dt>
              <dd className="sm:col-span-2 text-sm text-zinc-800 dark:text-zinc-100/90">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stack;

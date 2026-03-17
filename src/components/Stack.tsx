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
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
          Stack
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/40 shadow-[0_24px_70px_rgba(15,23,42,0.85)]">
        <dl className="divide-y divide-slate-800/80">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-y-1 border-slate-800/60 px-4 py-3.5 backdrop-blur-sm sm:grid-cols-3 sm:px-5"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
                {row.label}
              </dt>
              <dd className="sm:col-span-2 text-sm text-slate-100/90">
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


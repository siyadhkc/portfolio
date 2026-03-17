const links = [
  {
    label: "Email",
    value: "siyadhkc@gmail.com",
    href: "mailto:siyadhkc@gmail.com"
  },
  {
    label: "GitHub",
    value: "github.com/siyadhkc",
    href: "https://github.com/siyadhkc"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/siyadhkc",
    href: "https://linkedin.com/in/siyadhkc"
  },
  {
    label: "Location",
    value: "Kerala, India",
    href: "#"
  }
];

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-20">
      <header className="mb-5 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
          Contact
        </p>
      </header>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-800/80 sm:grid-cols-2">
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            className="group flex flex-col gap-1 bg-slate-900/60 px-4 py-3.5 backdrop-blur-sm transition-colors hover:bg-slate-900 sm:px-5"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 group-hover:text-slate-300">
              {item.label}
            </span>
            <span className="text-sm text-slate-100 group-hover:text-slate-50">
              {item.value}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;


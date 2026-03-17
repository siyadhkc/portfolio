const Nav = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-20 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-300/90"
        >
          siyadhkc
        </a>
        <ul className="flex items-center gap-6 text-xs font-medium text-slate-400">
          <li>
            <a
              href="#stack"
              className="transition-colors hover:text-slate-50"
            >
              Stack
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="transition-colors hover:text-slate-50"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="transition-colors hover:text-slate-50"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;


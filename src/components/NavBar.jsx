import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkBase =
    "block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200";
  const active = " text-yellow-light  focus:ring-blue-300";
  const inactive =
    "text-slate-200 hover:bg-slate-100/10 hover:text-yellow-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3531cf]/70";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-slate-950/70 backdrop-blur-md ">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100"
      >
        Skip to content
      </a>

      <nav
        className="mx-auto w-full max-w-6xl px-4"
        aria-label="Primary navigation"
        role="navigation"
      >
        <div className="flex min-h-16 items-center justify-between gap-3 py-2">
          <div className="text-base font-bold tracking-[0.16em] text-white">
            TIETO INSPIRED
          </div>

          {/* Links */}
          <ul id="primary-menu" className="flex items-center gap-1">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/placepicker"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }
              >
                PlacePicker
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quiz"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }
              >
                Quiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/counter"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }
              >
                Counter
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? active : inactive}`
                }
              >
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

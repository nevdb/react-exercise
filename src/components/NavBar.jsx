import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const linkBase = "px-3 py-2 rounded hover:bg-gray-100 hover:text-gray-700";
  const active =
    "bg-amber-600 text-white hover:bg-blue-700  focus:ring-blue-300";
  const inactive = "text-gray-300";

  return (
    <header className="border-b">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-2"
      >
        Skip to content
      </a>

      <nav
        className="max-w-6xl mx-auto px-4"
        aria-label="Primary navigation"
        role="navigation"
      >
        <div className="flex items-center justify-between gap-1 h-14">
          <div className="font-semibold">MyApp</div>

          {/* Mobile toggle */}
          <button
            className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            {/* Simple hamburger icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Links */}
          <ul
            id="primary-menu"
            className={`${
              open ? "block" : "hidden"
            } sm:flex gap-1 items-center`}
            onClick={() => setOpen(false)}
          >
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
``;

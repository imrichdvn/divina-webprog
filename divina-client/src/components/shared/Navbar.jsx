import { NavLink } from "react-router-dom";
import orangeLogo from "../../assets/brand/orange.jpg";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
  { label: "Sign in", to: "/auth/signin" },
  { label: "Sign up", to: "/auth/signup" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200",
    isActive
      ? "border-neutral-900 bg-neutral-900 text-white shadow-[4px_4px_0px_0px_rgba(251,241,232,1)]"
      : "border-transparent text-neutral-600 hover:border-neutral-900 hover:bg-white hover:text-neutral-900",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-neutral-900 bg-stone-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-neutral-900 bg-white transition-transform group-hover:-rotate-6">
            <img
              src={orangeLogo}
              alt="Orange logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-bold tracking-[0.15em] text-neutral-900">
              PAWS & CLAWS
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-600">
              Pet Care & Adoption
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
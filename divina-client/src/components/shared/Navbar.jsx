import { NavLink } from "react-router-dom";
import orangeLogo from "../../assets/brand/orange.jpg";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];
//   primary: "bg-zinc-900 text-zinc-50 hover:bg-zinc-700",
//   secondary: "bg-zinc-50 text-zinc-900 hover:bg-zinc-200",
const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-zinc-600 bg-zinc-900 text-white"
      : "border-transparent text-neutral-600 hover:border-zinc-900 hover:bg-zinc-50 hover:text-neutral-900",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-neutral-900 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={orangeLogo}
            alt="Orange logo"
            className="h-10 w-10 object-contain"
          />
          <div className="leading-none">
            <p className="text-xl font-semibold tracking-[0.24em] text-neutral-900">
              Paws & Claws
            </p>
            {/* <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-500">
              Modern. Aesthetic. Essence.
            </p> */}
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

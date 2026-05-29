import { Link } from "react-router-dom";

const variantClasses = {
  primary: "bg-orange-500 text-white hover:bg-orange-600",
  secondary: "bg-white text-neutral-900 hover:bg-orange-50",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
  disabled = false,
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 border-neutral-900 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]",
    variantClasses[variant] ?? variantClasses.secondary,
    disabled ? "pointer-events-none opacity-50" : "",
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

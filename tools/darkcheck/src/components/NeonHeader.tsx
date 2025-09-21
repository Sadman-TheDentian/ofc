
import { Link } from "react-router-dom";

const NeonHeader = () => (
  <header className="w-full bg-[#131926] border-b border-gray-800/80 sticky top-0 z-30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold group">
            DarkCheck
            <span className="text-sm font-normal text-gray-400 ml-2 group-hover:text-white transition-colors">by DentiSystems</span>
          </Link>
        </div>
        <nav className="hidden sm:flex sm:space-x-6">
          <HeaderNavLink to="/" label="Home" />
          <HeaderNavLink to="/check" label="Check" />
          <HeaderNavLink to="/tools" label="Tools" />
          <HeaderNavLink to="/about" label="About" />
          <HeaderNavLink to="/contact" label="Contact" />
          <HeaderNavLink to="/privacy" label="Privacy" />
        </nav>
      </div>
    </div>
  </header>
);

function HeaderNavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  );
}

export default NeonHeader;

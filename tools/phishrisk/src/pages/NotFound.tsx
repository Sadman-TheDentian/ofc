
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import NeonFooter from "@/components/NeonFooter";
import GlobalHeader from "@/components/GlobalHeader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="flex-grow flex items-center justify-center">
      <div className="text-center">
        <h1 className="neon-text text-7xl font-bold mb-2">404</h1>
        <p className="text-md text-muted-foreground mb-5">Page not found.</p>
        <Link to="/" className="text-neon text-lg underline">Go Home</Link>
      </div>
    </main>
  );
};

export default NotFound;

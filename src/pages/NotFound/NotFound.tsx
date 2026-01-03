import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-colors duration-700 flex flex-col ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
      {isAuthenticated && <Navbar />}
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className={`mb-4 text-6xl sm:text-8xl font-bold ${isDark ? 'text-slate-100' : 'text-blue-900'}`}>
            404
          </h1>
          <p className={`mb-4 text-2xl font-semibold ${isDark ? 'text-slate-200' : 'text-blue-700'}`}>
            Page Not Found
          </p>
          <p className={`mb-8 text-lg ${isDark ? 'text-slate-400' : 'text-blue-600'}`}>
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700">
            <a href={isAuthenticated ? "/home" : "/login"}>
              {isAuthenticated ? "Return to Home" : "Return to Login"}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

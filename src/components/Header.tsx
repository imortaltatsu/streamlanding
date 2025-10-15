import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { authClient } from "@/lib/auth";
import {
  Bot,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<{ name?: string; email: string } | null>(
    null
  );
  const [userLoading, setUserLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Feature flags
  const chatEnabled = useFeatureFlag("CHAT");
  const billingEnabled = useFeatureFlag("BILLING");
  const authEnabled = useFeatureFlag("AUTH");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If we're on the home page, handle smooth scrolling
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page and clicking a hash link that only exists on home
      // navigate to home page first, then scroll to the section
      e.preventDefault();
      navigate("/" + href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // If already on homepage, just scroll to top
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Otherwise, let the Link handle navigation to homepage
    // and scroll to top after navigation
  };

  // Add effect to scroll to top or hash when navigating to homepage
  useEffect(() => {
    if (location.pathname === "/") {
      if (location.hash) {
        // If there's a hash, scroll to that element
        const element = document.querySelector(location.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100); // Small delay to ensure DOM is ready
        }
      } else {
        // If no hash, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user || null);
      } catch (error) {
        console.error("Failed to get session:", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const navLinks = [{ href: "#features", label: "Features" }];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors"
            >
              <Bot className="w-6 h-6 text-primary" />
              {config.SITE_NAME}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {chatEnabled && (
                <Link
                  to="/chat"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Link>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ?
                <Moon className="h-4 w-4" />
              : <Sun className="h-4 w-4" />}
            </Button>

            {/* Desktop Auth */}
            {authEnabled && (
              <div className="hidden sm:flex items-center gap-2">
                {userLoading ?
                  <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                : user ?
                  <>
                    {billingEnabled && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/billing">Billing</Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      <span className="hidden lg:inline">
                        {user.name || user.email}
                      </span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </>
                : <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/sign-up">Get Started</Link>
                    </Button>
                  </>
                }
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ?
                <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
            <div className="py-4 space-y-3">
              <nav className="flex flex-col gap-3">
                {chatEnabled && (
                  <Link
                    to="/chat"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2 flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </Link>
                )}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {authEnabled && (
                <div className="border-t border-border/40 pt-3 space-y-2">
                  {userLoading ?
                    <div className="h-10 bg-muted animate-pulse rounded-lg mx-2" />
                  : user ?
                    <>
                      <div className="flex items-center gap-2 px-2 py-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {user.name || "User"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      {billingEnabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="w-full justify-start"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/billing">Billing</Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="w-full justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  : <>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="w-full justify-start"
                      >
                        <Link to="/sign-in" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button size="sm" asChild className="w-full">
                        <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </>
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

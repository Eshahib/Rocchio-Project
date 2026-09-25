import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/AuthContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const LINKS = [
  { label: "Opportunities", to: "/opportunities#opportunities" },
  { label: "Approach", to: "/approach#approach" },
  { label: "Portfolio", to: "/portfolio#portfolio" },
  { label: "Partner", to: "/portal#portal" },
];

/**
 * The "Navigation Bracket" — the menu is split into the four corners of the viewport,
 * framing the content like a viewfinder.
 */
export default function NavBracket() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, deleteAccount } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuOpen =
    new URLSearchParams(location.search).get("menu") === "open";

  const openMenu = () => {
    const params = new URLSearchParams(location.search);
    if (params.get("menu") === "open") return;
    params.set("menu", "open");
    navigate(`${location.pathname}?${params.toString()}${location.hash}`, {
      replace: false,
    });
  };

  const closeMenu = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      const params = new URLSearchParams(location.search);
      params.delete("menu");
      const search = params.toString();
      navigate(
        `${location.pathname}${search ? `?${search}` : ""}${location.hash}`,
        { replace: true }
      );
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleting(true);
    setDeleteError(false);
    try {
      await deleteAccount();
      setConfirmOpen(false);
    } catch (err) {
      setDeleteError(true);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top-left: Brand mark */}
      <a href="#top" className="fixed nav-corner-tl z-50 inline-flex items-center min-h-[44px]">
        <Logo variant={scrolled ? "dark" : "light"} />
      </a>

      {/* Top-right: Index / Menu trigger */}
      <button
        onClick={openMenu}
        className="fixed nav-corner-tr z-50 flex items-center justify-center gap-3 min-h-[44px] min-w-[44px] group"
        aria-label="Open menu"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:inline">
          Index
        </span>
        <span className="flex flex-col gap-[5px]">
          <span className="block w-7 h-px bg-foreground" />
          <span className="block w-7 h-px bg-foreground" />
        </span>
      </button>

      {/* Bottom-left: status */}
      <div className="fixed bottom-9 left-5 md:left-8 z-40 hidden md:inline-flex pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Est. 2009 — New York
        </span>
      </div>

      {/* Bottom-right: portal CTA */}
      <a
        href="#portal"
        className="fixed bottom-7 right-5 md:right-8 z-40 hidden md:inline-flex items-center min-h-[44px] font-mono text-[10px] uppercase tracking-[0.25em] text-foreground hover:text-accent transition-colors"
      >
        Investor Portal ↗
      </a>

      {/* Fullscreen overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col safe-pad-top">
          <div className="flex items-center justify-between px-5 md:px-8 py-5 md:py-7 border-b hair-line">
            <Logo variant="dark" />
            <button
              onClick={closeMenu}
              className="flex items-center gap-3"
              aria-label="Close menu"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Close
              </span>
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-5 md:px-16">
            {LINKS.map((l, i) => (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(l.to, { replace: true });
                }}
                className="group flex items-baseline gap-6 py-4 md:py-6 border-b hair-line"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="font-heading text-4xl md:text-7xl font-medium tracking-tight group-hover:translate-x-3 group-hover:text-accent transition-all duration-500">
                  {l.label}
                </span>
              </a>
            ))}
          </nav>
          <div className="px-5 md:px-16 py-6 flex flex-wrap gap-x-10 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Accredited Investors Only</span>
            <span>SEC Registered</span>
            <span>Cody.Rocchio@yahoo.com</span>
            {isAuthenticated && (
              <button
                onClick={() => setConfirmOpen(true)}
                className="text-destructive hover:underline"
              >
                Delete Account
              </button>
            )}
          </div>
        </div>
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete your account and end your session. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="text-sm text-destructive">
              Could not delete your account. Please try again or contact support.
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
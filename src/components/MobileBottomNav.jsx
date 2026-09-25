import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layers, Compass, Building2, Handshake } from "lucide-react";

const TABS = [
  { label: "Opportunities", value: "opportunities", icon: Layers },
  { label: "Approach", value: "approach", icon: Compass },
  { label: "Portfolio", value: "portfolio", icon: Building2 },
  { label: "Partner", value: "portal", icon: Handshake },
];

const TAB_PATHS = {
  opportunities: "/opportunities#opportunities",
  approach: "/approach#approach",
  portfolio: "/portfolio#portfolio",
  portal: "/portal#portal",
};

/**
 * Persistent mobile bottom navigation. Each tab maps to a dedicated route
 * (`/opportunities`, `/approach`, `/portfolio`, `/portal`) and remembers its
 * own last URL so re-entering a tab resumes its position. Mounted once in
 * App.jsx (outside the animated route switch) so it never unmounts.
 */
export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const active =
    TABS.find((t) => location.pathname === `/${t.value}`)?.value || "";
  const lastLocations = useRef({});

  // Remember each tab's last full URL so re-entering a tab resumes its position
  // (its own history stack), preserving state such as the portal step.
  useEffect(() => {
    if (active) {
      lastLocations.current[active] =
        location.pathname + location.search + location.hash;
    }
  }, [active, location.pathname, location.search, location.hash]);

  const go = (value) => {
    const tabPath = `/${value}`;
    if (location.pathname === tabPath) {
      // Tapping the active tab resets it to its root (clears portal flow params).
      lastLocations.current[value] = TAB_PATHS[value];
      navigate(TAB_PATHS[value], { replace: true });
      return;
    }
    const resume = lastLocations.current[value] || TAB_PATHS[value];
    navigate(resume);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t hair-line"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.value;
          return (
            <button
              key={t.value}
              onClick={() => go(t.value)}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 min-h-[44px] transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

const OPTIONS = ["$200k – $500k", "$500k – $1M", "$1M+"];

/**
 * Income-range picker. Renders as a bottom Drawer (Vaul) on mobile and a
 * standard Radix Select on desktop.
 */
export default function IncomeSelect({ value, onChange }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between bg-transparent border-0 border-b hair-line rounded-none py-3 min-h-[44px] font-mono text-sm focus:outline-none focus:border-foreground"
          >
            <span className={value ? "" : "text-muted-foreground"}>{value || "Select range"}</span>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Annual Income Range</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-1">
            {OPTIONS.map((o) => (
              <DrawerClose asChild key={o}>
                <button
                  type="button"
                  onClick={() => onChange(o)}
                  className={`w-full text-left px-4 py-3 min-h-[44px] font-mono text-sm uppercase tracking-[0.12em] border hair-line transition-colors ${
                    value === o ? "bg-foreground text-background border-foreground" : "hover:border-foreground"
                  }`}
                >
                  {o}
                </button>
              </DrawerClose>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-transparent border-0 border-b hair-line rounded-none h-auto py-3 font-mono text-sm focus:outline-none focus:border-foreground">
        <SelectValue placeholder="Select range" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
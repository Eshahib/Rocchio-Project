import NavBracket from "@/components/NavBracket";
import TickerFooter from "@/components/TickerFooter";
import Hero from "@/components/Hero";
import OpportunitiesMatrix from "@/components/OpportunitiesMatrix";
import Approach from "@/components/Approach";
import AssetDeepDive from "@/components/AssetDeepDive";
import InvestorPortal from "@/components/InvestorPortal";
import Footer from "@/components/Footer";
import PullToRefresh from "@/components/PullToRefresh";

export default function Home() {
  return (
    <div className="relative bg-background pb-24 md:pb-8">
      <NavBracket />
      <PullToRefresh>
        <main>
          <Hero />
          <OpportunitiesMatrix />
          <Approach />
          <AssetDeepDive />
          <InvestorPortal />
          <Footer />
        </main>
      </PullToRefresh>
      <TickerFooter />
    </div>
  );
}
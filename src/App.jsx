import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from '@/components/LoadingSpinner';
// Add page imports here
const Home = lazy(() => import('@/pages/Home'));
import MobileBottomNav from '@/components/MobileBottomNav';

const AuthenticatedApp = () => {
  return <AnimatedRoutes />;
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <Routes location={location}>
            {/* Add your page Route elements here */}
            <Route path="/" element={<Home />} />
            <Route path="/opportunities" element={<Home />} />
            <Route path="/approach" element={<Home />} />
            <Route path="/portfolio" element={<Home />} />
            <Route path="/portal" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </motion.div>
        </Suspense>
      </AnimatePresence>
      <MobileBottomNav />
    </>
  );
}


function App() {

  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AuthenticatedApp />
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
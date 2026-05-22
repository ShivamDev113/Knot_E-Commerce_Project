import React, { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MainRoutes from "./Routes/MainRoutes";
import PageLoader from "./components/PageLoader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isReload = () => {
      if (window.performance) {
        const navigationEntries = window.performance.getEntriesByType?.("navigation") || [];
        const navEntry = navigationEntries[0];

        if (navEntry) {
          return navEntry.type === "reload";
        }

        if (window.performance.navigation) {
          return window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
        }
      }

      return false;
    };

    if (isReload()) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2800);

      return () => clearTimeout(timer);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="px-">
        <ToastContainer />

        <Navbar />
        <SearchBar />
        <MainRoutes />
      </div>

      <Footer />
    </>
  );
};

export default App;
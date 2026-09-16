import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isHome: boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Normalize path from either window.location.pathname or window.location.hash
  const getNormalizedPath = (): string => {
    // Check hash first (e.g. #/personal-loan)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      return hash.substring(1);
    }
    const path = window.location.pathname;
    if (path && path !== '') {
      return path;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    try {
      window.history.pushState({}, '', `#${cleanPath}`);
    } catch (e) {
      window.location.hash = `#${cleanPath}`;
    }
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPath === '/' || currentPath === '';

  return (
    <RouterContext.Provider value={{ currentPath, navigate, isHome }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

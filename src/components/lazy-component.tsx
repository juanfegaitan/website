"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

// Lazy loading wrapper component
export const LazySection = ({ children }) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "100px", // Start loading 100px before the section comes into view
    threshold: 0,
  });

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setShouldRender(true);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div ref={intersectionRef} className="min-h-[100px]">
      {shouldRender ? (
        <Suspense
          fallback={
            <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg" />
          }
        >
          {children}
        </Suspense>
      ) : (
        <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg" />
      )}
    </div>
  );
};

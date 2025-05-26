"use client";
import React, { useEffect, useRef, useState } from "react";

interface DynamicHeightWrapperProps {
  children: React.ReactNode;
  absoluteRefs?: React.RefObject<HTMLElement>[];
}

export default function DynamicHeightWrapper({
  children,
  absoluteRefs = [],
}: DynamicHeightWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateHeight = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      const containerTop = container.getBoundingClientRect().top;
      let maxBottom = 0;

      const children = Array.from(container.children) as HTMLElement[];
      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        maxBottom = Math.max(maxBottom, rect.bottom);
      });

      absoluteRefs.forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          maxBottom = Math.max(maxBottom, rect.bottom);
        }
      });

      const calculatedHeight = maxBottom - containerTop;

      if (mediaQuery.matches) {
        setHeight(calculatedHeight);
      } else {
        setHeight("auto");
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    Array.from(containerRef.current?.children ?? []).forEach((child) =>
      resizeObserver.observe(child)
    );
    absoluteRefs.forEach((ref) => {
      if (ref.current) resizeObserver.observe(ref.current);
    });

    window.addEventListener("resize", updateHeight);
    mediaQuery.addEventListener("change", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
      mediaQuery.removeEventListener("change", updateHeight);
    };
  }, [absoluteRefs]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="relative transition-all"
    >
      {children}
    </div>
  );
}

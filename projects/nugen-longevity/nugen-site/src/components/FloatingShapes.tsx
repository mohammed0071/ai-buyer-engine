"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FloatingShapes() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const shapes = [
    // DNA helix abstract - double dots
    { type: "helix", x: "15%", y: "20%", size: 120, parallax: 30, delay: 0 },
    // Sphere
    { type: "sphere", x: "80%", y: "25%", size: 80, parallax: -20, delay: 0.5 },
    // Cube
    { type: "cube", x: "75%", y: "70%", size: 60, parallax: 25, delay: 1 },
    // Small sphere
    { type: "sphere", x: "10%", y: "75%", size: 40, parallax: -15, delay: 1.5 },
    // Ring
    { type: "ring", x: "50%", y: "15%", size: 90, parallax: 20, delay: 0.8 },
    // Small dots cluster
    { type: "sphere", x: "90%", y: "50%", size: 30, parallax: -25, delay: 2 },
  ];

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            x: mounted ? springX.get() * shape.parallax : 0,
            y: mounted ? springY.get() * shape.parallax : 0,
          }}
          animate={{
            y: [0, -15, 5, 0],
            rotate: shape.type === "cube" ? [0, 90, 180, 270, 360] : [0, 5, -5, 0],
          }}
          transition={{
            duration: shape.type === "cube" ? 20 : 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {shape.type === "sphere" && (
            <div
              className="rounded-full"
              style={{
                width: shape.size,
                height: shape.size,
                background: `radial-gradient(circle at 30% 30%, rgba(0, 212, 170, 0.15), rgba(123, 44, 191, 0.08) 60%, transparent 80%)`,
                boxShadow: `0 0 ${shape.size / 2}px rgba(0, 212, 170, 0.1)`,
                border: "1px solid rgba(0, 212, 170, 0.08)",
              }}
            />
          )}
          {shape.type === "cube" && (
            <div
              className="rounded-xl"
              style={{
                width: shape.size,
                height: shape.size,
                background: `linear-gradient(135deg, rgba(123, 44, 191, 0.12), rgba(0, 212, 170, 0.08))`,
                border: "1px solid rgba(123, 44, 191, 0.12)",
                boxShadow: `0 0 ${shape.size / 3}px rgba(123, 44, 191, 0.1)`,
              }}
            />
          )}
          {shape.type === "ring" && (
            <div
              className="rounded-full"
              style={{
                width: shape.size,
                height: shape.size,
                border: "2px solid rgba(0, 212, 170, 0.1)",
                boxShadow: `inset 0 0 20px rgba(0, 212, 170, 0.05), 0 0 20px rgba(0, 212, 170, 0.05)`,
              }}
            />
          )}
          {shape.type === "helix" && (
            <div className="relative" style={{ width: shape.size, height: shape.size * 1.5 }}>
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <motion.div
                  key={j}
                  className="absolute rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    left: `${50 + Math.sin(j * 1.2) * 35}%`,
                    top: `${j * 18}%`,
                    background: j % 2 === 0 ? "rgba(0, 212, 170, 0.3)" : "rgba(123, 44, 191, 0.3)",
                    boxShadow: j % 2 === 0
                      ? "0 0 10px rgba(0, 212, 170, 0.2)"
                      : "0 0 10px rgba(123, 44, 191, 0.2)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: j * 0.3,
                  }}
                />
              ))}
              {/* Connecting lines */}
              {[0, 1, 2, 3, 4].map((j) => (
                <motion.div
                  key={`line-${j}`}
                  className="absolute"
                  style={{
                    width: 1,
                    height: "18%",
                    left: "50%",
                    top: `${j * 18 + 5}%`,
                    background: `linear-gradient(to bottom, rgba(0, 212, 170, 0.1), rgba(123, 44, 191, 0.1))`,
                    transform: `rotate(${Math.sin(j) * 20}deg)`,
                  }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, delay: j * 0.2 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

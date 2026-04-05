"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BarItem {
  value: number;
  label: string;
  highlight?: boolean;
  highlightColor?: string;
  delay?: number;
}

interface StatsBarsProps {
  bars: BarItem[];
  title?: string;
  subtitle?: string;
  valueSuffix?: string;
}

const CANDY_CSS = `
.candy-bg-dark {
  background-color: rgba(255,255,255,0.02);
  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.03) 25%,
    transparent 25.5%,
    transparent 50%,
    rgba(255,255,255,0.03) 50.5%,
    rgba(255,255,255,0.03) 75%,
    transparent 75.5%,
    transparent
  );
  background-size: 10px 10px;
}`;

export function StatsBars({
  bars,
  title,
  subtitle,
  valueSuffix = "%",
}: StatsBarsProps) {
  return (
    <div className="flex flex-col h-full">
      <style>{CANDY_CSS}</style>

      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <p className="text-white font-bold text-sm leading-tight">{title}</p>
          )}
          {subtitle && (
            <p className="text-white/35 text-xs mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      <div className="flex items-end justify-between gap-2 flex-1">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: bar.delay ?? index * 0.15, type: "spring", damping: 14 }}
            className="flex flex-col items-center gap-1.5 flex-1 h-full"
          >
            <div className="candy-bg-dark relative w-full flex-1 overflow-hidden rounded-2xl">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${bar.value}%` }}
                transition={{ duration: 0.6, type: "spring", damping: 18, delay: bar.delay ?? index * 0.15 }}
                className={cn(
                  "absolute bottom-0 w-full rounded-2xl flex items-start justify-center pt-2",
                  bar.highlight
                    ? ""
                    : "bg-white/10"
                )}
                style={
                  bar.highlight
                    ? { background: bar.highlightColor ?? "linear-gradient(180deg, #a8e8f5 0%, #b8fce8 100%)" }
                    : {}
                }
              >
                <div className={cn(
                  "font-black tabular-nums bg-black/20 rounded-full px-1.5 py-0.5",
                  bar.highlight
                    ? "text-sm text-white"
                    : "text-[10px] text-white"
                )}>
                  <NumberFlow value={bar.value} suffix={valueSuffix} />
                </div>
              </motion.div>
            </div>

            <p className={cn(
              "text-center leading-tight w-full px-1",
              bar.highlight
                ? "text-xs font-black text-white whitespace-normal break-words"
                : "text-[10px] text-white/75 truncate"
            )}>
              {bar.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

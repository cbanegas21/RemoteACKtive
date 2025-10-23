"use client";
import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import Card from "./Card";
import { MapPin, DollarSign, Globe2, Trophy } from "lucide-react";

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  colorLight: string;
  colorDark: string;
}

export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    {
      icon: MapPin,
      value: 18,
      suffix: "",
      label: "Countries Covered",
      colorLight: "text-blue-600",
      colorDark: "text-blue-400",
    },
    {
      icon: DollarSign,
      value: 65,
      suffix: "%",
      label: "Estimated Cost Savings",
      colorLight: "text-green-600",
      colorDark: "text-green-400",
    },
    {
      icon: Globe2,
      value: 4,
      suffix: "",
      label: "Continents",
      colorLight: "text-purple-600",
      colorDark: "text-purple-400",
    },
    {
      icon: Trophy,
      value: 500,
      suffix: "+",
      label: "Successful Placements",
      colorLight: "text-orange-600",
      colorDark: "text-orange-400",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <Section background="panel">
      <div ref={sectionRef} className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} animate={hasAnimated} />
        ))}
      </div>
    </Section>
  );
}

function StatCard({
  stat,
  animate,
}: {
  stat: Stat;
  animate: boolean;
}) {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!animate) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [animate, stat.value]);

  return (
    <Card hover className="text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
        bg-gray-100 dark:bg-white/5">
        <Icon className={`w-8 h-8 ${stat.colorLight} dark:${stat.colorDark}`} />
      </div>
      <div className="text-gray-900 dark:text-white text-4xl font-bold mb-2">
        {animate ? count : 0}
        {animate && count === stat.value && stat.suffix}
      </div>
      <div className="text-gray-600 dark:text-white/60 text-sm font-medium">
        {stat.label}
      </div>
    </Card>
  );
}
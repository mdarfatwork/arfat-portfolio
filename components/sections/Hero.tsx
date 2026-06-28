"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center grid-bg section-padding pt-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge dot>{profile.availability}</Badge>
        </motion.div>

        <motion.h1
          className="mt-10 font-heading text-6xl font-bold leading-none tracking-tighter text-foreground md:text-8xl lg:text-9xl"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {profile.heroHeadline.line1}
          <br />
          <span className="font-serif text-5xl font-normal italic text-muted-foreground md:text-7xl lg:text-8xl">
            {profile.heroHeadline.line2}
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          I&apos;m{" "}
          <strong className="font-semibold text-foreground">
            {profile.name}
          </strong>
          . {profile.heroDescription}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Button href="#projects">View Projects</Button>
          <Button href="#contact" variant="outline">
            Let's Work Together
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {profile.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <h3 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"
        aria-label="Scroll to about section"
      >
        Scroll
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}

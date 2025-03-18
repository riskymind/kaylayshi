"use client";

import { useState } from "react";
import Link from "next/link";
import { metaData } from "@/app/config";
import { FaHamburger, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {ThemeSwitch} from "@/app/components/theme-switch"

const navItems = {
  "/education": { name: "Education" },
  "/experience": { name: "Experience" },
  "/project": { name: "Project" },
  "/skills": { name: "Skill" },
  "/asterisk": { name: "Asterisk" }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="text-3xl font-semibold tracking-tight hover:underline hover:underline-offset-8 hover:italic">
            {metaData.title}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <FaHamburger size={34} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              href={path}
              key={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>

        {/* Mobile Navigation (Animated) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 80, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed inset-0 bg-white dark:bg-black bg-opacity-60 z-50 flex flex-col items-start p-6 w-5/6 sm:w-2/3 md:hidden h-full backdrop-blur-lg"
            >
              <div className="flex items-center justify-between w-full pr-4">
                <ThemeSwitch />
                <button
                  className="self-end mb-4"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                >
                  <FaTimes size={34} />
                </button>
              </div>

              {Object.entries(navItems).map(([path, { name }], index) => (
                <motion.div
                  key={path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <Link
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex text-lg font-semibold w-full py-2"
                  >
                    {name}
                  </Link>
                </motion.div>                
              ))}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

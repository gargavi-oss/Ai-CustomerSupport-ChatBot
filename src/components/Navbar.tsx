"use client"
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";

const Navbar = ({
  email,
  handleLogin,
  handleDashboard
}: {
  email: string;
  handleLogin: () => void;
  handleDashboard: ()=>void;
}) => {
  const firstLetter = email?.charAt(0).toUpperCase() ?? "";
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef && !popupRef.current?.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const handleLogout = async ()=>{
    try {
        const result = await axios.get("/api/auth/logout")
        window.location.href = "/"
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-300 "
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-16 h-16">
        <a href="/#" className="text-lg font-semibold tracking-tight">
          QueryNest<span className="text-zinc-400"> AI</span>
        </a>
        {email ? (
          <div className="relative" ref={popupRef}>
            <button
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {firstLetter}
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{}}
                  className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                >
                  <button onClick={handleDashboard} className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100">
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-zinc-100">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button
            className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium cursor-pointer hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;

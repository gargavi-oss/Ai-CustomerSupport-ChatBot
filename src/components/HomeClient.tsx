"use client";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Features from "./Features";

function HomeClient({ email }: { email: string }) {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };
  const handleDashboard = ()=>{
    window.location.href="/dashboard";
  }
  return (
    <div id="#" className="min-h-screen bg-linear-to-br from-white to-zinc-200 text-zinc-900 overflow-x-hidden">
      <Navbar email={email} handleLogin={handleLogin} handleDashboard={handleDashboard}/>
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className=""
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Ai Customer Support <br /> Built for Your Modern <br /> Websites
            </h1>
            <p className="mt-6 text-lg text-zinc-600 max-w-xl">
              Add a powerful AI chatbot to your website in minutes. Let your
              customers get instant answers using your own buisness knowledge
            </p>
            <div className="mt-10 flex gap-4">
              {email ? (
                <button onClick={()=>{
                  handleDashboard()
                }} className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60">
                  Go to Dashboard
                </button>
              ) : (
                <button
                  className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                  onClick={handleLogin}
                >
                  Get Started
                </button>
              )}
              <a href="#features" className="px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-200 transition">
                Learn More
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500 mb-3">
                Live Chat Preview
              </div>
              <div className="space-y-3">
                <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                  Do you offer cash on delivery?
                </div>
                <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit">
                  Yes, Cash on Delivery is available
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
              >
                💬
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <Features/>
      <footer className="text-center py-6 text-zinc-500 text-sm">
        &copy; {new Date().getFullYear()} QueryNest AI. All rights reserved.
      </footer>
    </div>
  );
}

export default HomeClient;

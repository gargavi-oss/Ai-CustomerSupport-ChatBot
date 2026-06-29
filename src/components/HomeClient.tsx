'use client'
import { motion } from "motion/react"
import { p } from "motion/react-client"

function HomeClient({email}:{email:string}){
    const handleLogin=()=>{
        window.location.href = "/api/auth/login"
    }
    const firstLetter = email[0]!.toUpperCase( );
  return (
    <div className='min-h-screen bg-linear-to-br from-white to-zinc-200 text-zinc-900 overflow-x-hidden'>
         <motion.div
            initial={{y:-60}}
            animate={{y:0}}
            transition={{duration:0.5}}
            className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-300 "
          >
             <div className="flex justify-between items-center max-w-7xl mx-auto px-16 h-16">
                <div className="text-lg font-semibold tracking-tight">AI <span className="text-zinc-400">CustomerSupport</span></div>
                {email?<div>
                    <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition">{firstLetter}</button>
                </div>:<button className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium cursor-pointer hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2" onClick={handleLogin}>Login</button>}
                
             </div>
         </motion.div>
    </div>
  )
}

export default HomeClient
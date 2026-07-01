"use client"
import React, { useState } from 'react'
import Navbar from './Navbar'
import {motion} from 'motion/react'

const EmbedClient = ({ownerId,email}:{ownerId:string; email:string}) => {
    const handleLogin = () => {
        window.location.href = "/api/auth/login";
      };
      const handleDashboard = () => {
        window.location.href = "/dashboard";
      };
      const [copied,setCopied]=useState(false);
      const embedCode = `<script
    src="${process.env.NEXT_PUBLIC_APP_URI}/chatBot.js" 
    bot-id="${ownerId}">
</script>`
      const copyCode = ()=>{
        navigator.clipboard.writeText(embedCode)
        setCopied(true);
        setTimeout(()=>{
            setCopied(false)},2000)
      }
  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
        <div className='sticky top-0 z-40 bg-white border-b border-zinc-200'>
            <Navbar email={email} handleDashboard={handleDashboard} handleLogin={handleLogin}/>
        </div>
        <div className='flex justify-center px-4 py-14 mt-12'>
            <motion.div initial={{opacity: 0, y:24}} animate={{opacity: 1,y:0}} transition={{duration:0.5}} className='w-full max-w-4xl bg-white rounded-xl shadow-xl p-10'>
                <h1 className='text-2xl font-semibold mb-2'>Embed Chat Bot</h1>
                <p>Copy and paste this code before <code>&lt;/body&gt;</code></p>
                <div className='relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mb-10 mt-2'>
                    <pre className='overflow-x-auto'>{embedCode}</pre>
                    <button className='absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition' onClick={copyCode}>{copied? "Copied ": "Copy"}</button>
                </div>
                <ol className='space-y-3 text-sm text-zinc-600 list-decimal list-inside'>
                    <li>Copy the embed script</li>
                    <li>Paste it before closing body tag</li>
                    <li>Reload your website</li>
                </ol>
                <div className="mt-14">
  <h1 className="text-lg font-medium mb-2">Live Preview</h1>
  <p className=" relative text-sm text-zinc-500 mb-6">
    This is how the chatbot will appear on your website
  </p>
  <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">
  {/* Browser Header */}
  <div className="flex items-center gap-2 h-9 px-4 bg-zinc-100 border-b border-zinc-200">
    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
    <span className="ml-4 text-xs text-zinc-500">your-website.com</span>
  </div>

  {/* Browser Body */}
  <div className="relative h-[500px] bg-zinc-50">
    <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">
      Your website goes here
    </div>

    {/* Chat Widget */}
    <div className="absolute bottom-5 right-5 w-[320px] h-[380px] bg-white rounded-2xl border border-zinc-200 shadow-2xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-zinc-900 text-white px-4 py-3 flex justify-between items-center">
        <span className="font-semibold text-sm">💬 Customer Support</span>
        <button className="text-lg">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-slate-50 p-4 space-y-3 overflow-hidden">
        <div className="flex">
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white border border-zinc-200 px-3 py-2 text-sm">
            👋 Hi! How can I help you today?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 text-white px-3 py-2 text-sm">
            I have a question about pricing.
          </div>
        </div>

        <div className="flex">
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white border border-zinc-200 px-3 py-2 text-sm">
            Sure! I'd be happy to help.
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-200 p-3 flex gap-2">
        <input
          disabled
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <button className="bg-zinc-900 text-white px-4 rounded-lg">
          Send
        </button>
      </div>

    </div>
  </div>
</div>
</div>

 

            </motion.div>
        </div>
    </div>
  )
}

export default EmbedClient
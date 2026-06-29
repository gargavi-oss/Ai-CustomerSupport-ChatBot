"use client";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardClient =({
  ownerId,
  email,
}: {
  ownerId: string;
  email: string;
}) => {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };
  const handleDashboard = () => {
    window.location.href = "/dashboard";
  };
 

  const [businessName,setBusinessName]= useState("")
  const [supportEmail,setSupportEmail]= useState("")
  const [knowledge,setKnowledge]= useState("")
 
useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("/api/settings/get", {
          params: {
            ownerId,
          },
        });
  
        if (data) {
          setBusinessName(data.businessName ?? "");
          setSupportEmail(data.supportEmail ?? "");
          setKnowledge(data.knowledge ?? "");
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    if (ownerId) {
      getData();
    }
  }, [ownerId]);

  const [loading,setLoading] = useState(false);
  const[saved,setSaved]= useState(false);
  const handleSettings = async()=>{
    setLoading(true);
    try {
        const result = await axios.post('/api/settings',{ownerId,businessName,supportEmail,knowledge})
        console.log(result.data);
        setLoading(false)
        setSaved(true)
        setTimeout(()=>setSaved(false),3000);
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-200 text-zinc-900 overflow-x-hidden">
      <Navbar
        email={email}
        handleLogin={handleLogin}
        handleDashboard={handleDashboard}
      />
      <div className="flex justify-center px-4 py-14 mt-25">
        <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
        <div className="mb-10 flex items-start justify-between">
  <div>
    <h1 className="text-2xl font-semibold">ChatBot Settings</h1>
    <p className="mt-1 text-zinc-500">
      Manage your AI chatbot knowledge and business details
    </p>
  </div>

  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => window.location.href = "/dashboard/embed"}
    className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium hover:bg-zinc-100"
  >
    🚀 Embed Chatbot
  </motion.button>
</div>
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            <form action="" className="space-y-4">
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Business Name"
                value={businessName !== "" ? businessName : ""}
                onChange={(e)=>{
                    setBusinessName(e.target.value)
                }}  
              />
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Support Email"
                value={supportEmail!==""? supportEmail: ""}
                onChange={(e)=>{
                    setSupportEmail(e.target.value)
                }}
              />
            </form>
          </div>
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Knowledge</h1>
            <p className="text-sm text-zinc-500 mb-4">
              Add FAQs, policies, delivery info, refunds etc.
            </p>
            <div className="space-y-4">
              <textarea
                name=""
                id=""
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 " rows={8}
                value={knowledge!==""?knowledge:""}
                placeholder={`Example:
Business Hours:
• Monday–Friday: 9:00 AM – 6:00 PM
• Saturday: 10:00 AM – 4:00 PM

Shipping:
• Orders are dispatched within 24 hours.
• Delivery takes 3–5 business days.

Returns & Refunds:
• Returns accepted within 7 days of delivery.
• Refunds are processed within 5–7 business days.

FAQs:
Q: How can I track my order?
A: You will receive a tracking link via email after dispatch.

Q: Do you offer international shipping?
A: Currently, we only ship within India.
                            `}
                    onChange={(e)=>setKnowledge(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <motion.button onClick={handleSettings} className="px-7 py-3 bg-black rounded-xl text-white text-sm font-medium hover:bg-zinc-700 transition disabled:opacity-60" whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                    {loading===false? "Save": "Saving....."}
            </motion.button>
            {saved&& (
                <motion.span initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="text-sm font-medium text-emerald-600">
                Settings Saved
            </motion.span>
            )}
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;

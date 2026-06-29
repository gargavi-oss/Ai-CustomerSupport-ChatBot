import React from "react";
import { motion } from "motion/react";

const Features = () => {
  const features = [
    {
      title: "24/7 AI Customer Support",
      description:
        "Provide instant, around-the-clock responses to customer queries with an intelligent AI assistant.",
      icon: "🤖",
    },
    {
      title: "Knowledge Base Integration",
      description:
        "Train the chatbot on your documents, FAQs, and website content to deliver accurate, context-aware answers.",
      icon: "📚",
    },
    {
      title: "Human Handoff",
      description:
        "Seamlessly transfer complex conversations to a human support agent while preserving the chat history.",
      icon: "🤝",
    },
  ];
  return (
    <section
      id="features"
      className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          Why Businesses Choose QueryNest AI?
        </motion.h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100 text-3xl">
                {f.icon}
              </div>

              <h3 className="text-xl font-semibold text-zinc-900">{f.title}</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

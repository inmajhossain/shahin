"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How long does it take to complete a website?",
      answer: "The timeline varies based on project complexity. A simple portfolio site might take 2-3 weeks, while a complex e-commerce platform could take 2-4 months. After our initial consultation, I'll provide a detailed timeline specific to your project."
    },
    {
      id: 2,
      question: "What's included in your web design package?",
      answer: "My standard package includes custom design, responsive development, SEO optimization, 3 rounds of revisions, and basic training on content management. Additional services like copywriting, premium stock photos, and ongoing maintenance can be added."
    },
    {
      id: 3,
      question: "Do you work with clients remotely?",
      answer: "Yes, I work with clients worldwide through video calls, email, and project management tools. I've successfully completed projects for clients across different time zones and continents."
    },
    {
      id: 4,
      question: "What platforms and technologies do you use?",
      answer: "I work with various technologies including HTML5, CSS3, JavaScript (React/Next.js), WordPress, and Shopify. I choose the best stack based on your specific needs, ensuring modern, scalable solutions."
    },
    {
      id: 5,
      question: "How do you handle website maintenance?",
      answer: "I offer monthly maintenance plans that include updates, backups, security monitoring, and technical support. Alternatively, I can hand over the completed site with documentation for you to manage yourself."
    },
    {
      id: 6,
      question: "What is your revision policy?",
      answer: "I include 3 rounds of revisions in my standard package to ensure you're completely satisfied with the design. Additional revisions can be arranged at a reasonable hourly rate if needed."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-4 md:px-8 py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-bold text-white text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-white">
            Find answers to common questions about my web design process, timelines, and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-md border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="px-6 py-5 focus:outline-none w-full text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="pr-4 font-medium text-slate-800 text-lg">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-2 pb-5 text-slate-600">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-white">
            Still have questions? Feel free to reach out!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 shadow-md px-8 py-3 rounded-full font-medium text-white transition-colors"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

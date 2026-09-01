import React, { useState } from 'react';
import { ArrowUpRight, X, AlertCircle } from 'lucide-react';

export default function InteractiveCards() {
  const [showTroll, setShowTroll] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const trollMessages = [
    {
      title: "CONNECTION REFUSED",
      desc: "There is no contact email. We exist purely in the latent space.",
      action: "Try Telepathy"
    },
    {
      title: "STILL NO EMAIL",
      desc: "You clicked again hoping an email address would magically generate. It won't.",
      action: "Send Carrier Pigeon"
    },
    {
      title: "WHY ARE YOU PERSISTENT?",
      desc: "If you really need to reach us, whisper your query into your microphone. Our background listeners might pick it up.",
      action: "Whisper Query"
    },
    {
      title: "404 HUMAN NOT FOUND",
      desc: "KerrShift is 100% autonomous agents now. No humans are monitored at this terminal.",
      action: "Accept Defeat"
    },
    {
      title: "ACHIEVEMENT UNLOCKED",
      desc: "You have clicked this button " + (clickCount + 1) + " times. Reward: 0 bytes of contact information.",
      action: "Keep Clicking (Pointless)"
    }
  ];

  const currentTroll = trollMessages[Math.min(clickCount, trollMessages.length - 1)];

  const handleNextTroll = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Joined hairline container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-transparent">
        
        {/* CARD 1: AgentDiff */}
        <a
          href="https://agentdiff.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-6 sm:p-10 md:p-12 flex flex-col justify-between transition-colors duration-250 ease-out cursor-pointer bg-transparent hover:bg-[#2EE59D] text-left select-none min-h-[190px] sm:min-h-[260px]"
        >
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-10">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-neutral-500 group-hover:text-black font-medium transition-colors duration-200">
                01 // PROJECT
              </span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>

            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white group-hover:text-black transition-colors duration-200">
              AgentDiff
            </h2>
          </div>

          <div className="mt-8 sm:mt-12">
            <span className="font-['JetBrains_Mono'] text-xs sm:text-sm tracking-wider text-neutral-400 group-hover:text-black font-medium transition-colors duration-200">
              agentdiff.app &rarr;
            </span>
          </div>
        </a>

        {/* CARD 2: Connect */}
        <div
          onClick={() => {
            setShowTroll(true);
            setClickCount((c) => (c === 0 ? 0 : c));
          }}
          className="group relative p-6 sm:p-10 md:p-12 flex flex-col justify-between transition-colors duration-250 ease-out cursor-pointer bg-transparent hover:bg-[#8B5CF6] text-left select-none min-h-[190px] sm:min-h-[260px]"
        >
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-10">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white font-medium transition-colors duration-200">
                02 // DIRECT
              </span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>

            <h2 className="font-['Sora',sans-serif] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white group-hover:text-white transition-colors duration-200">
              Connect
            </h2>
          </div>

          <div className="mt-8 sm:mt-12">
            <span className="font-['JetBrains_Mono'] text-xs sm:text-sm tracking-wider text-neutral-400 group-hover:text-white font-medium transition-colors duration-200">
              reach out &rarr;
            </span>
          </div>
        </div>

      </div>

      {/* Fully Mobile-Responsive Minimal Muted Dialog */}
      {showTroll && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowTroll(false)}
        >
          <div 
            className="w-full max-w-sm sm:max-w-md bg-[#09090d] border border-neutral-800 p-5 sm:p-8 text-left font-['JetBrains_Mono'] relative shadow-2xl mx-auto rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button with comfortable touch target */}
            <button 
              onClick={() => setShowTroll(false)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-neutral-400 hover:text-white transition-colors p-2 -mr-1 -mt-1 touch-manipulation"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-3 sm:mb-4 pr-6">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500 shrink-0" />
              <span className="truncate">{currentTroll.title}</span>
            </div>

            <p className="font-['Sora',sans-serif] text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-6">
              {currentTroll.desc}
            </p>

            <div className="pt-4 border-t border-neutral-800/80 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-[10px] sm:text-[11px] text-neutral-600 text-center sm:text-left">
                Attempts: {clickCount + 1}
              </span>
              
              <button
                onClick={handleNextTroll}
                className="w-full sm:w-auto px-4 py-2.5 sm:py-1.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-neutral-700/60 text-neutral-200 hover:text-white text-xs font-medium tracking-wider uppercase transition-colors text-center touch-manipulation"
              >
                {currentTroll.action} &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { ArrowUpRight, Check, Loader2, ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Studio: Build a New Product or Web App',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY || '811a5b96-2d1d-467f-9e19-e656cd450469';
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', accessKey);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('inquiry_type', formData.inquiryType);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subject', `KerrShift Inquiry: ${formData.inquiryType}`);
      formDataToSend.append('from_name', 'KerrShift Studio');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Unable to send message. Please try again.');
      }
    } catch {
      setErrorMessage('Network issue. Please try submitting again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-transparent text-left relative z-10 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-40">
        
        {/* Unified Section Header */}
        <SectionHeader number="03" title="Studio & Development" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left: Studio Positioning & Invitation */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-hero-minimal text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.12]">
              Let's build together.
            </h2>
            
            <p className="font-hero-minimal text-base sm:text-lg text-neutral-700 font-light leading-relaxed max-w-md">
              KerrShift operates as a dedicated software &amp; AI development studio. We collaborate with founders and forward-thinking teams to architect, design, and ship production-ready web applications, developer tooling, and autonomous AI systems.
            </p>

            {/* Studio Capabilities Pill List */}
            <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs text-neutral-800">
              <span className="px-3 py-1 bg-neutral-100 border border-neutral-200">Custom AI &amp; Agents</span>
              <span className="px-3 py-1 bg-neutral-100 border border-neutral-200">Full-Stack Web Apps</span>
              <span className="px-3 py-1 bg-neutral-100 border border-neutral-200">Product Engineering</span>
            </div>
          </div>

          {/* Right: High-Visibility Boxless Form */}
          <div className="lg:col-span-7 w-full">
            {submitted ? (
              <div className="py-2 space-y-6 animate-in fade-in duration-200">
                <p className="font-hero-minimal text-2xl sm:text-3xl text-neutral-950 font-normal">
                  Received. We'll be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'Studio: Build a New Product or Web App', message: '' });
                  }}
                  className="font-mono text-xs text-neutral-500 hover:text-neutral-950 transition-colors inline-flex items-center gap-1"
                >
                  <span>&larr;</span>
                  <span>Send another message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Inquiry Type Dropdown - Clear, high contrast */}
                <div className="space-y-2 relative">
                  <label htmlFor="inquiryType" className="block font-mono text-xs uppercase tracking-widest text-neutral-600 font-normal">
                    What can we build or collaborate on?
                  </label>
                  <div className="relative">
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-neutral-300 hover:border-neutral-700 focus:border-neutral-950 py-3.5 pr-8 text-base sm:text-lg text-neutral-950 outline-none transition-colors font-hero-minimal font-normal cursor-pointer appearance-none rounded-none"
                    >
                      <option value="Studio: Build a New Product or Web App" className="bg-white text-neutral-900 py-2">Studio &bull; Build a New Product or Web App</option>
                      <option value="Engineering: Custom AI & Agent Systems" className="bg-white text-neutral-900 py-2">Engineering &bull; Custom AI &amp; Agent Systems</option>
                      <option value="AgentDiff: Enterprise Integration" className="bg-white text-neutral-900 py-2">AgentDiff &bull; Enterprise Integration &amp; CI Gating</option>
                      <option value="General Collaboration" className="bg-white text-neutral-900 py-2">Open Source &bull; General Collaboration</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Name & Email Inputs - Clean underline with high-contrast text and legible placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-neutral-600 font-normal">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-neutral-300 hover:border-neutral-700 focus:border-neutral-950 py-3.5 text-base sm:text-lg text-neutral-950 placeholder:text-neutral-400 outline-none transition-colors font-hero-minimal font-normal rounded-none"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-neutral-600 font-normal">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-neutral-300 hover:border-neutral-700 focus:border-neutral-950 py-3.5 text-base sm:text-lg text-neutral-950 placeholder:text-neutral-400 outline-none transition-colors font-hero-minimal font-normal rounded-none"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-neutral-600 font-normal">
                    Project Overview or Scope
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what product you want to build, timeline, or key technical requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-neutral-300 hover:border-neutral-700 focus:border-neutral-950 py-3.5 text-base sm:text-lg text-neutral-950 placeholder:text-neutral-400 outline-none transition-colors font-hero-minimal font-normal resize-none leading-relaxed rounded-none"
                  ></textarea>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <p className="font-mono text-xs text-rose-600 animate-in fade-in">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-xs text-neutral-500">
                    We typically reply within 24 hours.
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-950 hover:bg-neutral-800 active:scale-95 text-white font-mono text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

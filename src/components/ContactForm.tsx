import React, { useState, useRef } from 'react';
import { ArrowUpRight, Check, Loader2, ChevronDown } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef<HCaptcha>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Studio: Build a New Product or Web App',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      setErrorMessage('Please complete the captcha verification before submitting.');
      return;
    }

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
      formDataToSend.append('h-captcha-response', captchaToken);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setCaptchaToken('');
      } else {
        setErrorMessage(result.message || 'Unable to send message. Please try again.');
        captchaRef.current?.resetCaptcha();
        setCaptchaToken('');
      }
    } catch {
      setErrorMessage('Network issue. Please try submitting again.');
      captchaRef.current?.resetCaptcha();
      setCaptchaToken('');
    } finally {
      setLoading(false);
    }
  };

  const field =
    'w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 focus:border-white/40 focus:bg-white/[0.05] rounded-xl px-4 py-3.5 text-[15px] text-fg placeholder:text-faint outline-none transition-colors';
  const label = 'block text-[13px] text-dim mb-2';

  return (
    <section id="contact" className="relative border-t hairline scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(255,138,76,0.07),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 py-28 sm:py-36">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow mb-5">04 &mdash; Contact</p>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.035em] text-fg [text-wrap:balance]">
              Let's build <span className="serif-accent font-normal text-[1.08em]">together.</span>
            </h2>
            <p className="mt-6 text-dim leading-relaxed max-w-md">
              Alongside our own products, we partner with a small number of founders and teams to design
              and ship AI systems, developer tools and production web apps.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-[12px] text-dim">
              <span className="rounded-full border hairline px-3 py-1.5">Custom AI &amp; agents</span>
              <span className="rounded-full border hairline px-3 py-1.5">Full-stack products</span>
              <span className="rounded-full border hairline px-3 py-1.5">AgentDiff integration</span>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl border hairline bg-ink-2 p-6 sm:p-10">
            {submitted ? (
              <div className="py-10 space-y-6">
                <p className="text-2xl sm:text-3xl font-medium tracking-tight text-fg">
                  Received. We'll be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'Studio: Build a New Product or Web App', message: '' });
                  }}
                  className="text-sm text-dim hover:text-fg transition-colors cursor-pointer"
                >
                  &larr; Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="inquiryType" className={label}>What are you looking for?</label>
                  <div className="relative">
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className={`${field} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="Studio: Build a New Product or Web App" className="bg-ink-2">Build a new product or web app</option>
                      <option value="Engineering: Custom AI & Agent Systems" className="bg-ink-2">Custom AI &amp; agent systems</option>
                      <option value="AgentDiff: Enterprise Integration" className="bg-ink-2">AgentDiff integration &amp; CI gating</option>
                      <option value="General Collaboration" className="bg-ink-2">Something else</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-dim absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={label}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={label}>Tell us a little</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What you're building, rough timeline, anything we should know..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${field} resize-none leading-relaxed`}
                  ></textarea>
                </div>

                <HCaptcha
                  ref={captchaRef}
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    setErrorMessage('');
                  }}
                  onExpire={() => setCaptchaToken('')}
                  onError={() => {
                    setCaptchaToken('');
                    setErrorMessage('Captcha verification error. Please retry.');
                  }}
                  theme="dark"
                />

                {errorMessage && <p className="text-sm text-rose-400">{errorMessage}</p>}

                <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[13px] text-faint">We usually reply within a day.</span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-fg text-ink text-sm font-medium hover:bg-white active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="w-4 h-4" />
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

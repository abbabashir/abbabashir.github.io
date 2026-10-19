import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import SocialLinks from '../components/SocialLinks';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate reliable frontend network request
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 900);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Initiate Collaboration"
        title="Let's Build Something Meaningful."
        subtitle="Whether you have an idea, a product to build, an architectural challenge, or simply want to talk technology, I'd love to hear from you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Information Panel */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-8 sm:p-10 flex flex-col justify-between h-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Direct Communication Channel
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Open for Consultations &amp; Engineering Roles
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              Based in Abuja, Nigeria, and available for remote and hybrid engagements worldwide. I respond promptly within 24 hours.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-500">Email Directly</div>
                  <a href="mailto:bashiraliyu.dev@gmail.com" className="hover:text-blue-400 transition-colors">
                    bashiraliyu.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-500">Location</div>
                  <span>Abuja, Nigeria (UTC +1)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06]">
            <div className="text-xs font-mono text-zinc-400 mb-3">
              Connect Across Networks:
            </div>
            <SocialLinks showLabel={false} />
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-8 sm:p-10">
          {status === 'success' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched!</h3>
              <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
                Thank you for reaching out, {formData.name}. I've received your note and will be in touch shortly.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-full text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-zinc-400">
                    Your Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 focus:border-blue-500/60 focus:bg-zinc-900 focus:outline-none text-sm text-white placeholder:text-zinc-600 transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-zinc-400">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 focus:border-blue-500/60 focus:bg-zinc-900 focus:outline-none text-sm text-white placeholder:text-zinc-600 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono text-zinc-400">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Distributed System Project / AI Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 focus:border-blue-500/60 focus:bg-zinc-900 focus:outline-none text-sm text-white placeholder:text-zinc-600 transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-zinc-400">
                  Message <span className="text-blue-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or engineering inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 focus:border-blue-500/60 focus:bg-zinc-900 focus:outline-none text-sm text-white placeholder:text-zinc-600 transition-all resize-none"
                  required
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg shadow-white/5 active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import StickyMenu from "../components/StickyMenu";
import Footer from "../components/Footer";
import QuoteModal from "../components/QuoteModal";
import { QuoteModalProvider, useQuoteModal } from "../components/QuoteModalContext";

/*
  Contact — YellowSun Power
  Same token family as the rest of the site: charcoal #14120F, gold
  #F2A93B, amber #C6660B, paper #F5EFE3, stone #A69C88, ink-soft
  #6B6355, hairline #E4DCC8.

  Two distinct paths, kept deliberately separate: a short general
  message form here (for anyone who just has a question, not a full
  project brief) sent via WhatsApp like the rest of the site's forms,
  and a link back to the full quote intake (QuoteModal) for anyone
  ready to request an actual estimate — reusing that form instead of
  duplicating its budget/equipment fields here.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const WHATSAPP_NUMBER = "212649139720";

const CHANNELS = [
  {
    label: "Téléphone",
    value: "+212 649-139720",
    href: "tel:+212649139720",
    icon: (
      <path
        d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "WhatsApp",
    value: "+212 649-139720",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: (
      <path
        d="M12 3C7.3 3 3.5 6.8 3.5 11.5C3.5 13 3.9 14.4 4.6 15.6L3.5 20L8 18.9C9.2 19.5 10.5 19.9 12 19.9C16.7 19.9 20.5 16.1 20.5 11.4C20.5 6.8 16.7 3 12 3Z M8.5 8.5C8.7 8.1 9 8.1 9.3 8.1C9.5 8.1 9.7 8.1 9.9 8.5C10.1 8.9 10.6 10.1 10.6 10.2C10.7 10.3 10.7 10.5 10.6 10.6C10.3 11.2 9.9 11.3 10.2 11.8C10.8 12.9 11.6 13.6 12.7 14.1C12.9 14.2 13.1 14.2 13.2 14C13.5 13.7 13.8 13.1 14.1 12.9C14.3 12.7 14.5 12.8 14.7 12.9C14.9 13 16 13.6 16.3 13.7C16.5 13.8 16.6 13.9 16.7 14C16.7 14.2 16.7 14.8 16.4 15.4C16.1 16 15 16.6 14.5 16.6C13.1 16.7 11.7 16.1 10.5 15.5C8.5 14.4 7.1 12.6 6.9 12.3C6.7 12 6 11 6 9.9C6 8.9 6.5 8.4 6.7 8.2C6.9 8 7.1 7.9 7.3 7.9C7.5 7.9 7.7 7.9 7.9 7.9C8.1 7.9 8.3 7.9 8.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Email",
    value: "contact@yellowsunpower.com",
    href: "mailto:contact@yellowsunpower.com",
    icon: (
      <path
        d="M4 6h16v12H4z M4 6l8 7 8-7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
];

const initialForm = { name: "", contact: "", message: "" };

function QuoteLinkCTA() {
  const { openModal } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={openModal}
      className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#F5EFE3]/25 px-6 py-3 text-sm font-semibold text-[#F5EFE3] transition-colors duration-200 hover:border-[#F2A93B]/50 hover:text-[#F2A93B]"
    >
      Demander un devis détaillé
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7H12M12 7L8 3M12 7L8 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Indiquez votre nom.";
    if (!form.contact.trim()) next.contact = "Indiquez un email ou un téléphone.";
    if (!form.message.trim()) next.message = "Écrivez votre message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      "Nouveau message depuis le site",
      `Nom : ${form.name}`,
      `Contact : ${form.contact}`,
      `Message : ${form.message}`,
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2A93B]/10 text-[#F2A93B]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-lg font-semibold text-[#F5EFE3]">Message envoyé</p>
        <p className="text-sm leading-relaxed text-[#A69C88]">
          Votre message a été transmis sur WhatsApp. Nous vous répondons
          sous 48h.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setSent(false);
          }}
          className="mt-2 text-sm font-semibold text-[#F2A93B] hover:text-[#C6660B]"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="ct-name" className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80">
          Nom complet
        </label>
        <input
          id="ct-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Votre nom et prénom"
          className="mt-2.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
        />
        {errors.name && <p className="mt-1.5 text-xs text-[#E0664A]">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="ct-contact" className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80">
          Email ou téléphone
        </label>
        <input
          id="ct-contact"
          type="text"
          value={form.contact}
          onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
          placeholder="vous@email.com ou +212 6XX-XXXXXX"
          className="mt-2.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
        />
        {errors.contact && <p className="mt-1.5 text-xs text-[#E0664A]">{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="ct-message" className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80">
          Message
        </label>
        <textarea
          id="ct-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Comment pouvons-nous vous aider ?"
          className="mt-2.5 w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
        />
        {errors.message && <p className="mt-1.5 text-xs text-[#E0664A]">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#F2A93B] px-6 py-3 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B]"
      >
        Envoyer le message
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <QuoteModalProvider>
      <main className={`${montserrat.variable} font-[family-name:var(--font-nav)]`}>
        <StickyMenu />

        {/* Intro */}
        <section className="relative w-full bg-[#14120F] pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-48">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F2A93B]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2A93B]">
                Contact
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-[clamp(2rem,3.4vw+1rem,3.6rem)] font-medium leading-[1.1] tracking-tight text-[#F5EFE3]">
              Parlons de votre projet.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5EFE3]/70 sm:text-lg">
              Une question, un projet en tête, ou simplement envie d&rsquo;en
              savoir plus&nbsp;? Notre équipe vous répond sous 48h,
              où que vous soyez au Maroc.
            </p>
          </div>
        </section>

        {/* Channels + form */}
        <section className="w-full bg-[#0C0A08] pb-24 pt-14 sm:pb-32 sm:pt-16">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="border-t border-white/10 pt-14 sm:pt-16">
              <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              {/* Left: direct channels */}
              <div>
                <div className="flex flex-col gap-4">
                  {CHANNELS.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.label === "WhatsApp" ? "_blank" : undefined}
                      rel={channel.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-200 hover:border-[#F2A93B]/40"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14120F] text-[#F2A93B] transition-colors duration-200 group-hover:bg-[#F2A93B] group-hover:text-[#14120F]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          {channel.icon}
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A69C88]">
                          {channel.label}
                        </p>
                        <p className="mt-0.5 text-base font-medium text-[#F5EFE3]">
                          {channel.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-[#F2A93B]">
                    <path
                      d="M12 22C12 22 19 15.5 19 10C19 5.6 15.9 2 12 2C8.1 2 5 5.6 5 10C5 15.5 12 22 12 22Z M12 12.5C13.4 12.5 14.5 11.4 14.5 10C14.5 8.6 13.4 7.5 12 7.5C10.6 7.5 9.5 8.6 9.5 10C9.5 11.4 10.6 12.5 12 12.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-[#F5EFE3]">
                      Zone d&rsquo;intervention
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#A69C88]">
                      Intervention partout au Maroc — étude technique
                      gratuite quel que soit votre emplacement.
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="text-sm leading-relaxed text-[#A69C88]">
                    Un projet déjà en tête&nbsp;? Passez directement par
                    notre formulaire de devis détaillé.
                  </p>
                  <div className="mt-4">
                    <QuoteLinkCTA />
                  </div>
                </div>
              </div>

              {/* Right: general message form */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2A93B]">
                  Un message
                </p>
                <h2 className="mt-3 text-xl font-semibold text-[#F5EFE3] sm:text-2xl">
                  Écrivez-nous
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#A69C88]">
                  Pour une question générale — le formulaire est transmis
                  directement sur WhatsApp.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        <Footer />
        <QuoteModal />
      </main>
    </QuoteModalProvider>
  );
}

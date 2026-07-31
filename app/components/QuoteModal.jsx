"use client";

import { useEffect, useRef, useState } from "react";
import { Montserrat } from "next/font/google";
import { useQuoteModal } from "./QuoteModalContext";

/*
  Quote request modal — YellowSun Power
  Same token system as the rest of the site: charcoal #14120F, gold
  #F2A93B, amber #C6660B, paper #F5EFE3, stone #A69C88.

  Single-screen form (no multi-step wizard) so it stays quick to fill.
  Budget and equipment collapse into dropdowns (rather than a long
  stack of pills) to keep the form short enough to fit without
  scrolling on desktop; the dialog itself is wide with a two-column
  layout for the same reason. On submit, the lead is handed off to
  WhatsApp — pre-filled with every answer — since that's the channel
  already surfaced in the footer and requires no backend.
*/

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nav",
});

const WHATSAPP_NUMBER = "212649139720";

const PROJECT_TYPES = ["Villa", "Riad", "Hôtel", "Usine", "Entreprise", "Carport"];

const BUDGETS = [
  "1000 - 2500 MAD",
  "2500 - 5000 MAD",
  "5000 - 7500 MAD",
  "7500 - 10 000 MAD",
  "Plus de 10 000 MAD",
];

const EQUIPMENT = [
  "Climatisation",
  "Piscine",
  "Pompe à chaleur piscine",
  "Chauffe-eau électrique",
  "Sauna/Hammam",
];

const initialForm = {
  projectType: "",
  city: "",
  budget: "",
  equipment: [],
  fullName: "",
  phone: "",
  email: "",
};

function useOutsideClick(ref, onOutside) {
  useEffect(() => {
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [ref, onOutside]);
}

function DropdownChevron({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 9 9"
      fill="none"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 3L4.5 6.5L8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function SelectDropdown({ id, label, placeholder, options, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#F5EFE3]/80 lg:whitespace-nowrap"
      >
        {label}
      </label>
      <div ref={ref} className="relative mt-2.5">
        <button
          id={id}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
            open ? "border-[#F2A93B]/60" : "border-white/15 hover:border-[#F2A93B]/40"
          } bg-white/[0.03] ${value ? "text-[#F5EFE3]" : "text-[#A69C88]/70"}`}
        >
          <span className="truncate">{value || placeholder}</span>
          <DropdownChevron open={open} />
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#1E1A13] shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                  value === option
                    ? "bg-[#F2A93B]/10 text-[#F2A93B]"
                    : "text-[#F5EFE3]/85 hover:bg-white/5"
                }`}
              >
                {option}
                {value === option && (
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5L4 8L9 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-[#E0664A]">{error}</p>}
    </div>
  );
}

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll + close on Escape while open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeModal]);

  // Reset to a clean form each time the modal is opened
  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleEquipment = (item) => {
    setForm((f) => ({
      ...f,
      equipment: f.equipment.includes(item)
        ? f.equipment.filter((e) => e !== item)
        : [...f.equipment, item],
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.projectType) next.projectType = "Sélectionnez un type de projet.";
    if (!form.city.trim()) next.city = "Indiquez votre ville.";
    if (!form.budget) next.budget = "Sélectionnez un budget.";
    if (!form.fullName.trim()) next.fullName = "Indiquez votre nom complet.";
    if (!form.phone.trim()) next.phone = "Indiquez un numéro de téléphone.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      "Nouvelle demande d'étude solaire gratuite",
      `Type de projet : ${form.projectType}`,
      `Ville : ${form.city}`,
      `Budget électrique mensuel : ${form.budget}`,
      `Équipements : ${form.equipment.length ? form.equipment.join(", ") : "Aucun"}`,
      `Nom complet : ${form.fullName}`,
      `Téléphone / WhatsApp : ${form.phone}`,
      form.email.trim() ? `Email : ${form.email}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const fieldError = (key) =>
    errors[key] ? (
      <p className="mt-1.5 text-xs text-[#E0664A]">{errors[key]}</p>
    ) : null;

  return (
    <div
      className={`${montserrat.variable} font-[family-name:var(--font-nav)] fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0C0A08]/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Dialog */}
      <div className="relative flex max-h-[94dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17140F] shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:max-h-[90dvh] sm:max-w-2xl sm:rounded-3xl lg:max-w-3xl">
        {/* Ambient glow accent, echoes hero */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.25)_0%,rgba(242,169,59,0)_70%)] blur-2xl" />

        {/* Close button */}
        <button
          type="button"
          aria-label="Fermer"
          onClick={closeModal}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F5EFE3]/70 transition-colors duration-200 hover:border-[#F2A93B]/40 hover:text-[#F2A93B]"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F2A93B]/10 text-[#F2A93B]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#F5EFE3]">Demande envoyée</h3>
            <p className="max-w-xs text-sm leading-relaxed text-[#A69C88]">
              Votre demande a été transmise sur WhatsApp. Un conseiller
              YellowSun Power revient vers vous sous 48h avec votre
              estimation.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-2 rounded-full bg-[#F2A93B] px-6 py-2.5 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B]"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="relative border-b border-white/10 px-6 pb-5 pt-7 sm:px-8 sm:pt-8">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2A93B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B]" />
                Sans engagement
              </span>
              <h2
                id="quote-modal-title"
                className="mt-3 pr-8 text-xl font-semibold leading-tight text-[#F5EFE3] sm:text-2xl"
              >
                Étude solaire gratuite
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#A69C88]">
                Recevez une estimation gratuite et sans engagement adaptée
                à votre consommation électrique.
              </p>
            </div>

            {/* Form body (scrollable only if it overflows) */}
            <form
              onSubmit={handleSubmit}
              className="quote-modal-scroll flex flex-1 flex-col overflow-y-auto px-6 py-6 sm:px-8"
            >
              <div className="flex flex-col gap-6">
                {/* Project type */}
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80">
                    Quel est votre type de projet ?<span className="text-[#F2A93B]">*</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, projectType: type }))}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          form.projectType === type
                            ? "border-[#F2A93B] bg-[#F2A93B] text-[#14120F]"
                            : "border-white/15 bg-white/[0.03] text-[#F5EFE3]/80 hover:border-[#F2A93B]/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {fieldError("projectType")}
                </fieldset>

                {/* City + Budget */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="qm-city"
                      className="block text-[10px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#F5EFE3]/80 lg:whitespace-nowrap"
                    >
                      Dans quelle ville se situe votre projet ?
                      <span className="text-[#F2A93B]">*</span>
                    </label>
                    <input
                      id="qm-city"
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      placeholder="Ex. Marrakech"
                      className="mt-2.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
                    />
                    {fieldError("city")}
                  </div>

                  <SelectDropdown
                    id="qm-budget"
                    label={
                      <>
                        Quel est votre budget électrique mensuel ?
                        <span className="text-[#F2A93B]">*</span>
                      </>
                    }
                    placeholder="Sélectionnez un budget"
                    options={BUDGETS}
                    value={form.budget}
                    onChange={(budget) => setForm((f) => ({ ...f, budget }))}
                    error={errors.budget}
                  />
                </div>

                {/* Equipment */}
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80">
                    Quels équipements électriques possédez-vous dans votre
                    propriété ?
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {EQUIPMENT.map((item) => {
                      const checked = form.equipment.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleEquipment(item)}
                          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                            checked
                              ? "border-[#F2A93B] bg-[#F2A93B] text-[#14120F]"
                              : "border-white/15 bg-white/[0.03] text-[#F5EFE3]/80 hover:border-[#F2A93B]/40"
                          }`}
                        >
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border ${
                              checked ? "border-[#14120F] bg-[#14120F]" : "border-white/30"
                            }`}
                          >
                            {checked && (
                              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                <path d="M1 5L4 8L9 1.5" stroke="#F2A93B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Contact details */}
                <div className="grid grid-cols-1 gap-5 border-t border-white/10 pt-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="qm-name"
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80"
                    >
                      Nom complet<span className="text-[#F2A93B]">*</span>
                    </label>
                    <input
                      id="qm-name"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      placeholder="Votre nom et prénom"
                      className="mt-2.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
                    />
                    {fieldError("fullName")}
                  </div>

                  <div>
                    <label
                      htmlFor="qm-phone"
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80"
                    >
                      Téléphone / WhatsApp<span className="text-[#F2A93B]">*</span>
                    </label>
                    <input
                      id="qm-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+212 6XX-XXXXXX"
                      className="mt-2.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
                    />
                    {fieldError("phone")}
                  </div>

                  <div>
                    <label
                      htmlFor="qm-email"
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5EFE3]/80"
                    >
                      Adresse email
                    </label>
                    <input
                      id="qm-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="vous@email.com"
                      className="mt-2.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5EFE3] placeholder:text-[#A69C88]/60 outline-none transition-colors duration-150 focus:border-[#F2A93B]/60"
                    />
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-[#A69C88]/80">
                  Vos données ne sont utilisées que pour préparer votre
                  estimation.
                </p>
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#F2A93B] px-6 py-3 text-sm font-semibold text-[#14120F] transition-colors duration-200 hover:bg-[#C6660B]"
                >
                  Recevoir mon étude gratuite
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

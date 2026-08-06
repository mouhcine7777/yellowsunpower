"use client";

import { useLocale } from "../lib/locale";

/*
  Floating WhatsApp button — YellowSun Power
  Fixed bottom-right on every page, opens WhatsApp with a pre-filled
  message. WhatsApp's own brand green is used here rather than the
  site's gold, since the point is instant recognition of the channel,
  not brand-token consistency.
*/

const WHATSAPP_NUMBER = "212649139720";

const TEXT = {
  fr: {
    message:
      "Bonjour YellowSun Power, je souhaite obtenir une étude gratuite pour une installation solaire.",
    label: "Contacter YellowSun Power sur WhatsApp",
  },
  en: {
    message:
      "Hello YellowSun Power, I would like to get a free assessment for a solar installation.",
    label: "Contact YellowSun Power on WhatsApp",
  },
  nl: {
    message:
      "Hallo YellowSun Power, ik zou graag een gratis onderzoek willen voor een zonne-installatie.",
    label: "Neem contact op met YellowSun Power via WhatsApp",
  },
};

export default function FloatingWhatsApp() {
  const locale = useLocale();
  const t = TEXT[locale];
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.label}
      className="ysp-whatsapp-fab fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-110 sm:bottom-7 sm:right-7"
    >
      <span className="ysp-whatsapp-ping pointer-events-none absolute inset-0 rounded-full bg-[#25D366]" />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="relative">
        <path
          d="M8.5 7.5C8.7 7 9.1 7 9.4 7C9.6 7 9.9 7 10.1 7.5C10.3 8 10.9 9.4 11 9.5C11.1 9.6 11.1 9.8 11 10C10.7 10.6 10.3 10.7 10.6 11.3C11.3 12.5 12.2 13.4 13.5 13.9C13.7 14 13.9 14 14.1 13.8C14.4 13.4 14.7 12.8 15 12.6C15.2 12.4 15.5 12.5 15.7 12.6C15.9 12.7 17.1 13.3 17.4 13.5C17.6 13.6 17.8 13.7 17.8 13.9C17.9 14.1 17.9 14.8 17.5 15.5C17.2 16.1 16 16.8 15.4 16.8C13.9 16.9 12.3 16.3 11 15.6C8.8 14.5 7.3 12.5 7 12.2C6.8 11.9 6 10.8 6 9.6C6 8.5 6.5 8 6.7 7.7C6.9 7.5 7.2 7.4 7.4 7.4C7.6 7.4 7.8 7.4 8 7.4C8.2 7.4 8.4 7.4 8.5 7.5Z"
          fill="#FFFFFF"
        />
        <path
          d="M12 2C6.5 2 2 6.4 2 11.8C2 13.6 2.5 15.3 3.4 16.8L2 22L7.5 20.6C9 21.4 10.5 21.8 12 21.8C17.5 21.8 22 17.4 22 11.9C22 6.4 17.5 2 12 2Z"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>

      <style>{`
        @keyframes ysp-whatsapp-ping {
          0% { transform: scale(1); opacity: 0.55; }
          75%, 100% { transform: scale(1.9); opacity: 0; }
        }
        .ysp-whatsapp-ping {
          animation: ysp-whatsapp-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ysp-whatsapp-ping {
            animation: none;
            display: none;
          }
        }
      `}</style>
    </a>
  );
}

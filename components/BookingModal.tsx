
"use client";

import { useEffect, useRef, useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  isOpen,
  onClose,
}: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement>
  ) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  const [minDate, setMinDate] = useState("");

useEffect(() => {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  setMinDate(localDate);
}, []);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl bg-white p-0 text-[#171717] shadow-2xl backdrop:bg-[#171717]/60 backdrop:backdrop-blur-md sm:w-[94%] sm:rounded-3xl"
    >
      <div className="relative flex min-h-full flex-col p-5 pt-16 sm:p-8 sm:pt-16 md:p-10 md:pt-16 lg:p-14 lg:pt-16">

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close booking modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#171717]/10 bg-white text-[#171717] transition-all duration-300 hover:rotate-90 hover:bg-[#075874] hover:text-white sm:right-6 sm:top-6 sm:h-10 sm:w-10"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <form
          className="flex w-full flex-col gap-7 sm:gap-9"
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          {/* Heading */}
          <div className="max-w-xl pr-2 sm:pr-12">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#075874] sm:mb-3 sm:text-xs sm:tracking-[0.15em]">
              Your New smile starts here
            </span>

            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
              Book an
              <br />
              Appointment<span className="text-[#075874]">.</span>
            </h2>

            <p className="mt-3 max-w-md text-xs leading-relaxed text-[#171717]/55 sm:mt-4 sm:text-sm md:text-base">
              Schedule your visit with our dental team. Fill in your
              details and let us help you take the next step towards
              a healthier smile.
            </p>
          </div>

          {/* Input Grid */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-8">

            {/* Name */}
            <div className="min-w-0 border-b border-[#171717]/15 pb-3 transition-colors focus-within:border-[#075874]">
              <label
                htmlFor="booking-name"
                className="mb-2 block text-[12px] font-bold uppercase tracking-[1] text-[#00000]/50"
              >
                Full Name
              </label>

              <input
                id="booking-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full min-w-0 bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#171717]/30 sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="min-w-0 border-b border-[#171717]/15 pb-3 transition-colors focus-within:border-[#075874]">
              <label
                htmlFor="booking-email"
                className="mb-2 block text-[12px] font-bold uppercase tracking-[1] text-[#00000]/50"
              >
                Email Address
              </label>

              <input
                id="booking-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full min-w-0 bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#171717]/30 sm:text-base"
              />
            </div>

            {/* Phone */}
            <div className="min-w-0 border-b border-[#171717]/15 pb-3 transition-colors focus-within:border-[#075874]">
              <label
                htmlFor="booking-phone"
                className="mb-2 block text-[12px] font-bold uppercase tracking-[1] text-[#00000]/50"
              >
                Phone Number
              </label>

              <input
                id="booking-phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
                className="w-full min-w-0 bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#171717]/30 sm:text-base"
              />
            </div>

            {/* Service */}
            <div className="min-w-0 border-b border-[#171717]/15 pb-3 transition-colors focus-within:border-[#075874]">
              <label
                htmlFor="booking-service"
                className="mb-2 block text-[12px] font-bold uppercase tracking-[1] text-[#00000]/50"
              >
                Dental Service
              </label>

              <select
                id="booking-service"
                name="service"
                defaultValue=""
                required
                className="w-full min-w-0 cursor-pointer appearance-none bg-transparent text-sm text-[#171717] outline-none sm:text-base"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="general-dentistry">
                  General Dentistry
                </option>
                <option value="teeth-whitening">
                  Teeth Whitening
                </option>
                <option value="dental-implants">
                  Dental Implants
                </option>
                <option value="orthodontics">
                  Orthodontics
                </option>
                <option value="dental-hygiene">
                  Dental Hygiene
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Appointment Date */}
            <div className="min-w-0 border-b border-[#171717]/15 pb-3 transition-colors focus-within:border-[#075874]">
              <label
                htmlFor="booking-date"
                className="mb-2 block text-[12px] font-bold uppercase tracking-[1] text-[#00000]/50"
              >
                Preferred Date
              </label>

              <input
  name="date"
  type="date"
  min={minDate}
  required
  className="block w-full min-w-0 max-w-full cursor-pointer bg-transparent text-sm text-[#171717] outline-none sm:text-base"
/>
            </div>

            {/* Additional Information */}
            <div className="min-w-0 border-b border-[#171717]/15 pb-3 transition-colors focus-within:border-[#075874]">
              <label
                htmlFor="booking-message"
                className="mb-2 block text-[12px] font-bold uppercase tracking-[1] text-[#00000]/50"
              >
                Additional Information
              </label>

              <input
                id="booking-message"
                name="message"
                type="text"
                placeholder="Anything we should know? (Optional)"
                className="w-full min-w-0 bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#171717]/30 sm:text-base"
              />
            </div>
          </div>

          {/* Submit Area */}
          <div className="flex w-full flex-col gap-5  pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-7">

            <p className="max-w-sm text-[11px] leading-relaxed text-[#171717]/50 sm:text-xs">
              By submitting this form, you agree to our{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#075874] underline underline-offset-2 transition-colors hover:text-[#171717]"
              >
                Privacy Policy
              </a>.
            </p>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#075874] px-6 py-4 text-xs font-semibold text-white shadow-lg shadow-[#075874]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#171717] hover:shadow-xl sm:w-auto sm:px-8 sm:text-sm"
            >
              {/* Calendar Check Icon */}
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18M9 16l2 2 4-4" />
              </svg>

              <span>Request Appointment</span>

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

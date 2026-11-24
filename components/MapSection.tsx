"use client";

export default function MapSection() {
  return (
    <div className="relative w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4731.5678581588945!2d36.80188347568973!3d-1.2610852356006064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173fef16c75d%3A0x14bd28df0aa1b2db!2sKonfiDental%20Clinic!5e1!3m2!1sen!2ske!4v1795500008334!5m2!1sen!2ske"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="KonfiDental Clinic location"
      />
    </div>
  );
}
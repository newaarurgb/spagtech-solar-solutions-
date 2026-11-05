const whatsappLink =
  "https://wa.me/918433646019?text=" +
  encodeURIComponent(
    "Hello SPAGTECH! I would like to enquire about your solar installation services."
  );

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SPAGTECH on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        className="whatsapp-logo"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16 .5A15.4 15.4 0 0 0 2.7 23.7L.6 31.4l8-2.1A15.5 15.5 0 1 0 16 .5Zm0 28.2c-2.4 0-4.7-.7-6.7-2l-.5-.3-4.7 1.2 1.3-4.6-.3-.5a12.8 12.8 0 1 1 10.9 6.2Zm7-9.6c-.4-.2-2.1-1-2.5-1.1-.3-.1-.6-.2-.8.2-.3.4-.9 1.1-1.1 1.3-.2.3-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7l-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.1.7-.1 2.1-.9 2.4-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"
        />
      </svg>
    </a>
  );
}

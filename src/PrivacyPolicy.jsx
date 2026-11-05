import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <header className="privacy-heading">
        <span className="privacy-eyebrow">SPAGTECH SOLAR SOLUTIONS</span>
        <h1>Privacy policy</h1>
        <p>How we handle information when you visit our website or chat with Sunny AI.</p>
        <small>Effective date: November 5, 2026</small>
      </header>

      <article className="privacy-content">
        <section>
          <h2>1. About this policy</h2>
          <p>
            This policy applies to the SPAGTECH Solar Solutions website and its
            Sunny AI chat assistant. It explains what information may be shared
            when you contact us or use the assistant, why it is used, and how
            to reach us with privacy questions.
          </p>
        </section>

        <section>
          <h2>2. Information you choose to provide</h2>
          <p>
            If you contact SPAGTECH by email or WhatsApp, your message may
            include your name, contact details, property or location details,
            electricity usage, and solar requirements. We use that information
            to respond to your enquiry and discuss relevant services.
          </p>
        </section>

        <section>
          <h2>3. Sunny AI conversations</h2>
          <p>
            When you send a message to Sunny, the conversation messages needed
            to answer you are sent to SPAGTECH&apos;s chat service and Google&apos;s
            Gemini AI service. The chat is held in the current page while you
            use it and is cleared when you reset the conversation or reload the
            page. Service providers may process information under their own
            privacy terms and retention practices.
          </p>
          <p>
            Please do not share passwords, payment details, government
            identification numbers, or other sensitive personal information
            with Sunny. AI replies can be incomplete or inaccurate and are
            general information, not a confirmed quote, booking, or
            professional advice.
          </p>
        </section>

        <section>
          <h2>4. How information is used and shared</h2>
          <p>
            We use enquiry and chat information to provide responses, help you
            understand solar options, and operate and protect the website and
            chat service. We do not sell your personal information. Information
            is shared only as needed with service providers that support
            communications, hosting, or AI responses, or when disclosure is
            required by law.
          </p>
          <p>
            WhatsApp and Google Gemini are third-party services. The homepage
            also links to a YouTube video; opening it takes you to YouTube,
            where its privacy policy and terms apply. These providers may
            process technical information such as your IP address and browser
            details when you use their services.
          </p>
        </section>

        <section>
          <h2>5. Retention and security</h2>
          <p>
            SPAGTECH does not provide a fixed retention period for enquiries;
            information may be kept as needed to respond and maintain business
            records. The website chat itself is not saved in your browser after
            the page is reloaded, but service providers may handle or retain
            information according to their own policies. We take reasonable
            steps to protect information, but no online service can guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2>6. Your choices and questions</h2>
          <p>
            You can choose not to provide personal information, though we may
            then be unable to respond to an enquiry. To ask about a message you
            sent to SPAGTECH or raise a privacy concern, contact us at{" "}
            <a href="mailto:spagtechs@gmail.com">spagtechs@gmail.com</a>.
            Requests relating to WhatsApp or Google services should be directed
            to those providers.
          </p>
        </section>

        <section>
          <h2>7. Changes to this policy</h2>
          <p>
            We may update this policy when our website or services change. The
            effective date at the top indicates when this version was last
            updated.
          </p>
        </section>

        <Link className="privacy-back-link" to="/">
          Back to SPAGTECH
        </Link>
      </article>
    </main>
  );
}

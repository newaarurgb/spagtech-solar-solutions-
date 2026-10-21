
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    question: "What types of solar systems does SPAGTECH offer?",
    answer:
      "We offer on-grid, off-grid, and hybrid solar systems. The right solution depends on your electricity usage, budget, and whether you need backup power during outages.",
  },
  {
    question: "How much can I save with solar panels?",
    answer:
      "Your savings depend on your electricity consumption, system capacity, sunlight, local electricity tariffs, and applicable policies. Contact us for a solution tailored to your needs.",
  },
  {
    question: "How long does solar installation take?",
    answer:
      "Installation time depends on the system size, site conditions, and approvals. After assessing your property, our team can provide a more accurate timeline.",
  },
  {
    question: "Will my solar system work during a power cut?",
    answer:
      "A standard grid-connected system usually shuts down during a power cut for safety. A suitably configured hybrid or off-grid system can provide backup when paired with the appropriate battery and equipment.",
  },
  {
    question: "Do solar panels require regular maintenance?",
    answer:
      "Solar panels generally require minimal maintenance. Periodic cleaning when needed, visual inspections, and system performance checks help keep your installation working efficiently.",
  },
  {
    question: "How can I get a quotation for my property?",
    answer:
      "Contact SPAGTECH through WhatsApp or email. Share your location, electricity bill or average monthly consumption, and your requirements so we can help you explore suitable options.",
  },
];

const whatsappLink =
  "https://wa.me/918433646019?text=" +
  encodeURIComponent(
    "Hello SPAGTECH! I have some questions about your solar solutions."
  );

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-heading">
          <span className="faq-eyebrow">GOT QUESTIONS?</span>
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>
          <p>
            Everything you need to know before making the switch to solar.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
                key={faq.question}
              >
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                >
                  <span className="faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-question-text">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className="faq-chevron"
                    size={21}
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-contact">
          <div>
            <h3>Still have questions?</h3>
            <p>Our team is happy to help you find the right solar solution.</p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-contact-button"
          >
            <MessageCircle size={18} />
            Ask Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

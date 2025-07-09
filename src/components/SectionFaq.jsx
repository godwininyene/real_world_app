const SectionFaq = () => {
  const faqs = [
    {
      question: "Will these methods work even if I don't have a lot of time?",
      answer: "Yes, of course. Our methods work for anybody, regardless of your current personal situation. As long as you have internet access and an hour a day, you'll make money with them."
    },
    {
      question: "I heard the price is going to increase, is that true?",
      answer: "The price may increase in the future. Therefore I highly recommend you to get in while it's still this low. If you join at the current price, you'll be grandfathered to the price you subscribed with."
    },
    {
      question: "Does it work if my English isn't very good?",
      answer: "If you managed to read these words, the answer is: Yes."
    },
    {
      question: "Where can I ask any question about joining TRW?",
      answer: "You can use the chat function on this page (bottom right corner) to start a chat with support. They are there to answer any question."
    }
  ];

  return (
    <section className="py-20 bg-bg-darker">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-lighter">
            Frequently asked <span className="text-primary hover:text-primary-light transition-colors">questions</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto"></div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-card-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6 cursor-pointer bg-card hover:bg-card/90 transition-colors">
                <h3 className="text-lg font-semibold text-text-lighter flex justify-between items-center group-hover:text-white transition-colors">
                  {faq.question}
                  <svg className="w-5 h-5 text-primary group-hover:text-primary-light transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </h3>
              </div>
              <div className="p-6 pt-0">
                <p className="text-text-light group-hover:text-text-lighter transition-colors">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA (commented out but styled for dark mode) */}
        {/* <div className="text-center mt-12">
          <p className="text-lg mb-6 text-text-light">
            Still have questions? Our support team is ready to help.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg">
            Contact support
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default SectionFaq;
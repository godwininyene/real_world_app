import { FaCheck } from 'react-icons/fa';

const SectionSubscription = () => {
  const features = [
    "Simple step-by-step tutorials",
    "19 wealth creation methods",
    "Access to millionaire mentors",
    "Community chat groups",
    "No experience needed",
    "New, custom-made app",
    "Price locked forever"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-bg-light to-bg-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-lighter">
            <span className="text-primary hover:text-primary-light transition-colors">REALITY</span> OF RESULTS
          </h2>
          <p className="text-lg mb-6 text-text-light">
            The real world is based on the reality of results. Our success is only measured by the success of our students.
          </p>
          <p className="text-lg text-text-light">
            We are here to show you a proven path to financial freedom and guide you each step of the way.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mt-8"></div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Value Proposition */}
          <div className="bg-card p-8 rounded-xl shadow-2xl border border-card-border hover:border-primary/50 transition-colors group">
            <h3 className="text-2xl font-bold mb-4 text-text-lighter group-hover:text-white transition-colors">TRANSFORM YOUR FUTURE</h3>
            <p className="text-text-light mb-6 group-hover:text-text-lighter transition-colors">
              WE TAKE GREAT PRIDE IN TRANSFORMING AMBITIOUS STUDENTS INTO HARDWORKING, WEALTHY, AND FULFILLED WINNERS.
            </p>
            
            {/* Feature List */}
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-5 h-5 mr-3 mt-0.5 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <FaCheck className="text-primary group-hover:text-primary-light transition-colors" />
                  </div>
                  <span className="text-text-light group-hover:text-text-lighter transition-colors">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Pricing */}
          <div className="bg-gradient-to-b from-primary to-primary-dark text-white p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">$49.99</div>
              <div className="text-lg opacity-90">Entry Fee</div>
            </div>
            <div className="text-center mb-8">
              <div className="text-4xl font-bold mb-2">$49.99</div>
              <div className="text-lg opacity-90">every month afterwards</div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg mb-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
              <p className="text-center font-medium">
                JOIN 200,000+ STUDENTS WHO'VE TAKEN CONTROL OF THEIR FINANCIAL FUTURE
              </p>
            </div>
            
            <button className="w-full py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 hover:text-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              START YOUR JOURNEY TODAY
            </button>
          </div>
        </div>

        {/* Testimonial/CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg italic mb-8 text-text-light">
            "The Real World transformed my approach to wealth building. Within 6 months I went from broke to $10k/month."
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            JOIN THE REAL WORLD
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionSubscription;
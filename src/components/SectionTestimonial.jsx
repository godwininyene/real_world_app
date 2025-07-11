import testify_1 from './../assets/images/testify_1.webp';
import testify_2 from './../assets/images/testify-2.jpg';
import testify_3 from './../assets/images/testify-3.avif';
import testify_4 from './../assets/images/testify-4.jpg';
import { Link } from 'react-router-dom';

const SectionTestimonial = () => {
  const testimonials = [
    {
      name: "JASON M.",
      role: "E-commerce Entrepreneur",
      quote: "Went from $0 to $35k/month in 8 months using TRW methods. The mentorship is unmatched.",
      income: "$35,000/mo",
      image: testify_1
    },
    {
      name: "MICHAEL T.",
      role: "Freelance Copywriter",
      quote: "Tripled my income in 90 days. The copywriting courses alone are worth 10x the price.",
      income: "$12,500/mo",
      image: testify_2
    },
    {
      name: "DAVID R.",
      role: "Crypto Trader",
      quote: "Finally found a community that actually knows markets. My portfolio 5x'd in 6 months.",
      income: "$18,000/mo",
      image: testify_3
    },
    {
      name: "KEVIN S.",
      role: "Amazon FBA Seller",
      quote: "Built a 7-figure business in 18 months following the TRW playbook. Life-changing.",
      income: "$83,000/mo",
      image: testify_4
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-bg-light to-bg-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-lighter">
            <span className="text-primary hover:text-primary-light transition-colors">REAL</span> STUDENT RESULTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto text-text-light">
            Don't take our word for it - hear from men who transformed their lives through The Real World.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/50 group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-text-lighter group-hover:text-white transition-colors">{testimonial.name}</h3>
                    <p className="text-text-light text-sm group-hover:text-text-lighter transition-colors">{testimonial.role}</p>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-full group-hover:bg-primary/20 transition-colors">
                    <span className="font-bold text-primary group-hover:text-primary-light transition-colors">{testimonial.income}</span>
                  </div>
                </div>
                <p className="text-text-light italic group-hover:text-text-lighter transition-colors">"{testimonial.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to='/register' className="px-10 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            JOIN THESE MEN TODAY
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonial;
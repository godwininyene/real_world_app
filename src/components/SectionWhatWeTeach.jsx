import sectionCoverImage from './../assets/images/teach_cover_img.jpg';
import copyright from './../assets/images/copyright.png';
import crypto from './../assets/images/crypto.png';
import ecommerce from './../assets/images/ecommerce.png';
import stock from './../assets/images/stock.png';
import freelancing from './../assets/images/freelancing.png';
import amazon from './../assets/images/amazon.png';
import ai from './../assets/images/ai.png';
import { Link } from 'react-router-dom';

const SectionWhatWeTeach = () => {
  const skills = [
    {
      title: "COPYWRITING",
      description: "Master persuasive writing to sell anything to anyone",
      icon: copyright
    },
    {
      title: "AMAZON FBA",
      description: "Build a passive income stream through Amazon's platform",
      icon: amazon
    },
    {
      title: "E-COMMERCE",
      description: "Create and scale your own online store",
      icon: ecommerce
    },
    {
      title: "FREELANCING",
      description: "Monetize your skills and work on your own terms",
      icon: freelancing
    },
    {
      title: "CRYPTO",
      description: "Navigate the cryptocurrency markets with confidence",
      icon: crypto
    },
    {
      title: "STOCKS",
      description: "Learn proven strategies for stock market investing",
      icon: stock
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-bg-light to-bg-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-lighter">
            WHAT DO WE <span className="text-primary hover:text-primary-light transition-colors">TEACH?</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mb-8"></div>
          
          {/* Cover Image and Features Row */}
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
            {/* Features Grid */}
            <div className="w-full lg:w-2/5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg shadow-md text-center border border-card-border hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <img src={ai} alt="Online" className="w-6 h-6 object-contain" />
                  </div>
                  <p className="font-medium text-sm text-text-light group-hover:text-text-lighter">Completely online</p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md text-center border border-card-border hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <img src={ai} alt="Location" className="w-6 h-6 object-contain" />
                  </div>
                  <p className="font-medium text-sm text-text-light group-hover:text-text-lighter">Location independent</p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md text-center border border-card-border hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <img src={ai} alt="Income" className="w-6 h-6 object-contain" />
                  </div>
                  <p className="font-medium text-sm text-text-light group-hover:text-text-lighter">Scalable income</p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md text-center border border-card-border hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <img src={ai} alt="AI Powered" className="w-6 h-6 object-contain" />
                  </div>
                  <p className="font-medium text-sm text-text-light group-hover:text-text-lighter">AI powered</p>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="w-full lg:w-3/5 rounded-xl overflow-hidden shadow-2xl border border-card-border">
              <img 
                src={sectionCoverImage} 
                alt="What We Teach" 
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/50 group"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <img 
                  src={skill.icon} 
                  alt={skill.title} 
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3">{skill.title}</h3>
              <p className="text-text-light group-hover:text-text-lighter transition-colors">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to='/register' className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            CHOOSING A SKILL
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionWhatWeTeach;
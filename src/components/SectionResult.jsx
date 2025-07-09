import result_1 from './../assets/images/result_img_1.png';
import result_2 from './../assets/images/result_img_2.png';
import result_3 from './../assets/images/result_img_3.png';
import introImg from './../assets/images/result_section_cover.png';

const SectionResult = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-bg-light to-bg-dark">
      <div className="container mx-auto px-6">
        {/* Cover Image */}
        <div className="rounded-xl flex justify-center shadow-2xl mb-16 max-w-xl mx-auto border border-card-border overflow-hidden">
          <img 
            src={introImg} 
            alt="Real Results" 
            className="h-[400px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-lighter">
            <span className="text-primary hover:text-primary-light transition-colors">REAL</span> RESULTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mb-8"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Text Content */}
          <div>
            <p className="text-lg mb-6 text-text-light">
              OUR PROGRAM IS DESIGNED BASED ON OUR STUDENT'S SUCCESS AND OUR TEAM ARE CONSTANTLY INNOVATING AND IMPROVING BASED ON THE REALITIES OF THE PRESENT ECONOMIC ENVIRONMENT.
            </p>
            <p className="text-lg mb-6 text-text-light">
              WE EVALUATE OUR SUCCESS BASED ON PRESENT STUDENT SUCCESS, NOT OUR PAST. WE ARE HERE TO TEACH THE REALITIES OF MAKING MONEY.
            </p>
            <div className="bg-primary/10 p-6 rounded-xl border-l-4 border-primary hover:bg-primary/15 transition-colors">
              <p className="text-lg font-medium text-text-lighter">
                WE'VE BUILT AN EVER-ACCESSIBLE PORTAL INSIDE THE REAL WORLD YOU WILL BE ABLE TO FULLY ESCAPE. OUR APPLICATION IS AVAILABLE ON EVERY COMPUTER, PHONE OR TABLET.
              </p>
            </div>
          </div>

          {/* Right Column - Stats Card */}
          <div className="bg-card p-8 rounded-xl shadow-2xl border border-card-border hover:border-primary/50 transition-colors">
            <div className="text-6xl font-bold text-primary mb-4">200K+</div>
            <p className="text-lg mb-6 text-text-light">
              SURROUNDED BY OVER 200,000 FINANCIALLY AMBITIOUS AND HEALTH FOCUSED INDIVIDUALS
            </p>
            
            {/* Result Images */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <img 
                src={result_1} 
                alt="Result 1" 
                className="rounded-lg shadow-md h-32 object-cover border border-card-border hover:scale-105 transition-transform" 
              />
              <img 
                src={result_2} 
                alt="Result 2" 
                className="rounded-lg shadow-md h-32 object-cover border border-card-border hover:scale-105 transition-transform" 
              />
              <img 
                src={result_3} 
                alt="Result 3" 
                className="rounded-lg shadow-md h-32 object-cover border border-card-border hover:scale-105 transition-transform" 
              />
            </div>
          </div>
        </div>

        {/* Testimonial/Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/50 group">
            <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3">PROVEN METHODS</h3>
            <p className="text-text-light group-hover:text-text-lighter transition-colors">
              Our curriculum evolves with market realities, ensuring you learn what works today.
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/50 group">
            <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3">COMMUNITY POWER</h3>
            <p className="text-text-light group-hover:text-text-lighter transition-colors">
              Join a network of 200,000+ like-minded individuals pushing each other forward.
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/50 group">
            <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3">ANYWHERE ACCESS</h3>
            <p className="text-text-light group-hover:text-text-lighter transition-colors">
              Available on all devices so you can learn and earn from anywhere in the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionResult;
import { Link } from "react-router-dom";
const SectionIntro = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-bg-dark to-bg-darker">
      <div className="container mx-auto px-6 text-center">
        {/* Headline */}
        <div className="mb-4 text-sm font-semibold tracking-wider text-primary-light uppercase">
          200k+ STUDENTS HAVE ALREADY TAKEN THE ADVANTAGE
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
          <span className="block text-text-lighter">THIS WILL</span>
          <span className="block text-primary hover:text-primary-light transition-colors">
            CHANGE YOUR ENTIRE LIFE
          </span>
        </h2>
        
        {/* Countdown/Progress Section */}
        <div className="max-w-2xl mx-auto mb-12 p-8 bg-card rounded-xl border border-card-border shadow-2xl">
          <div className="text-lg font-medium text-text-lighter mb-4">
            WE WILL CLOSE SOON
          </div>
          
          <div className="relative pt-1 mb-8">
            <div className="flex justify-between text-sm text-text-light mb-2">
              <span>288,717</span>
              <span>270,000 MEMBERS REACHED</span>
            </div>
            <div className="overflow-hidden h-3 mb-6 text-xs flex rounded-full bg-bg-dark">
              <div 
                style={{ width: '70%' }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-primary-light"
              ></div>
            </div>
            <div className="text-2xl font-bold text-text mb-2">
              SECURE YOUR SPOT FOR JUST <span className="text-primary">$49</span>
            </div>
            <div className="text-sm text-text-light">
              THE PRICE WILL INCREASE TO <span className="font-semibold text-primary-light">$250</span> AFTER 270,000 MEMBERS REACHED
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to='/login' className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-[1.02]">
              LOG IN
            </Link>
            <Link to='/register' className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              JOIN NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
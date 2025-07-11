import benefit_img_1 from './../assets/images/benefit_img_1.png';
import benefit_img_2 from './../assets/images/benefit_img_2.png';
import benefit_img_3 from './../assets/images/benefit_img_3.png';
import { Link } from 'react-router-dom';

const SectionBenefits = () => {
  return (
    <section className="py-20 bg-bg-darker">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-lighter">
            WHAT DO I GET <span className="text-primary hover:text-primary-light transition-colors">ACCESS TO?</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto"></div>
        </div>

        {/* Video Preview - Full Width Top */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-card-border">
            <div className="aspect-w-14 aspect-h-9 pb-[56.25%] h-0 bg-bg-light relative">
                <iframe 
                    src='https://player.vimeo.com/video/902932460' 
                    className='absolute inset-0 w-full h-full border-0'
                />
            </div>
            <div className="p-6 bg-card">
              <h3 className="text-xl font-bold text-text-lighter">INTRODUCTION VIDEO</h3>
            </div>
          </div>
        </div>

        {/* Benefits Grid - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Benefit 1 */}
          <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/30 group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img 
                src={benefit_img_1} 
                alt="Gamifying Business Mastery" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3">GAMIFYING BUSINESS MASTERY</h3>
            <p className="text-text-light mb-3">
              Our students level up in business like in a videogame. Unlock new tutorials,
              build your money-making arsenal, and add more skills to your inventory.
              Our app is designed to gamify your progress from zero to 10K a month and beyond
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/30 group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img 
                src={benefit_img_2} 
                alt="Leveling Up Together" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className='text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3'>Multimillionaires in Your Pocket</h3>
            <p className="text-text-light mb-3">
              Our app grants you direct access to multimillionaire mentors. Upon joining,
              the Professors will lay out your personal battleplan for financial conquest.
              You'll be mentored each step of the way through daily live sessions and 1-on-1
              communication with the Professors.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-card-border hover:border-primary/30 group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img 
                src={benefit_img_3} 
                alt="Millionaires in Community" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors mb-3">LEVELING UP TOGETHER!</h3>
            <p className="text-text-light mb-3">
              It's NOT lonely at the top. Our community is made of friendly teammates
              who interact and push each other to improve every single day. Over 200,000
              like-minded individuals joined our winning team, and now celebrate endless achievement.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to='/register' className="px-10 py-4 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            SAVE MY SPOT FOR TRW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionBenefits;
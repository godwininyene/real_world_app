import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SectionBenefits from "../components/SectionBenefits";
import SectionFaq from "../components/SectionFaq";
import SectionIntro from "../components/SectionIntro";
import SectionResult from "../components/SectionResult";
import SectionSubscription from "../components/SectionSubscription";
import SectionTestimonial from "../components/SectionTestimonial";
import SectionWhatWeTeach from "../components/SectionWhatWeTeach";
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light to-bg-dark">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      <SectionIntro />

      <SectionBenefits/>

      <SectionWhatWeTeach />

      <SectionResult />

      <SectionSubscription />

      <SectionTestimonial />

      <SectionFaq />

      <Footer />
     
    </div>
  );
};

export default Home;
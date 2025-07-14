import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="dark bg-bg-darker min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="bg-opacity-20 bg-primary uppercase text-xs sm:text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3">
            FreeTopG Discount! Enter Today for Only $49
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight mb-3">
            WELCOME TO <br />
            <span className="text-primary hover:text-primary-light transition-colors">
              THE REAL WORLD
            </span>
          </h1>
          <p className="text-base sm:text-lg text-text-light mb-4 leading-relaxed">
            A worldwide collective of success-driven individuals, The Real World
            helps people accumulate significant wealth. Members benefit from
            elite coaching and mentorship by multimillionaire professionals in
            their fields. Its innovative, finance-focused learning approach has
            already revolutionized thousands of lives.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-primary text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-light transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            JOIN THE REAL WORLD →
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="relative w-full max-w-xs sm:max-w-md">
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-48 h-48 sm:w-64 sm:h-64 bg-blob-1 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-48 h-48 sm:w-64 sm:h-64 bg-blob-2 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-card-border">
              <h3 className="text-lg sm:text-xl font-bold text-text mb-4">
                Why Join Us?
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm sm:text-base text-text-light">
                    Exclusive member content
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm sm:text-base text-text-light">
                    International perspectives
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm sm:text-base text-text-light">
                    Thought-provoking philosophy
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
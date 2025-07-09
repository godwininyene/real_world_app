const Hero = ()=>{
    return(
        <div className="dark bg-bg-darker min-h-screen">
          <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-opacity-20 bg-primary text-primary-light uppercase text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  FreeTopG Discount! Enter Today for Only $49
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
                  WELCOME TO <br />
                  <span className="text-primary hover:text-primary-light transition-colors">THE REAL WORLD</span>
              </h1>
              <p className="text-lg text-text-light mb-8 leading-relaxed">
                  The New Yorker is a classic, transparent publication for unique individuals who want to engage with society. 
                  Our readers gain deep understanding through carefully curated stories that explore philosophy, culture, 
                  and international development.
              </p>
              <button className="px-8 py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary-light transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  JOIN THE REAL WORLD →
              </button>
              </div>
              <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-blob-1 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blob-2 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="relative bg-card p-8 rounded-2xl shadow-2xl border border-card-border">
                  <h3 className="text-xl font-bold text-text mb-4">Why Join Us?</h3>
                  <ul className="space-y-3">
                      <li className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-light">Exclusive member content</span>
                      </li>
                      <li className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-light">International perspectives</span>
                      </li>
                      <li className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-light">Thought-provoking philosophy</span>
                      </li>
                  </ul>
                  </div>
              </div>
              </div>
        </div>
      </div>
    )
}

export default Hero;
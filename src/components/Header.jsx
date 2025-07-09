const Header = ()=>{
    return(
        <header className="px-6 py-4 flex justify-between items-center bg-bg-dark border-b border-card-border">
        <div className="text-2xl font-bold text-primary hover:text-primary-light transition-colors cursor-pointer">
            The Real World
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-text-lighter font-medium hover:text-primary-light transition-colors">
            Login
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Join Now
          </button>
        </div>
      </header>
    )
}

export default Header
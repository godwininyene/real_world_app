import { Link } from "react-router-dom"
const Header = ()=>{
    return(
        <header className="px-6 py-4 bg-bg-dark border-b border-card-border">
          <div className="container mx-auto flex justify-between items-center">
            <Link className="text-2xl font-bold text-primary hover:text-primary-light transition-colors cursor-pointer">
              The Real World
            </Link>
            <div className="flex space-x-4">
              <Link to='/login' className="px-4 py-2 text-text-lighter font-medium hover:text-primary-light transition-colors">
                Login
              </Link>
              <Link to='/register' className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Join Now
              </Link>
            </div>
          </div>
      </header>
    )
}

export default Header
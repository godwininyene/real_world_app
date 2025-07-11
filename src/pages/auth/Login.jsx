import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { IoLogInOutline } from 'react-icons/io5';
import axios from "../../lib/axios";

const Login = () => {
    const[searchParams, setSearchParams] = useSearchParams(); 
    let pathname = searchParams.get("redirectTo")||null
    const message = searchParams.get("message")|| null;
    const[processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        email:'',
        password: '',
    });

    const[error, setError] = useState();
    const handleChange = e =>{
        const{name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const navigate = useNavigate();

    const submit = async(e) => {
        e.preventDefault();
        let goTo;
        setProcessing(true)
        try {
            const response = await axios.post('api/v1/users/login', formData);
            if(response.data.status=='success'){
                localStorage.setItem("user", JSON.stringify(response.data.data.user));
                if(response.data.data.user.role === 'user'){
                    goTo = pathname || '/investor/dashboard' 
                }
                if(response.data.data.user.role === 'admin'){
                    goTo = pathname || '/admin/dashboard'
                    console.log('True');
                }
                navigate(goTo)
            }
            
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
                console.log(err.response.data.message);
            } else {
                setError('No response received from the server.');
                console.log('Unexpected Error:', err);
            }
        } finally {
            setProcessing(false);
        }
    };

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Welcome Back
      </h1>
      {error && (
        <div className="mb-2 font-medium text-sm text-red-600 dark:text-red-400">
            {error}
        </div>
      )}
        
      {message && (
        <h2 className="text-[#cc0000] dark:text-red-400">
          {message}
        </h2>
      )}
      <div className="space-y-6">
        <form onSubmit={submit}>
          <InputField
            name="email"
            type="email"
            placeholder="your@email.com"
            label="Email Address"
            icon={<FaEnvelope className="text-text-light" />}
            value={formData['email' || " "]}
            onChange={handleChange}
          />

          <InputField
            name="password"
            type="password"
            placeholder="••••••••"
            label="Password"
            icon={<FaLock className="text-text-light" />}
            value={formData['password' || " "]}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-card-border bg-bg-dark focus:ring-primary/50 text-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-light">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="text-primary-light hover:text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              icon={<IoLogInOutline />}
              iconPosition="left"
              isLoading={processing}
              disabled={processing}
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="text-sm text-center text-text-light">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="text-primary-light hover:text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
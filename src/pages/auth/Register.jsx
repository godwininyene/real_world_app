import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { FaUser, FaLock, FaEnvelope, FaCheck, FaPhone } from "react-icons/fa";
import { Link, useNavigate,useSearchParams  } from "react-router-dom";
import { useState } from "react";
import axios from "../../lib/axios";
import { toast } from 'react-toastify';

const Register = () => {
  const[processing, setProcessing] = useState(false);
  const[errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refid'); // This will be null if refid doesn't exist


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    let goTo;
    
    const formData = new FormData(e.target);
    const dataToSend = Object.fromEntries(formData)
    // Add referral Id to the data if it exists
    if (refId) {
      dataToSend.referralId = refId;
    }
    try {
      const res = await axios.post('api/v1/users/signup', dataToSend);
     
      if (res.data.status === 'success') {
        toast.success('Account created successfully! You will be redirected shortly');
        e.target.reset();
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        if(res.data.data.user.role === 'user'){
          goTo = '/investor/dashboard' 
        }
        if(res.data.data.user.role === 'admin'){
          goTo = '/admin/dashboard'
        }
        setTimeout(()=>{
          navigate(goTo)
        }, 3000)
      }
    } catch (err) {
      // Extract errors from the backend response
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        // For unexpected errors, set a generic error
        setErrors({ general: 'An unexpected error occurred' });
        console.log('Unexpected Error:', err);
      }
      toast.error(err.response?.data?.message || 'Error creating account');
      console.log(err);
      
    } finally {
      setProcessing(false);
    }
  };
  return (
    <>
      {/* This will appear in the decorative header */}
     
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Create Your Account
      </h1>

      {/* This will appear in the form container */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="text-red-500 text-sm mb-4">
            {errors.general}
          </div>
        )}
        <InputField
          name="firstName"
          placeholder="John"
          label="Firstname"
          icon={<FaUser className="text-text-light" />}
          uncontrolled={true}
          error={errors.firstName}
        />

        <InputField
          name="lastName"
          placeholder="Doe"
          label="Lastname"
          icon={<FaUser className="text-text-light" />}
          uncontrolled={true}
          error={errors.lastName}
        />

        <InputField
          name="username"
          type="text"
          placeholder="johndoe123"
          label="Username"
          icon={<FaUser className="text-text-light" />}
          uncontrolled={true}
          error={errors.username}
        />

        <InputField
          name="email"
          type="email"
          placeholder="john@example.com"
          label="Email Address"
          icon={<FaEnvelope className="text-text-light" />}
          uncontrolled={true}
          error={errors.email}
        />
        <InputField
          name="phone"
          placeholder="+1290090888"
          label="Phone number"
          icon={<FaPhone className="text-text-light" />}
          uncontrolled={true}
          error={errors.phone}
        />
      

        <InputField
          name="password"
          type="password"
          placeholder="••••••••"
          label="Password"
          icon={<FaLock className="text-text-light" />}
          uncontrolled={true}
          error={errors.password}
        />

        <InputField
          name="passwordConfirm"
          type="password"
          placeholder="••••••••"
          label="Confirm Password"
          icon={<FaLock className="text-text-light" />}
          uncontrolled={true}
          error={errors.passwordConfirm}
        />

        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="w-4 h-4 rounded border-card-border bg-bg-dark focus:ring-primary/50 text-primary"
              required
            />
          </div>
          <div className="ml-3 text-xs text-center">
            <label htmlFor="terms" className="text-text-light">
              I confirm that I am 18 years old or older and accept{" "}
              <Link to="#" className="text-primary-light hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-primary-light hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            icon={<FaCheck />}
            isLoading={processing}
            disabled={processing}
          >
            Create Account
          </Button>
        </div>

        <div className="text-sm text-center text-text-light">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-primary-light hover:text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
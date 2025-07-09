import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { FaUser, FaLock, FaEnvelope, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      {/* This will appear in the decorative header */}
     
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Create Your Account
      </h1>

      {/* This will appear in the form container */}
      <div className="space-y-4">
        <InputField
          name="fullname"
          type="text"
          placeholder="John Doe"
          label="Full Name"
          icon={<FaUser className="text-text-light" />}
        />

        <InputField
          name="username"
          type="text"
          placeholder="johndoe123"
          label="Username"
          icon={<FaUser className="text-text-light" />}
        />

        <InputField
          name="email"
          type="email"
          placeholder="john@example.com"
          label="Email Address"
          icon={<FaEnvelope className="text-text-light" />}
        />

        <InputField
          name="password"
          type="password"
          placeholder="••••••••"
          label="Password"
          icon={<FaLock className="text-text-light" />}
        />

        <InputField
          name="passwordConfirm"
          type="password"
          placeholder="••••••••"
          label="Confirm Password"
          icon={<FaLock className="text-text-light" />}
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
      </div>
    </>
  );
};

export default Register;
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Forgot Your Password?
      </h1>
      
      <div className="space-y-6">
        <p className="text-text-light text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <InputField
          name="email"
          type="email"
          placeholder="your@email.com"
          label="Email Address"
          icon={<FaEnvelope className="text-text-light" />}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            icon={<FaShieldAlt />}
          >
            Send Reset Link
          </Button>
        </div>

        <div className="text-sm text-center text-text-light">
          Remember your password?{" "}
          <Link 
            to="/login" 
            className="text-primary-light hover:text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
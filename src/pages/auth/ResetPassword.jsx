import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { FaLock, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Set New Password
      </h1>
      
      <div className="space-y-6">
        <p className="text-text-light text-center">
          Create a new secure password for your account.
        </p>

        <InputField
          name="newPassword"
          type="password"
          placeholder="••••••••"
          label="New Password"
          variant="default"
          icon={<FaLock className="text-text-light" />}
        />

        <InputField
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          label="Confirm New Password"
          variant="default"
          icon={<FaLock className="text-text-light" />}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            icon={<FaCheck />}
          >
            Reset Password
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

export default ResetPassword;
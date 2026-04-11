"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ROUTES from "@/constants/routes";
import { toast } from "react-toastify";
import { useVerifyEmailMutation } from "@/redux/services/auth/authApiSlice";
import { useAuth } from "@/contexts/authProvider";

const VerifyEmailPage = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifyEmail] = useVerifyEmailMutation();
  const { login } = useAuth();

  useEffect(() => {
    if (!token) {
      toast.error("No verification token provided.");
      setLoading(false);
      return;
    }

    const handleVerifyEmail = async () => {
      try {
        const response = await verifyEmail(token).unwrap();

        setMessage(response.message || "Email verified successfully!");
        toast.success(response.message || "Email verified successfully!");

        // Auto-login if response contains token/user data
        if (response.token || response.data) {
          login(response);
          setTimeout(() => {
            router.push(ROUTES.HOME);
          }, 2000);
        } else {
          setTimeout(() => {
            router.push(ROUTES.SIGIN);
          }, 3000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "An error occurred during email verification.";
        setMessage(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    handleVerifyEmail();
  }, [token, verifyEmail, router, login]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        {loading ? (
          <p className="text-lg font-medium text-gray-700">
            Verifying your email...
          </p>
        ) : (
          <div className="space-y-4">
            <p className="text-xl font-semibold text-gray-900">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting you to the home page...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;

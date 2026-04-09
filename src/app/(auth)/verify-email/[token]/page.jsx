"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ROUTES from "@/constants/routes";
import { toast } from "react-toastify";
import { useVerifyEmailMutation } from "@/redux/services/auth/authApiSlice";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifyEmail] = useVerifyEmailMutation();

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
        setTimeout(() => {
          router.push(ROUTES.SIGIN);
        }, 3000);
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
  }, [token, verifyEmail, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        {loading ? (
          <p className="text-lg">Verifying your email...</p>
        ) : (
          <>
            <p className="text-lg">{message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login page...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default page;

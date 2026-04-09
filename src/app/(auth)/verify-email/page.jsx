"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ROUTES from "@/constants/routes";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error("No verification token provided.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message || "Email verified successfully!");
          toast.success(data.message || "Email verified successfully!");
          setTimeout(() => {
            router.push(ROUTES.SIGIN);
          }, 3000);
        } else {
          setMessage(data.message || "Failed to verify email.");
          toast.error(data.message || "Failed to verify email.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setMessage("An error occurred during email verification.");
        toast.error("An error occurred during email verification.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

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

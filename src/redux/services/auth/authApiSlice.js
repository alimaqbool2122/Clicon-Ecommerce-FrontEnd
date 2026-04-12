import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/redux/customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // User Registration
    register: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),

    // Verify email
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: "/verify-mail",
        method: "POST",
        body: { token },
      }),
    }),

    // Login
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
    }),

    // forget password.
    forgetPassword: builder.mutation({
      query: (formData) => ({
        url: "/forgot-password",
        method: "POST",
        body: formData,
      }),
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: "/update-password",
        method: "POST",
        body: formData,
      }),
    }),

    // otp Verification.
    otpVerification: builder.mutation({
      query: (formData) => ({
        url: "/verify-otp",
        method: "POST",
        body: formData,
      }),
    }),

    // resend otp
    resendOtp: builder.mutation({
      query: (formData) => ({
        url: "/resend-otp",
        method: "POST",
        body: formData,
      }),
    }),

    // Get Profile
    getProfile: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
    }),

    // Update Profile
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-profile/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    // change password
    changePassword: builder.mutation({
      query: (formData) => ({
        url: "/change-password",
        method: "PUT",
        body: formData,
      }),
    }),

    // Delete Account
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgetPasswordMutation,
  useOtpVerificationMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  useChangePasswordMutation,
} = authApi;

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Verified from "../register/Verified";
import {
  changeMyPassword,
  resendEmailOtp,
  verifyEmailOtp,
  verifyMobileOtp,
} from "../../../redux/features/auth/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const [isVerified, setIsVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const { regID } = useSelector((state) => state.auth);

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimer(30);
    dispatch(resendEmailOtp(regID));
    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerInterval);
          setIsResendDisabled(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isResendDisabled) {
      const timerTimeout = setTimeout(() => {
        setIsResendDisabled(false);
      }, resendTimer * 1000);

      return () => clearTimeout(timerTimeout);
    }
  }, [isResendDisabled, resendTimer]);

  const schema = z.object({
    Email_OTP: z.string().optional(),
    OtpVal: z.string().refine((val) => /^\d+$/.test(val), {
      message: "Otp must contain only numbers.",
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  let first_name = "";
  let email = "";
  let mobile = "";
  let password = "";

  const storedFormDataJson = localStorage.getItem("registrationFormData");

  if (storedFormDataJson) {
    // Convert JSON string back to an object
    const storedFormData = JSON.parse(storedFormDataJson);

    // Access property
    first_name = storedFormData.first_name;
    email = storedFormData.email;
    mobile = storedFormData.mobile_no;
    password = storedFormData.password;

    // console.log(email, mobile);
  } else {
    console.log("No stored form data found");
  }

  const onSubmit = async (data) => {
    // console.log(data);

    const emailOtpFormData = {
      Email: email,
      Email_OTP: data.Email_OTP,
    };

    const mobileOtpFormData = {
      OtpVal: parseInt(data.OtpVal),
    };
    const changePassword = {
      password: password,
    };

    // console.log("Button clicked", emailOtpFormData, mobileOtpFormData);

    try {
   
      const [emailVerificationResult, mobileVerificationResult] =
        await Promise.all([
          dispatch(verifyEmailOtp(emailOtpFormData)),
          dispatch(verifyMobileOtp(mobileOtpFormData)),
        ]);
      console.log(
        emailVerificationResult.payload.status,
        mobileVerificationResult.payload.status
      );
      // Check if both verifications are successful
      if (
        emailVerificationResult.payload.status ===
        mobileVerificationResult.payload.status
      ) {
        // Dispatch changeMyPassword if both verifications are successful
        await dispatch(changeMyPassword(changePassword));

        // Set the state to indicate that verification is successful
        setIsVerified(true);
      }
    } catch (error) {
      // Handle errors, including unauthorized errors
      console.error("Error during verification:", error);
    }
  };

  return (
    <div>
      {isVerified ? (
        // Render success component when verification is successful
        <Verified status={status} first_name={first_name} />
      ) : (
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-10">
            <h1 className="contents text-4xl font-thin text-gray-27 dark:text-white">
              Create your Revveon account
            </h1>
            <nav aria-label="Steps">
              <ol className="flex items-center">
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-transparent bg-primary text-white dark:text-gray-24">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fasl"
                      data-icon="check"
                      className="svg-inline--fa fa-check animate-pop-in"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M448.1 118.2L437 129.7 173.6 404l-11.5 12-11.5-12L11.1 258.8 0 247.2l23.1-22.2 11.1 11.5L162.1 369.8 414 107.5 425 96l23.1 22.2z"
                      />
                    </svg>
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-primary" />
                </li>
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-transparent bg-primary text-white dark:text-gray-24">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fasl"
                      data-icon="check"
                      className="svg-inline--fa fa-check animate-pop-in"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M448.1 118.2L437 129.7 173.6 404l-11.5 12-11.5-12L11.1 258.8 0 247.2l23.1-22.2 11.1 11.5L162.1 369.8 414 107.5 425 96l23.1 22.2z"
                      />
                    </svg>
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-primary" />
                </li>
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-transparent bg-primary text-white dark:text-gray-24">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fasl"
                      data-icon="check"
                      className="svg-inline--fa fa-check animate-pop-in"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M448.1 118.2L437 129.7 173.6 404l-11.5 12-11.5-12L11.1 258.8 0 247.2l23.1-22.2 11.1 11.5L162.1 369.8 414 107.5 425 96l23.1 22.2z"
                      />
                    </svg>
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-primary" />
                </li>
                <li className="flex items-center">
                  <div
                    className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-primary dark:bg-gray-31"
                    aria-current="step"
                  >
                    4
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-gray-67 dark:bg-gray-42" />
                </li>
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31">
                    5
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex justify-center self-stretch overflow-clip">
            <div style={{ width: "20rem" }}>
              <div
                className="flex -translate-x-1/3"
                style={{ animationDuration: "300ms", width: "calc(60rem)" }}
              >
                <div
                  className="shrink-0"
                  style={{
                    animationDuration: "300ms",
                    width: "20rem",
                    transformOrigin: "left center",
                  }}
                />
                <div
                  className="shrink-0"
                  style={{
                    animationDuration: "300ms",
                    width: "20rem",
                    transformOrigin: "left center",
                  }}
                >
                  <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h2 className="contents text-sm font-bold uppercase tracking-wide text-gray-31 dark:text-white">
                      Account verification
                    </h2>
                    <div className="flex flex-col gap-1 self-stretch">
                      <div className="contents leading-tight">
                        <label
                          className="flex items-center gap-1"
                          htmlFor="radix-:ru:"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fasl"
                            data-icon="envelope"
                            className="svg-inline--fa fa-envelope fa-fw "
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M32 159.2l224 154 224-154V96H32v63.2zM480 198L256 352 32 198V416H480V198zM0 416V176 96 64H32 480h32V96v80V416v32H480 32 0V416z"
                            />
                          </svg>
                          Email verification code
                        </label>
                      </div>
                      <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                        <input
                          className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                          type="text"
                          autoComplete="off"
                          required=""
                          title=""
                          id="radix-:ru:"
                          defaultValue=""
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          name="Email_OTP"
                          {...register("Email_OTP")}
                        />
                      </div>
                      {errors.Email_OTP && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.Email_OTP.message}
                        </small>
                      )}

                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        <div className="relative min-w-0 overflow-clip overflow-ellipsis whitespace-nowrap">
                          {email}
                          <span className="invisible absolute">{email}</span>
                        </div>
                      </small>
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      <div className="contents leading-tight">
                        <label
                          className="flex items-center gap-1"
                          htmlFor="radix-:r10:"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fasl"
                            data-icon="mobile"
                            className="svg-inline--fa fa-mobile fa-fw "
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="currentColor"
                              d="M64 32V480H320V32H64zM32 0H64 320h32V32 480v32H320 64 32V480 32 0zM160 400h64 16v32H224 160 144V400h16z"
                            />
                          </svg>
                          Mobile verification code
                        </label>
                      </div>
                      <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                        <input
                          className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                          type="text"
                          autoComplete="one-time-code"
                          required=""
                          title=""
                          id="OtpVal"
                          defaultValue=""
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          name="OtpVal"
                          {...register("OtpVal")}
                        />
                      </div>
                      {errors.OtpVal && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.OtpVal.message}
                        </small>
                      )}
                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        <div className="relative min-w-0 overflow-clip overflow-ellipsis whitespace-nowrap">
                          {mobile}
                          <span className="invisible absolute">{mobile}</span>
                        </div>
                      </small>
                    </div>
                    Check your email inbox and mobile text messages
                    <div className="flex flex-col gap-3">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                        style={{ background: "#C892C7", color: "#212331" }}
                      >
                        Verify
                      </button>
                      <button
                        type="button"
                        className="hover:bg-shade flex items-center justify-center whitespace-nowrap rounded-sm border  border-gray-86 leading-none text-primary active:brightness-105 disabled:pointer-events-none disabled:opacity-70 disabled:grayscale dark:border-gray-42 gap-2 px-4 py-3 text-base"
                        disabled={isResendDisabled}
                        onClick={startResendTimer}
                      >
                        {isResendDisabled
                          ? `Resend codes (${resendTimer}s)`
                          : "Resend codes"}
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className="shrink-0"
                  style={{
                    animationDuration: "300ms",
                    width: "20rem",
                    transformOrigin: "right center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Verify;

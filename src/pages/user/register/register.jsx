"use client";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  registration,
  reset_redirectToUpdate,
} from "@/redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Register() {
  // const [phone, setPhone] = useState();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .refine(
        (value) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
        {
          message: "Invalid email format",
        }
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
        {
          message: `It must contain at least one lowercase letter
        It must contain at least one uppercase letter.
        It must contain at least one digit.
        It must have a minimum length of 8 characters.`,
        }
      ),
    country_code: z.string().min(1, "Country code is required"),
    mobile_no: z.string().min(10, "Mobile number must be at least 10 digits"),
    // .refine((value) => /^\d+$/.test(value), {
    //   message: "Mobile number must contain only digits",
    // }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // const handlePhoneChange = (value) => {
  //   setPhone(value);
  // };

  const onSubmit = async (data, e) => {
    console.log("Form data submitted: ", data);
    e.preventDefault();
    try {
      const formData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        country_code: "91",
        mobile_no: data.mobile_no,
        password: data.password,
      };

      console.log("Button clicked", formData);
      // Dispatch the registration action
      dispatch(registration(formData));
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  // useEffect(() => {
  //   const RedirectUser = () => {
  //     let username = localStorage.getItem("name");
  //     let isInRegisterPage =
  //       window.location.pathname.toLowerCase() === "/register";

  //     if (username !== null && username !== undefined && username !== "") {
  //       isInRegisterPage && navigate("/login");
  //     }
  //   };
  //   RedirectUser();
  // }, [navigate]);

  // useEffect(() => {
  //   dispatch(reset_redirectToUpdate(null));
  // }, [dispatch]);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div>
      {console.log("code running")}
      <div className="mx-auto w-full max-w-screen-2xl p-8">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-10">
            <h1 className="contents text-4xl font-thin text-gray-27 dark:text-white">
              Create your Revveon account
            </h1>
            <nav aria-label="Steps">
              <ol className="flex items-center">
                <li className="flex items-center">
                  <div
                    aria-current="step"
                    className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-primary dark:bg-gray-31"
                  >
                    1
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-gray-700 dark:bg-gray-50" />
                </li>
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31">
                    2
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-gray-700 dark:bg-gray-50" />
                </li>
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31">
                    3
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-gray-700 dark:bg-gray-50" />
                </li>
                <li className="flex items-center">
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31">
                    4
                  </div>
                  <div className="h-[1px] w-5 transition-colors bg-gray-700 dark:bg-gray-50" />
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
                    {console.log("code running on form submit")}
                    <h2 className="contents text-sm font-bold uppercase tracking-wide text-gray-31 dark:text-white">
                      Your details
                    </h2>
                    <div className="flex flex-col gap-1 self-stretch">
                      <label htmlFor="First Name">
                        <div className="contents leading-tight">First name</div>
                      </label>
                      <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                        <input
                          className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                          type="text"
                          autoComplete="given-name"
                          required=""
                          title=""
                          name="first_name"
                          id="radix-:r1:"
                          defaultValue=""
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          {...register("first_name")}
                        />
                      </div>
                      {errors.first_name && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.first_name.message}
                        </small>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      <label htmlFor="radix-:r3:">
                        <div className="contents leading-tight">Last name</div>
                      </label>
                      <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                        <input
                          className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                          type="text"
                          required=""
                          title=""
                          id="radix-:r3:"
                          name="last_name"
                          defaultValue=""
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          {...register("last_name")}
                        />
                      </div>
                      {errors.last_name && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.last_name.message}
                        </small>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      <label htmlFor="radix-:r5:">
                        <div className="contents leading-tight">
                          Personal email
                        </div>
                      </label>
                      <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                        <input
                          className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                          type="email"
                          autoComplete="home email"
                          required=""
                          title=""
                          id="radix-:r5:"
                          name="email"
                          defaultValue=""
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          {...register("email")}
                        />
                      </div>
                      {errors.email && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.email.message}
                        </small>
                      )}
                      <br />
                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        Please use your personal email as you can have multiple
                        startups on your Revveon account
                      </small>
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="radix-:r7:">
                          <div className="contents leading-tight">Password</div>
                        </label>
                        <div className="relative flex flex-col">
                          <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                            <input
                              className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              minLength={15}
                              required=""
                              title=""
                              id="radix-:r7:"
                              name="password"
                              defaultValue=""
                              style={{ backgroundColor: "hsl(230 19% 24%" }}
                              {...register("password")}
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute right-0 h-full w-12"
                            aria-label="Show password as plain text. Warning: this will display your password on the screen."
                            aria-pressed="false"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? (
                              <FontAwesomeIcon icon={faEye} />
                            ) : (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                          </button>
                        </div>
                        <div className="flex gap-1">
                          <div className="flex-1">
                            <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-57" />
                          </div>
                          <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                            0 / 15
                          </small>
                        </div>
                      </div>
                      {errors.password && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.password.message}
                        </small>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      <label htmlFor="phone">
                        <div className="contents leading-tight">
                          Mobile number
                        </div>
                      </label>
                      <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                        {/* <div className="iti iti--allow-dropdown iti--show-flags">
                          <div className="iti__flag-container">
                            <div
                              className="iti__selected-flag"
                              role="combobox"
                              aria-haspopup="listbox"
                              aria-controls="iti-0__country-listbox"
                              aria-expanded="false"
                              aria-label="Telephone country code"
                              tabIndex={0}
                              title="United States: +1"
                              style={{ backgroundColor: "hsl(230 19% 24%" }}
                            >
                              <div className="iti__flag iti__us" />
                              <div className="iti__arrow" />
                            </div>
                          </div>
                        </div> */}
                        {/* <PhoneInput
                          className="min-w-0 grow p-2 dark focus:outline-none iti__tel-input"
                          international
                          placeholder="+91 9876543210"
                          defaultCountry="IN"
                          // value={phone}
                          // onChange={handlePhoneChange}
                          style={{ backgroundColor: "#323549" }}
                          {...register("mobile_no")}
                          control={control}
                          rules={{ required: true }}
                        /> */}
                        <input
                          className="min-w-0 grow p-2 dark focus:outline-none iti__tel-input"
                          type="tel"
                          id="phone"
                          name="phone"
                          // placeholder="9876543210"
                          style={{ backgroundColor: "hsl(230 19% 24%)" }}
                          {...register("mobile_no")}
                        />
                      </div>
                      {errors.mobile_no && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {errors.mobile_no.message}
                        </small>
                      )}
                      <br />
                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        We take security seriously and use both your mobile
                        number and your email to keep your account secure.
                      </small>
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      {/* <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="aspect-square h-6 accent-primary "
                          required=""
                          title=""
                          id="radix-:rb:"
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                        />
                        <label htmlFor="radix-:rb:">
                          <small className="contents text-sm font-normal leading-snug tracking-wide">
                            I agree to the{" "}
                            <Link href="/terms" target="_blank">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-sm underline decoration-1 underline-offset-4 outline-2 outline-blue-62 hover:decoration-2 focus-visible:outline disabled:no-underline disabled:opacity-70"
                              >
                                Terms &amp; Conditions
                              </button>
                            </Link>
                          </small>
                        </label>
                      </div> */}
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                      style={{ background: "#C892C7", color: "#212331" }}
                    >
                      Create account
                    </button>
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
      </div>
    </div>
  );
}

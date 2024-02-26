import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../CMS/Loading/Loading";
import { registration } from "../../redux/features/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remainingCharacters, setRemainingCharacters] = useState(15);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country_code: "",
    mobile_no: "",
  });
  const [error, setError] = useState("");
  const { redirect, status } = useSelector((state) => state.auth);

  //   const validation = () => {
  //     let error = {};
  //     console.log(error, "error");
  //     if (!user.first_name) {
  //       error.first_name = "First Name Is Empty";
  //     }
  //     if (!user.last_name) {
  //       error.last_name = "Last Name Is Empty";
  //     }

  //     if (!user.email) {
  //       error.email = "Email Is Empty";
  //     }

  //     if (!user.password) {
  //       error.password = "password Is Empty";
  //     }
  //     if (!user.mobile_no) {
  //       error.mobile_no = "Mobile No Is Empty";
  //     }

  //     return error;
  //   };

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("country_code", user.country_code);
    formData.append("mobile_no", user.mobile_no);
    // Convert FormData to JSON string
    const formDataJson = JSON.stringify(Object.fromEntries(formData));

    // Store JSON string in localStorage
    localStorage.setItem("registrationFormData", formDataJson);
    dispatch(registration(formData));
    // try {
    //   const response = await dispatch(registration(formData));
    //   console.log(response);
    //   console.log(response.payload.status);
    //   if (response.payload.status === "success") {
    //     router.push("/verify");
    //   } else {
    //     setError(validation());
    //     // Handle other cases or show an error message
    //   }
    // } catch (error) {
    //   console.error("Registration failed:", error);
    //   // Handle registration failure, show an error message, etc.
    // }
  };

  let name, value;
  const PostUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "FirstName Is Empty" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "LastName Is Empty" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email Is Empty" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setError({
          ...error,
          password: "Password must be at least 15 characters",
        });
      } else {
        setError({ ...error, password: "" });
      }

      setUser({ ...user, password: value });
      setRemainingCharacters(15 - value.length);
    }

    if (name === "mobile_no") {
      if (value.length === 0) {
        setError({ ...error, mobile_no: "Please set a mobile_no" });
        setUser({ ...user, mobile_no: "" });
      } else {
        setError({ ...error, mobile_no: "" });
        setUser({ ...user, mobile_no: value });
      }
    }
  };

  const handlePhoneChange = (e, value, name) => {
    console.log("Value", value);
    console.log("name", name);

    if (name === "mobile_no") {
      const splitMobile = value?.dialCode ? e.split(value.dialCode) : e;

      setUser({
        ...user,
        country_code: value?.dialCode || "",
        mobile_no: splitMobile?.[1] || "",
      });
    } else {
      setUser({
        ...user,
        [name]: e.target.value,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const RedirectUser = () => {
      let token = localStorage.getItem("access_token");
      let isInRegisterPage =
        window.location.pathname.toLowerCase() === "/user/register";

      if (token !== null && token !== undefined && token !== "") {
        isInRegisterPage && router("/verify");
      }
    };

    RedirectUser();
  }, [redirect, router]);
  return (
    <>
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
                  <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-50 dark:bg-gray-31">
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
                  <div className="flex flex-col gap-6">
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
                          id="radix-:r1:"
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          name="first_name"
                          value={user.first_name}
                          onChange={PostUserData}
                          placeholder="First Name"
                        />
                      </div>
                      {error.first_name && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {error.first_name}
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
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          name="last_name"
                          value={user.last_name}
                          onChange={PostUserData}
                          placeholder="Last name"
                        />
                      </div>
                      {error.last_name && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {error.last_name}
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
                          style={{ backgroundColor: "hsl(230 19% 24%" }}
                          name="email"
                          value={user.email}
                          placeholder="E-Mail"
                          onChange={PostUserData}
                        />
                      </div>
                      {error.email && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {error.email}
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
                              style={{ backgroundColor: "hsl(230 19% 24%" }}
                              name="password"
                              value={user.password}
                              placeholder="Password"
                              onChange={PostUserData}
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
                            <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-57">
                              {remainingCharacters > 0
                                ? `${remainingCharacters} characters left`
                                : "Password length greater than 15"}
                            </small>
                          </div>
                          <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                            {15 - remainingCharacters} / 15
                          </small>
                        </div>
                      </div>
                      {error.password && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {error.password}
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
                        {/* <input
                          className="min-w-0 grow p-2 dark focus:outline-none iti__tel-input"
                          type="tel"
                          id="phone"
                          // placeholder="9876543210"
                          style={{ backgroundColor: "hsl(230 19% 24%)" }}
                          name="mobile_no"
                          value={user.mobile_no}
                          placeholder="Enter your mobile no"
                          onChange={PostUserData}
                        /> */}
                        <PhoneInput
                          inputClass="min-w-0 grow p-2 dark focus:outline-none iti__tel-input iti iti--allow-dropdown iti--show-flags"
                          country={"in"}
                          value={`${user.country_code}${user.mobile_no}`}
                          onChange={(e, phone) =>
                            handlePhoneChange(e, phone, "mobile_no")
                          }
                          disableSearchIcon
                          rules={{ required: true }}
                          inputStyle={{ backgroundColor: "#323549" }}
                          style={{ backgroundColor: "#323549" }}
                        />
                      </div>
                      {error.mobile_no && (
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                          {error.mobile_no}
                        </small>
                      )}
                      <br />
                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        We take security seriously and use both your mobile
                        number and your email to keep your account secure.
                      </small>
                    </div>
                    <div className="flex flex-col gap-1 self-stretch">
                      <div className="flex items-center gap-2">
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
                      </div>
                    </div>
                    <button
                      onClick={submitData}
                      className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                      style={{ background: "#C892C7", color: "#212331" }}
                    >
                      {status === "loading" ? <Loading /> : " Create Account"}
                    </button>
                  </div>
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
    </>
  );
}

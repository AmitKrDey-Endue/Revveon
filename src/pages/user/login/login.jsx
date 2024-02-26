"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, reset_redirectToUpdate } from "@/redux/slices/auth/authSlice";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { redirect } = useSelector((state) => state.auth);

  const schema = z.object({
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
    password: z.string(),
    // .min(8, "Password must be at least 8 characters")
    // .refine(
    //   (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
    //   {
    //     message: `It must contain at least one lowercase letter
    //     It must contain at least one uppercase letter.
    //     It must contain at least one digit.
    //     It must have a minimum length of 8 characters.`,
    //   }
    // ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const RedirectUser = () => {
      let token = localStorage.getItem("token");
      let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

      if (token !== null && token !== undefined && token !== "") {
        isInLoginPage && navigate.push("/dashboard");
      }
    };

    RedirectUser();
  }, [redirect, navigate]);

  useEffect(() => {
    dispatch(reset_redirectToUpdate(null));
  }, [dispatch]);

  const onSubmit = async (data) => {
    console.log(data);

    const formData = {
      loginRadio: "Email",
      email: data.email,
      password: data.password,
    };

    console.log("Button clicked", formData);

    // Dispatch the login action
    dispatch(login(formData));
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-screen-2xl p-8">
        <div className="flex flex-col items-center gap-16">
          <h1 className="contents text-4xl font-thin text-gray-27 dark:text-white">
            Sign in
          </h1>
          <hr className="w-24 border-gray-42" />
          <form
            className="flex w-80 flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 self-stretch">
              <label htmlFor="radix-:r1:">
                <div className="contents leading-tight">Email</div>
              </label>
              <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                <input
                  className="min-w-0 grow bg-transparent p-2 focus:outline-none dark:text-white"
                  type="email"
                  autoComplete="username"
                  required=""
                  title=""
                  id="radix-:r1:"
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
            </div>
            <div className="flex flex-col gap-1 self-stretch">
              <label htmlFor="radix-:r3:">
                <div className="contents leading-tight">Password</div>
              </label>
              <div className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24">
                <input
                  className="min-w-0 grow bg-transparent p-2 focus:outline-none dark:text-white"
                  type="password"
                  autoComplete="current-password"
                  required=""
                  title=""
                  id="radix-:r3:"
                  name="password"
                  defaultValue=""
                  style={{ backgroundColor: "hsl(230 19% 24%" }}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                  {errors.password.message}
                </small>
              )}
              <Link className="self-start" href="/user/reset-password">
                <small className="contents text-sm font-normal leading-snug tracking-wide">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-sm underline decoration-1 underline-offset-4 outline-2 outline-blue-62 hover:decoration-2 focus-visible:outline disabled:no-underline disabled:opacity-70"
                  >
                    Forgot password?
                  </button>
                </small>
              </Link>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
              style={{ background: "#C892C7", color: "#212331" }}
            >
              Sign in
            </button>
            <div>
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Don &apos; t have an account?
              </small>
              &nbsp;
              <Link href="/register">
                <small className="contents text-sm font-normal leading-snug tracking-wide">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-sm underline decoration-1 underline-offset-4 outline-2 outline-blue-62 hover:decoration-2 focus-visible:outline disabled:no-underline disabled:opacity-70"
                  >
                    Create account
                  </button>
                </small>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

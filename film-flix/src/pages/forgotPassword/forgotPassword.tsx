import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="flex flex-col w-full h-screen px-6 py-40">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <a href={"/"} className="flex items-center space-x-3">
              <img
                  className="mx-auto h-24 w-auto"
                  src="/images/Logo.webp"
                  alt="FilmFlix Company"
              />
            </a>
            <a href={"/"}>
              <h2
                  className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
              >
                Forgot Password
              </h2>
            </a>
            <p className="mt-2 text-center text-l text-gray-600">
              Or{' '}
              <div className="text-sm">
                <a
                    href="/register"
                    className="font-semibold text-sky-500 hover:text-sky-200"
                >
                  Register
                </a>
              </div>
            </p>
          </div>
          <form className="space-y-6" action="#">
            <input type="hidden" name="remember" value="true"/>
            <div>
              <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div
                  className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <UserIcon color="grey" width={22}/>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full border-0 text-gray-300 placeholder:text-gray-400 bg-gray-900 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Forgot Password
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{" "}
            <Link
                to="/register"
                className="font-semibold leading-6 text-sky-500 hover:text-sky-200"
            >
              Sign Up
            </Link>
          </p>

          <p className="mt- text-center text-sm text-gray-400">
            Continue without login?{" "}
            <Link
                to="/"
                className="font-semibold leading-6 text-sky-500 hover:text-sky-200"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
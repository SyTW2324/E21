import "../../index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Alert from "../../components/alert/alert";

import { HOST } from "src/const";

let error_message: string = "";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [alertShow, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const errorMessage = location.state && location.state.error;
    if (errorMessage) {
      error_message = errorMessage;
      setShowAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = await fetch(`${HOST}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          passwordHash,
        }),
      });

      if (!token.ok) {
        throw new Error("401");
      }

      const tokenJSON = await token.json();

      if (tokenJSON.error) {
        throw new Error(tokenJSON.error);
      }

      localStorage.setItem("token", tokenJSON.token);

      navigate("/profile");
    } catch (error: any) {
      if (error.message === "401") {
        error_message = "Email or password incorrect";
      } else if (error.message === "500") {
        error_message = "Internal server error";
      } else {
        error_message = error.message;
      }
      setShowAlert(true);
    }
  };

  return (
    <>
      {alertShow && <Alert message={error_message} />}
      <div className="flex flex-col w-full h-screen justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href={"/"} className="flex items-center space-x-3">
            <img
              className="mx-auto h-24 w-auto"
              src="/images/Logo.webp"
              alt="FilmFlix Company"
            />
          </a>
          <a href={"/"}>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Login
            </h2>
          </a>
        </div>

        <div className="mt-10 mx-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <UserIcon color="grey" width={22} />
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-semibold text-sky-500 hover:text-sky-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2  px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <LockClosedIcon color="grey" width={22} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={passwordHash}
                  onChange={(e) => setPasswordHash(e.target.value)}
                  placeholder="• • • • • • • •"
                  className="w-full border-0 text-gray-300 bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                LOGIN
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

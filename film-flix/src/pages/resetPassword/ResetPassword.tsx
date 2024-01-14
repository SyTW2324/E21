import { useState, useEffect } from "react";
import "../../index.css";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/alert";

import { HOST } from "src/const";

let error_message: string = "";

export default function ResetPassword() {
  const logo = require("../../img/FilmflixLogo.png") as string;
  const [passwordHash, setPasswordHash] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alertShow, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const { resetToken } = useParams() as { resetToken: string };

  useEffect(() => {
    const checkToken = async () => {
      const response = await fetch(
        `${HOST}/api/user/reset-password/check-token`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken,
          }),
        }
      );

      if (!response.ok) {
        navigate("/login");
      }

      const responseJSON = await response.json();

      if (!responseJSON.valid) {
        navigate("/login");
      }
    };

    checkToken();
  }, [resetToken, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (passwordHash !== repeatPassword) {
        setShowAlert(true);
        throw new Error("Passwords do not match");
      }
      const response = await fetch(`${HOST}/api/user/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passwordHash,
          resetToken,
        }),
      });

      navigate("/login");
    } catch (error: any) {
      error_message = error.message;
      setShowAlert(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center">
      {alertShow && <Alert message={error_message} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href={"/"}>
          <img
            className="mx-auto h-24 w-auto"
            src={logo}
            alt="FilmFlix Company"
          />
        </a>
        <a href={"/"}>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Reset Password
          </h2>
        </a>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
              <LockClosedIcon color="grey" width={22} />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Type your password"
                required
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
                className="w-full border-0 text-gray-300 bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Confirm Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
              <LockClosedIcon color="grey" width={22} />
              <input
                id="password_repeat"
                name="password repeat"
                type="password"
                autoComplete="repeat-password"
                placeholder="Repeat your password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full border-0 text-gray-300 bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="lex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 
                       text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

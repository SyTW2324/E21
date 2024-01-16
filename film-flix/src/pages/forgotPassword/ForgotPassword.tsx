import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HOST } from "src/const";

import Alert from "../../components/alert";
import "../../index.css";

let error_message: string = "";

export default function ForgotPassword() {
  const logo = require("../../img/FilmflixLogo.png") as string;
  const [email, setUserEmail] = useState("");
  const [alertShow, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${HOST}/api/user/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log(response);

      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error(`Introduced email is not registered. Try again with a valid email.`);
      }
    } catch (error: any) {
      error_message = error.message;
      setShowAlert(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {alertShow && <Alert message={error_message} />}
        <a href={"/"}>
          <img
            className="mx-auto h-24 w-auto"
            src={logo}
            alt="FilmFlix Company"
          />
        </a>
        <a href={"/"}>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Forgot Password?
          </h2>
        </a>
      </div>
      <div className="mt-10 mx-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="current-email"
                placeholder="Type your email"
                required
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
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

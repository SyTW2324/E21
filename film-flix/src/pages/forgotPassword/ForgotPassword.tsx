import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/alert";
import "../../index.css";

let error_message: string = "";

export default function ForgotPassword() {
  const logo = require("../../img/FilmflixLogo.png") as string;
  const [username, setUserName] = useState("");
  const [alertShow, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/user/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });

      console.log(username);
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      error_message = error.message;
      setShowAlert(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen px-6 py-20">
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
          <h2
            className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
            Forgot Password?
          </h2>
        </a>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                User Name
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="current-username"
                placeholder="Type your username"
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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

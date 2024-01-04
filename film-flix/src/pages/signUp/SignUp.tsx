import { useState } from "react";
import "../../index.css";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/alert";

let error_message: string = "";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alertShow, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Declaración de parámetros que son necesarios para el funcionamiento de GraphQL
    const name: string = "name";
    const gender: string = "gender";
    const favoriteMovies: any = [];
    const favoriteSeries: any = [];

    // Implementación de una función que permita el control de errores para las situaciones
    // en las que el usuarios ya existe
    try {
      // Comprobación de que las contraseñas coinciden
      if (passwordHash !== repeatPassword) {
        setShowAlert(true);
        throw new Error("Passwords do not match");
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          passwordHash,
          email,
          gender,
          favoriteMovies,
          favoriteSeries,
        }),
      });

      console.log(response);
      navigate("/login");
    } catch (error: any) {
      error_message = error.message;
      setShowAlert(true);
    }
  };

  const logo = require("../../img/FilmflixLogo.png") as string;
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
          <h2
            className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
            Sign Up
          </h2>
        </a>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white"
            >
              Username
            </label>
            <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
              <UserIcon color="grey" width={22} />
              <input
                id="username"
                className="w-full border-0 text-gray-300 bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Example01"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
              <AtSymbolIcon color="grey" width={22} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="password repeat"
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
              className="lex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              SIGN UP
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          You have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-sky-500 hover:text-sky-200"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

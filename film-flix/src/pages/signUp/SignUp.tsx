import { useState } from "react";
import "../../index.css";
import {AtSymbolIcon, LockClosedIcon, UserIcon,} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import Alert  from "../../components/alert";

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

    // Comprobación de que las contraseñas coinciden
    if (passwordHash !== repeatPassword) {
      setShowAlert(true);
    }

    // Implementación de una función que permita el control de errores para las situaciones
    // en las que el usuarios ya existe
    try {
      const response = await fetch("http://localhost:3001/user", {
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
      })
      console.log(response);
      navigate("/");
    } catch (error: any) {
      error_message = error.message;
      setShowAlert(true);
    }
  };

  const logo = require("../../img/FilmflixLogo.png") as string;
  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {alertShow && <Alert message={error_message}/>}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
              className="mx-auto h-24 w-auto"
              src={logo}
              alt="FilmFlix Company"
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div
                  className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <UserIcon color="grey" width={22}/>
                <input
                    id="username"
                    className="w-full border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type your username"
                    required
                />
              </div>
            </div>

            <div>
              <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div
                  className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <AtSymbolIcon color="grey" width={22}/>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Type your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div
                  className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <LockClosedIcon color="grey" width={22}/>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Type your password"
                    required
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                    className="w-full border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div
                  className="mt-2 px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                <LockClosedIcon color="grey" width={22}/>
                <input
                    id="password repeat"
                    name="password repeat"
                    type="password"
                    autoComplete="repeat-password"
                    placeholder="Repeat your password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="w-full border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  className="lex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You have an account?{" "}
            <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
  );
}
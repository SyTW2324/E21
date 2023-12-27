import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const logo = require("../img/FilmflixLogo.png") as string;
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = () : boolean => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            FilmFlix
          </span>
        </a>
        <div className="flex order-2 space-x-1 rtl:space-x-reverse">
          {isLoggedIn() ? (
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600
                                dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600
                                dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}
          {/*<button*/}
          {/*  type="button"*/}
          {/*  onClick={() => {*/}
          {/*    navigate("/login");*/}
          {/*  }}*/}
          {/*  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none */}
          {/*                      focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 */}
          {/*                      dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
          {/*>*/}
          {/*  Get started*/}
          {/*</button>*/}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
                                hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                                dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse 
                                md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 text-white"
                style={{
                  color:
                    location.pathname === "/"
                      ? "rgb(96 165 250 / var(--tw-text-opacity))"
                      : "",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 text-white"
                style={{
                  color:
                    location.pathname === "/movies"
                      ? "rgb(96 165 250 / var(--tw-text-opacity))"
                      : "",
                }}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/series"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 text-white"
                style={{
                  color:
                    location.pathname === "/series"
                      ? "rgb(96 165 250 / var(--tw-text-opacity))"
                      : "",
                }}
              >
                Series
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

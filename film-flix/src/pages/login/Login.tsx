import "../../index.css";
import {Link, useNavigate} from "react-router-dom";
import {LockClosedIcon, UserIcon} from "@heroicons/react/24/outline"
import {useState} from "react";
import Alert from "../../components/alert";

let error_message: string = "";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [alertShow, setShowAlert] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = await fetch(`http://localhost:3001/user`, {
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
        throw new Error(`Error en la solicitud: ${token.statusText}`);
      }

      const tokenJSON = await token.json();

      if (tokenJSON.error) {
        throw new Error(tokenJSON.error);
      }

      localStorage.setItem("token", tokenJSON.token);

      navigate("/profile");

    } catch (error: any) {
      error_message = error.message;
      setShowAlert(true);
    }
  }

  return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {alertShow && <Alert message={error_message}/>}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-24 w-auto"
                src="/images/Logo.webp"
                alt="FilmFlix Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                      className="w-full border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="/register" className="font-semibold text-sky-800 hover:text-sky-600">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div
                    className="mt-2  px-3 flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300">
                  <LockClosedIcon color="grey" width={22}/>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={passwordHash}
                      onChange={(e) => setPasswordHash(e.target.value)}
                      placeholder="• • • • • • • •"
                      className="w-full border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
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

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold leading-6 text-sky-800 hover:text-sky-600">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </>
  );
}
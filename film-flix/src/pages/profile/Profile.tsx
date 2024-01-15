import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Alert from "../../components/alert";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { User } from "../../types/user";

import { HOST } from "src/const";


async function getUser(navigate: any, onErr: (err: string) => void) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const response = await fetch(`${HOST}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    onErr(error.message);
  }
}

let error_message: string = "";

export default function Profile() {
  const navigate = useNavigate();
  const [alertShow, setShowAlert] = useState(false);
  const [data, setData] = useState<User>({
    _id: "",
    username: "",
    email: "",
    favoriteMovies: [],
    favoriteSeries: [],
  });

  useEffect(() => {
    getUser(navigate, (error) => {
      error_message = error;
      setShowAlert(true);
    }).then((data) => setData(data));
  }, [navigate]);

  return (
    <section className="bg-gray-800">
      {alertShow && <Alert message={error_message} />}
      <Navbar />
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md flex flex-col w-full">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
          {data.username}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-sky-200 sm:text-xl">
          "Welcome to your personal profile! Here you can take a look at your data and modify it if you wish."
        </p>
        <div className="space-y-8">
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-xl  font-medium text-gray-300"
            >
              Your ID
            </label>
            <div className="shadow-sm bg-gray-700 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5">
              {data._id}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-xl  font-medium text-gray-300"
            >
              Your email
            </label>
            <div className="shadow-sm bg-gray-700 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5">
              {data.email}
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-xl font-medium text-gray-300"
            >
              Favorite Movies
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {
              data.favoriteMovies.map((movie: any) => (
                <Link to={`/movies/${movie._id}`} key={movie._id}>
                  <div className="text-white">
                    <img
                      className="object-cover h-80 rounded-lg"
                      src={movie.image}
                      alt={movie.title}
                    />
                      <p className="font-medium mt-4 text-center">
                        {movie.title}
                      </p>
                  </div>
                </Link>
              ))
              }
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-xl font-medium text-gray-300"
            >
              Favorite Series
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {data.favoriteSeries.map((serie: any) => (
                <Link to={`/series/${serie._id}`} key={serie._id}>
                  <div className="text-white">
                    <img
                      className="object-cover h-80 rounded-lg"
                      src={serie.image}
                      alt={serie.title}
                    />
                      <p className="font-medium mt-4">
                        {serie.title}
                      </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="py-1.5 px-10 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

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
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md flex flex-col w-full h-screen">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
          {data.username}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-sky-200 sm:text-xl">
          ¡Bienvenido/a a tu perfil personal! Aquí podrás echar un vistazo a tus
          datos y modificarlos si lo deseas
        </p>
        <div className="space-y-8">
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-300"
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
              className="block mb-2 text-sm font-medium text-gray-300"
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
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Favorites Movies
            </label>
            <div className="shadow-sm bg-gray-700 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5">
              {
              data.favoriteMovies.map((movie: any, index: any) => (
                <Link to={`/movies/${movie._id}`} key={movie._id}>
                  <div className="pt-2 pb-2" key={index}>{index + 1}. {movie.title}</div>
                </Link>
              ))
              }
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Favorites Series
            </label>
            <div className="shadow-sm bg-gray-700 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5">
              {data.favoriteSeries.map((serie: any, index: any) => (
                <Link to={`/series/${serie._id}`} key={serie._id}>
                  <div className="pt-2 pb-2" key={index}>{index + 1}. {serie.title}</div>
                </Link>
              ))}
            </div>
          </div>
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
      <Footer />
    </section>
  );
}

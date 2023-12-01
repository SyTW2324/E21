import { useNavigate } from "react-router-dom";
import { FIND_MY_DATA } from "../utils/find_my_data";
import { useQuery } from "@apollo/client";
import {useState} from "react";
import Alert from "../components/Alert";

let error_message: string = "";
export default function Profile(): any {
  const [alertShow, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(FIND_MY_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) {
    error_message = error.message;
    setShowAlert(true);
  }

  console.log(data);

  return (
    <section className="bg-white dark:bg-gray-900">
      {alertShow && <Alert message={error_message}/>}
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-sky-700 dark:text-white">
          {data.findMyData.username}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-sky-900 dark:text-gray-400 sm:text-xl">
          ¡Bienvenido/a a tu perfil personal! Aquí podrás echar un vistazo a tus
          datos y modificarlos si lo deseas
        </p>
        <div className="space-y-8">
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your ID
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              {data.findMyData._id}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
            {data.findMyData.email}
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Favorites Movies
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
            {data.findMyData.favoriteMovies.map((movie: any, index: any) => (
              <div key={index}>{movie.title}</div>
            ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Favorites Series
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
            {data.findMyData.favoriteSeries.map((movie: any, index: any) => (
              <div key={index}>{movie.title}</div>
            ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="py-1.5 px-10 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
}

import { gql } from "apollo-server";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// const USER = gql`
//   query findUser($username: String!) {
//     findUser(username: $username) {
//       id
//       username
//       email
//       favoritesMovies
//       favoritesSeries
//     }
//   }
// `;

function Profile() {
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-sky-700 dark:text-white">
          Nombre Usuario
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
              123456789
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              example@gmail.com
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Favorites Movies
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              Your favorites movies
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Favorites Series
            </label>
            <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              Your favorites series
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

export default Profile;

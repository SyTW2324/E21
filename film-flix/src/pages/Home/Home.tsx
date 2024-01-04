import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import React from 'react';

async function getNumUsers() {
  try {
    const response = await fetch("/api/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

async function getNumMovies() {
  try {
    const response = await fetch("/api/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

async function getNumSeries() {
  try {
    const response = await fetch("/api/series", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export default function Home() {
  const Daredevil = require("../../img/daredevil.jpg") as string;
  const Morbius = require("../../img/morbius.jpeg") as string;
  const girlWithLaptop = require("../../img/GirlUsingLaptop.jpg") as string;

  const [numUsers, setNumUsers] =   React.useState(0);
  const [numMovies, setNumMovies] = React.useState(0);
  const [numSeries, setNumSeries] = React.useState(0);

  React.useEffect(() => {
    // obtener el número de usuarios de la plataforma
    getNumUsers().then((data) => {
      setNumUsers(Object.keys(data.users).length);
    });

    // Obtener el número de películas de la plataforma
    getNumMovies().then((data) => {
      setNumMovies(Object.keys(data.movies).length);
    });

    // Obtener el número de series de la plataforma
    getNumSeries().then((data) => {
      setNumSeries(Object.keys(data.series).length);
    });
  }, []);

  return (
    <div className='flex flex-col w-full h-screen'>
      <Navbar />
      <div className='flex-grow'>
        <section className="bg-gray-900 pt-4 pb-28">
          <div className="max-w-screen-xl gap-16 items-center lg:mx-auto mx-4 lg:grid lg:grid-cols-2 
                          md:grid md:grid-cols-1 mt-16">
            <div className="font-light sm:text-lg text-gray-400">
              <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-white">
                Find your next favorite movie or TV show.
              </h2>
              <p className="mb-4">
                We are Filmflix and we are here to help you find your next
                favorite movie or TV show. On our website you can check data about
                movies and TV shows, such as their ratings, release date, cast,
                crew, and more. You can also save your favorite movies and TV
                shows to your profile.
              </p>
              <p>
                We have a wide variety of movies and TV shows for you search
                through. We have movies and TV shows from all genres and from all
                over the world.
              </p>
            </div>
            <div className="mt-8">
              <img
                className="object-cover object-center h-full w-full rounded-lg"
                src={girlWithLaptop}
                alt="gitl with laptop"
              />
            </div>
          </div>
        </section>
        <section className="bg-gray-900">
          <div className="container px-5 pb-12 mx-auto">
            <div className="flex flex-wrap -mx-4 -mb-10 text-center">
              <div className="sm:w-1/2 mb-10 px-4">
                <div className="rounded-lg h-80 overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-top h-full w-full"
                    src={Daredevil}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-white mt-6 mb-3">
                  Don't know what to watch?
                </h2>
                <p className="leading-relaxed text-base text-white">
                  You can search through our wide variety of movies and TV shows
                  to find your next favorite movie or TV show. Daredevil is a
                  great TV show to watch if you are into superheroes.
                </p>
              </div>
              <div className="sm:w-1/2 mb-10 px-4">
                <div className="rounded-lg h-80 overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-top h-full w-full"
                    src={Morbius}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-white mt-6 mb-3">
                  Want to know more about the new Marvel Legend?
                </h2>
                <p className="leading-relaxed text-base text-white">
                  Maybe the famous Marvel Legend Morbius is the right movie for
                  you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-900 text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex -m-4 text-center">
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                  {numUsers}
                </h2>
                <p className="leading-relaxed text-white">Users</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                  {numMovies}
                </h2>
                <p className="leading-relaxed text-white">Movies</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                  {numSeries}
                </h2>
                <p className="leading-relaxed text-white">Series</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

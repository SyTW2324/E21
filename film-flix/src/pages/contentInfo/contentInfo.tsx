import Footer from "../../components/footer"
import Navbar from "../../components/navbar"
import {useNavigate, useParams} from "react-router-dom"

import React from "react"

type Seasons = {
  _id: string;
  season: number;
  episodes: Episode[];
};

type Episode = {
  _id: string;
  title: string;
  description: string;
  duration: number;
  rating: number;
  numEpisode: number;
};

type Movies = {
  _id: string;
  image: string;
  title: string;
  description: string;
  director: string;
  year: number;
  duration: number;
  cast: string[];
  genre: string[];
  rating: number;
  platform: string[];
};

type Series = {
  _id: string;
  image: string;
  title: string;
  description: string;
  director: string;
  yearStart: number;
  yearEnd: number;
  numEpisodes: number;
  seasons: Seasons[];
  cast: string[];
  genre: string[];
  durationAVG: number;
  rating: number;
  platform: string[];
};

let elementID: string = "";
let movieOrNot: boolean = false;

async function getContentInfo(id: string, type: "movies" | "series", onErr: (err: string) => void): Promise<Movies | Series> {
  try {
    const response = await fetch(`http://localhost:3001/${type}/${id}`, {
      method: "GET"
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json() as { movie: Movies } | { serie: Series };
    console.log(data);
    if ("movie" in data) {
      return data.movie;
    } else {
      return data.serie;
    }
  } catch (error: any) {
    onErr(error.message);
    return {} as Movies | Series;
  }
}

async function getComments(id: string, type: "movies" | "series", onErr: (err: string) => void): Promise<any[]> {
  try {
    const responseMovieorNot = await fetch(`http://localhost:3001/${type}/${id}`, {
      method: "GET"
    });
    console.log(responseMovieorNot);
    if (!responseMovieorNot.ok) {
      throw new Error(`Error en la solicitud: ${responseMovieorNot.statusText}`);
    }
    const dataMovieorNot = await responseMovieorNot.json() as { movie: Movies } | { serie: Series };
    console.log(dataMovieorNot);
    if ("movie" in dataMovieorNot) {
      elementID = dataMovieorNot.movie._id;
      movieOrNot = true;
    } else {
      elementID = dataMovieorNot.serie._id;
      movieOrNot = false;
    }

    const response = await fetch("http://localhost:3001/comments", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    // Dependiendo de la petición y que si los identificadores coinciden, se filtra
    console.log(elementID);
    if (movieOrNot === true) {
      return data.comments.filter((comment: any) => comment.moviesID === elementID);
    } else {
      return data.comments.filter((comment: any) => comment.seriesID === elementID);
    }
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export default function ContentInfo({type}: { type: "movies" | "series" }) {
  const [content, setContent] = React.useState<Movies | Series>();
  const [comments, getComment] = React.useState<any>([]);
  const [text, setText] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const navigate = useNavigate();

  // Extraer el id de la url
  const {id} = useParams() as { id: string };

  React.useEffect(() => {
    getContentInfo(id, type, (error) => {
    }).then((data) => setContent(data));
    getComments(id, type, (error) => {
    }).then((data) => getComment(data));
  }, [type, id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login', { state: { error: 'Usuario no autenticado. Debes iniciar sesión.' } });
      }

      const responseUser = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ?? "",
        },
      });

      if (!responseUser.ok) {
        throw new Error(`Error en la solicitud: ${responseUser.statusText}`);
      }

      // Obtención del nombre de usuario a partir del token
      const dataUser = await responseUser.json();
      setUserName(dataUser.username);

      // Dependiendo de si se trata de una peli o de una serie, se hace una petición u otra
      if (movieOrNot === true) {
        const response = await fetch("http://localhost:3001/comments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            userName,
            moviesID: elementID,
          }),
        });

        console.log(response);
        if (response.ok) {
          navigate("/");
        }
      } else {
        const response = await fetch("http://localhost:3001/comments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            userName,
            seriesID: elementID,
          }),
        });

        console.log(response);
        if (response.ok) {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [currentSeason, setCurrentSeason] = React.useState(1);

  const handleSeasonClick = (season: number) => {
    setCurrentSeason(season);
  };

  return (
    <>
      <div className="bg-gray-900 ">
        <Navbar />
        <div className="pb-20">
          <div className="max-w-screen-lg gap-16 lg:mx-auto lg:flex mx-4 mt-16 ">
            <div className="mb-8">
              <img
                className="rounded-lg h-96 mx-auto"
                src={ content?.image }
                alt=""
              />
              <div className="flex justify-center items-center">
                <div>
                  <div>
                    <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                      Rating
                    </h2>
                    <p className="text-white pt-1 flex justify-center">
                      { content?.rating }
                    </p>
                  </div>
                  <div>
                    <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                      Platforms
                    </h2>
                    <p className="text-white pt-1 flex justify-center">
                      { content?.platform.join(" - ") }
                    </p>
                  </div>
                  <div>
                    <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                      Runtime
                    </h2>
                    <p className="text-white pt-1 flex justify-center">
                      { content && "duration" in content ? `${content.duration} min` : `${content?.durationAVG} min` }
                    </p>
                  </div>
                  {
                    content && "numEpisodes" in content &&
                    <div>
                      <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                        Episodes
                      </h2>
                      <p className="text-white pt-1 flex justify-center">
                        { content?.numEpisodes }
                      </p>
                    </div>
                  }
                  {
                    content && "seasons" in content &&
                    <div>
                      <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                        Seasons 
                      </h2>
                      <p className="text-white pt-1 flex justify-center">
                        { content?.seasons.length }
                      </p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div>
              <div>
                <h1 className="text-white text-4xl font-bold">{ content?.title }</h1>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5">Genre</h2>
                <p className="text-white font-extralight pt-2">
                  { content?.genre.join(", ") }
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5">
                  Release Date
                </h2>
                <p className="text-white font-extralight pt-2">
                  { content && "year" in content ? content.year : `${content?.yearStart} - ${content?.yearEnd === -1 ? "Present" : content?.yearEnd} ` }
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5">Cast</h2>
                <p className="text-white font-extralight pt-2">
                  { content?.cast.join(", ") }
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5">Director</h2>
                <p className="text-white font-extralight pt-2">
                  { content?.director }
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5">Plot</h2>
                <p className="text-white font-extralight pt-2 flex">
                  { content?.description }
                </p>
              </div>
            </div>
          </div>
          {
            content && "seasons" in content &&
            <div>
              {/* Barra de navegación para temporadas */}
              <div className="flex justify-center space-x-4 pt-4">
                {content.seasons.map((season: any) => (
                  <button
                    key={season.season}
                    className="text-white hover:text-slate-300 focus:outline-none"
                    onClick={() => handleSeasonClick(season.season)} // Define esta función según tus necesidades
                  >
                    Season {season.season}
                  </button>
                ))}
              </div>

              {/* Contenido de episodios */}
              <div className="flex justify-center mt-6">
                {content.seasons.map((season: any) => (
                  <div key={season.season}>
                    {currentSeason === season.season && (
                      <>
                        <div className="overflow-auto hover:overflow-x-hidden w-screen max-w-4xl max-h-96 bg-slate-800">
                          {season.episodes.map((episode: any, index: number) => (
                            <div key={episode.numEpisode} className="px-4 py-4">
                              <h2 className="font-semibold pt-2 text-xl text-sky-400 ">
                                {`${index + 1}. ${episode.title}`}
                              </h2>
                              <p className="text-white font-extralight pt-2">
                                {episode.description}
                              </p>
                              <h3 className="text-gray-400 font-medium pt-2">
                                {`${episode.duration} MIN`}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
        <section className="bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-white">
                  Discussion
                </h2>
              </div>
              <form className="mb-6" onSubmit={handleSubmit}>
                <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg borde bg-gray-800 border-gray-700">
                  <label className="sr-only">Your comment</label>
                  <textarea
                      id="comment"
                      className="px-0 w-full text-sm text-white border-0 focus:ring-0 focus:outline-none placeholder-gray-400 bg-gray-800"
                      placeholder="Write a comment..."
                      onChange={(e) => setText(e.target.value)}
                      required
                  ></textarea>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800"
                >
                  Post comment
                </button>
              </form>
              {comments.map((comment: any, index: any) => (
                  <article key={index} className="p-6 text-base rounded-lg bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                          {comment.userName}
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-400">{comment.text}</p>
                    <div className="flex items-center mt-4 space-x-4"></div>
                  </article>
              ))}
            </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

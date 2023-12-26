import Footer from "../../components/footer"
import Navbar from "../../components/navbar"
import {useNavigate, useParams} from "react-router-dom"

import React from "react"

type Movies = {
  _id: string;
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
  title: string;
  description: string;
  director: string;
  yearStart: number;
  yearEnd: number;
  numEpisodes: number;
  seasons: number;
  cast: string[];
  genre: string[];
  durationAVG: number;
  rating: number;
  platform: string[];
};

async function getContentInfo(id: string, type: "movies" | "series", onErr: (err: string) => void): Promise<Movies | Series> {
  try {
    console.log(id);
    console.log(type);
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

async function getComments(): Promise<any[]> {
  try {
    const response = await fetch("http://localhost:3001/comments", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data.comments || []; // Asegúrate de ajustar la estructura según la respuesta real
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
  }, [type, id]);

  React.useEffect(() => {
    getComments().then((data) => getComment(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // LANZAR UN MENSAJE DE ERROR EN ESTE CASO
      if (!token) {
        navigate("/login");
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

      const response = await fetch("http://localhost:3001/comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          userName,
        }),
      });

      console.log(response);
      if (response.ok) {
        navigate("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
      <>
        <div className="bg-gray-900 ">
          <Navbar/>
          <div className="pt-4 pb-20">
            <div
                className="max-w-screen-lg gap-16 items-center lg:mx-auto mx-4 lg:grid lg:grid-cols-2 md:grid md:grid-cols-1 mt-16">
              <div>
                <img
                    className="h-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                    alt=""
                />
                <div className="flex justify-center items-center">
                  <div>
                    <div>
                      <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                        Rating
                      </h2>
                      <p className="text-white pt-1 flex justify-center">
                        {content?.rating}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                        Platforms
                      </h2>
                      <p className="text-white pt-1 flex justify-center">
                        {content?.platform.join(" - ")}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                        Runtime
                      </h2>
                      <p className="text-white pt-1 flex justify-center">
                        {content && "duration" in content ? `${content.duration} min` : `${content?.durationAVG} min`}
                      </p>
                    </div>
                    {
                        content && "numEpisodes" in content &&
                        <div>
                            <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                                Episodes
                            </h2>
                            <p className="text-white pt-1 flex justify-center">
                              {content?.numEpisodes}
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
                              {content?.seasons}
                            </p>
                        </div>
                    }
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h1 className="text-white text-4xl font-bold">Title</h1>
                  <p className="text-white font-extralight pt-2">
                    {content?.title}
                  </p>
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold pt-5">Genre</h2>
                  <p className="text-white font-extralight pt-2">
                    {content?.genre.join(", ")}
                  </p>
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold pt-5">
                    Release Date
                  </h2>
                  <p className="text-white font-extralight pt-2">
                    {content && "year" in content ? content.year : `${content?.yearStart} - ${content?.yearEnd}`}
                  </p>
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold pt-5">Cast</h2>
                  <p className="text-white font-extralight pt-2">
                    {content?.cast.join(", ")}
                  </p>
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold pt-5">Director</h2>
                  <p className="text-white font-extralight pt-2">
                    {content?.director}
                  </p>
                </div>
                <div>
                  <h2 className="text-white text-2xl font-bold pt-5">Plot</h2>
                  <p className="text-white font-extralight pt-2">
                    {content?.description}
                  </p>
                </div>
              </div>
            </div>
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

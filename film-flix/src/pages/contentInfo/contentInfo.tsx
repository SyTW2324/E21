import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Episodes from "../../components/episodes";
import Comments from "../../components/comments";
import PlatformLogos from "src/streamingPlatformIcons/platformLogos";

import {
  getContentInfo,
  putFavContent,
  getUser,
  Movies,
  Series,
  User,
  elementID,
  movieOrNot,
} from "./functions";
import { HOST } from "../../const";

import { useNavigate, useParams } from "react-router-dom";
import React from "react";

export default function ContentInfo({ type }: { type: "movies" | "series" }) {
  const navigate = useNavigate();

  const [content, setContent] = React.useState<Movies | Series>();
  const [text, setText] = React.useState("");

  const [userData, setUserData] = React.useState<User>({
    _id: "",
    username: "",
    email: "",
    favoriteMovies: [],
    favoriteSeries: [],
  });

  React.useEffect(() => {
    if (userData?._id !== "") {
      return;
    }
    getUser((error) => {}).then((data) => setUserData(data));
  }, [userData]);

  const favContentId: string[] = [];

  if (userData) {
    userData.favoriteMovies.forEach((movie: any) => {
      favContentId.push(movie._id);
    });

    userData.favoriteSeries.forEach((serie: any) => {
      favContentId.push(serie._id);
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", {
          state: { error: "User not authenticated. You must be logged in." },
        });
        return;
      }

      const responseUser = await fetch(`${HOST}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ?? "",
        },
      });

      if (!responseUser.ok) {
        throw new Error(`Error en la solicitud: ${responseUser.statusText}`);
      }

      const dataUser = await responseUser.json();
      const userName = dataUser.username;

      if (movieOrNot === true) {
        const response = await fetch(`${HOST}/api/comments`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            userName: userName,
            moviesID: elementID,
          }),
        });

        if (response.ok) {
          window.location.reload();
        }
      } else {
        const response = await fetch(`${HOST}/api/comments`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            userName: userName,
            seriesID: elementID,
          }),
        });
        if (response.ok) {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [averageDuration, setAverageDuration] = React.useState(0);

  const calculateAverageDuration = (allEpisodes: any) => {
    if (allEpisodes.length === 0) {
      return 0;
    }

    const totalDuration = allEpisodes.reduce(
      (acc: any, episode: any) => acc + episode.duration,
      0
    );
    return totalDuration / allEpisodes.length;
  };

  const { id } = useParams() as { id: string };

  React.useEffect(() => {
    getContentInfo(id, type, (error) => {}).then((data) => setContent(data));
  }, [type, id, setContent]);

  React.useEffect(() => {
    if (content && "seasons" in content) {
      const allEpisodes = content.seasons.flatMap((season) => season.episodes);

      const average = calculateAverageDuration(allEpisodes);
      setAverageDuration(average);
    }
  }, [content]);

  if (!content) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-900 ">
        <Navbar />
        <div className="pb-20">
          <div className="max-w-screen-lg gap-16 lg:mx-auto lg:flex mx-4 mt-16 ">
            <div className="mb-8">
              <div className="producto">
                <img
                  className="rounded-lg h-96 mx-auto"
                  src={content?.image}
                  alt=""
                />
                {userData &&
                  (favContentId.includes(content._id) ? (
                    <div>
                      <input
                        type="checkbox"
                        id="checkboxInput"
                        className="bookmark"
                        defaultChecked
                        onClick={() => {
                          putFavContent(
                            userData._id,
                            content._id,
                            type,
                            "remove",
                            (error) => {}
                          ).then((data) => setUserData(data.user));
                        }}
                      />
                      <label htmlFor="checkboxInput" className="bookmark">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                          className="svgIcon"
                        >
                          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                        </svg>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="checkbox"
                        id="checkboxInput"
                        className="bookmark"
                        onClick={() => {
                          putFavContent(
                            userData._id,
                            content._id,
                            type,
                            "add",
                            (error) => {}
                          ).then((data) => setUserData(data.user));
                        }}
                      />
                      <label htmlFor="checkboxInput" className="bookmark">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                          className="svgIcon"
                        >
                          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                        </svg>
                      </label>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center space-x-5 sm:flex-col sm:space-x-0">
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
                    Runtime
                  </h2>
                  <p className="text-white pt-1 flex justify-center">
                    {content && "duration" in content
                      ? `${content.duration} min`
                      : `${averageDuration.toFixed(0)} min`}
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-5 sm:flex-col sm:space-x-0">
                {content && "numEpisodes" in content && (
                  <div>
                    <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                      Episodes
                    </h2>
                    <p className="text-white pt-1 flex justify-center">
                      {content?.numEpisodes}
                    </p>
                  </div>
                )}
                {content && "seasons" in content && (
                  <div>
                    <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                      Seasons
                    </h2>
                    <p className="text-white pt-1 flex justify-center">
                      {content?.seasons.length}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-5 sm:space-x-0">
                <div>
                  <h2 className="text-gray-500 text-lg font-bold pt-3 flex justify-center">
                    Platforms
                  </h2>
                  <PlatformLogos
                    className={"sm:flex sm:justify-center sm:space-x-5"}
                    platforms={content?.platform}
                  />
                </div>
              </div>
            </div>
            <div className="mx-5">
              <div>
                <h1 className="text-white text-4xl font-bold flex justify-center sm:justify-start">
                  {content?.title}
                </h1>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5 flex justify-center sm:justify-start">
                  Genre
                </h2>
                <p className="text-white font-extralight pt-2 flex justify-center sm:justify-start">
                  {content?.genre.join(", ")}
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5 flex justify-center sm:justify-start">
                  Release Date
                </h2>
                <p className="text-white font-extralight pt-2 flex justify-center sm:justify-start">
                  {content && "year" in content
                    ? content.year
                    : `${content?.yearStart} - ${
                        content?.yearEnd === -1 ? "Present" : content?.yearEnd
                      } `}
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5 flex justify-center sm:justify-start">
                  Cast
                </h2>
                <p className="text-white font-extralight pt-2 flex justify-center sm:justify-start">
                  {content?.cast.join(", ")}
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5 flex justify-center sm:justify-start">
                  Director
                </h2>
                <p className="text-white font-extralight pt-2 flex justify-center sm:justify-start">
                  {content?.director}
                </p>
              </div>
              <div>
                <h2 className="text-slate-400 text-2xl font-semibold pt-5 flex justify-center sm:justify-start">
                  Plot
                </h2>
                <p className="text-white font-extralight pt-2 flex justify-center sm:justify-start">
                  {content?.description}
                </p>
              </div>
            </div>
          </div>
          <Episodes content={content} />
        </div>
        <Comments
          handleSubmit={handleSubmit}
          setText={setText}
          setContent={setContent}
          type={type}
        />
        <Footer />
      </div>
    </>
  );
}

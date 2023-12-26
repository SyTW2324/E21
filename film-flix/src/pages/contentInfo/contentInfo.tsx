import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";

import React from "react";

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

async function getContentInfo(
  id: string,
  type: "movies" | "series",
  onErr: (err: string) => void
): Promise<Movies | Series> {
  try {
    console.log(id);
    console.log(type);
    const response = await fetch(`http://localhost:3001/${type}/${id}`, {
      method: "GET",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = (await response.json()) as
      | { movie: Movies }
      | { serie: Series };
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

export default function ContentInfo({ type }: { type: "movies" | "series" }) {
  const [content, setContent] = React.useState<Movies | Series>();

  // Extraer el id de la url
  const { id } = useParams() as { id: string };

  React.useEffect(() => {
    getContentInfo(id, type, (error) => {}).then((data) => setContent(data));
  }, [type, id]);

  return (
    <>
      <div className="bg-gray-900 ">
        <Navbar />
        <div className="pt-4 pb-20">
          <div className="max-w-screen-lg gap-16 lg:mx-auto mx-4 lg:grid lg:grid-cols-2 md:grid md:grid-cols-1 mt-16">
            <div>
              <div>
                <img
                  className="h-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt=""
                />
                <div
                  title="Like"
                  className="heart-container"
                >
                  <input
                    id="Give-It-An-Id"
                    className="checkbox"
                    type="checkbox"
                  />
                  <div className="svg-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-outline"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-filled"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="100"
                      width="100"
                      className="svg-celebrate"
                    >
                      <polygon points="10,10 20,20"></polygon>
                      <polygon points="10,50 20,50"></polygon>
                      <polygon points="20,80 30,70"></polygon>
                      <polygon points="90,10 80,20"></polygon>
                      <polygon points="90,50 80,50"></polygon>
                      <polygon points="80,80 70,70"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
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
                      {content && "duration" in content
                        ? `${content.duration} min`
                        : `${content?.durationAVG} min`}
                    </p>
                  </div>
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
                        {content?.seasons}
                      </p>
                    </div>
                  )}
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
                  {content && "year" in content
                    ? content.year
                    : `${content?.yearStart} - ${content?.yearEnd}`}
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
                Discussion (20)
              </h2>
            </div>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg borde bg-gray-800 border-gray-700">
                <label className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  className="px-0 w-full text-sm text-white border-0 focus:ring-0 focus:outline-none placeholder-gray-400 bg-gray-800"
                  placeholder="Write a comment..."
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
            <article className="p-6 text-base rounded-lg bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    Michael Gough
                  </p>
                </div>
              </footer>
              <p className="text-gray-400">
                The movie is one of the best I've seen, and I loved it. It's a
                compelling story with depth, not related to religion. Despite
                some people not finding it appealing, I highly recommend it. The
                film excels in its incredible story and serious tone, with a
                notable aspect being the high level of romance. It's not for
                everyone, especially not for pessimists. Put aside the science
                fiction element, approach it with maturity, and try to
                understand the movie.
              </p>
              <div className="flex items-center mt-4 space-x-4"></div>
            </article>
            <article className="p-6 text-base rounded-lg bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green"
                    />
                    Bonnie Green
                  </p>
                </div>
              </footer>
              <p className="text-gray-400">
                The plot, special effects, and cinematography are the highlights
                of the movie. Just the premise of delving into dreams, something
                scientifically understood very little, allows for a
                well-speculated theory like this. The ending is quite epic, and
                the way they construct it, leaving the doubt about the truth of
                everything we just saw, is spectacular. Regarding the
                performances, I think they fell a bit short, especially
                considering DiCaprio's potential. The plot also gets tangled,
                making it one of those movies that demands your full attention;
                otherwise, you'll lose all sense.
              </p>
              <div className="flex items-center mt-4 space-x-4"></div>
            </article>
            <article className="p-6 text-base rounded-lg bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt="Helene Engels"
                    />
                    Helene Engels
                  </p>
                </div>
              </footer>
              <p className="text-gray-400">
                This movie is undoubtedly an explosion of elements that leave
                you in awe, and you have to watch it two or more times to
                understand it from start to finish. It features an incredible
                cast and is directed by a spectacular and imaginative director.
                One of the best movies I will ever see in my life.
              </p>
              <div className="flex items-center mt-4 space-x-4"></div>
            </article>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

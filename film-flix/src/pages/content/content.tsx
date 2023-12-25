import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";

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
  platform: string;
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
  platform: string;
};

async function getContent(
  type: "movies" | "series",
  onErr: (err: string) => void
): Promise<Movies[] | Series[]> {
  try {
    const response = await fetch(`http://localhost:3001/${type}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = (await response.json()) as
      | { movies: Movies[] }
      | { series: Series[] };
    if ("movies" in data) {
      return data.movies;
    } else {
      return data.series;
    }
  } catch (error: any) {
    onErr(error.message);
    return [];
  }
}

function FilterButton({
  option,
  content,
  onClick,
  allGenres,
  selected,
}: {
  option: string;
  content: Movies[] | Series[];
  onClick: (content: Movies[] | Series[]) => void;
  allGenres?: boolean;
  selected?: boolean;
}) {
  // @ts-ignore
  const filtered = content.filter(
    (cont: Movies | Series) => cont.genre.includes(option) || allGenres
  ) as Movies[] | Series[];
  if (filtered.length <= 0) {
    return null;
  }
  return (
    <button
      type="button"
      className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                  border border-gray-900 bg-gray-900 hover:border-gray-700 
                  text-white focus:ring-gray-800"
      // Reset content and Show only action content
      onClick={() => {
        onClick(filtered);
      }}
      style={selected ? { backgroundColor: "#3b82f6", color: "#ffffff" } : {}}
    >
      {option}
    </button>
  );
}

const FILTERS = [
  "All genres",
  "Action",
  "Animation",
  "Crime",
  "Drama",
  "Fantasy",
  "Sci-Fi",
  "War",
];

export default function Content({ type }: { type: "movies" | "series" }) {
  const [content, setContent] = React.useState<Movies[] | Series[]>([]);
  const [copyContent, setCopyContent] = React.useState<Movies[] | Series[]>([]);
  const [selected, setSelected] = React.useState("All genres");
  console.log(content);

  React.useEffect(() => {
    getContent(type, (error) => {
      console.log(error);
    }).then((data) => {
      console.log(data);
      setContent(data);
      setCopyContent(data);
    });
  }, [type]);

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="flex-grow bg-gray-900">
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            {FILTERS.map((filter) => (
              <FilterButton
                key={filter}
                option={filter}
                content={copyContent}
                onClick={(filtered) => {
                  setContent(filtered);
                  setSelected(filter);
                }}
                allGenres={filter === "All genres"}
                selected={selected === filter}
              />
            ))}
          </div>

          <div className="flex justify-center pb-16">
            <div className="max-w-screen-2xl grid grid-cols-2 md:grid-cols-4 gap-6 mx-4">
              {content.map((cont) => (
                <Link to={`/${type}/${cont._id}`} key={cont._id}>
                  <div className="text-white">
                    <img
                      className="h-auto rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                      alt={cont.title}
                    />
                    <p className="font-medium flex justify-center">
                      {cont.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

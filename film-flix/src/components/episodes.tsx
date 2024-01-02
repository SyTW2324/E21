import { Series } from "../types/series";
import { Movies } from "../types/movies";

import React from "react";

export default function Episodes({ content }: { content: Series | Movies}) {

  const [currentSeason, setCurrentSeason] = React.useState(1);

  const handleSeasonClick = (season: number) => {
    setCurrentSeason(season);
  };

  return (

    // eslint-disable-next-line no-mixed-operators
    content && "seasons" in content && (
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
                    {season.episodes.map(
                      (episode: any, index: number) => (
                        <div
                          key={episode.numEpisode}
                          className="px-4 py-4"
                        >
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
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    // eslint-disable-next-line no-mixed-operators
    ) || (
      null
    )
  );
}
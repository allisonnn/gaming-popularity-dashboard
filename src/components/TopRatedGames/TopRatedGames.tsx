import React from "react";
import { ParentSize } from "@visx/responsive";
import useTopRatedGames from "../../hooks/useTopRatedGames";
import WordCloudChart from "./WordCloudChart";
import { Manufacturer } from "../../types";

interface TopRatedGamesProps {
  manufacturer: Manufacturer;
}

const TopRatedGames: React.FC<TopRatedGamesProps> = ({ manufacturer }) => {
  const topRatedGames = useTopRatedGames();

  return (
    <>
      <div className="flex items-baseline  border-b">
        <h2 className="chart-heading">{manufacturer} top rated games</h2>
        <span className="text-gray-600">{`(by critic score)`}</span>
      </div>
      <div className="text-gray-700 grow max-h-[300px]">
        <ParentSize>
          {({ width, height }) => (
            <WordCloudChart
              width={width}
              height={height}
              data={topRatedGames[manufacturer].map((game) => ({
                text: game.name,
                value: game.criticScore,
              }))}
            />
          )}
        </ParentSize>
      </div>
    </>
  );
};

export default TopRatedGames;

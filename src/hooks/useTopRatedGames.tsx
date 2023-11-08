import { useContext, useMemo } from "react";
import { uniqBy } from "lodash";
import { DataSourceContext } from "../context/DataSource";
import { Game, Manufacturer } from "../types";

const manufacturers = Object.values(Manufacturer);

function getTop20Games(data: Game[]) {
  return uniqBy(
    data
      .filter((d) => !!d.criticScore)
      .sort((a, b) => b.criticScore - a.criticScore)
      .slice(0, 100),
    "name"
  ).slice(0, 20);
}

const useTopRatedGames = () => {
  const data = useContext(DataSourceContext);

  return useMemo(() => {
    const result = {} as Record<Manufacturer, Game[]>;

    manufacturers.forEach((manufacturer) => {
      if (manufacturer === Manufacturer.All) {
        result[manufacturer] = getTop20Games(data);
      } else {
        result[manufacturer as Manufacturer] = getTop20Games(
          data.filter((game) => game.manufacturer === manufacturer)
        );
      }
    });

    return result;
  }, [data]);
};

export default useTopRatedGames;

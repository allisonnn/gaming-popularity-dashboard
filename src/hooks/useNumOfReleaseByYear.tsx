import { useContext, useMemo } from "react";
import { DataSourceContext } from "../context/DataSource";
import { Manufacturer } from "../types";

export interface ReleasePerYear {
  year: string;
  releases: number;
}

const manufacturers = Object.values(Manufacturer);

const useNumOfReleaseByYear = () => {
  const data = useContext(DataSourceContext);

  return useMemo(() => {
    const counts = data.reduce(
      (sum, game) => {
        const year = game.yearOfRelease;
        if (!year) {
          return sum;
        }
        sum[Manufacturer.All][year] = sum[Manufacturer.All][year]
          ? sum[Manufacturer.All][year] + 1
          : 1;

        if (manufacturers.includes(game.manufacturer)) {
          sum[game.manufacturer][year] = sum[game.manufacturer][year]
            ? sum[game.manufacturer][year] + 1
            : 1;
        }

        return sum;
      },
      Object.values(manufacturers).reduce(
        (res, manufacturer) => ({ ...res, [manufacturer]: {} }),
        {} as Record<Manufacturer, Record<number, number>>
      )
    );

    const result = {} as Record<Manufacturer, Array<ReleasePerYear>>;

    for (const manufacturer in counts) {
      result[manufacturer as Manufacturer] = Object.entries(
        counts[manufacturer as Manufacturer]
      ).map(([year, count]) => ({
        year,
        releases: count,
      }));
    }

    return result;
  }, [data]);
};

export default useNumOfReleaseByYear;

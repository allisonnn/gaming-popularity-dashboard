import { useContext, useMemo } from "react";
import { DataSourceContext } from "../context/DataSource";
import { Genre, Manufacturer } from "../types";

const genres = Object.values(Genre);
const manufacturers = Object.values(Manufacturer);

const useNumOfReleaseByGenre = () => {
  const data = useContext(DataSourceContext);

  return useMemo(() => {
    const resMap = data.reduce(
      (res, game) => {
        if (!game.genre || !genres.includes(game.genre)) {
          return res;
        }

        res[Manufacturer.All][game.genre] =
          res[Manufacturer.All][game.genre] + 1;

        if (game.manufacturer in res) {
          res[game.manufacturer][game.genre] =
            res[game.manufacturer][game.genre] + 1;
        }
        return res;
      },
      Object.values(manufacturers).reduce(
        (res, manufacturer) => ({
          ...res,
          [manufacturer]: genres.reduce(
            (res, genre) => ({ ...res, [genre]: 0 }),
            {}
          ),
        }),
        {} as Record<Manufacturer, Record<Genre, number>>
      )
    );

    const result = {} as Record<
      Manufacturer,
      Array<{ genre: Genre; releases: number }>
    >;
    for (const manufacturer in resMap) {
      result[manufacturer as Manufacturer] = Object.entries(
        resMap[manufacturer as Manufacturer]
      )
        .map(([genre, count]) => ({
          genre: genre as Genre,
          releases: count,
        }))
        .sort((a, b) => b.releases - a.releases);
    }

    return result;
  }, [data]);
};

export default useNumOfReleaseByGenre;

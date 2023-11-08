import { useContext, useMemo } from "react";
import { DataSourceContext } from "../context/DataSource";
import { Manufacturer, Region } from "../types";

const regions = Object.values(Region);
const manufacturers = Object.values(Manufacturer);

const useSalesByRegion = () => {
  const data = useContext(DataSourceContext);

  return useMemo(() => {
    const resMap = data.reduce(
      (res, game) => {
        res[Manufacturer.All].naSales =
          res[Manufacturer.All].naSales + game.naSales;
        res[Manufacturer.All].euSales =
          res[Manufacturer.All].euSales + game.euSales;
        res[Manufacturer.All].jpSales =
          res[Manufacturer.All].jpSales + game.jpSales;
        res[Manufacturer.All].otherSales =
          res[Manufacturer.All].otherSales + game.otherSales;

        if (game.manufacturer in Manufacturer) {
          res[game.manufacturer].naSales =
            res[game.manufacturer].naSales + game.naSales;
          res[game.manufacturer].euSales =
            res[game.manufacturer].euSales + game.euSales;
          res[game.manufacturer].jpSales =
            res[game.manufacturer].jpSales + game.jpSales;
          res[game.manufacturer].otherSales =
            res[game.manufacturer].otherSales + game.otherSales;
        }

        return res;
      },
      Object.values(manufacturers).reduce(
        (res, manufacturer) => ({
          ...res,
          [manufacturer]: regions.reduce(
            (res, region) => ({ ...res, [region]: 0 }),
            {}
          ),
        }),
        {} as Record<Manufacturer, Record<Region, number>>
      )
    );

    const result = {} as Record<
      Manufacturer,
      Array<{ region: Region; sales: number }>
    >;

    for (const manufacturer in resMap) {
      result[manufacturer as Manufacturer] = regions.map((region) => ({
        region,
        sales: resMap[manufacturer as Manufacturer][region],
      }));
    }

    return result;
  }, [data]);
};

export default useSalesByRegion;

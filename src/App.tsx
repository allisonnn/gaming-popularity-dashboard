import { Suspense, lazy, useMemo, useState } from "react";
import sourceData from "./mocks/source.json";
import { Game, Manufacturer, UnprocessedGame } from "./types";
import { DataSourceContext } from "./context/DataSource";
import getManufacturerByPlatform from "./helpers/getManufacturerByPlatform";

const TopRatedGames = lazy(() => import("./components/TopRatedGames"));
const SalesByRegion = lazy(() => import("./components/SalesByRegion"));
const ReleaseTrend = lazy(() => import("./components/ReleaseTrend"));
const PopularityByGenre = lazy(() => import("./components/PopularityByGenre"));

function tidy(data: UnprocessedGame[]) {
  return data.map((game) => ({
    ...game,
    yearOfRelease: ~~game.yearOfRelease,
    manufacturer: getManufacturerByPlatform(game.platform),
  })) as Game[];
}

function App() {
  const [manufacturer, setManufacturer] = useState<Manufacturer>(
    Manufacturer.All
  );
  const memoedData = useMemo(() => tidy(sourceData as UnprocessedGame[]), []);

  function handleChangeManufacturer(e: React.ChangeEvent<HTMLSelectElement>) {
    setManufacturer(e.target.value as Manufacturer);
  }

  return (
    <DataSourceContext.Provider value={memoedData}>
      <div className="min-h-screen bg-slate-50 pb-4">
        <header className="bg-white px-8 py-4 shadow-md">
          <h1 className="text-2xl">🎮 Gaming popularity dashboard</h1>
        </header>

        <main>
          <div className="container p-4 pb-2 mx-auto">
            <div className="bg-white p-4 rounded-md shadow-md  mx-auto">
              <p>
                This dashboard provides an easy way to explore some data in
                gaming industry, showing trends in game releases, what genres
                are popular, how sales compare in different regions, and which
                games are top-rated.
              </p>
              <hr className="my-4" />
              <div className="flex items-center">
                <label id="select-label" className="pr-2">
                  Filter by manufacturer:
                </label>
                <select
                  aria-labelledby="select-label"
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-1 border border-gray-400 rounded block"
                  onChange={handleChangeManufacturer}
                >
                  <option value={Manufacturer.All}>All manufacturers</option>
                  {Object.values(Manufacturer).map(
                    (manufacturer) =>
                      manufacturer !== Manufacturer.All && (
                        <option key={manufacturer} value={manufacturer}>
                          {manufacturer}
                        </option>
                      )
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="container mx-auto p-4 flex flex-wrap md:grid md:grid-cols-3 gap-4">
            <div className="w-screen md:w-auto md:col-span-3">
              <div className="card h-2/3 min-h-[600px]">
                <Suspense fallback="Loading">
                  <ReleaseTrend manufacturer={manufacturer} />
                </Suspense>
              </div>
            </div>

            <div className="w-screen md:w-auto">
              <div className="card h-96">
                <Suspense fallback="Loading">
                  <PopularityByGenre manufacturer={manufacturer} />
                </Suspense>
              </div>
            </div>

            <div className="w-screen md:w-auto">
              <div className="card h-96">
                <Suspense fallback="Loading">
                  <SalesByRegion manufacturer={manufacturer} />
                </Suspense>
              </div>
            </div>

            <div className="w-screen md:w-auto">
              <div className="card h-96">
                <Suspense fallback="Loading">
                  <TopRatedGames manufacturer={manufacturer} />
                </Suspense>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center text-gray-600">
          Data source:
          <a
            href="https://www.kaggle.com/datasets/sidtwr/videogames-sales-dataset?select=Video_Games_Sales_as_at_22_Dec_2016.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-1 underline text-sky-800 hover:text-sky-900 focus:border-sky-900"
          >
            Video games sales as at 22 Dec 2016
          </a>
        </footer>
      </div>
    </DataSourceContext.Provider>
  );
}

export default App;

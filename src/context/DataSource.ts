import { createContext } from "react";
import { Game } from "../types";

export const DataSourceContext = createContext<Game[]>([]);

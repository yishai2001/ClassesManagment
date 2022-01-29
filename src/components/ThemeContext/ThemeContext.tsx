import { createContext } from 'react';
import {blue} from "../../AppHelper"

const ThemeContext = createContext<string>(blue);

export default ThemeContext;
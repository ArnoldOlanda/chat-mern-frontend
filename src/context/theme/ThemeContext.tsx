import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, mainTheme } from "../../theme";

interface Props {
    children: JSX.Element | JSX.Element[]
}

interface ContextProps {
    currentTheme: string;
    setTheme: (t: string) => void;
}

const themesMap = {
    main: mainTheme,
    dark: darkTheme
}

export const ThemePreferenceContext = createContext<ContextProps>({} as ContextProps);

export const ThemePreferenceProvider = ({ children }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<string>('main')

    const setTheme = (theme: string) => {
        setCurrentTheme(theme)
    }
    const theme = (currentTheme === 'main') ? themesMap.main : themesMap.dark;

    return (
        <ThemePreferenceContext.Provider
            value={{
                currentTheme,
                setTheme
            }}
        >
            <ThemeProvider theme={theme}>

                {children}

            </ThemeProvider>
        </ThemePreferenceContext.Provider>
    )
}
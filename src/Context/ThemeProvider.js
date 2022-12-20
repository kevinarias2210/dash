import React, { createContext, useContext, useState } from "react";/*Acá se están trayendo 3 hooks, para crear contenido, para traer
y para cambiar el estado de todos esos componentes*/
import { BsFillMoonFill,BsFillSunFill } from "react-icons/bs";/*En esta linea se están trayendo 2 modulos que contienen 2 imagenes
svg que están guardados en la carpeta de node_modulos*/

const themeStyles = { /*Se crea una constante donde se almacena un objeto que guardarán los estilos y la importacion de la imagen
de la luna y el sol*/
  dark:{
    background:'#01211E',
    text:'white',
    img: <BsFillMoonFill/>
  },
  light:{
    background:'white',
    text:'black',
    img: <BsFillSunFill/>
  }
}
const ThemeContext = createContext();/*En esta variable se guarda el hook de crear un contexto para leer*/

/*Entonces se crea esta funcion donde va a cambiar el estado del tema de oscuro. En la constante toggleThem es si el theme
es igual a dark entonces se pasará a light, si no se queda dark.
Una constante valor es igual a un objeto que contiene al theme que trae los estilos de themeStyles, la funcion y nombre.
Retorna el ThemeContext como un componente para compartirlos en los hijos de ese componente.*/
const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark');
  const value = { theme: themeStyles[theme], toggleTheme, themeName: theme };
  return <ThemeContext.Provider value={value} {...props} />;
}


/*En esta linea el useContext trae el contexto de ThemContext*/
const useTheme = () => useContext(ThemeContext);

/*Acá solo se exportaria la funcion y los contextos*/
export { ThemeProvider, useTheme };
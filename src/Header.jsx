import React from 'react';
import './Header.css';
import { useTheme } from './Context/ThemeProvider';/*En esta linea se están trayendo los estilos e imagenes de "ThemeProvider" y sus
camnbios de estados*/

/*En esta linea se está exportando el componente Header, con 3 atributos del objeto json, no es necesario el props, porque con solo
el nombre del atributo ya se estaria heredando*/

export default function Header({currencys, fun, cur}){
  const {theme, toggleTheme} = useTheme(); /*En esta constante se trae el estado actual del Theme que está dark y la funcionalidad que
  tiene una condicion si el theme está dark y es igual al contexto que tiene este componente*/
  
  /*Entonces retornamos el header, un select que tiene el valor del tipo la moneda que es el (cur) y en el onChange el (fun) trae todas
  los tipos monedas que están y cuando se da click llama un Id coinSelect, el (currencys) que son las monedas se trae el item y el
  index. El boton cambia de modo cuando da click */
  return (
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>
      <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      <button className='toogleMode' onClick={toggleTheme}>
        {theme.img}
      </button>
      </div>
    </header>
  )
}
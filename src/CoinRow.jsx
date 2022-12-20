import React from "react";
import "./coinRow.css"
import Graph from './Graph'//Se trae el grafico
import {deleteDec, colorDec, numberF} from './App' //Se trae las funciones de valor decimal, que cambia de color y el ultimo es una constante que trae el metodo que convierte un numero entero a monedas.

/*En este componente se trae el atributo coin e index de la API y se muestra en la tabla*/
export default function CoinRow({ coin, index }) {
  console.log(index);
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />{/*Trae el atributo moneda con la imagen y el nombre*/}
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>{/*Muestra el precio*/}
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>{/*Muestra el porcentaje y lo coloca en el respectivo color*/}
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>{/*Muestra el grafico con el id de la moneda el porcentage del cambio a 24hrs*/}
    </tr>
  );
}

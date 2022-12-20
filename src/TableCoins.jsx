import React from "react";
import "./tableCoins.css";
import CoinRow from "./CoinRow";//Llama el componente coinrow

/*En este componente trae el atributo de monedas, se crea una tabla. Luego mapea las monedas y el index del objeto que traimos de la
API*/
function TableCoins({ coins }) {
  console.log(coins);
  return (
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins;

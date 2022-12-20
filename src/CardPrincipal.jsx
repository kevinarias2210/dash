import { FaPlay } from "react-icons/fa";//Importan otro modulo, que es una imagen svg
import './cardPrincipal.css'
import { deleteDec, colorDec } from './App'//Se llama las funciones de deleteDec que trae el valor decimal y colorDec que cuando cambia de color si el valor no es igual a 0
import Graph from "./Graph";//Se trae el componente Grafico


/*Acá en esta funcion traemos el objeto json que contiene todos los atributos de las criptomonedas */
function CardPrincipal({ json: { id,
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    /* price_change_percentage_90d_in_currency, */
    price_change_percentage_1y_in_currency
}, cur = "usd" }) {

   
    return (
        <>
            <article className="cripto-first">
                <div className="cripto-title">
                    {/*En estas etiquetas se están accediendo a esos atributos, gracias a esos corchetes y el nombre del atributo
                    donde se muestra la imagen, el simbolo, el precio de la moneda y el tipo de moneda*/}
                    <img src={image} alt="Icono de cripto" />
                    <h2>{symbol} - {current_price} {cur}</h2>
                    {/* <select name="select-percentage" id="select-percentage">
                        <option value="value1" selected>12%</option>
                        <option value="value2">18%</option>
                        <option value="value3">20%</option>
                    </select> */}

                    {/*En este h2 trae el icono svg, con su clase, trae la funcion colorDec cuando llama el cambio del porcentaje y los coloca en decimales*/}
                    <h2><FaPlay className={`icon-arrow ${colorDec(price_change_percentage_30d_in_currency)}`}/>{deleteDec(price_change_percentage_30d_in_currency,2)}%</h2>
                </div>
                <div className="graphic">
                    <Graph type={0} coin={id} currency={cur}/>
                </div>
                <div className="capitalization">
                    <h2>Capitalización</h2>
                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    );
}

export default CardPrincipal;
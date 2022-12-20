import "./Card.css"
import Graph from "./Graph"//Trae el grafico
import {colorDec} from './App'//Trae funcion de una condicion si cambia de color o no si no es igual a 0

/*Se trae el id de la moneta, el tipo de moneda, el porcentaje, el precio y la imagen */
export default function Card({coinId, cur, porcentaje, price, img}){
    return (
        /*En este retorno solo llama la imagen y le cambia los colores al precio, porcentages y en el grafico
        se muestra el id de la moneda el tipo de moneda y el porcentaje en color*/
        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}
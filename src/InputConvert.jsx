import React, {useState, useRef} from "react";/*El useRef toma referencia a una etiqueta del DOM que no tiene valor, cuando toma ese
elemento del DOM se crea un atributo llamado current para acceder a los atributos de la etiqueta o elemento DOM*/
import "./Convert.css";
import {deleteDec} from './App' //llama la funcion de deleteDec que trae el valor decimal

/*En este componente se trae la moneda, el elemento con su tipo de moneda, todos los tipos de monedas, otros, el texto, el tipo y 
resultado */
export default function InputConvert({ coin,  sel = "btc", fun, other,text, type = 1, result = 0}) {
  const selRef = useRef(null)//En esta constante la refenrencia a ese elemento es nulo
  const [selVal, setSelVal] = useState(sel)//En esta linea el estado inicial va a estar en btc

  return (
    <>
    {/*Al retornar, el div contiene una condicion, si el input es igual a 0 entonces muestra el numero en texto, si no entonces el 
    input muestra el resultado en valores decimales.*/}
      <div className="input">
        {(type === 0) ? <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}}/>
        : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}
        
        <div className="select">
          <img src="" alt="" />
          {/*En esta seleccion el valor es el estado actual que es null. Cuando hay un cambio el valor de select muestra todos los
          tipos de monedas*/}
          <select value={selVal} ref={selRef} onChange={() => {
              setSelVal(selRef.current.value)
              fun(selRef.current.value)
            }}>
              {/*Traemos la moneda (co) entonces si el simbolo de co es igual al estado trae del nodo del DOM la imagen de co
              y retornara el simbolo, el id si no otro*/}
            {coin.map((co) => {
              if(co.symbol === selVal){
                selRef.current.previousSibling.src = co.image
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
              }else if(co.symbol != other){
                return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              /* if(index === sel){
              return <option selected value={co.symbol} key={co.id}>{co.symbol}</option>
              }else{
              return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              } */
            })}
          </select>
        </div>
      </div>
    </>
  );
}

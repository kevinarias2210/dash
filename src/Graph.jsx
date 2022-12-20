import "./Graph.css"
import {useEffect, useState, useRef} from 'react' //En el hook de usseEffect espera a que se reenderice todo el codigo para despues ejecutar su funcion.
import { Line } from "react-chartjs-2"; //En esta linea se importa un modulo de node_modules

/*En este import tambien se están trayendo modulos que al parecer hacen un tipo de dibujado*/
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import moment from "moment/moment";

/*Esten modulo registra todo los modulos, como si lo guardara con solo el ChartJS*/
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

/*Este componentre trae el typo, la moneda, el tipo de moneda, los dias y el color y en la constante de se define unos displays*/
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = {
        border: {
            display: false
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    }
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily` //Se trae el link del api pero mostrand lo que se declaró anteriormente en el componente 
    let data , options //Se crean dos variables
    /*Estados*/
    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()
    /*Acá se está diciendo que se ejecute esta funcion de manera asincrona, que esperemos que respone obtenga la url y que los datos
    que tiene la url se almacene en el json. En el estado actual de los precios se traerá un item aleatorio del 0 al 1 y en el estado
    actual de los datos se traeran y se mostraran de mes y dia, en el catch mostrará en la consola el error */
    async function getData(){
        try{
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1])))
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null);//Referencia nulo
    
    /*Cuando termina el renderizado de todo este codigo, pasará esta funcion, obteniendo los datos de los precios y la fecha,
    creará un canvas, con ciertas dimenciones y ciertos colores.*/
    useEffect(_ => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)');   
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)
    },[])
    
    
    /*Pasamos un switch que recibe el tipo, lo que hace es que en su valor buleano reciba ciertos estilos como el responsive
    alguns displays y algunos colores*/
    switch(type){
        case 0:

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    /*Retorna el elemento que hace referencia, en line si pasa los datos y las opciones*/
    return (
        <div ref={chartRef} className="graph">
            <Line data={data} options={options}/>
        </div> 
    )
}
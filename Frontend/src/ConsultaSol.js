import axios from 'axios'; // Importar axios para comunicación con el servidor
import { useState } from 'react'; // Importar State pata los estados de los componentes
import {useNavigate} from "react-router-dom"; // Importar Navigate para navegar entre páginas del Front
import logoIPN1 from './img/logo_ipn_web_citedi.png'; // Importar imagen del Logo del IPN1
import logoDAE2 from './img/sgc_dae_low.png'; // Importar imagen del Logo DAE2
import Modal from "./Modal"; // Importar la ventana de créditos

export var detallesSoli = "" // Exportar la variable detallesSoli que posterior se le asigna un valor

export default function ConsultaSol() {

    // Validar el state de los campos del Front
    const [buscar, setBuscar] = useState({
        numeroSol: "",
        boletaSol: ""
    })

    const navigate = useNavigate() // Declarar Navigate para pasar entre páginas del Front

    // Función para determinar el cambio de estado de los campos del Front de acuerdo al nombre y el valor
    const cambioEntrada = ({target}) => {
        const {name, value} = target;
        setBuscar({
            ...buscar,
            [name]: value
        })
    }

    // Función que conecta la parte del Back mandando los datos del Front
    const sendValues = () => {
        axios.post('http://localhost:3001/detallesSol', buscar) // Axios de tipo Post para conectar al servidor
        .then(({data}) => {
            detallesSoli = data // Asignar a la variable detallesSoli los datos devueltos del Back
            // console.log(detallesSoli) // Mostrar en consola los datos de la solicitud encontrada
            navigate('/detallesSol'); // Navigate hacia la página de detalles de la solicitud
          })
          .catch(({response}) => {
            console.log(response.data) // Si hay error se muestra en consola
            alert("Criterios no válidos, intenta nuevamente"); // En caso de error se manda alerta al Front
          })
    }

    // Función que conecta la parte del Back mandando los datos del Front
    const sendAll = () => {
        axios.post('http://localhost:3001/tablaSol', buscar) // Axios de tipo Post para conectar al servidor
        .then(({data}) => {
            detallesSoli = data.tabla // Asignar a la variable detallesSoli los datos devueltos del Back
            navigate('/tablaSol'); // Navigate hacia la página de tabla donde muestra todas las solicitudes
          })
          .catch(({response}) => {
            console.log(response.data) // Si hay error se muestra en consola
            alert("Criterios no válidos, intenta nuevamente"); // En caso de error se manda alerta al Front
          })
    }

    // Variable para el estado de la ventana de créditos y mostrarla
    const [estadoModal, cambiarEstadoModal] = useState(false);    

    return (
        <div>
                {/*Sección de la ventana de créditos*/}
                <div className='absolute'>
                  <Modal estado={estadoModal}
                        cambiarEstado={cambiarEstadoModal}
                  />
                </div>
                
            {/* Barra de navegación  */} 
            <nav class="shadow-lg">
                <div class="h-16  p-5 bg-white shadow md:flex md:items-center md:justify-between">
                    <div class="flex justify-between items-center">
                        <a href="https://www.ipn.mx/">
                            <img class="h-12 w-44" src={logoIPN1} alt="Logo IPN1"/>
                        </a>                   
                    </div>
                    {/* Opciones de navegación  */} 
                    <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/inicio" class="font-normal text-gray-800 hover:text-rose-900 cursor-pointer">Inicio</a>
                        </li>
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/nuevaSol" class="font-normal text-gray-800 hover:text-rose-900 cursor-pointer">Nueva Solicitud</a>
                        </li>
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/consultaSol" class="font-normal text-rose-900 hover:text-rose-900 cursor-pointer">Consultar Solicitud</a>
                        </li>
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/" class="font-normal text-gray-800 hover:text-rose-900 cursor-pointer" onClick={() => {
                                localStorage.clear() 
                                }}>Salir</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Mensaje Bienvenida  */} 
            <div class="text-center py-14 text-xl">
                <h1>Selecciona el criterio</h1>
            </div>

            
            <div class="md:flex md:py-32 max-w-md mx-auto md:max-w-2xl space-x-16 sm:space-y-16 md:space-y-0">
                <div class="flex space-x-2">
                    {/* SVG de símbolo de gato */}
                    <svg class="w-12 h-12 stroke-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>
                    {/* Input Número de Solicitud */}
                    <input
                        class="border-b-4 border-rose-900 h-12 w-60 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                        id="numSol"
                        name="numeroSol"
                        type="number"
                        placeholder="No. Solicitud"
                        value={buscar.numeroSol}
                        onChange={cambioEntrada}
                    />
                </div>
                <div class="flex space-x-4">
                    {/* SVG de símbolo de búsqueda */}
                    <svg class="w-12 h-12 stroke-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                    {/* Input Boleta del Solicitante */}
                    <input
                        class="border-b-4 border-rose-900 h-12 w-60 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                        id="bolSol"
                        name="boletaSol"
                        type="number"
                        placeholder="Boleta del solicitante"
                        value={buscar.boletaSol}
                        onChange={cambioEntrada}
                    />
                </div>
            </div>

            {/* Texto Mostrar Solicitudes */}
            <div className="text-center ">
                <p className="font-medium text-gray-900 hover:text-rose-900 md:mx-36 cursor-pointer" onClick={sendAll}>
                    Mostrar todas las solicitudes
                </p>
            </div>

            {/* Botones Buscar y Busqueda Avanzada */}
            <div class="py-12 text-center space-x-8">
                    <button type="submit" class="btn-crear" onClick={sendValues}>
                            Buscar
                    </button>
                <a href='/consultaSolAv'>
                    <button type="submit" class="btn-crear2">
                            Avanzado
                    </button>
                </a>
            </div>

            {/* Footer */} 
            <div class="">
                <div class="fixed flex w-full h-20 bg-rose-900 bottom-0 py-7">
                    <div class="flex justify-between ">
                        <a href="https://www.ipn.mx/dae/">
                            <img class="h-14 w-36" src={logoDAE2} alt="Logo DAE2"/>
                        </a>       
                        <div className='right-5 absolute top-5'>
              
                            <svg onClick={() => cambiarEstadoModal(!estadoModal)} class="w-10 h-10 stroke-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg> 

                        </div>             
                    </div>
                </div>
            </div>

        </div>
    );
}
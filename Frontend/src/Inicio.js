import { Link } from 'react-router-dom'; // Importar Link para navegar a otra página del Front
import logoIPN1 from './img/logo_ipn_web_citedi.png'; // Importar imagen del Logo del IPN1
import logoDAE2 from './img/sgc_dae_low.png'; // Importar imagen del Logo DAE2
import { useState } from "react"; // Importar State pata los estados de los componentes
import Modal from "./Modal"; // Importar la ventana de créditos

export default function Inicio() {

    var nameOp = localStorage.getItem("nombreOp") // Asignar el item del local storage a la variable nameOp
    var longname = nameOp.length // Determinar la longitud de la variable nameOp

    const hoy = new Date(); // Constante de tipo Date
    const hora = hoy.getHours(); // Constante para obtener las Horas de la fecha
    var saludo = "" // Iniciar variable del saludo
    var longname2 = 11 // Iniciar variable para el tamaño del saludo 

    // Condicional de las horas obtenidas de la fecha
    if(hora < 12){
        saludo = "Buenos días, "
        longname2 = 8
    }else if(hora < 18){
        saludo = "Buenas tardes, "
        longname2 = 10
    }else{
        saludo = "Buenas noches, "
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
                            <a href="/inicio" class="font-normal text-rose-900 hover:text-rose-900 cursor-pointer">Inicio</a>
                        </li>
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/nuevaSol" class="font-normal text-gray-800 hover:text-rose-900 cursor-pointer">Nueva Solicitud</a>
                        </li>
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/consultaSol" class="font-normal text-gray-800 hover:text-rose-900 cursor-pointer">Consultar Solicitud</a>
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
                    <div class="text-center py-24">
                        <div class="flex text-2xl font-semibold justify-center">
                            <div className='w-10'></div>
                            <input className='bg-white'
                            id='saludo'
                            name='saludo'
                            value={saludo}
                            size={longname2}
                            disabled
                            />                           
                            <input className='bg-white'
                            id='nombre'
                            name='nombreOp'
                            value={nameOp}
                            size={longname}
                            disabled
                            />
                        </div>

                        <div>
                            <p>Selecciona una opción</p>
                        </div>
                    </div>

            {/* Botones de opción */} 
            <div class="flex space-x-40 max-w-md mx-auto md:max-w-2xl font-sans py-20">
                <div class="font-medium transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-10 duration-150 hover:text-rose-900">
                    <Link to={"/nuevaSol"}>
                        <div class="px-6">
                            <svg class="w-16 h-16 stroke-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        Nueva Solicitud
                   </Link> 
                </div>
                <div class="font-medium transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-10 duration-150 hover:text-rose-900">
                    <a href="consultaSol">
                        <div class="px-8">
                            <svg class="w-16 h-16 stroke-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                        </div>
                        Consultar Solicitud
                    </a>
                </div>
                <div class="font-medium transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-10 duration-150 hover:text-rose-900">
                    <a href="/" onClick={() => {
                    localStorage.clear() 
                    }}>
                                <svg class="w-16 h-16 stroke-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                        <div class="text-center">Salir</div>
                    </a>
                </div>
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
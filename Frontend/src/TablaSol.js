import logoIPN1 from './img/logo_ipn_web_citedi.png'; // Importar imagen del Logo del IPN1
import logoDAE2 from './img/sgc_dae_low.png'; // Importar imagen del Logo DAE2
import {detallesSoli} from "./ConsultaSol.js" // Importar la variable detallesSoli del JS
import {detallesSoliAv} from "./ConsultaSolAv.js" // Importar la variable detallesSoliAv del JS
import Modal from "./Modal"; // Importar la ventana de créditos
import { useState } from "react"; // Importar State pata los estados de los componentes
import DataTable from "react-data-table-component" // Importar DataTable para mostrar todas las solicitudes en una tabla

export default function TablaSol() {

    var tabla = "" // Iniciar variable para después determinar su valor

    // Si la longitud de la variable detallesSoli es cero entonces el valor de la tabla será detallesSoliAv, caso contrario será detallesSoli
    if (detallesSoli.length === 0) {
        tabla = detallesSoliAv
    }else{
        tabla = detallesSoli
    }

    // Determinar los datos de las columnas de la tabla
    const columnas = [
        {
            name: 'Número Solicitud',
            selector: 'noSol',
            sortable: true
        },
        {
            name: 'Boleta del Solicitante',
            selector: 'boletaSol',
            sortable: true
        },
        {
            name: 'Nombre del Solicitante',
            selector: 'nombreSol',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Correo del Solicitante',
            selector: 'correoSol',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Teléfono del Solicitante',
            selector: 'telSol',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Área Responsable',
            selector: 'areaRes',
            sortable: true,
            // omit: true // Omitir columna
        },
        {
            name: 'Creador de la Solicitud',
            selector: 'creadorSol',
            sortable: true
        },
        {
            name: 'Empleado Asignado',
            selector: 'noEmpAsignatario',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Descripción de la Solicitud',
            selector: 'descripcionSol',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Fecha de Creación',
            selector: 'fechaHoraCreaSol',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Última Modificación',
            selector: 'ultModiSol',
            sortable: true,
            hide: 'md'
        },
        {
            name: 'Estatus',
            selector: 'estatus',
            sortable: true
        }
    ]

    // Constante para la configuración de la Tabla
    const pagConf = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    }

    // Variable para el estado de la ventana de créditos y mostrarla
    const [estadoModal, cambiarEstadoModal] = useState(false);    

    return(

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

            
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <DataTable 
                    columns={columnas}
                    data={tabla}
                    title="Solicitudes"
                    pagination
                    paginationComponentOptions={pagConf}
                    fixedHeader
                    fixedHeaderScrollHeight='600px'
                />

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
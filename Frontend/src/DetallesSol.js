import logoIPN1 from './img/logo_ipn_web_citedi.png'; // Importar imagen del Logo del IPN1
import logoDAE2 from './img/sgc_dae_low.png'; // Importar imagen del Logo DAE2
import { useState } from 'react'; // Importar State pata los estados de los componentes
import axios from 'axios'; // Importar axios para comunicación con el servidor
import {useNavigate} from "react-router-dom"; // Importar Navigate para navegar entre páginas del Front
import {detallesSoli} from "./ConsultaSol.js" // Importar la variable detallesSoli del JS
import Modal from "./Modal"; // Importar la ventana de créditos

export default function DetallesSol() {

    var tipoOpe = localStorage.getItem("tipoOp") // Asignar el item de tipo de operador del local storage a la variable tipoOpe
    var numSoli = detallesSoli["Número Solicitud"] // Asignar el numero de la solicitud de la variable detallesSoli importada a la variable numSoli
    var longnum = numSoli.lenght // Determinar el largo del numero de la solicitud

    // Asigna dato específico de la variable importada a nueva variable individual
    var boletaSoli = detallesSoli["Boleta Solicitante"] 
    var nombreSoli = detallesSoli["Nombre Solicitante"]
    var correoSoli = detallesSoli["Correo Solicitante"]
    var telefonoSoli = detallesSoli["Teléfono Solicitante"]
    var descripcionSoli = detallesSoli["Descripción de la Solicitud"]
    
    var estatusSoli = detallesSoli["Estatus Solicitud"]
    var areaResSoli = detallesSoli["Área Responsable"]

    var creadorSoli = detallesSoli["Creador Solicitud"]
    var creacionSoli = detallesSoli["Fecha de Creación"].slice(0,10)
    var ultModiSoli = detallesSoli["Última Modificación"].slice(0,10) // "2023-02-01"

    // Función al pulsar editar la solicitud
    const editarSol = () => {

        // Si el operador es de tipo administrador se muestra el boton de eliminar
        if(tipoOpe === "administrador"){
            document.getElementById('btnEliminar').hidden = false
        }

        // Mostrar/Ocultar botones de Cancelar, Editar y Guardar Cambios
        document.getElementById('btnCancelar').hidden = false
        document.getElementById('btnEditar').hidden = true
        document.getElementById('btnGuardar').hidden = false

        // Habilitar campos del Front para poder editarlos
        document.getElementById('estatus').disabled = false
        document.getElementById('bolSol').disabled = false
        document.getElementById('nomSol').disabled = false
        document.getElementById('correoSol').disabled = false
        document.getElementById('telSol').disabled = false
        document.getElementById('descSol').disabled = false
        document.getElementById('areaRes').disabled = false
    }

    // Función al pulsar Cancelar los Cambios
    const cancelarEdit = () => {

        // Mostrar/Ocultar botones de Editar, Guardar, Eliminar y Cancelar
        document.getElementById('btnEditar').hidden = false
        document.getElementById('btnGuardar').hidden = true
        document.getElementById('btnEliminar').hidden = true
        document.getElementById('btnCancelar').hidden = true

        // Deshabilitar campos del Front para no poder editarlos
        document.getElementById('estatus').disabled = true
        document.getElementById('bolSol').disabled = true
        document.getElementById('nomSol').disabled = true
        document.getElementById('correoSol').disabled = true
        document.getElementById('telSol').disabled = true
        document.getElementById('descSol').disabled = true
        document.getElementById('areaRes').disabled = true
    }


    // Igualar el state de los campos del Front con los datos individuales de la solicitud
    const [editar, setEditar] = useState({
        boletaSol: boletaSoli,
        nombreSol: nombreSoli,
        correoSol: correoSoli,
        telefonoSol: telefonoSoli,
        descripcionSol: descripcionSoli,
        estatus: estatusSoli,
        areaRes: areaResSoli
    })

    const navigate = useNavigate() // Declarar Navigate para pasar entre páginas del Front

    // Función para determinar el cambio de estado de los campos del Front de acuerdo al nombre y el valor
    const cambioEntrada = ({target}) => {
        const {name, value} = target;
        setEditar({
            ...editar,
            [name]: value
        })
    }

    // Función al pulsar el botón de Guardar los Cambios
    const guardarSol = () => {

        // Mostrar/Ocultar botones de Editar, Guardar, Eliminar y Cancelar
        document.getElementById('btnEditar').hidden = false
        document.getElementById('btnGuardar').hidden = true
        document.getElementById('btnEliminar').hidden = true
        document.getElementById('btnCancelar').hidden = true

        // Deshabilitar campos del Front para no poder editarlos
        document.getElementById('estatus').disabled = true
        document.getElementById('bolSol').disabled = true
        document.getElementById('nomSol').disabled = true
        document.getElementById('correoSol').disabled = true
        document.getElementById('telSol').disabled = true
        document.getElementById('descSol').disabled = true
        document.getElementById('areaRes').disabled = true


        axios.post('http://localhost:3001/editarSol', editar) // Axios de tipo Post para conectar al servidor
        .then(({data}) => {
            // console.log(data) // Mostrar en consola las columnas afectadas en la BD
            alert("Solicitud actualizada!") // Mensaje de confirmación en el Front
          })
          .catch(({response}) => {
            console.log(response.data) // Si hay error se muestra en consola
            alert("Criterios no válidos, intenta nuevamente"); // En caso de error se manda alerta al Front
          })

    }

    // Función al pulsar el botón de Borrar la solicitud
    const borrarSol = () => {
        axios.post('http://localhost:3001/borrarSol', editar) // Axios de tipo Post para conectar al servidor
        .then(({data}) => {
            // console.log(data) // Mostrar en consola las columnas afectadas en la BD
            alert("Solicitud eliminada!") // Mensaje de confirmación en el Front
            navigate('/inicio', { replace: true }); // Navigate hacia la página de Inicio reemplazando el historial de navegación
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
            <div class="flex text-center py-14 text-xl justify-center">
                <div className='w-40'></div>
                <h1><span class="font-bold">Solicitud: #</span>
                <input className='bg-white'
                    id='nombre'
                    name='nombreOp'
                    value={numSoli}
                    size={longnum}
                    disabled
                />
                </h1>
            </div>


            <div class="md:flex -space-x-24">
                <div class="space-y-12 md:px-32 lg:px-64">
                    <div class="flex space-x-1 items-center">
                        <div class="font-semibold">
                            <p>Estatus:</p>
                        </div>
                        {/* Área de Estatus*/}
                        <div class="text-gray-500 ">
                                <select id="estatus" name="estatus" class="selector2" 
                                    value={editar.estatus}
                                    onChange={cambioEntrada}
                                    disabled>
                                    <option selected value="1">En Proceso</option>
                                    <option value="2">Concluido</option>
                                    <option value="3">Rechazado</option>
                                    <option value="4">Cancelado</option>
                                    <option value="5">Detenido</option>
                                </select>
                        </div>
                    </div>
                    <div class="space-y-0">
                        <div class="flex space-x-1">
                            <div class="font-semibold">
                                <p>Solicitante:</p>
                            </div>
                        </div>
                        <div class="space-x-1 space-y-0">
                            <div class="flex items-center">
                                <div class="w-20 h-4"></div>
                                <div class="font-semibold">
                                    <p>Boleta:</p>
                                </div>
                                <div>
                                    {/* Cuadro de Texto Boleta de usuario */}
                                    <input
                                        class="h-12 w-80 px-2 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                        id="bolSol"
                                        name="boletaSol"
                                        type="number"
                                        placeholder="Boleta del solicitante"
                                        value={editar.boletaSol}
                                        onChange={cambioEntrada}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-20 h-4"></div>
                                <div class="font-semibold">
                                    <p>Nombre:</p>
                                </div>
                                <div>
                                    {/* Cuadro de Texto Nombre de usuario */}
                                    <input
                                        class="h-12 w-80 px-2 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                        id="nomSol"
                                        name="nombreSol"
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={editar.nombreSol}
                                        onChange={cambioEntrada}
                                        disabled
                                    />
                                </div> 
                            </div>
                            <div class="flex items-center">
                                <div class="w-20 h-4"></div>
                                <div class="font-semibold">
                                    <p>Correo:</p>
                                </div>
                                <div>
                                    {/* Cuadro de Texto Correo de usuario */}
                                    <input
                                        class="h-12 w-80 px-2 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                        id="correoSol"
                                        name="correoSol"
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={editar.correoSol}
                                        onChange={cambioEntrada}
                                        disabled
                                    />
                                </div> 
                            </div>
                            <div class="flex items-center">
                                <div class="w-20 h-4"></div>
                                <div class="font-semibold">
                                    <p>Teléfono:</p>
                                </div>
                                <div>
                                {/* Cuadro de Texto Teléfono de usuario */}
                                <input
                                    class="h-12 w-80 px-2 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                    id="telSol"
                                    name="telefonoSol"
                                    type="number"
                                    placeholder="Teléfono"
                                    value={editar.telefonoSol}
                                    onChange={cambioEntrada}
                                    disabled
                                />
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-1 items-center">
                        <div class="font-semibold">
                            <p>Creado por:</p>
                        </div>
                        <div class="text-gray-500 ">
                            {/* Cuadro de Texto Creador de solicitud */}
                            <input
                                class="h-12 w-80 px-2 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                id="creadorSol"
                                name="creadorSol"
                                type="text"
                                placeholder=""
                                value={creadorSoli}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div class="space-y-10">
                    <div class="">
                        <div class="space-x-1 items-center">
                            <div class="font-semibold">
                                <p>Descripción:</p>
                            </div>
                            <div class="text-gray-500 ">
                                {/* Área descripción de la solicitud */}
                                <textarea 
                                    class="block p-2.5 w-80 text-gray-900 bg-gray-50 rounded-lg border-2 border-rose-900 focus:ring-2 focus:ring-rose-900 focus:border-rose-900 placeholder-gray-500" 
                                    id="descSol" 
                                    name='descripcionSol'
                                    rows="4" 
                                    placeholder="Descripción de la solicitud..."
                                    value={editar.descripcionSol}
                                    onChange={cambioEntrada}
                                    disabled
                                    >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-1 items-center">
                        <div class="font-semibold">
                            <p>Área responsable:</p>
                        </div>
                        <div class="text-gray-500 ">
                                {/* Área Responsable de la Solicitud */}
                                <select id="areaRes" name="areaRes" class="selector2" 
                                value={editar.areaRes}
                                onChange={cambioEntrada}
                                disabled>
                                <option selected value="1">Captación</option>
                                <option value="2">Registro</option>
                                <option value="3">Pagos</option>
                                <option value="4">Devolución</option>
                                <option value="5">Documentación</option>
                                </select>
                        </div>
                    </div>
                    
                    <div class="flex space-x-1 items-center">
                        <div class="font-semibold">
                            <p>Fecha de creación:</p>
                        </div>
                        <div class="text-gray-500">
                            {/* Cuadro de Texto Fecha creación de solicitud */}
                            <input
                                class="h-12 w-80 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                id="creacionSol"
                                name="creacionSol"
                                type="date"
                                placeholder="Fecha de creación"
                                value={creacionSoli}
                                disabled
                            />
                        </div>
                    </div>
                    <div class="flex space-x-1 items-center">
                        <div class="font-semibold">
                            <p>Última modificación:</p>
                        </div>
                        <div class="text-gray-500 ">
                            {/* Cuadro de Texto Fecha última modificación de solicitud */}
                            <input
                                class="h-12 w-80 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                                id="ultModiSol"
                                name="ultModiSol"
                                type="date"
                                placeholder="Última modificación"
                                value={ultModiSoli}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón Editar Solicitud */}
            <div class="py-12 text-center space-x-8">
                <button type="submit" id='btnEditar' className="btn-crear" onClick={editarSol}>
                    Editar
                </button>
                <button type='submit' id='btnCancelar' className='btn-crear2' onClick={cancelarEdit} hidden>
                    Cancelar
                </button>
                <button type='submit' id='btnGuardar' className='btn-crear' onClick={guardarSol} hidden>
                    Guardar
                </button>
                <button type='submit' id='btnEliminar' className='btn-crear2' onClick={borrarSol} hidden>
                    Eliminar
                </button>
                
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
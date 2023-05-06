import logoIPN1 from './img/logo_ipn_web_citedi.png'; // Importar imagen del Logo del IPN1
import logoDAE2 from './img/sgc_dae_low.png'; // Importar imagen del Logo DAE2
import { useState } from "react"; // Importar State pata los estados de los componentes
import axios from "axios"; // Importar axios para comunicación con el servidor
import {useNavigate} from "react-router-dom"; // Importar Navigate para navegar entre páginas del Front
import Modal from "./Modal"; // Importar la ventana de créditos

export default function NuevaSol() {

    // Validar el state de los campos del Front
    const [crear, setCrear] = useState({
        boletaSol: "", 
        nombreSol: "",
        correoSol: "",
        telSol: "",
        areaRes: "",
        descripcionSol: ""
    })
    
    const navigate = useNavigate(); // Declarar Navigate para pasar entre páginas del Front

    // Función para determinar el cambio de estado de los campos del Front de acuerdo al nombre y el valor
    const cambioEntrada = ({target}) => {
        const {name, value} = target;
        setCrear({
          ...crear,
          [name]: value
        })
      }

    
    // Función que conecta la parte del Back mandando los datos del Front
    const sendValues = () => {
        axios.post('http://localhost:3001/nuevaSol', crear) // Axios de tipo Post para conectar al servidor
        .then(({data}) => {
          // console.log(data) // Mostrar en consola los datos mandados del Back
          alert(data) // Mensaje de alerta en Front con la solicitud creada
          navigate('/inicio', { replace: true }); // Navigate hacia la página de inicio restableciendo el historial de navegación
        })
        .catch(({response}) => {
          console.log(response.data) // Si hay error se muestra en consola
          alert("Campos inválidos, intenta nuevamente"); // En caso de error se manda alerta al Front
        })
      }

    // Función para limpiar valores de los campos del Front
    const cleanValues = () => {
        document.getElementById("bolSol").value = ""
        document.getElementById("nomSol").value = ""
        document.getElementById("correoSol").value = ""
        document.getElementById("telSol").value = ""
        document.getElementById("descripcionSol").value = ""
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
                            <img class="sm:h-8 md:h-12 w-44" src={logoIPN1} alt="Logo IPN1"/>
                        </a>                   
                    </div>
                    {/* Opciones de navegación  */} 
                    <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/inicio" class="font-normal text-gray-800 hover:text-rose-900 cursor-pointer">Inicio</a>
                        </li>
                        <li class="mx-4 my-6 md:my-0">
                            <a href="/nuevaSol" class="font-normal text-rose-900 hover:text-rose-900 cursor-pointer">Nueva Solicitud</a>
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
            <div class="text-center py-14 text-xl">
                <h1>Por favor, completa los campos</h1>
            </div>

            {/* Formulario  */} 
            <form id="nuevaSol">
                <div class="md:flex sm:space-x-8 md:space-x-32 lg:space-x-60 sm:px-8 md:px-16 lg:px-72">
                    
                    <div class="space-y-10">
                        {/* Cuadro de Texto Boleta de usuario */}
                        <div class="">
                            <input
                            class="border-b-4 border-rose-900 h-12 w-80 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                            id="bolSol"
                            name="boletaSol"
                            type="number"
                            placeholder="Boleta"
                            value={crear.boletaSol}
                            onChange={cambioEntrada}
                            />
                        </div>

                        {/* Cuadro de Texto Nombre de usuario */}
                        <div class="">
                            <input
                            class="border-b-4 border-rose-900 h-12 w-80 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                            id="nomSol"
                            name="nombreSol"
                            type="text"
                            placeholder="Nombre completo"
                            value={crear.nombreSol}
                            onChange={cambioEntrada}
                            />
                        </div>

                        {/* Cuadro de Texto Correo de usuario */}
                        <div class="">
                            <input
                            class="border-b-4 border-rose-900 h-12 w-80 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                            id="correoSol"
                            name="correoSol"
                            type="email"
                            placeholder="Correo electrónico"
                            value={crear.correoSol}
                            onChange={cambioEntrada}
                            />
                        </div>

                        {/* Cuadro de Texto Telefono de usuario */}
                        <div class="">
                            <input
                            class="border-b-4 border-rose-900 h-12 w-80 px-3 placeholder-gray-500 text-gray-900 bg-white focus:outline-none"
                            id="telSol"
                            name="telSol"
                            type="number"
                            placeholder="Teléfono"
                            value={crear.telSol}
                            onChange={cambioEntrada}
                            />
                        </div>
                    </div>
                    <div class="">
                        {/* Área Responsable */}
                        <div class="text-gray-500 ">
                                <select id="areaRes" name="areaRes" class="selector1"
                                value={crear.areaRes}
                                onChange={cambioEntrada}>
                                <option selected value="">Área responsable</option>
                                <option value="1">Captación</option>
                                <option value="2">Registro</option>
                                <option value="3">Pagos</option>
                                <option value="4">Devolución</option>
                                <option value="5">Documentación</option>
                                </select>

                        </div>

                        {/* Área de Texto Descripción de la Solicitud */}
                        <div class="py-12">
                            <textarea 
                            class="block p-2.5 w-80 h-56 text-gray-900 bg-gray-50 rounded-lg border-2 border-rose-900 focus:ring-2 focus:ring-rose-900 focus:border-rose-900 placeholder-gray-500" 
                            id="message"
                            name='descripcionSol'
                            rows="4" 
                            placeholder="Descripción de la solicitud..."
                            value={crear.descripcionSol}
                            onChange={cambioEntrada}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </form>


                {/* Botones Crear y Limpiar Formulario */}
                <div class="py-16 text-center space-x-16">
                        <button type="submit" class="btn-crear" onClick={sendValues}>
                                Crear
                        </button>
                    <button class="btn-crear2" form='nuevaSol' onClick={cleanValues}>
                        Limpiar
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
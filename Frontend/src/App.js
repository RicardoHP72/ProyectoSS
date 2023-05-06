import logo from './img/DAE2.png'; // Importar imagen del Logo de la DAE
import { useState } from "react"; // Importar State pata los estados de los componentes
import axios from "axios"; // Importar axios para comunicación con el servidor
import {useNavigate} from "react-router-dom"; // Importar Navigate para navegar entre páginas del Front
import Modal from "./Modal"; // Importar ventana de créditos

function App() {

  const [login, setLogin] = useState({usuario: "", contra: ""}) // Validar el state de los campos del Front
  const navigate = useNavigate() // Declarar Navigate para pasar entre páginas del Front

  var datosOp = "" // Variable para asignar datos obtenidos

  // Función para determinar el cambio de estado de los campos del Front de acuerdo al nombre y el valor
  const cambioEntrada = ({target}) => {
    const {name, value} = target;
    setLogin({
      ...login,
      [name]: value
    })
  }

  // Función que conecta la parte del Back mandando los datos del Front
  const sendValues = () => {
    axios.post('http://localhost:3001/login', login) // Axios de tipo Post para conectar al servidor
    .then(({data}) => {
      localStorage.setItem("token", "true") // Asigna valor true al item token en el almacenamiento local
      datosOp = data["Nombre Operador"] // De los datos obtenidos del login se rescata el nombre del operador
      localStorage.setItem("nombreOp", data["Nombre Operador"]) // De los datos obtenidos del login se rescata el nombre del operador y se asigna el valor al token nombreOp en el almacenamiento local
      localStorage.setItem("tipoOp", data["Tipo de Operador"]) // De los datos obtenidos del login se rescata el tipo de operador y se asigna el valor al token tipoOp en el almacenamiento local
      console.log(datosOp) // Mostrar en consola los datos del operador ingresado
      navigate('/inicio', { replace: true }); // Se navega a página de Inicio
    })
    .catch(({response}) => {
      console.log(response.data) // Si hay error se muestra en consola
      alert("Credenciales incorrectas, por favor intenta nuevamente"); // Se cacha mensaje de error mandado desde el back
    })
  }

  // Variable para el estado de la ventana de créditos y mostrarla
  const [estadoModal, cambiarEstadoModal] = useState(false);

  return (
      // Sección de todo el login
      <div>
                {/*Sección de la ventana de créditos*/}
                <div className='absolute'>
                  <Modal estado={estadoModal}
                        cambiarEstado={cambiarEstadoModal}
                  />
                </div>

        {/* Sección de imágen, usuario, contraseña y botón  */} 
        <div className="ms:flex space-y-7 max-w-md mx-auto md:max-w-2xl font-sans text-center">

          {/* Logo de DAE */}
          <div class="md:shrink-0">
            <img class="py-5 max-w-md mx-auto md:max-w-2xl" src={logo} alt="Logo DAE"/>
          </div>

          {/* Cuadro de Texto Usuario */}
          <div>
              <div className='md:px-36'>
              
                <svg onClick={() => cambiarEstadoModal(!estadoModal)} class="w-5 h-5 stroke-gray-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg> 

              </div>
                <input
                  className=" rounded-lg h-14 w-96 px-5 py-2 placeholder-gray-500 text-gray-900 shadow-2xl bg-white focus:outline-none "
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="Usuario"
                  required
                  value={login.usuario}
                  onChange={cambioEntrada}
                />
          </div>

          {/* Cuadro de Texto Contraseña */}
          <div>
            <input
              className=" rounded-lg h-14 w-96 px-5 py-2 placeholder-gray-500 text-gray-900 shadow-2xl bg-white focus:outline-none "
              id="contra"
              name="contra"
              type="password"
              placeholder="Contraseña"
              required
              value={login.contra}
              onChange={cambioEntrada}
            />
          </div>

          {/* Texto Olvidaste la Contraseña */}
          <div className="text-xs grid justify-items-end">
            <abbr title='Envía tu nueva contraseña por medio de correo electrónico.'>
              <a href='/recCon' className="font-medium text-gray-400 hover:text-sky-500 md:mx-36 cursor-pointer">
                ¿Olvidaste tu contraseña?
              </a>
            </abbr>
          </div>

          {/* Botón Enviar */}
          <div>
              <button
                type="submit"
                class="btn-custom"
                onClick={sendValues}>
                    Entrar
              </button>
          </div>

        </div>
      </div>

  );
  
}

export default App;


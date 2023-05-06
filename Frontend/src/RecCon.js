import logo from './img/DAE2.png'; // Importar imagen del Logo de la DAE
import axios from 'axios'; // Importar axios para comunicación con el servidor
import { useState } from 'react'; // Importar State pata los estados de los componentes
import {useNavigate} from "react-router-dom"; // Importar Navigate para navegar entre páginas del Front

export default function RecCon() {

    // Validar el state de los campos del Front
    const [recu, setRecu] = useState({
        usuario: "",
        correo: ""
    })

    const navigate = useNavigate() // Declarar Navigate para pasar entre páginas del Front

    // Función para determinar el cambio de estado de los campos del Front de acuerdo al nombre y el valor
    const cambioEntrada = ({target}) => {
        const {name, value} = target;
        setRecu({
            ...recu,
            [name]: value
        })
    }

    // Función que conecta la parte del Back mandando los datos del Front
    const sendValues = () => {
        axios.post('http://localhost:3001/recCon', recu) // Axios de tipo Post para conectar al servidor
        .then(({data}) => {
            alert("Contraseña modificada! revisa tu correo.") // Mensaje de alerta en el Front
            navigate('/'); // Navigate hacia la página del Login
          })
          .catch(({response}) => {
            console.log(response.data) // Si hay error se muestra en consola
            alert("Criterios no válidos, intenta nuevamente"); // En caso de error se manda alerta al Front
          })
    }

    return (
        <div>
            {/* Sección de imágen, usuario, contraseña y botón  */} 
            <div className="ms:flex space-y-7 max-w-md mx-auto md:max-w-2xl font-sans text-center">

                {/* Logo de DAE */}
                <div class="md:shrink-0">
                    <img class="py-5 max-w-md mx-auto md:max-w-2xl" src={logo} alt="Logo DAE"/>
                </div>

                {/* Cuadro de Texto Usuario */}
                <div>
                    <input
                        className=" rounded-lg h-14 w-96 px-5 py-2 placeholder-gray-500 text-gray-900 shadow-2xl bg-white focus:outline-none "
                        id="usuario"
                        name="usuario"
                        type="text"
                        placeholder="Usuario"
                        required
                        value={recu.usuario}
                        onChange={cambioEntrada}
                    />
                </div>

                {/* Cuadro de Texto Correo */}
                <div>
                    <input
                        className=" rounded-lg h-14 w-96 px-5 py-2 placeholder-gray-500 text-gray-900 shadow-2xl bg-white focus:outline-none "
                        id="correo"
                        name="correo"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        value={recu.correo}
                        onChange={cambioEntrada}
                    />
                </div>

                {/* Botón Enviar y Atrás*/}
                <div class="space-x-8">
                        <button
                        type="submit"
                        class="btn-custom2"
                        onClick={sendValues}>
                            Enviar
                        </button>
                    <a href='/'>
                        <button
                        type="submit"
                        class="btn-custom2">
                            Atrás
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
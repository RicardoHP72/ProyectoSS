
import {Navigate, Outlet } from "react-router-dom"

const RutasProtegidas = () => {

    let isLogg = localStorage.getItem("token")
    console.log(isLogg)

    if(!isLogg){
        return <Navigate to = "/" replace/>
    }

    // Si el item token del almacenamiento local es verdadero le permite el acceso al árbol de rutas, caso contrario se queda en la página de Login
    return (
        <Outlet/>
    )
}

export default RutasProtegidas
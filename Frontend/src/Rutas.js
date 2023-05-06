import App from './App';
import RecCon from './RecCon'
import Inicio from './Inicio';
import NuevaSol from './NuevaSol';
import ConsultaSol from './ConsultaSol';
import ConsultaSolAv from './ConsultaSolAv';
import DetallesSol from './DetallesSol';
import TablaSol from './TablaSol';
import RutasProtegidas from './RutasProtegidas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Rutas() {

    // Árbol para proteger las rutas internas después del Login
    return(
        <BrowserRouter>
            <Routes>

                <Route exact path='/' element={<App/>}/>
                <Route exact path='/*' element={<App/>}/>
                <Route exact path='/recCon' element={<RecCon/>}/>

                <Route element={<RutasProtegidas/>}>
                    <Route path='/inicio' element={<Inicio/>}/>
                    <Route path='/nuevaSol' element={<NuevaSol/>}/>
                    <Route path='/consultaSol' element={<ConsultaSol/>}/>
                    <Route path='/consultaSolAv' element={<ConsultaSolAv/>}/>
                    <Route path='/detallesSol' element={<DetallesSol/>}/>
                    <Route path='/tablaSol' element={<TablaSol/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas;
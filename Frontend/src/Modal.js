import React from 'react';

const Modal = ({estado, cambiarEstado}) => {

    return (
        <div> 
            {/* Dependiendo el estado que reciba del Front se muestra o no la ventana de créditos */}
            {estado &&
                <div className='left-0 top-0 h-screen w-screen bg-black/[0.5] place-content-center grid'>
                    <div className='bg-white shadow-2xl w-[500px] h-[440px] rounded-md'>
                        <div className='p-5 font-bold text-lg flex relative'>
                            <div className='justify-items-start'> ¡Bienvenidos! </div>
                            <div onClick={() => cambiarEstado(false)} className='text-blue-600 absolute right-5 text-center h-7 w-7 hover:bg-slate-200 hover:cursor-pointer'> X </div>
                        </div>
                        <div className='text-center p-6 font-medium text-base'>
                            <p>
                            La aplicación App Call Center ha sido creada gracias al esfuerzo y 
                            dedicación del equipo liderado por el Lic. Luis Eduardo, en colaboración con el programador Ricardo Herrera.
                            </p> 
                            <div className='h-4'></div>
                            <p>
                            Esta app ha sido desarrollada para la Dirección de Administración Escolar por el 
                            departamento de Registro y Supervisión Escolar.
                            </p>
                            <div className='h-4'></div>
                            <p>
                            Agradecemos a todos los involucrados por su compromiso en hacer posible la 
                            creación de esta útil herramienta para nuestra comunidad educativa. 
                            </p>
                            <div className='h-4'></div>
                            <p>
                            ¡Gracias por su trabajo!
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Modal;
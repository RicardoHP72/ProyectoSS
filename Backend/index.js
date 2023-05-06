//Express para Servidor, Email para Node y MySQL
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
var mysql = require('mysql2');
let cors = require("cors");
app.use(cors());
app.use(express.json());

//Credenciales de la BD
const credencialesBD = {
   host: 'localhost',
   user: 'root',
   password: 'Rikardo7',
   database: 'proyectoss',
   port: 3306,
   connectionLimit: 10
}

//Crear el servidor
app.listen(3001, () => {
   console.log("Servidor corriendo en el puerto 3001");
});

//Variables a utilizar
var datosOp = ""
var nomOpe = ""
var datosConOp = ""



//LOGIN
app.post('/login', (req, res) => {
   const {usuario, contra} = req.body // Datos del Front a leer
   const values = [usuario, contra] // Datos del Front a utilizar

   var connection = mysql.createPool(credencialesBD)           // CONEXIÓN A MYSQL

   // Generar un pool en la BD para poder crear dos conexiones a la vez en la BD
   connection.getConnection(function(err, connection){
         // Query para buscar operador que coincida usuario y contraseña
         connection.query('SELECT * FROM operadores WHERE noEmpleado = ? AND contrasenia = ?',[values[0], values[1]], function(error, result){
            if(error){
               res.status(500).send(error);
            }else{
               if(result.length > 0){
      
                  // Los datos del operador encontrado se mandan al Front y se asignan a la variable datosOp
                  res.status(200).send({
                     "Número de Empleado": result[0].noEmpleado,
                     "Tipo de Operador": result[0].tipoOp,
                     "Nombre Operador": result[0].nomOp,
                     "Nombre Completo Operador": result[0].nomOp + ' ' + result[0].appOp + ' ' + result[0].apmOp,
                     "Último Acceso": result[0].ultAccesoOp
                  })

                  datosOp = {
                     "Número de Empleado": result[0].noEmpleado,
                     "Tipo de Operador": result[0].tipoOp,
                     "Nombre Operador": result[0].nomOp,
                     "Nombre Completo Operador": result[0].nomOp + ' ' + result[0].appOp + ' ' + result[0].apmOp,
                     "Último Acceso": result[0].ultAccesoOp
                  }

                  nomOpe = datosOp["Nombre Operador"] // Obtener sólo el nombre del operador

                  console.log(datosOp)
      
                  //Variable de Fecha para MySQL
                  const hoy = new Date();
                  const fecha = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

                  // Se genera nuevo Query para la actualización del último acceso del operador
                  connection.query('UPDATE operadores SET ultAccesoOp = ? WHERE noEmpleado = ? ',[fecha, values[0]], function f2(error, result){
                     if(error){
                        res.status(500).send(error);
                     }else{
                        // Se manda mensaje a la consola indicando que se actuzalizó el último acceso
                        console.log("Último acceso modificado, " + result.affectedRows + " columnas afectadas.");
                     }
                  });      
               }else {
                  res.status(400).send("Usuario no existe") // Se manda mensaje de error a Front si no se encuentra operador
               }
            }
         })
         
         connection.release(); // Termina conexión a BD
      
      });
   })


//RECUPERAR CONTRA
app.post('/recCon', (req, res) => {
   const {usuario, correo} = req.body // Datos del Front a leer
   const values = [usuario, correo] // Datos del Front a utilizar

   var connection = mysql.createPool(credencialesBD)           // CONEXIÓN A MYSQL

   // Generar un pool en la BD para poder crear dos conexiones a la vez en la BD
   connection.getConnection(function(err, connection){
         // Query para buscar el operador que coincida el número y el correo
         connection.query('SELECT * FROM operadores WHERE noEmpleado = ? AND correoOp = ?',[values[0], values[1]], function(error, result){
            if(error){
               res.status(500).send(error);
            }else{
               if(result.length > 0){
      
                  // Mandar resultado del query al front con los datos del operador encontrador y asigna valor a variable datosConOp
                  res.status(200).send({
                     "Número de Empleado": result[0].noEmpleado,
                     "Tipo de Operador": result[0].tipoOp,
                     "Correo": result[0].correoOp,
                     "Nombre Completo Operador": result[0].nomOp + ' ' + result[0].appOp + ' ' + result[0].apmOp,
                  })

                  datosConOp = {
                     "Número de Empleado": result[0].noEmpleado,
                     "Tipo de Operador": result[0].tipoOp,
                     "Correo": result[0].correoOp,
                     "Nombre Completo Operador": result[0].nomOp + ' ' + result[0].appOp + ' ' + result[0].apmOp,
                  }

                  console.log(datosConOp)                  

                     // Datos para generar nueva contraseña con los posibles caracteres
                     var newCon = ""
                     const poss = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H',
                     'i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R',
                     's','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',0,1,2,3,4,5,6,7,8,9,
                     '!','#','$','%','&','(',')','=','*','+','-']

                     // Ciclo para general posiciones aleatorias de la cadena poss para crear contraseña
                     for (let i = 0; i < 10; i++) {
                        var num = Math.floor((Math.random() * 74));
                        newCon += poss[num];                      
                     }

                     // Mostrar en consola nueva contraseña generada
                     //console.log("Nueva Contraseña: " + newCon)

                     // Funcion para enviar correo electrónico
                     const enviarEmail = async () => {
                        
                        // Variables para la configuracion del correo
                        const config = {
                           host: 'smtp.gmail.com',
                           port: 587,
                           secure: false,
                           auth: {
                              user: 'resetpassoperador@gmail.com',
                              pass: 'kcbqpjprbubtrusy'
                           }
                        }

                        // Variables del contenido del correo
                        const mensaje = {
                           from: 'resetpassoperador@gmail.com',
                           to: datosConOp["Correo"],
                           subject: "Restablecimiento de contraseña",
                           text: "Hola " + datosConOp["Nombre Completo Operador"] + ", \n\n" + "Tu nueva contraseña es: " + newCon + "\n\n\n\n" + "Gracias."
                        }

                        // Crear transporte del correo con la dependencia nodemailer y los datos de la configuracion previamente declarados
                        const transport = nodemailer.createTransport(config);

                        try{
                           // Se intenta mandar el correo con los datos del contenido del correo previamente declarados
                           const info = await transport.sendMail(mensaje);
                           
                           // En caso de mandar correo se realiza un Query actualizando el dato de la contraseña con la nueva generada
                           connection.query('UPDATE operadores SET contrasenia = ? WHERE noEmpleado = ? ',[newCon, values[0]], function f2(error, result){
                              if(error){
                                 res.status(500).send(error);
                              }else{
                                 // Al actualizar la contraseña se manda mensaje al Front indicando que se mandó un correo con la nueva contraseña
                                 console.log("Contraseña modificada, revisa tu correo. " + result.affectedRows + " columnas afectadas.");
                              }
                           });

                        }catch(err){
                           res.status(500).send(err);
                        }

                     }

                     enviarEmail(); // Manda a llamar la funcion para enviar correo

               }else {
                  res.status(400).send("Usuario no existe") // Si no coincide usuario y correo se manda mensaje de error al Front
               }
            }
         })
         
         connection.release(); // Termina conexión a BD
      
      });
   })


//NUEVA SOLICITUD
app.post('/nuevaSol', (req, res) => {
   const {boletaSol, nombreSol, correoSol, telSol, areaRes, descripcionSol} = req.body // Datos del Front a leer
   const values = [boletaSol, nombreSol, correoSol, telSol, areaRes, descripcionSol] // Datos del Front a utilizar
   var creadorSol = datosOp["Número de Empleado"] // Obtener el num de empleado del operador de los datos del Login
   var noEmpAsignatario = 325163 // Se asigna un empleado ficticio
   var newSol = 0 // Iniciar variable para determinar el ID del último dato creado

   var connection = mysql.createConnection(credencialesBD) // Conexión a BD

   //Variable de Fecha para MySQL
   const hoy = new Date();
   const fecha = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

   // Query para insertar datos que se introdujeron en el Front
   connection.query('INSERT INTO solicitud VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',[null,values[0],values[1],values[2],values[3],values[4],creadorSol,noEmpAsignatario,values[5],fecha,fecha,1], function(error, result){
      if(error){
         res.status(500).send(error)
      }else{
         // Query sobre la misma conexión para determinar el útimo ID insertado
         connection.query('SELECT LAST_INSERT_ID() as ultimo', function(error, result){
            if(error)
            {
               res.status(500).send(error)
            }else{
               newSol = result[0].ultimo
               res.status(200).send("Solicitud " + newSol + " creada!") // Mostrar mensaje en el Front con el último ID creado
            }
         })
      }

      connection.end(); // Termina conexión a BD

   });  
})


//BUSCAR SOLICITUD
app.post('/detallesSol', (req, res) => {
   const {numeroSol, boletaSol} = req.body // Datos del Front a leer
   const values = [numeroSol, boletaSol] // Datos del Front a utilizar

   var connection = mysql.createConnection(credencialesBD)             // CONEXIÓN A MYSQL

   // Query para buscar solicitud por número o por boleta introducida en el Front
   connection.query('SELECT * FROM solicitud WHERE noSol = ? OR boletaSol = ?',values, function(error, result){
      if(error){
         res.status(500).send(error)
      }else{
         if(result.length > 0){

            // Arreglo obtenido de la consulta se manda al Front y se asigna a variable datosSoli
            res.status(200).send({
               "Número Solicitud": result[0].noSol,
               "Boleta Solicitante": result[0].boletaSol,
               "Nombre Solicitante": result[0].nombreSol,
               "Correo Solicitante": result[0].correoSol,
               "Teléfono Solicitante": result[0].telSol,
               "Área Responsable": result[0].areaRes,
               "Empleado Asignado": result[0].noEmpAsignatario,
               "Descripción de la Solicitud": result[0].descripcionSol,
               "Fecha de Creación": result[0].fechaHoraCreaSol,
               "Última Modificación": result[0].ultModiSol,
               "Estatus Solicitud": result[0].estatus,
               "Creador Solicitud": result[0].creadorSol
            })

            datosSoli = {
               "Número Solicitud": result[0].noSol,
               "Boleta Solicitante": result[0].boletaSol,
               "Nombre Solicitante": result[0].nombreSol,
               "Correo Solicitante": result[0].correoSol,
               "Teléfono Solicitante": result[0].telSol,
               "Área Responsable": result[0].areaRes,
               "Empleado Asignado": result[0].noEmpAsignatario,
               "Descripción de la Solicitud": result[0].descripcionSol,
               "Fecha de Creación": result[0].fechaHoraCreaSol,
               "Última Modificación": result[0].ultModiSol,
               "Estatus Solicitud": result[0].estatus,
               "Creador Solicitud": result[0].creadorSol
            }

            console.log(datosSoli)

         }else{
            res.status(400).send("Solicitud no existe")
         }
      }

      connection.end(); // Termina conexión a BD

   });  

})


//BUSQUEDA AVANZADA
app.post('/detallesSolAv', (req, res) => {
   
      // Datos del Front a leer
      const {numeroSol,
      boletaSol,
      correoSol,
      telefonoSol,
      estatus,
      creadorSol,
      //creacionSol,
      areaRes} = req.body
   
      // Datos del front a utilizar
      const values = [numeroSol,
      boletaSol,
      correoSol,
      telefonoSol,
      estatus,
      creadorSol,
      //creacionSol,
      areaRes]

   var connection = mysql.createConnection(credencialesBD)             // CONEXIÓN A MYSQL

   // Query para buscar solicitud de acuerdo a los datos introducidos en el front
   connection.query('SELECT * FROM solicitud WHERE noSol = ? OR boletaSol = ? OR correoSol = ? OR telSol = ? OR estatus = ? OR creadorSol = ? OR areaRes = ?',values, function(error, result){
      if(error){
         res.status(500).send(error)
      }else{
         if(result.length > 0){

            // Si el resultado de la consulta es mayor a 0 entonces el resultado se asigna a la variable Tabla
            const tabla = result

            res.status(200).send({tabla})

            console.log(result)

         }else{
            res.status(400).send("Solicitud no existe")
         }
      }

      connection.end(); // Terminar conexión a BD

   });  

})


//BUSCAR TODAS LAS SOLICITUDES
app.post('/tablaSol', (req, res) => {
   var connection = mysql.createConnection(credencialesBD)  // CONEXIÓN A MYSQL

   // Query para buscar todas las solicitudes
   connection.query('SELECT * FROM solicitud',[], function(error, result){
      if(error){
         res.status(500).send(error)
      }else{
         if(result.length > 0){

            // Si el resultado de la consulta es mayor a 0 entonces el resultado se asigna a la variable Tabla
            const tabla = result

            res.status(200).send({tabla})

            console.log(result)

         }else{
            res.status(400).send("Solicitud no existe")
         }
      }

      connection.end(); // Terminar conexión a BD

   });  

})


//BORRAR SOLICITUD
app.post('/borrarSol', (req, res) => {
   const numSol = datosSoli["Número Solicitud"] // Dato del número de la solicitud después de buscar la solicitud

   var connection = mysql.createConnection(credencialesBD) // Conexión a la BD

   // Query para borrar la solicitud
   connection.query('DELETE FROM solicitud WHERE noSol = ? ',numSol, function(error, result){
      if(error){
         res.status(500).send(error)
      }else{
         console.log("Solicitud eliminada! " + result.affectedRows + " columnas afectadas.")
         res.status(200).send("Solicitud eliminada! " + result.affectedRows + " columnas afectadas.")
      }

      connection.end(); // Terminar conexión a BD

   });  
})


//ACTUALIZAR SOLICITUD
app.post('/editarSol', (req, res) => {
   const {boletaSol, nombreSol, correoSol, telefonoSol, descripcionSol, estatus, areaRes} = req.body // Datos del front a leer
   const values = [boletaSol, nombreSol, correoSol, telefonoSol, descripcionSol, estatus, areaRes]   // Datos del front a utilizar

   var connection = mysql.createConnection(credencialesBD) // Conexión a la BD

   // Variable de Fecha para MySQL
   const hoy = new Date();
   const fecha = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

   // Query para actualizar la Solicitud
   connection.query('UPDATE solicitud SET ultModiSol = ?, boletaSol = ?, nombreSol = ?, correoSol = ?, telSol = ?, descripcionSol = ?, estatus = ?, areaRes = ? WHERE noSol = ?', [fecha,values[0],values[1],values[2],values[3],values[4],values[5],values[6],datosSoli["Número Solicitud"]], function(error, result){
      if(error){
         res.status(500).send(error)
      }else{
         console.log("Solicitud editada! " + result.affectedRows + " columnas afectadas.")
         res.status(200).send("Solicitud editada! " + result.affectedRows + " columnas afectadas.")
      }

      connection.end(); // Terminar conexión a BD

   });  
})




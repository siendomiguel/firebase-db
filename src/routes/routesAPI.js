import { Router } from 'express';
import { db } from '../config/firebase.js';

export const routerAPI = Router();

/* routerAPI.get('/db', async (req, res) => {
  const querySnapshot = await db.collection('chat_messages').get();

  const docs = querySnapshot.docs.map(doc => ({
    chat: doc.data().chat._path.segments[1],
    message: doc.data().text,
    timestamp: doc.data().timestamp,
  }));

  console.log(docs);
  res.send(docs);
});

routerAPI.get('/db/:id', async (req, res) => {
  const { id } = req.params;
  const doc = await db.collection('chats').doc(id).get();

  console.log(doc.data());
  res.send({ id: doc.id, ...doc.data() });
});

routerAPI.get('/users', async (req, res) => {
  const querySnapshot = await db
    .collection('users')
    .where('role', '==', 'Doctor')
    .get();
  const docs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    role: doc.data().role,
    name: doc.data().name,
    email: doc.data().email,
  }));
  console.log(docs);
  res.send(docs);
});

routerAPI.get('/user', async (req, res) => {
  const querySnapshot = await db.collection('users').get();
  const docs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    email: doc.data().email,
  }));
  console.log(docs);
  res.send(docs);
});

routerAPI.get('/chats/:id', async (req, res) => {
  const { id } = req.params; //USm8vPu1INJiLOOVnpGo
  const docs = await db.collection('chats').doc(id).get();
  console.log(docs.data());
  res.send(docs.data());
});

routerAPI.get('/chat-messages', async (req, res) => {
  const chatRef = db.doc('/chats/USm8vPu1INJiLOOVnpGo');
  const querySnapshot = await db
    .collection('chat_messages')
    .where('chat', '==', chatRef)
    .orderBy('timestamp', 'desc')
    .get();
  const docs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    image: doc.data().image,
    text: doc.data().text,
    chat: doc.data().chat._path.segments[1],
    timestamp: new Date(doc.data().timestamp._seconds * 1000).toLocaleString(),
  }));
  console.log(docs);
  res.send(docs);
});

*/

routerAPI.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).send('Usuario no encontrado');
    }

    const data = userDoc.data();

    // Limpiar datos del usuario
    const userData = {
      email: data.email || '',
      display_name: data.display_name || '',
      photo_url: data.photo_url || '',
      uid: data.uid || '',
      created_time: data.created_time ? data.created_time.toDate() : null,
      phone_number: data.phone_number || '',
      shortDescription: data.shortDescription || '',
      last_active_time: data.last_active_time ? data.last_active_time.toDate() : null,
      role: data.role || '',
      title: data.title || '',
      nombre: data.nombre || '',
      apellidoPaterno: data.apellidoPaterno || '',
      apellidoMaterno: data.apellidoMaterno || '',
      edad: data.edad || '',
      fechaNacimiento: data.fechaNacimiento ? data.fechaNacimiento.toDate() : null,
      estadoCivil: data.estadoCivil || '',
      ocupacion: data.ocupacion || '',
      notas: data.notas || '',
      otroTelefono: data.otroTelefono || '',
      genero: data.genero || '',
      clinica: data.clinica ? data.clinica.id : null,
      direccion: data.direccion || '',
      longDescription: data.longDescription || '',
      isAdmin: data.isAdmin || false,
      religion: data.religion || '',
      alergias: data.alergias || [],
      lugarOrigen: data.lugarOrigen || '',
      lugarResidencia: data.lugarResidencia || '',
      referidoPor: data.referidoPor || '',
      DNI: data.DNI || '',
      tipoSangre: data.tipoSangre || '',
      seguroMedico: data.seguroMedico || '',
      infoFamiliar: data.infoFamiliar || [],
      expediente: data.expediente || '',
      peso: data.peso || null,
      talla: data.talla || null,
      nacionalidad: data.nacionalidad || '',
      completeProfile: data.completeProfile || false,
      color: data.color || '',
      ICM: data.ICM || '',
      zoomAccountID: data.zoomAccountID || '',
      zoomClientID: data.zoomClientID || '',
      zoomSecretID: data.zoomSecretID || '',
      zoomLinkInstantaneo: data.zoomLinkInstantaneo || '',
      permisos: data.permisos || '',
      stripePk_key: data.stripePk_key || '',
      stripeSK_key: data.stripeSK_key || '',
      availability: data.availability || [],
      configCompleta: data.configCompleta || false,
      ChatsIniciados: data.ChatsIniciados || [],
      cedulaProfesional: data.cedulaProfesional || [],
      CertificadoPor: data.CertificadoPor || [],
      horarios: data.horarios || false,
      servicios: data.servicios || false,
      equipo: data.equipo || false,
      zoom: data.zoom || false,
      stripe: data.stripe || false,
      clinicas: data.clinicas ? data.clinicas.map(clinica => clinica.id) : [],
      pacientes: data.pacientes ? data.pacientes.map(paciente => paciente.id) : [],
      serviciosList: data.serviciosList ? data.serviciosList.map(servicio => servicio.id) : [],
      especialidadList: data.especialidadList ? data.especialidadList.map(especialidad => especialidad.id) : [],
      ciudad: data.ciudad || '',
      mls_doctores: data.mls_doctores ? data.mls_doctores.map(doctor => doctor.id) : [],
      blockList: data.blockList ? data.blockList.map(blocked => blocked.id) : [],
      Solicitudes: data.Solicitudes ? data.Solicitudes.map(solicitud => solicitud.id) : [],
    };

    res.send(userData);
  } catch (error) {
    console.error('Error al consultar el usuario en Firestore:', error);
    res.status(500).send('Error en el servidor');
  }
});

routerAPI.get('/users/:userId/antecedentes', async (req, res) => {
  const { userId } = req.params;

  try {
    // Accede a la subcolección "antecedentes" dentro del usuario especificado
    const querySnapshot = await db.collection('users').doc(userId).collection('antecedentes').get();

    // Mapeo de los documentos obtenidos en la consulta
    const antecedentes = querySnapshot.docs.map(doc => {
      const data = doc.data();

      // Extraer solo la información relevante
      return {
        antecedente: data.antecedente || '',
        detalle: data.detalle || '',
        aplica: data.aplica || false,
        notas: data.notas || '',
        orderID: data.orderID || null,
      };
    });

    // Responder con los antecedentes encontrados
    res.send(antecedentes);
  } catch (error) {
    console.error('Error al consultar antecedentes en Firestore:', error);
    res.status(500).send('Error en el servidor');
  }
});

routerAPI.get('/consulta/:pacienteId/:doctorId', async (req, res) => {
  const { pacienteId, doctorId } = req.params;

  const pacienteRef = db.doc(`/users/${pacienteId}`);
  const doctorRef = db.doc(`/users/${doctorId}`);

  try {
    const querySnapshot = await db
      .collection('consulta')
      .where('paciente', '==', pacienteRef)
      .where('doctor', '==', doctorRef)
      .get();

    const consultas = await Promise.all(
      querySnapshot.docs.map(async doc => {
        const data = doc.data();

        // Limpiar datos de la consulta principal
        const consulta = {
          uid: data.uid || null,
          createdDate: data.createdDate ? data.createdDate.toDate() : null,
          fechaConsulta: data.fechaConsulta ? data.fechaConsulta.toDate() : null,
          clinica: data.clinica ? data.clinica.id : null,
          paciente: data.paciente ? data.paciente.id : null,
          doctor: data.doctor ? data.doctor.id : null,
          servicio: data.servicio ? data.servicio.id : null,
          cita: data.cita ? data.cita.id : null,
          padecimientoActual: data.padecimientoActual || '',
          objetivoConsulta: data.objetivoConsulta || '',
          horaInicio: data.horaInicio ? data.horaInicio.toDate() : null,
          horaFin: data.horaFin ? data.horaFin.toDate() : null,
        };

        // Consultar subcolección signosVitales
        const signosVitalesSnapshot = await doc.ref.collection('signosVitales').get();
        consulta.signosVitales = signosVitalesSnapshot.docs.map(signoDoc => ({
          signo: signoDoc.data().signo || '',
          valor: signoDoc.data().valor || '',
          notas: signoDoc.data().notas || '',
          orderID: signoDoc.data().orderID || null,
        }));

        // Consultar subcolección exploracionFisica
        const exploracionFisicaSnapshot = await doc.ref.collection('exploracionFisica').get();
        consulta.exploracionFisica = exploracionFisicaSnapshot.docs.map(exploracionDoc => ({
          parteCuerpo: exploracionDoc.data().parteCuerpo || '',
          notas: exploracionDoc.data().notas || '',
          orderID: exploracionDoc.data().orderID || '',
        }));

        // Consultar subcolección diagnosticoTratamiento
        const diagnosticoTratamientoSnapshot = await doc.ref.collection('diagnosticoTratamiento').get();
        consulta.diagnosticoTratamiento = diagnosticoTratamientoSnapshot.docs.map(diagnosticoDoc => ({
          CIE10_grupo: diagnosticoDoc.data().CIE10_grupo || '',
          CIE10_guardados: diagnosticoDoc.data().CIE10_guardados || '',
          diagnostico: diagnosticoDoc.data().diagnostico || '',
          tratamiento: diagnosticoDoc.data().tratamiento || [],
          notas: diagnosticoDoc.data().notas || '',
          cobroPaciente: diagnosticoDoc.data().cobroPaciente || null,
          cobroAseguradora: diagnosticoDoc.data().cobroAseguradora || null,
          totalPrecio: diagnosticoDoc.data().totalPrecio || null,
          createdDate: diagnosticoDoc.data().createdDate ? diagnosticoDoc.data().createdDate.toDate() : null,
        }));

        return consulta;
      }),
    );

    res.send(consultas);
  } catch (error) {
    console.error('Error al consultar en Firestore:', error);
    res.status(500).send('Error en el servidor');
  }
});

routerAPI.get('/citas/:pacienteId/:doctorId', async (req, res) => {
  const { pacienteId, doctorId } = req.params;

  // Crear referencias para el paciente y el doctor en la colección "users"
  const pacienteRef = db.doc(`/users/${pacienteId}`);
  const doctorRef = db.doc(`/users/${doctorId}`);

  try {
    // Consulta en la colección "citas" con ambas condiciones
    const querySnapshot = await db
      .collection('citas')
      .where('paciente', '==', pacienteRef)
      .where('doctor', '==', doctorRef)
      .get();

    // Mapeo de los documentos obtenidos en la consulta
    const citas = querySnapshot.docs.map(doc => {
      const data = doc.data();

      // Limpiar los datos para incluir solo los campos necesarios
      return {
        uid: data.uid || '',
        tipoCita: data.tipoCita || '',
        fechaCita: data.fechaCita ? data.fechaCita.toDate() : null,
        horaInicio: data.horaInicio ? data.horaInicio.toDate() : null,
        horaFin: data.horaFin ? data.horaFin.toDate() : null,
        linkZoom: data.linkZoom || '',
        clinica: data.clinica ? data.clinica.id : null,
        servicio: data.servicio ? data.servicio.id : null,
        createdDate: data.createdDate ? data.createdDate.toDate() : null,
        paciente: data.paciente ? data.paciente.id : null,
        estado: data.estado || '',
        duracion: data.duracion || null,
        precio: data.precio || null,
        observaciones: data.observaciones || '',
        doctor: data.doctor ? data.doctor.id : null,
        color: data.color || '',
        resumen: data.resumen || '',
        chatRef: data.chatRef ? data.chatRef.id : null,
        paymentStatus: data.paymentStatus || '',
        checkoutSessionId: data.checkoutSessionId || '',
      };
    });

    // Responder con los datos limpios de las citas encontradas
    res.send(citas);
  } catch (error) {
    console.error('Error al consultar las citas en Firestore:', error);
    res.status(500).send('Error en el servidor');
  }
});

/* 
routerAPI.get('/consulta/:id', async (req, res) => {
  const { id } = req.params;
  const chatRef = db.doc(`/users/${id}`);
  const consultaSnapshot = await db
    .collection('consulta')
    .where('paciente', '==', chatRef)
    .get();
  const consultaDocs = consultaSnapshot.docs.map(async consultaDoc => {
    const subCollectiondiagnosticoTratamiento = await consultaDoc.ref
      .collection('diagnosticoTratamiento')
      .get();
    const subCollectionDocs1 = subCollectiondiagnosticoTratamiento.docs.map(
      subDoc => ({
        id: subDoc.id,
        diagnostico: subDoc.data().diagnostico,
        notas: subDoc.data().notas,
        CIE10_grupo: subDoc.data().CIE10_grupo,
        CIE10_guardados: subDoc.data().CIE10_guardados,
        tratamiento: subDoc.data().tratamiento,
      }),
    );
    const subCollectionexploracionFisica = await consultaDoc.ref
      .collection('exploracionFisica')
      .get();
    const subCollectionDocs2 = subCollectionexploracionFisica.docs.map(
      subDoc => ({
        id: subDoc.id,
        parteCuerpo: subDoc.data().parteCuerpo,
        notas: subDoc.data().notas,
        orderID: subDoc.data().orderID,
      }),
    );
    const subCollectionSignosVitales = await consultaDoc.ref
      .collection('signosVitales')
      .get();
    const subCollectionDocs3 = subCollectionSignosVitales.docs.map(subDoc => ({
      id: subDoc.id,
      signo: subDoc.data().signo,
      valor: subDoc.data().valor,
      notas: subDoc.data().notas,
      ordenID: subDoc.data().ordenID,
    }));
    return {
      id: consultaDoc.id,
      padecimientoActual: consultaDoc.data().padecimientoActual,
      objetivoConsulta: consultaDoc.data().objetivoConsulta,
      diagnosticos: subCollectionDocs1,
      exploracionFisica: subCollectionDocs2,
      signosVitales: subCollectionDocs3,
    };
  });

  const consultaResults = await Promise.all(consultaDocs);

  console.log(consultaResults);
  res.send(consultaResults);
});
 */

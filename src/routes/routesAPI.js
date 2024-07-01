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
routerAPI.get('/consulta/:id', async (req, res) => {
  const { id } = req.params;
  const chatRef = db.doc(`/users/${id}`);
  const querySnapshot = await db
    .collection('consulta')
    .where('paciente', '==', chatRef)
    .get();
  const docs = querySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  console.log(docs);
  res.send(docs);
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

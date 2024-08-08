import { db } from './firebaseConfig';
import { collection, addDoc, deleteDoc, updateDoc, getDocs, doc } from 'firebase/firestore';

export const addDocument = async (collectionName, documentData) => {
  const docRef = await addDoc(collection(db, collectionName), documentData);
  return docRef.id;
};

export const deleteDocument = async (collectionName, docId) => {
  await deleteDoc(doc(db, collectionName, docId));
};

export const updateDocument = async (collectionName, docId, documentData) => {
  await updateDoc(doc(db, collectionName, docId), documentData);
};

export const fetchDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
};

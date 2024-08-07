
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const fetchDocuments = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addDocument = async (collectionName, data) => {
  const collectionRef = collection(db, collectionName);
  await addDoc(collectionRef, data);
};

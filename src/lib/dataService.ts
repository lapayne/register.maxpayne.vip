import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  writeBatch 
} from "firebase/firestore";
import { db } from "./firebase";

export interface Person {
  id?: string;
  name: string;
  lunch: string;
  afternoon: string;
  morningStatus?: string; // e.g., 'here', 'not-here'
  afternoonStatus?: string;
  timestamp?: any;
}

const register = "register";

export const subscribeToPeople = (callback: (people: Person[]) => void) => {
  const q = query(collection(db, register), orderBy("name", "asc"));
  return onSnapshot(q, (snapshot) => {
    const people = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Person));
    callback(people);
  });
};

export const addPerson = async (person: Person) => {
  try {
    await addDoc(collection(db, register), {
      ...person,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error adding person: ", error);
    throw error;
  }
};

export const updatePersonStatus = async (id: string, updates: Partial<Person>) => {
  try {
    const personRef = doc(db, register, id);
    await updateDoc(personRef, updates);
  } catch (error) {
    console.error("Error updating person status: ", error);
    throw error;
  }
};

export const resetAllStatuses = async (people: Person[]) => {
  try {
    const batch = writeBatch(db);
    people.forEach((person) => {
      if (person.id) {
        const personRef = doc(db, register, person.id);
        batch.update(personRef, {
          morningStatus: "default",
          afternoonStatus: "default",
        });
      }
    });
    await batch.commit();
  } catch (error) {
    console.error("Error resetting statuses: ", error);
    throw error;
  }
};


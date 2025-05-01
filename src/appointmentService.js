import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const addAppointment = async (appointment) => {
  try {
    await addDoc(collection(db, "appointments"), appointment);
    console.log("Appointment added!");
  } catch (error) {
    console.error("Error adding appointment: ", error);
  }
};

export { addAppointment };

import {bd} from "../config/firebase";
import { collection, addDoc, getDoc, query, where } from "firebase/firestore";

//usuario
export async function addUser(user) {
    try{
        const docRef = await addDoc(collection(dblClick, "usuario"), {
            ...user,
            createAt: new Date(),
        });
        console.log("Usuario registrado con ID: ", docRef.id);
        return docRef;

    }catch (error) {
        console.error("Error al registrar usuario: ", error);
        return error;

    }
}


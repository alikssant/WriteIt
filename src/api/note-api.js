import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "utils/firebase";

export class NoteAPI {
  // Create a new note
  static async create(formValues) {
    const response = await addDoc(
      collection(FirebaseApp.db, "notes"),
      formValues
    );
    return {
      id: response.id,
      ...formValues,
    };
  }

  // Fetch all notes, sorted by created_at in descending order (most recent first)
  static async fetchAll() {
    const q = query(
      collection(FirebaseApp.db, "notes"),
      orderBy("created_at", "asc") // Sort by created_at in ascending order in the query
    );
    const response = await getDocs(q);

    // Map the data and sort locally if necessary
    return response.docs
      .map((document) => {
        return {
          id: document.id,
          ...document.data(),
        };
      })
      .sort((a, b) => {
        // Local fallback sort by date (most recent first)
        return parseDMY(b.created_at) - parseDMY(a.created_at);
      });
  }

  // Delete a note by its ID
  static async deleteById(noteId) {
    await deleteDoc(doc(FirebaseApp.db, "notes", noteId));
  }

  // Update a note by its ID
  static async updateById(id, values) {
    const queryRef = doc(FirebaseApp.db, "notes", id);
    await updateDoc(queryRef, values);
    return {
      id,
      ...values,
    };
  }
}

const parseDMY = (dateString) => {
  const [d, m, y] = dateString.split("/").map(Number);
  return new Date(y, m - 1, d);
};

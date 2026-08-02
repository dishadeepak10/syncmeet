import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const API_BASE_URL = "http://localhost:3000";

export async function generateSummary(transcript) {
  const response = await fetch(`${API_BASE_URL}/api/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate summary");
  }

  return response.json();
}
export async function saveSummary(summaryData, transcript) {
  const docRef = await addDoc(collection(db, "summaries"), {
    ...summaryData,
    transcript,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
export async function getAllSummaries() {
  const q = query(collection(db, "summaries"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function deleteSummary(id) {
  await deleteDoc(doc(db, "summaries", id));
}
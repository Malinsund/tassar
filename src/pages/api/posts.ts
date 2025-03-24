import { db } from "@/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log("request body:", req.body);
      const { userId, username, userProfileImage, imageUrl, description } = req.body;

      if (!userId || !imageUrl || !description) {
        console.log("saknas:", req.body)
        return res.status(400).json({ error: "Alla fält måste vara ifyllda" });
      }

      const newPost = {
        userId,
        username,
        userProfileImage,
        imageUrl,
        description,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);

      return res.status(201).json({ id: docRef.id, ...newPost });
    } catch (error) {
      console.error("Fel vid uppladdning av inlägg:", error);
      return res.status(500).json({ error: "Något gick fel" });
    }
  } else {
    return res.status(405).json({ error: "Metoden är inte tillåten" });
  }
}
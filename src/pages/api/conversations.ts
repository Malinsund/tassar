/* import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID krävs" }, { status: 400 });
    }

    const conversationsQuery = query(
      collection(db, "conversations"),
      where("user1Id", "==", userId)
    );

    const conversationsSnapshot = await getDocs(conversationsQuery);
    const conversations = conversationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error("Fel vid hämtning av konversationer:", error);
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
} */
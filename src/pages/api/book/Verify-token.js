import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Check if Firebase is initialized
    if (!db) {
      console.error("Firebase not initialized");
      return res.status(500).json({ error: "Database connection error" });
    }

    console.log("Verifying token:", token.substring(0, 10) + "...");

    // Find the token in Firebase
    const tokensRef = collection(db, "verificationTokens");
    const q = query(tokensRef, where("token", "==", token), where("used", "==", false));
    const tokenSnapshot = await getDocs(q);

    if (tokenSnapshot.empty) {
      console.log("Token not found or already used");
      return res.status(400).json({ error: "الرابط غير صالح أو تم استخدامه بالفعل" });
    }

    const tokenDoc = tokenSnapshot.docs[0];
    const tokenData = tokenDoc.data();

    console.log("Token found for email:", tokenData.email);

    // Check if token is expired (24 hours)
    const createdAt = tokenData.createdAt ? tokenData.createdAt.toDate() : new Date();
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      console.log("Token expired:", hoursDiff, "hours old");
      return res.status(400).json({ error: "انتهت صلاحية الرابط. الرجاء طلب رابط جديد" });
    }

    // Mark token as used
    await updateDoc(doc(db, "verificationTokens", tokenDoc.id), {
      used: true,
      usedAt: new Date(),
    });

    console.log("Token verified successfully for:", tokenData.email);

    return res.status(200).json({ 
      email: tokenData.email,
      name: tokenData.name || "",
      message: "Token verified successfully" 
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ 
      error: "Failed to verify token",
      details: error.message 
    });
  }
}
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name } = req.body;

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // Check if email already has a review
    const reviewsRef = collection(db, "bookReviews");
    const q = query(reviewsRef, where("email", "==", email));
    const reviewSnapshot = await getDocs(q);

    if (!reviewSnapshot.empty) {
      return res.status(400).json({ 
        error: "لقد قمت بالفعل بإضافة تقييم. كل بريد إلكتروني يمكنه إضافة تقييم واحد فقط" 
      });
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex");

    // Store verification token with name in Firebase
    await addDoc(collection(db, "verificationTokens"), {
      email,
      name,
      token,
      createdAt: serverTimestamp(),
      used: false,
    });

    // Create verification link
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/book/verify?token=${token}`;
    
    // Check if Brevo API key exists
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not set");
      return res.status(500).json({ error: "Email service not configured" });
    }

    console.log("Sending email to:", email);
    console.log("Using Brevo API key:", process.env.BREVO_API_KEY.substring(0, 10) + "...");

    // Send email with Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "FinanceBdarija",
          email: process.env.BREVO_SENDER_EMAIL || "noreply@financebdarija.com"
        },
        to: [
          {
            email: email,
            name: name
          }
        ],
        subject: "تحقق من بريدك الإلكتروني لإضافة تقييم - Verify your email to add a review",
        htmlContent: `
          <!DOCTYPE html>
          <html dir="rtl">
            <head>
              <meta charset="utf-8">
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  direction: rtl; 
                  text-align: right;
                  background-color: #f5f5f5;
                  margin: 0;
                  padding: 0;
                }
                .container { 
                  max-width: 600px; 
                  margin: 30px auto; 
                  padding: 40px;
                  background-color: white;
                  border-radius: 10px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .logo {
                  font-size: 24px;
                  font-weight: bold;
                  color: #3b82f6;
                  margin-bottom: 10px;
                }
                h2 { 
                  color: #3b82f6;
                  margin-bottom: 20px;
                }
                p {
                  line-height: 1.6;
                  color: #333;
                  margin-bottom: 15px;
                }
                .button-container {
                  text-align: center;
                  margin: 35px 0;
                }
                .button { 
                  background-color: #3b82f6; 
                  color: white !important; 
                  padding: 15px 40px; 
                  text-decoration: none; 
                  border-radius: 8px; 
                  display: inline-block;
                  font-weight: bold;
                  font-size: 16px;
                }
                .button:hover {
                  background-color: #2563eb;
                }
                .footer { 
                  color: #666; 
                  font-size: 13px; 
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
                }
                .link {
                  color: #3b82f6;
                  word-break: break-all;
                  font-size: 12px;
                  direction: ltr;
                  text-align: left;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">📚 FinanceBdarija</div>
                </div>
                
                <h2>مرحباً ${name}!</h2>
                
                <p>شكراً لاهتمامك بإضافة تقييم لكتاب <strong>"اصنع ثروتك"</strong></p>
                
                <p>انقر على الزر أدناه للمتابعة وإضافة تقييمك:</p>
                
                <div class="button-container">
                  <a href="${verificationLink}" class="button">
                    ✅ تحقق وأضف تقييمك
                  </a>
                </div>
                
                <div class="footer">
                  <p><strong>⏰ هام:</strong> هذا الرابط صالح لمدة 24 ساعة فقط</p>
                  
                  <p>إذا لم ينجح الزر أعلاه، يمكنك نسخ الرابط التالي ولصقه في متصفحك:</p>
                  <p class="link">${verificationLink}</p>
                  
                  <p style="margin-top: 20px;">إذا لم تطلب هذا البريد، يمكنك تجاهله بأمان.</p>
                  <p>If you didn't request this email, you can safely ignore it.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully via Brevo:", data);
    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error sending verification:", error);
    res.status(500).json({ error: error.message || "Failed to send verification email" });
  }
}
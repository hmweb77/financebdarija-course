import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// Store valid tokens in environment variable or Firebase
// Format: TOKEN1,TOKEN2,TOKEN3
const VALID_TOKENS = process.env.BOOK_COMMENT_TOKENS?.split(',') || [];

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, rating, comment, token, bookId } = body;
    
    if (!name || !rating || !comment || !token || !bookId) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validate token
    if (!VALID_TOKENS.includes(token)) {
      return NextResponse.json(
        { error: 'Lien invalide ou expiré' },
        { status: 403 }
      );
    }

    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'La note doit être entre 1 et 5' },
        { status: 400 }
      );
    }

    // Check if token was already used for this book
    const commentsRef = collection(db, 'bookComments');
    const q = query(
      commentsRef, 
      where('token', '==', token),
      where('bookId', '==', bookId)
    );
    const existingComments = await getDocs(q);

    if (!existingComments.empty) {
      return NextResponse.json(
        { error: 'Ce lien a déjà été utilisé pour laisser un commentaire' },
        { status: 403 }
      );
    }

    // Add comment to Firestore
    const commentData = {
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      bookId,
      token,
      createdAt: serverTimestamp(),
      approved: true // Auto-approve since they have valid token
    };

    const docRef = await addDoc(commentsRef, commentData);

    console.log('Book comment submitted:', {
      id: docRef.id,
      name,
      rating,
      bookId,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Merci pour votre avis! Il sera visible sur la page du livre.',
        commentId: docRef.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Book comment submission error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch comments for a book
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json(
        { error: 'bookId est requis' },
        { status: 400 }
      );
    }

    const commentsRef = collection(db, 'bookComments');
    const q = query(
      commentsRef,
      where('bookId', '==', bookId),
      where('approved', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const comments = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        name: data.name,
        rating: data.rating,
        comment: data.comment,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      });
    });

    // Sort by date (newest first)
    comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json(
      { 
        success: true,
        comments,
        count: comments.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch comments error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du chargement des commentaires.' },
      { status: 500 }
    );
  }
}
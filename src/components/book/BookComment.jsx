"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Calendar, MessageCircle, Loader2 } from 'lucide-react';

export default function BookComments({ bookId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (bookId) {
      fetchComments();
    }
  }, [bookId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/book-comment?bookId=${bookId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des commentaires');
      }

      setComments(data.comments || []);
      
      // Calculate average rating
      if (data.comments && data.comments.length > 0) {
        const avg = data.comments.reduce((sum, comment) => sum + comment.rating, 0) / data.comments.length;
        setAverageRating(avg);
      }

    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StarRating = ({ rating, size = 'md' }) => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizes[size]} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#48A9FE] mx-auto mb-4" />
        <p className="text-gray-600">Chargement des avis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-12 text-center">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Aucun avis pour le moment</p>
        <p className="text-gray-500 text-sm mt-2">Soyez le premier à partager votre avis</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      
      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#48A9FE]/10 to-[#002144]/10 rounded-2xl p-8 mb-12 text-center"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div>
            <div className="text-5xl font-bold text-[#002144] mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <p className="text-gray-600 mt-2">
              Basé sur {comments.length} avis
            </p>
          </div>
          
          <div className="w-px h-20 bg-gray-300 hidden md:block" />
          
          <div className="text-left">
            <h3 className="text-xl font-bold text-[#002144] mb-3">
              Distribution des notes
            </h3>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = comments.filter(c => c.rating === rating).length;
              const percentage = (count / comments.length) * 100;
              
              return (
                <div key={rating} className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {rating} ★
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-yellow-400"
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#002144] mb-6">
          Avis des lecteurs
        </h3>
        
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#48A9FE] to-[#002144] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {comment.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                </div>
                
                <StarRating rating={comment.rating} />
              </div>

              {/* Comment Content */}
              <p className="text-gray-700 leading-relaxed">
                {comment.comment}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
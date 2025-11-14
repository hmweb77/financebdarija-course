"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle, Loader2, BookOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';


export default function BookCommentPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const bookId = searchParams.get('bookId');

  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: ''
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  useEffect(() => {
    if (!token || !bookId) {
      setStatus({
        loading: false,
        success: false,
        error: 'Lien invalide. Veuillez utiliser le lien fourni dans votre email.'
      });
    }
  }, [token, bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      setStatus({
        loading: false,
        success: false,
        error: 'Veuillez sélectionner une note'
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/book-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token,
          bookId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setStatus({ loading: false, success: true, error: null });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', rating: 0, comment: '' });
      }, 3000);

    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Une erreur est survenue. Veuillez réessayer.' 
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  // If no token or bookId, show error
  if (!token || !bookId) {
    return (
      <>
      
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Lien Invalide
            </h2>
            <p className="text-gray-600">
              Veuillez utiliser le lien fourni dans votre email pour laisser votre avis.
            </p>
          </motion.div>
        </div>
       
      </>
    );
  }

  return (
    <>
 
      <div className="min-h-screen bg-gradient-to-br from-[#002144] via-[#003366] to-[#002144] py-20 px-4">
        <div className="max-w-3xl mx-auto mt-12">
          
          {/* Success State */}
          <AnimatePresence mode="wait">
            {status.success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Merci pour votre avis !
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Votre commentaire a été soumis avec succès et sera visible sur la page du livre.
                </p>
                
                <div className="flex justify-center items-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#48A9FE] to-[#002144] p-8 md:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Partagez Votre Avis
                  </h1>
                  <p className="text-white/90 text-lg">
                    Votre opinion compte pour nous et aide d'autres lecteurs
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 md:p-12">
                  
                  {/* Error Message */}
                  <AnimatePresence>
                    {status.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-800 text-sm">{status.error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Name Field */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Votre Nom *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Jean Dupont"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48A9FE] focus:border-[#48A9FE] outline-none transition-all"
                      required
                      disabled={status.loading}
                    />
                  </div>

                  {/* Rating Field */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Votre Note *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => handleRatingClick(star)}
                          disabled={status.loading}
                          className="focus:outline-none disabled:cursor-not-allowed"
                        >
                          <Star
                            className={`w-10 h-10 transition-all ${
                              star <= (hoveredRating || formData.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-200'
                            }`}
                          />
                        </motion.button>
                      ))}
                      {formData.rating > 0 && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-3 text-lg font-semibold text-gray-700"
                        >
                          {formData.rating}/5
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Comment Field */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Votre Commentaire *
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Partagez votre expérience avec ce livre..."
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48A9FE] focus:border-[#48A9FE] outline-none transition-all resize-vertical"
                      required
                      disabled={status.loading}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Minimum 10 caractères
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: status.loading ? 1 : 1.02 }}
                    whileTap={{ scale: status.loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={status.loading}
                    className="w-full bg-gradient-to-r from-[#48A9FE] to-[#002144] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status.loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer mon avis</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  {/* Privacy Note */}
                  <p className="text-center text-sm text-gray-500 mt-6">
                    🔒 Votre avis sera publié publiquement sur la page du livre
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </>
  );
}
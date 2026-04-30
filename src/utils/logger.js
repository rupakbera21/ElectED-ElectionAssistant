import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const logError = async (error, context) => {
  console.error(`[${context}]:`, error);
  // Only log critical errors to Firestore to keep it professional
  if (error.message.includes('429') || error.message.includes('quota')) {
    try {
      await addDoc(collection(db, 'error_logs'), {
        message: error.message,
        context,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error('Failed to log error to Firestore:', e);
    }
  }
};

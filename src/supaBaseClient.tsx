/// <reference types="../vite-env.d.ts" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface AuthError {
  message: string; // Descriptive message about the error
  code?: string; // Optional error code, like "auth/invalid-email"
  status?: number; // Optional HTTP status code, like 401 for unauthorized
  details?: string; // Any additional details about the error (optional)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Error signing up:', error.message); // Log the error for debugging
    return { error }; // Return the error for further handling
  }

  return { user: data.user, session: data.session }; // Return user and session data if successful
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error('Error signing in:', error.message);
    return { error };
  }
  return { user: data.user, session: data.session };
};

export const signOut = async (): Promise<{ error?: AuthError } | null> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    return { error: { message: error.message, code: error.code } }; // Return an error object
  }

  return null; // Return null if there is no error
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null; // or handle the error as needed
  }
  return data.user; // Return the user object
};

/* eslint-disable prettier/prettier */
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';

import { useStorageState } from './useStorageState';

import { auth } from '@/firebaseConfig';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
    }>({
      signIn: () => null,
      signOut: () => null,
      session: null,
      isLoading: false,
    });

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const login = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user.user.uid;
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          const res = await login(email, password);
          if(res) {
            setSession(res);
            router.push('/play');
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

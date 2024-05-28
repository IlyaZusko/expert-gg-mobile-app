/* eslint-disable prettier/prettier */
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useStorageState } from './useStorageState';

import { auth, db } from '@/firebaseConfig';
import { Status } from '@/helpers/constants/Common';
import { IProfile } from '@/store/models/Profile';
import { setIsAuthError, setIsBlockedError, setIsNotVerifyError } from '@/store/service/userSlice';

interface FireBaseAuthUser {
  uid: string;
  isVerified: boolean;
}

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
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData: FireBaseAuthUser = {
        uid: user.user.uid,
        isVerified: user.user.emailVerified,
      };
      return userData;
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
            if(res.isVerified) {
              const docRef = doc(db, 'users', res.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const user = docSnap.data() as IProfile;
                if (user.status === Status.Active) {
                  setSession(res.uid);
                  router.push('/play');
                } else {
                  dispatch(setIsBlockedError(true));
                }
  
              } else {
                dispatch(setIsAuthError(true));
              }
            } else {
              dispatch(setIsNotVerifyError(true));
            }

          } else {
            dispatch(setIsAuthError(true));
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

import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useSession } from '@/context/ctx';
import { auth } from '@/firebaseConfig';

const LoginScreen = () => {
  const { signIn } = useSession();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        'ilyazusko.dev@gmail.com',
        'Gjgeufq',
      );
      console.log(user);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginScreen</Text>
      <TouchableOpacity onPress={() => signIn('aaaa', 'aaaa')}>
        <Text>log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => login()}>
        <Text>sign in firebase</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

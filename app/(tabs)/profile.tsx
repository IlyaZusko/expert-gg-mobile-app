import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useSession } from '@/context/ctx';

const ProfileScreen = () => {
  const { session, signOut } = useSession();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text>{session}</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

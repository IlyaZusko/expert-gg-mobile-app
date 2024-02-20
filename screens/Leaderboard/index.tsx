/* eslint-disable indent */
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';

import { LeaderboardItem } from '@/components';
import { db } from '@/firebaseConfig';
import {
  ACCENT_BLUE_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from '@/helpers/constants/Colors';
import { IProfile } from '@/store/models/Profile';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<IProfile[] | null>(null);

  const isActiveTab = (tab: number) => tab === 0;

  const getUsersData = async () => {
    const q = query(
      collection(db, 'users'),
      orderBy(isActiveTab(activeTab) ? 'count_wins' : 'total_earn', 'desc'),
    );
    onSnapshot(q, (querySnapshot) => {
      const profiles: IProfile[] = [];
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data() as IProfile);
      });
      setUsers(profiles);
    });
  };

  useEffect(() => {
    getUsersData();
  }, [activeTab]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.boardTypeButtonContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab(0)}
          style={[
            styles.tabButton,
            activeTab === 0
              ? {
                  borderBottomWidth: 1,
                  borderBottomColor: ACCENT_BLUE_COLOR,
                }
              : {},
          ]}
        >
          <Text style={styles.tabButtonTilte}>Победы</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={[
            styles.tabButton,
            activeTab === 1
              ? {
                  borderBottomWidth: 1,
                  borderBottomColor: ACCENT_BLUE_COLOR,
                }
              : {},
          ]}
        >
          <Text style={styles.tabButtonTilte}>Общий выигрыш</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.email)}
        renderItem={({ item, index }) =>
          users ? (
            <LeaderboardItem
              item={item}
              place={index + 1}
              isForWins={isActiveTab(activeTab)}
            />
          ) : (
            <UIActivityIndicator color={WHITE_COLOR} size={30} />
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListHeaderComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
    paddingTop: 16,
  },
  boardTypeButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  tabButtonTilte: {
    fontFamily: 'Mont_400',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});

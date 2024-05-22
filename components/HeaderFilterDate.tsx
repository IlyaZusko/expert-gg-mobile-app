import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ACCENT_BLUE_COLOR, WHITE_COLOR } from '@/helpers/constants/Colors';

interface IHeaderFilterDate {
  selectedFilter: number;
  setSelectedFilter: (idx: number) => void;
}

const HeaderFilterDate: React.FC<IHeaderFilterDate> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'play',
  });
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: selectedFilter === 1 ? ACCENT_BLUE_COLOR : '',
            borderTopLeftRadius: 10000,
            borderBottomLeftRadius: 10000,
          },
        ]}
        onPress={() => setSelectedFilter(1)}
      >
        <Text style={styles.filterButtonTitle}>{t('today')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderColor: ACCENT_BLUE_COLOR,
            backgroundColor: selectedFilter === 2 ? ACCENT_BLUE_COLOR : '',
          },
        ]}
        onPress={() => setSelectedFilter(2)}
      >
        <Text style={styles.filterButtonTitle}>{t('tommorow')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: selectedFilter === 3 ? ACCENT_BLUE_COLOR : '',
            borderTopRightRadius: 10000,
            borderBottomRightRadius: 10000,
          },
        ]}
        onPress={() => setSelectedFilter(3)}
      >
        <Text style={styles.filterButtonTitle}>{t('weak')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderFilterDate;

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    marginVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: ACCENT_BLUE_COLOR,
    borderRadius: 10000,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonTitle: {
    fontFamily: 'Mont_500',
    fontSize: 14,
    color: WHITE_COLOR,
  },
});

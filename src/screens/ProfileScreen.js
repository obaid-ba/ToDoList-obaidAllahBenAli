import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StatsBar from '../components/StatsBar';
import { colors } from '../theme';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Ionicons name="person-circle-outline" size={90} color={colors.primary} style={{ alignSelf: 'center' }} />
      <Text style={styles.name}>Mon profil</Text>
      <StatsBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  name: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 16 },
});

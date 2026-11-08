// Écran 1 — Accueil : présentation et statistiques
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatsBar from '../components/StatsBar';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.logo}>MyTasks</Text>
      <Text style={styles.subtitle}>Organisez vos tâches, atteignez vos objectifs !</Text>

      <StatsBar />

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Tâches')}
      >
        <Text style={styles.btnText}>Mes tâches</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.success }]}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={styles.btnText}>Ajouter une tâche</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, justifyContent: 'center' },
  logo: { fontSize: 34, fontWeight: '800', textAlign: 'center', color: colors.text },
  subtitle: { textAlign: 'center', color: colors.muted, marginTop: 6, marginBottom: 24 },
  btn: { borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

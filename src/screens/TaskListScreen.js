// Écran 2 — Liste des tâches : FlatList, recherche, filtres (Partie 2)
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import StatsBar from '../components/StatsBar';
import { colors } from '../theme';

const FILTERS = [
  { key: 'all', label: 'Toutes' },
  { key: 'a_faire', label: 'À faire' },
  { key: 'terminee', label: 'Terminées' },
];

export default function TaskListScreen({ navigation }) {
  const { tasks } = useTasks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (filter === 'all' || t.status === filter) &&
          t.title.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [tasks, search, filter]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.h1}>Mes tâches</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('TaskForm')}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <StatsBar />

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput
          placeholder="Rechercher une tâche..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={[styles.chip, filter === f.key && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === f.key && { color: '#fff' }]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            compact
            onPress={() => navigation.navigate('TaskDetails', { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune tâche trouvée.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text },
  addBtn: { backgroundColor: colors.primary, borderRadius: 8, padding: 4 },
  search: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECEFF4',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12,
  },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  chip: { flex: 1, paddingVertical: 8, borderRadius: 20, backgroundColor: '#ECEFF4', alignItems: 'center' },
  chipActive: { backgroundColor: colors.primary },
  chipText: { fontWeight: '600', color: colors.text },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 30 },
});

// Écran 3 — Détails d'une tâche : infos, modification, suppression, changement de statut
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TaskContext';
import Badge from '../components/Badge';
import { colors, PRIORITIES, STATUSES, formatDate } from '../theme';

export default function TaskDetailsScreen({ route, navigation }) {
  const { getTask, deleteTask, toggleStatus } = useTasks();
  const task = getTask(route.params.id);

  if (!task) return <Text style={{ padding: 20 }}>Tâche introuvable.</Text>;

  const p = PRIORITIES[task.priority];
  const s = STATUSES[task.status];

  const confirmDelete = () =>
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette tâche ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderLeftColor: p.color }]}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Badge label={p.label} color={p.color} bg={p.bg} />
          <TouchableOpacity onPress={() => toggleStatus(task.id)}>
            <Badge label={s.label} color={s.color} bg={s.bg} />
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>Touchez le statut pour le changer</Text>
      </View>

      <Text style={styles.desc}>{task.description || 'Aucune description.'}</Text>

      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={16} color={colors.muted} />
        <Text style={styles.date}>Date de création{'\n'}{formatDate(task.createdAt)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('TaskForm', { id: task.id })}
      >
        <Ionicons name="create-outline" size={18} color="#fff" />
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.danger }]} onPress={confirmDelete}>
        <Ionicons name="trash-outline" size={18} color="#fff" />
        <Text style={styles.btnText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  card: { borderLeftWidth: 4, paddingLeft: 12, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 10 },
  hint: { fontSize: 11, color: colors.muted, marginTop: 6 },
  desc: { color: colors.muted, fontSize: 15, marginBottom: 20 },
  dateRow: { flexDirection: 'row', gap: 8, marginBottom: 30 },
  date: { color: colors.muted },
  btn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    borderRadius: 10, paddingVertical: 14, marginBottom: 12,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

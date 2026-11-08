import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTasks } from '../context/TaskContext';

function Stat({ label, value, color, bg }) {
  return (
    <View style={[styles.box, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

export default function StatsBar() {
  const { stats } = useTasks();
  return (
    <View style={styles.row}>
      <Stat label="Total" value={stats.total} color="#1E6FE8" bg="#E3EEFD" />
      <Stat label="Terminées" value={stats.done} color="#2DA44E" bg="#E6F6EA" />
      <Stat label="À faire" value={stats.todo} color="#D98E00" bg="#FFF4D6" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  box: { flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  label: { fontSize: 13, fontWeight: '600' },
  value: { fontSize: 22, fontWeight: '800', marginTop: 4 },
});

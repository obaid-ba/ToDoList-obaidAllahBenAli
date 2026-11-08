// Partie 1 — Composant TaskCard avec Props et styles
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from './Badge';
import { colors, PRIORITIES, STATUSES, formatDate } from '../theme';

export default function TaskCard({ task, onPress, compact = false }) {
  const p = PRIORITIES[task.priority];
  const s = STATUSES[task.status];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, { borderLeftColor: p.color }]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>

        <View style={styles.row}>
          <Badge label={p.label} color={p.color} bg={p.bg} small={compact} />
          <Badge label={s.label} color={s.color} bg={s.bg} small={compact} />
        </View>

        {!compact && (
          <>
            {!!task.description && (
              <Text style={styles.desc} numberOfLines={2}>{task.description}</Text>
            )}
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={14} color={colors.muted} />
              <Text style={styles.date}>Créée le {formatDate(task.createdAt)}</Text>
            </View>
          </>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  desc: { color: colors.muted, marginTop: 10, fontSize: 14 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  date: { color: colors.muted, fontSize: 12 },
});

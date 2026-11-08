import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Badge({ label, color, bg, small }) {
  return (
    <Text style={[styles.badge, { color, backgroundColor: bg }, small && styles.small]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
  },
  small: { fontSize: 11, paddingHorizontal: 8, paddingVertical: 2 },
});

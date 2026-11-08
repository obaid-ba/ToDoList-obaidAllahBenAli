// Écran 4 — Formulaire réutilisé pour l'ajout ET la modification (Partie 3)
import React, { useLayoutEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTasks } from '../context/TaskContext';
import { colors, PRIORITIES, STATUSES } from '../theme';

export default function TaskFormScreen({ route, navigation }) {
  const { getTask, addTask, updateTask, deleteTask } = useTasks();
  const editId = route.params?.id;
  const existing = editId ? getTask(editId) : null;
  const isEdit = !!existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [priority, setPriority] = useState(existing?.priority ?? 'moyenne');
  const [status, setStatus] = useState(existing?.status ?? 'a_faire');
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? 'Modifier une tâche' : 'Ajouter une tâche' });
  }, [isEdit]);

  const handleSave = () => {
    // Validation
    if (title.trim().length < 3) {
      setError('Le titre est obligatoire (3 caractères minimum).');
      return;
    }
    const data = { title: title.trim(), description: description.trim(), priority, status };
    if (isEdit) updateTask(editId, data);
    else addTask(data);
    navigation.goBack();
  };

  const handleDelete = () =>
    Alert.alert('Supprimer', 'Supprimer cette tâche ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer', style: 'destructive',
        onPress: () => { deleteTask(editId); navigation.popToTop(); },
      },
    ]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Titre *</Text>
        <TextInput
          style={[styles.input, !!error && { borderColor: colors.danger }]}
          placeholder="Ex. Préparer la présentation"
          value={title}
          onChangeText={(v) => { setTitle(v); setError(''); }}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
          placeholder="Détails de la tâche..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Priorité</Text>
        <View style={styles.row}>
          {Object.entries(PRIORITIES).map(([key, p]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setPriority(key)}
              style={[
                styles.option,
                { backgroundColor: p.bg },
                priority === key && { borderColor: p.color, borderWidth: 2 },
              ]}
            >
              <Text style={{ color: p.color, fontWeight: '600' }}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isEdit && (
          <>
            <Text style={styles.label}>Statut</Text>
            <View style={styles.row}>
              {Object.entries(STATUSES).map(([key, s]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setStatus(key)}
                  style={[styles.option, status === key ? { backgroundColor: s.color } : { backgroundColor: s.bg }]}
                >
                  <Text style={{ color: status === key ? '#fff' : s.color, fontWeight: '600' }}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.btnText}>Enregistrer</Text>
        </TouchableOpacity>
        {isEdit && (
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.danger }]} onPress={handleDelete}>
            <Text style={styles.btnText}>Supprimer</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  label: { fontWeight: '700', color: colors.text, marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, fontSize: 15 },
  error: { color: colors.danger, marginTop: 4, fontSize: 13 },
  row: { flexDirection: 'row', gap: 10 },
  option: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  btn: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

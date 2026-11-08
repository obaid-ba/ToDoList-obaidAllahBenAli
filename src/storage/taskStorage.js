// Partie 5 — Persistance avec AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@mytasks/tasks';

export async function loadTasks() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : null; // null = premier lancement
  } catch (e) {
    console.warn('Erreur de lecture AsyncStorage', e);
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("Erreur d'écriture AsyncStorage", e);
  }
}

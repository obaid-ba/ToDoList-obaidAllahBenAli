// État global des tâches + opérations CRUD (Parties 2, 3 et 5)
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadTasks, saveTasks } from '../storage/taskStorage';

const TaskContext = createContext(null);

const SAMPLE_TASKS = [
  { id: '1', title: 'Préparer la présentation', description: 'Réaliser les diapositives pour la présentation du projet.', priority: 'elevee', status: 'a_faire', createdAt: new Date().toISOString() },
  { id: '2', title: 'Répondre aux emails', description: 'Traiter les emails en attente.', priority: 'moyenne', status: 'a_faire', createdAt: new Date().toISOString() },
  { id: '3', title: 'Lire la documentation', description: 'Lire la documentation de React Navigation.', priority: 'faible', status: 'terminee', createdAt: new Date().toISOString() },
  { id: '4', title: 'Développer la fonctionnalité', description: 'Implémenter le formulaire de tâche.', priority: 'elevee', status: 'a_faire', createdAt: new Date().toISOString() },
  { id: '5', title: 'Réviser le code', description: 'Relire les composants avant la remise.', priority: 'moyenne', status: 'terminee', createdAt: new Date().toISOString() },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement au démarrage
  useEffect(() => {
    (async () => {
      const stored = await loadTasks();
      setTasks(stored ?? SAMPLE_TASKS);
      // petit délai pour voir l'indicateur de chargement (optionnel)
      setTimeout(() => setLoading(false), 600);
    })();
  }, []);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    if (!loading) saveTasks(tasks);
  }, [tasks, loading]);

  const addTask = (data) => {
    const task = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (id, data) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleStatus = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'terminee' ? 'a_faire' : 'terminee' } : t
      )
    );

  const getTask = (id) => tasks.find((t) => t.id === id);

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === 'terminee').length,
    todo: tasks.filter((t) => t.status === 'a_faire').length,
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, stats, addTask, updateTask, deleteTask, toggleStatus, getTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);

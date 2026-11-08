// Partie 4 — Navigation : Stack (Détails, Formulaire) + Bottom Tabs
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { TaskProvider, useTasks } from './src/context/TaskContext';
import HomeScreen from './src/screens/HomeScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = { Accueil: 'home', Tâches: 'clipboard', Ajouter: 'add-circle-outline', Profil: 'person-outline' };

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Tâches" component={TaskListScreen} />
      {/* L'onglet "Ajouter" ouvre le formulaire dans la pile au lieu d'un écran d'onglet */}
      <Tab.Screen
        name="Ajouter"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('TaskForm');
          },
        })}
      />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function Root() {
  const { loading } = useTasks();

  // Partie 5 — indicateur de chargement pendant la lecture AsyncStorage
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 12, color: colors.muted }}>Chargement de vos tâches...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: "Détails d'une tâche" }} />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Ajouter une tâche' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <Root />
      </TaskProvider>
    </SafeAreaProvider>
  );
}

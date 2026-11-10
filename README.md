# MyTasks — To-Do List (V1)

> A clean, mobile-first task manager built with **React Native** and **Expo**. Tasks are stored on the device, so the app works without any server or account.

![Expo](https://img.shields.io/badge/Expo-SDK%2058-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB?logo=react&logoColor=black)
![Storage](https://img.shields.io/badge/Storage-AsyncStorage-4B32C3)
![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20Web-informational)

This is the **first version** of the project. It is followed by:

| Version | Repository | Storage |
| --- | --- | --- |
| **V1 (this repo)** | [ToDoList-obaidAllahBenAli](https://github.com/obaid-ba/ToDoList-obaidAllahBenAli) | On the device (AsyncStorage) |
| V2 | [TP-ListeTaches-V2](https://github.com/obaid-ba/TP-ListeTaches-V2) | In the cloud (Supabase) |
| V3 | [TP-ListeTaches-V3](https://github.com/obaid-ba/TP-ListeTaches-V3) | Offline-first: SQLite on the device, synced with Supabase |

---

## Features

- **Full task management:** create, edit, delete and view tasks. A confirmation dialog appears before any deletion.
- **Rich tasks:** each task has a title, a description, a priority (Low / Medium / High) and a status (To do / Done).
- **One-tap status toggle:** mark a task as done, or back to "to do".
- **Search:** find tasks by title as you type.
- **Filters:** show All, To do or Done tasks.
- **Live statistics:** total tasks, completed tasks and remaining tasks.
- **Automatic saving:** every change is saved to the device right away and is still there after the app restarts.
- **Sample data:** on the first launch, the app loads a few example tasks so it is never empty.
- **Colour-coded badges:** priority and status are easy to read at a glance.

## Screens

| Screen | Description |
| --- | --- |
| **Home** | Welcome screen with statistics and shortcuts to the task list and the form |
| **Tasks** | Searchable, filterable list of all tasks |
| **Add** | Central tab button that opens the task form |
| **Task details** | Full task view with edit, status toggle and delete actions |
| **Task form** | Create or edit a task (title, description, priority, status) |
| **Profile** | User profile and task summary |

Navigation uses a **bottom tab bar** inside a **native stack**, built with React Navigation 7.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Expo](https://expo.dev) SDK 58, React Native 0.88, React 19 |
| Navigation | React Navigation 7 (bottom tabs + native stack) |
| State | React Context (`TaskContext`) |
| Persistence | `@react-native-async-storage/async-storage` |
| Icons | `@expo/vector-icons` (Ionicons) |

## Project structure

```
.
├── App.js                     # Navigation (tabs + stack) and providers
├── index.js                   # Entry point
├── app.json                   # Expo configuration
└── src/
    ├── components/
    │   ├── Badge.js           # Priority / status badge
    │   ├── StatsBar.js        # Total / done / to-do counters
    │   └── TaskCard.js        # Task item in the list
    ├── context/
    │   └── TaskContext.js     # Global task state + CRUD operations
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── TaskListScreen.js
    │   ├── TaskDetailsScreen.js
    │   ├── TaskFormScreen.js
    │   └── ProfileScreen.js
    ├── storage/
    │   └── taskStorage.js     # Load / save tasks with AsyncStorage
    └── theme.js               # Colours, spacing, priorities, statuses
```

## Data model

```js
{
  id: "1731234567890",          // generated with Date.now()
  title: "Prepare the presentation",
  description: "Create the slides for the project demo.",
  priority: "elevee",           // "faible" | "moyenne" | "elevee"
  status: "a_faire",            // "a_faire" | "terminee"
  createdAt: "2026-11-10T09:00:00.000Z"
}
```

All tasks are saved as one JSON array under the key `@mytasks/tasks`.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- The **Expo Go** app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)), or an Android / iOS emulator

### Installation

```bash
git clone https://github.com/obaid-ba/ToDoList-obaidAllahBenAli.git
cd ToDoList-obaidAllahBenAli
npm install
npm start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

### Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` | Open on an Android device or emulator |
| `npm run ios` | Open on an iOS simulator |
| `npm run web` | Run in the browser |

## Author

**Obaid Allah Ben Ali** — [@obaid-ba](https://github.com/obaid-ba)

## License

Released under the MIT License. See [LICENSE](LICENSE).

import { openDB } from "idb";

const DB_NAME = "taskflow-db";
const DB_VERSION = 1;

// Cache the DB connection
let dbPromise = null;

export const initDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("tasks")) {
          const taskStore = db.createObjectStore("tasks", { keyPath: "id" });
          taskStore.createIndex("category", "category", { unique: false });
          taskStore.createIndex("priority", "priority", { unique: false });
          taskStore.createIndex("completed", "completed", { unique: false });
        }
        if (!db.objectStoreNames.contains("categories")) {
          db.createObjectStore("categories", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
};

// ─── TASKS ───────────────────────────────────────────

export const getAllTasks = async () => {
  const db = await initDB();
  return db.getAll("tasks");
};

export const addTask = async (task) => {
  const db = await initDB();
  return db.put("tasks", task);
};

export const updateTask = async (task) => {
  const db = await initDB();
  return db.put("tasks", task);
};

export const deleteTask = async (id) => {
  const db = await initDB();
  return db.delete("tasks", id);
};

// ─── CATEGORIES ──────────────────────────────────────

export const getAllCategories = async () => {
  const db = await initDB();
  return db.getAll("categories");
};

export const addCategory = async (category) => {
  const db = await initDB();
  return db.put("categories", category);
};

export const deleteCategory = async (id) => {
  const db = await initDB();
  return db.delete("categories", id);
};

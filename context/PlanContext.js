"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

const PlanContext = createContext();

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
  listeners.forEach((callback) => callback());
}

function useStoredList(key) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) || "[]",
    () => "[]"
  );
  return useMemo(() => JSON.parse(raw), [raw]);
}

export function PlanProvider({ children }) {
  const plan = useStoredList("fitlog-plan");
  const saved = useStoredList("fitlog-saved");

  const setPlan = (list) => writeList("fitlog-plan", list);
  const setSaved = (list) => writeList("fitlog-saved", list);

  function addToPlan(workout) {
    const alreadyIn = plan.find((item) => item.id === workout.id);
    if (alreadyIn) return false;
    setPlan([...plan, { ...workout, done: false }]);
    return true;
  }

  function saveForLater(workout) {
    const alreadyIn = saved.find((item) => item.id === workout.id);
    if (alreadyIn) return false;
    setSaved([...saved, workout]);
    return true;
  }

  function removeFromPlan(id) {
    setPlan(plan.filter((item) => item.id !== id));
  }

  function removeFromSaved(id) {
    setSaved(saved.filter((item) => item.id !== id));
  }

  function markAsDone(id) {
    setPlan(plan.map((item) => (item.id === id ? { ...item, done: true } : item)));
  }

  return (
    <PlanContext.Provider
      value={{ plan, saved, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markAsDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}

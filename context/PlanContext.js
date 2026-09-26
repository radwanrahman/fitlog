"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedSaved = localStorage.getItem("fitlog-saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedSaved) setSaved(JSON.parse(savedSaved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

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

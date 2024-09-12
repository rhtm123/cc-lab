import { writable } from 'svelte/store';

export const alerts = writable([]);

// Function to add an alert
export const addAlert = (message, type = 'info', duration = 3000) => {
  console.log("Add alert is called")
  const id = Date.now();
  alerts.update((allAlerts) => [...allAlerts, { id, message, type, duration }]);

  setTimeout(() => {
    alerts.update((allAlerts) => allAlerts.filter((alert) => alert.id !== id));
  }, duration);
};

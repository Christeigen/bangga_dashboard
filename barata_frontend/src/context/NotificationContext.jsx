import { createContext } from 'react';

export const NotificationContext = createContext({
  notif: [],
  updateNotif: () => {},
});


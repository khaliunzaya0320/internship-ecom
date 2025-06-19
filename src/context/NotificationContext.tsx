'use client'; 

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react';

export type NotificationItem = {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    date: string; 
    read: boolean;
};

interface NotificationContextType {
    notifications: NotificationItem[];
    addNotification: (message: string, type?: NotificationItem['type']) => void;
    markAsRead: (id: string) => void;
    clearNotifications: () => void;
    unreadNotificationsCount: number; 
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const addNotification = useCallback((message: string, type: NotificationItem['type'] = 'info') => {
        const newNotification: NotificationItem = {
            id: Math.random().toString(36).substr(2, 9), 
            message,
            type,
            date: new Date().toLocaleString(), 
            read: false,
        };
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    }, []);

    const markAsRead = useCallback((id: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const unreadNotificationsCount = notifications.filter(notif => !notif.read).length;

    const contextValue = {
        notifications,
        addNotification,
        markAsRead,
        clearNotifications,
        unreadNotificationsCount,
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
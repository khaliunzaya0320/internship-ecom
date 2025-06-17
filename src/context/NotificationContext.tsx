'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type NotificationItem = {
    id: string; 
    message: string;
    date: string;
    type: 'success' | 'error' | 'info' | 'warning';
    read: boolean; 
};

type NotificationContextType = {
    notifications: NotificationItem[];
    addNotification: (message: string, type: NotificationItem['type']) => void;
    markAsRead: (id: string) => void;
    clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    useEffect(() => {
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (message: string, type: NotificationItem['type'] = 'info') => {
        const newNotification: NotificationItem = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9), 
            message,
            date: new Date().toLocaleString(),
            type,
            read: false,
        };
        setNotifications((prev) => [newNotification, ...prev]); 
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
        localStorage.removeItem('notifications');
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, markAsRead, clearNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
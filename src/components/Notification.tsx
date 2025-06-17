'use client';
import { useState } from 'react';
import { useNotification, NotificationItem } from '@/context/NotificationContext';
import { Bell, XCircle, CheckCircle, Info, AlertTriangle, Trash2 } from 'lucide-react'; 

export default function Notification() {
    const { notifications, markAsRead, clearNotifications } = useNotification();
    const [filterRead, setFilterRead] = useState(false); 

    const filteredNotifications = filterRead
        ? notifications.filter(notif => notif.read)
        : notifications.filter(notif => !notif.read); 

    const getIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            default:
                return <Bell className="w-5 h-5 text-gray-500" />;
        }
    };

    const getBorderColor = (type: NotificationItem['type']) => {
        switch (type) {
            case 'success': return 'border-green-300';
            case 'error': return 'border-red-300';
            case 'info': return 'border-blue-300';
            case 'warning': return 'border-yellow-300';
            default: return 'border-gray-200';
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Мэдэгдлүүд</h1>

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterRead(false)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            !filterRead ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Шинэ ({notifications.filter(notif => !notif.read).length})
                    </button>
                    <button
                        onClick={() => setFilterRead(true)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            filterRead ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Уншсан ({notifications.filter(notif => notif.read).length})
                    </button>
                </div>
                <button
                    onClick={clearNotifications}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                >
                    <Trash2 size={16} /> Бүгдийг устгах
                </button>
            </div>

            {filteredNotifications.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">
                    {filterRead ? 'Уншсан мэдэгдэл байхгүй байна.' : 'Шинэ мэдэгдэл байхгүй байна.'}
                </p>
            ) : (
                <div className="space-y-4">
                    {filteredNotifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`flex items-start gap-3 p-4 border-l-4 rounded-lg shadow-sm bg-white ${getBorderColor(notif.type)}`}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium ${notif.read ? 'text-gray-500' : 'text-gray-800'}`}>
                                    {notif.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
                            </div>
                            {!notif.read && (
                                <button
                                    onClick={() => markAsRead(notif.id)}
                                    className="flex-shrink-0 px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                                >
                                    Уншсан
                                </button>
                            )}
                             {notif.read && (
                                <button
                                    onClick={() => markAsRead(notif.id)}
                                    className="flex-shrink-0 px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-md cursor-default"
                                    disabled
                                >
                                    Уншсан
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

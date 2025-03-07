
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
  link?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Load notifications from localStorage
  useEffect(() => {
    if (!user) return;

    const storedNotifications = localStorage.getItem(`notifications_${user.id}`);
    if (storedNotifications) {
      const parsed = JSON.parse(storedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: Notification) => !n.isRead).length);
    } else {
      // Create some demo notifications
      const demoNotifications: Notification[] = [
        {
          id: 'n1',
          userId: user.id,
          title: 'Welcome!',
          message: 'Welcome to Wedding Vendor Liaison. Start planning your perfect day!',
          type: 'info',
          isRead: false,
          timestamp: new Date().toISOString(),
          link: '/user'
        },
        {
          id: 'n2',
          userId: user.id,
          title: 'Booking Confirmed',
          message: 'Your booking with Elegant Moments Photography has been confirmed.',
          type: 'success',
          isRead: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          link: '/user/bookings'
        }
      ];
      
      setNotifications(demoNotifications);
      setUnreadCount(demoNotifications.length);
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(demoNotifications));
    }
  }, [user]);

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.isRead).length);
    
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
    }
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    setUnreadCount(0);
    
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                className="text-xs h-auto py-1"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <a
                      key={notification.id}
                      href={notification.link || '#'}
                      className={`block border-b last:border-0 p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-gray-50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${!notification.isRead ? 'bg-blue-500' : 'bg-gray-300'}`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">
                              {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <Badge 
                            variant="outline" 
                            className={`mt-2 ${getTypeStyles(notification.type)}`}
                          >
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;

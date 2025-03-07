
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface VendorMessagingProps {
  vendorId: string;
  vendorName: string;
}

const VendorMessaging: React.FC<VendorMessagingProps> = ({ vendorId, vendorName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock loading messages from storage
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${user?.id}_${vendorId}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [user?.id, vendorId, isOpen]);

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      receiverId: vendorId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    
    // Save to localStorage
    localStorage.setItem(`messages_${user?.id}_${vendorId}`, JSON.stringify(updatedMessages));
    
    // Add mock vendor response after a delay
    setTimeout(() => {
      const vendorResponse: Message = {
        id: `msg_${Date.now() + 1}`,
        senderId: vendorId,
        senderName: vendorName,
        receiverId: user.id,
        content: "Thank you for your message! I'll get back to you as soon as possible.",
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      
      const withResponse = [...updatedMessages, vendorResponse];
      setMessages(withResponse);
      localStorage.setItem(`messages_${user?.id}_${vendorId}`, JSON.stringify(withResponse));
    }, 2000);
    
    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the vendor.",
    });
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Message {vendorName}</DialogTitle>
          <DialogDescription>
            Send a message to discuss your booking or ask questions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-[300px]">
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.senderId === user?.id 
                        ? 'bg-wedding-navy text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">{msg.senderName}</div>
                    <p>{msg.content}</p>
                    <div className="text-xs mt-1 text-right">
                      {formatMessageTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Textarea 
                placeholder="Type your message..." 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button 
                type="submit" 
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="bg-wedding-gold"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorMessaging;

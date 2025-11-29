
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User, Loader2, Bell } from 'lucide-react';
import { getAssistantResponse } from '@/app/chatbot/actions';
import { AnimatePresence, motion } from 'framer-motion';
import type { Message } from '@/ai/flows/site-assistant-flow-types';
import { cn } from '@/lib/utils';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm the DentiSystems AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  };

  const showNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted') {
      new Notification(title, { body });
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAssistantResponse({ history: [...messages, userMessage] });
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      showNotification('DentiSystems AI Assistant', response);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="origin-bottom-right"
            >
              <Card className="w-80 md:w-96 h-[32rem] flex flex-col shadow-2xl shadow-primary/20 bg-card/80 backdrop-blur-lg border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-to-br from-card to-card/60">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bot className="h-6 w-6 text-primary" />
                         <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
                    </div>
                    <div>
                      <h3 className="font-headline font-semibold">AI Assistant</h3>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                  {notificationPermission === 'default' && (
                    <div className="bg-secondary/50 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground mb-2">Enable notifications to get messages when you switch tabs.</p>
                        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={requestNotificationPermission}>
                            <Bell className="h-3 w-3 mr-2" /> Enable Notifications
                        </Button>
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : '')}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn('p-3 rounded-xl max-w-[80%] text-sm',
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        )}
                      >
                        <p>{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3"
                    >
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div className="p-3 rounded-xl bg-secondary flex items-center space-x-2">
                           <span className="h-2 w-2 bg-primary rounded-full animate-pulse-fast"></span>
                           <span className="h-2 w-2 bg-primary rounded-full animate-pulse-fast animation-delay-200"></span>
                           <span className="h-2 w-2 bg-primary rounded-full animate-pulse-fast animation-delay-400"></span>
                        </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>
                <div className="p-4 border-t border-border/50">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      {isLoading ? <Loader2 className="animate-spin"/> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        >
            <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg animate-pulse-slow"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Chatbot"
            >
            <AnimatePresence>
                {isOpen ? (
                <motion.div key="close" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}><X /></motion.div>
                ) : (
                <motion.div key="open" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}><MessageSquare /></motion.div>
                )}
            </AnimatePresence>
            </Button>
        </motion.div>
      </div>
    </>
  );
}

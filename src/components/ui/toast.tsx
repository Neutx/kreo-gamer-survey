"use client";

import React, { createContext, useContext, useState } from "react";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  duration?: number; // milliseconds
}

interface ToastContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, duration = 3000 }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, duration };
    
    setToasts((prev) => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const context = useContext(ToastContext);
  
  if (!context) return null;
  
  const { toasts, dismiss } = context;
  
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{toast.title}</h3>
              {toast.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="ml-4 inline-flex text-gray-400 focus:outline-none focus:text-gray-500 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}

// Export for easier imports
export function useToastShow() {
  try {
    const context = useToast();
    return (options: Omit<Toast, "id">) => {
      context.toast(options);
    };
  } catch {
    return (options: Omit<Toast, "id">) => {
      console.error("Toast could not be displayed. Make sure ToastProvider is in your component tree.");
      return options;
    };
  }
} 
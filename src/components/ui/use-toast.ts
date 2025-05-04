// Re-export the useToast function from toast.tsx
import { useToast as useToastOriginal, useToastShow, Toast, ToastProvider } from './toast';

// Export the toast function and the context for compatibility
export const useToast = () => {
  const context = useToastOriginal();
  return {
    ...context,
    // Provide a compatible interface for Shadcn UI toast
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
      duration?: number;
    }) => {
      context.toast({
        title: props.title || "",
        description: props.description,
        duration: props.duration || 5000,
      });
    }
  };
};

// For direct import
export { Toast, ToastProvider }; 
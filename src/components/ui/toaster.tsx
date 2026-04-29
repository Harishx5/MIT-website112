<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
=======
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
<<<<<<< HEAD
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
=======
              {description && <ToastDescription>{description}</ToastDescription>}
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1
            </div>
            {action}
            <ToastClose />
          </Toast>
<<<<<<< HEAD
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
=======
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
>>>>>>> 4eca0755c64cb5f35907e8694bd9712fb0ac5ac1
}

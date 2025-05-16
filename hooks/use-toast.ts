"use client";

import { useState } from "react";
import { toast as sonnerToast } from "sonner";
export type ToastVariant = "default" | "destructive" | null | undefined;
interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "info" | "warning";
}

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      title?: string;
      description?: string;
      variant?: ToastVariant;
    }>
  >([]);

  const toast = ({
    title,
    description,
    variant: inputVariant,
  }: {
    title?: string;
    description?: string;
    variant?:
      | "success"
      | "error"
      | "info"
      | "warning"
      | "default"
      | "destructive"
      | null
      | undefined;
  }) => {
    // Ánh xạ variant
    const mappedVariant: ToastVariant =
      inputVariant === "success" ||
      inputVariant === "info" ||
      inputVariant === "warning"
        ? "default"
        : inputVariant === "error"
        ? "destructive"
        : inputVariant;
    const id = Math.random().toString();
    setToasts((currentToasts) => [
      ...currentToasts,
      { id, title, description, variant: mappedVariant },
    ]);
  };

  return { toast, toasts };
}

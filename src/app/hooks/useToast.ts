import { createSnackbar, SnackOptions } from "@snackbar/core";
import "@snackbar/core/dist/snackbar.css";

export const useToast = (
  text: string,
  { theme, position, timeout }: SnackOptions
) => {
  createSnackbar(text, {
    theme: theme,
    position: position,
    timeout: timeout,
  });
};

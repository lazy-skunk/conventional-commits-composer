import { useId, useState } from "react";

export function useFieldError(message: string | undefined, showWhileTyping = false) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const error = touched || showWhileTyping ? message : undefined;

  return {
    error,
    errorId: id,
    inputProps: {
      onBlur: () => setTouched(true),
      "aria-invalid": !!error,
      "aria-describedby": error ? id : undefined,
    },
  };
}

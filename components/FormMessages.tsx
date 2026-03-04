// Shared success/error message components used by all 3 contact forms.
// Centralises styling and copy — update once, applies everywhere.

interface FormSuccessProps {
  message: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  return (
    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
      {message}
    </div>
  );
}

export function FormError() {
  return (
    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
      Something went wrong. Please try again or email us directly at{" "}
      <a
        href="mailto:admin@remoteacktive.com"
        className="underline hover:text-red-300 transition-colors"
      >
        admin@remoteacktive.com
      </a>
    </div>
  );
}

import { Loader2 } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-4">
      <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
    </div>
  );
}

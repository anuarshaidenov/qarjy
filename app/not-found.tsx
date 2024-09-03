import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

export default function NotFound() {
  return (
    <main className="min-h-screen text-center">
      <div className="h-full flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl font-bold font-mono">404 Not Found</h2>
        <p>Could not find requested resource</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}

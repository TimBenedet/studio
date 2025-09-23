import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function ArchivePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl text-center shadow-lg border-2 border-border/50">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">
            Access Granted
          </CardTitle>
          <CardDescription className="font-body">
            Welcome to the archives of Professor L. Haviland.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            The contents of this archive are confidential. Please proceed with
            discretion.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="font-headline">
            <Link href="/">Return to Gate</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

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
    <main className="flex min-h-screen flex-col items-center justify-start p-8 pt-16">
      <div className="w-full max-w-xl flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline text-primary mb-2 whitespace-nowrap">
            Archive du Professeur L. Haviland
          </h1>
          <div className="w-full h-px bg-border my-8" />
        </div>
      </div>
    </main>
  );
}

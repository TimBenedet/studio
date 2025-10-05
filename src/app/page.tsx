import { AccessForm } from "@/app/components/access-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 p-8">
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline text-primary whitespace-nowrap">
          Archive du Professeur L. Haviland
        </h1>
        <AccessForm />
      </div>
      <footer className="w-full text-center absolute bottom-8">
        <p className="text-xs text-foreground/30 font-body">
          &copy; Its just a game
        </p>
      </footer>
    </main>
  );
}

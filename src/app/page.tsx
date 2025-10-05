import { AccessForm } from "@/app/components/access-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="w-full flex-1 grid grid-rows-2 items-center justify-center">
        <div className="flex items-end justify-center">
           <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-headline text-primary whitespace-nowrap">
              Archive du Professeur L. Haviland
            </h1>
        </div>
        <div className="flex items-start justify-center w-full">
          <AccessForm />
        </div>
      </div>
      <footer className="w-full text-center">
        <p className="text-xs text-foreground/30 font-body">
          &copy; Its just a game
        </p>
      </footer>
    </main>
  );
}

import { AccessForm } from "@/app/components/access-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full flex-1 flex items-center justify-center">
        <AccessForm />
      </div>
      <footer className="w-full text-center">
        <p className="text-xs text-foreground/30 font-body">
          &copy; Its just a game
        </p>
      </footer>
    </main>
  );
}

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-neutral-900">Pagina niet gevonden</h2>
      <p className="mb-6 max-w-md text-neutral-600">
        De pagina die u zoekt bestaat niet of is verplaatst.
      </p>
      <Button href="/" variant="primary">
        Terug naar home
      </Button>
    </div>
  );
}

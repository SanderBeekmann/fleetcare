import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-brand md:text-4xl lg:text-5xl">
        Pagina niet gevonden
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-600">
        De pagina die u zoekt bestaat niet of is verplaatst.
      </p>
      <div className="mt-10">
        <Button href="/" variant="primary">
          Terug naar home
        </Button>
      </div>
    </div>
  );
}

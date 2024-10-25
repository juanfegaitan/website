import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card/card";
import { resolveHref } from "@/sanity/lib/utils";
import { loadResource, loadResourcePage } from "@/sanity/loader/loadQuery";
import { ArrowRight, CheckCircle, FileDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type ThankYouPageProps = {
  searchParams: { resourceSlug: string };
};

export default async function ThankYouPage(props: ThankYouPageProps) {
  const { data } = await loadResourcePage();

  if (!props.searchParams.resourceSlug) {
    notFound();
  }

  const { data: resource } = await loadResource(
    props.searchParams.resourceSlug!,
  );

  if (!resource) {
    notFound();
  }

  const href = resolveHref(resource._type, resource.slug)?.replace(
    "/resources",
    `/${data?.slug ?? "resources"}`,
  );

  if (!href) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-primary animate-bounce" />
            <h1 className="text-3xl font-bold tracking-tighter">Gracias</h1>
            <p className="text-muted-foreground">
              Tu recurso se ha descargado correctamente.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <Button variant="link" className="w-full justify-start" asChild>
              <Link href={href}>
                <FileDown className="mr-2 h-4 w-4" />
                Descargar de nuevo
              </Link>
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">¿Qué sigue?</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                <span>Explora nuestros otros recursos</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                <span>Explora nuestras propiedades</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                <span>Suscríbete a nuestro boletín</span>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Button className="w-full" asChild>
              <Link href="/">Volver a la Página Principal</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { downloadResource } from "@/actions/download-resource";
import { DownloadResourceFormSchema } from "@/schema/download-resource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../button";
import { Input } from "../input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { CountrySelect, FlagComponent, PhoneInput } from "../ui/phone-input";

type DownloadResourceForm = {
  resourceSlug: string;
};

function getBrowserCountryCode() {
  if (typeof navigator === "undefined") return "MX";

  // Get browser language
  // @ts-ignore
  const language = navigator.language || navigator.userLanguage;

  // Extract the country code (last 2 characters if language-COUNTRY format)
  const countryCode = language.includes("-")
    ? language.split("-")[1].toUpperCase()
    : language.slice(-2).toUpperCase();

  return countryCode || "MX";
}

export function DownloadForm(props: DownloadResourceForm) {
  const form = useForm<z.infer<typeof DownloadResourceFormSchema>>({
    resolver: zodResolver(DownloadResourceFormSchema),
    defaultValues: {
      email: "",
      name: "",
      resourceSlug: props.resourceSlug,
    },
  });

  const { execute, status } = useAction(downloadResource, {
    onSuccess: ({ data }) => {
      const a = document.createElement("a");

      if (!data?.url) return;

      a.href = data?.url;
      a.download = data?.url;
      a.click();

      router.push("/gracias?resourceSlug=" + props.resourceSlug);
      form.reset();
    },
    onError: () => {
      toast.error("Hubo un error, por favor intenta de nuevo.");
    },
  });

  function onSubmit(values: z.infer<typeof DownloadResourceFormSchema>) {
    execute(values);
  }

  const isLoading = status === "executing" || form.formState.isSubmitting;

  const router = useRouter();

  const country = getBrowserCountryCode();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full text-left"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  className="h-14"
                  placeholder="Escribe tu correo"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-14"
                  placeholder="Escribe tu nombre"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RPNInput.default
                  className="flex rounded-lg shadow-sm shadow-black/5 h-14"
                  international
                  flagComponent={FlagComponent}
                  countrySelectComponent={CountrySelect}
                  inputComponent={PhoneInput}
                  numberInputProps={{
                    className: "h-14",
                  }}
                  defaultCountry={country}
                  placeholder="Escribe tu teléfono"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-4 ml-auto"
          size="lg"
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { registerBasicForm } from "@/actions/basic-form";
import { BasicFormSchema } from "@/schema/basic-form";
import { useModal } from "@/store/modal";
import { ModalTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../button";
import { Input } from "../input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CountrySelect, FlagComponent, PhoneInput } from "../ui/phone-input";

function getBrowserCountryCode() {
  // Get browser language
  const language = navigator.language || navigator.userLanguage;

  // Extract the country code (last 2 characters if language-COUNTRY format)
  const countryCode = language.includes("-")
    ? language.split("-")[1].toUpperCase()
    : language.slice(-2).toUpperCase();

  return countryCode || "MX";
}

export function BasicForm() {
  const isOpen = useModal((state) => state.modal === "basic");

  const _onOpenChange = useModal((state) => state.onOpenChange);

  const form = useForm<z.infer<typeof BasicFormSchema>>({
    resolver: zodResolver(BasicFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { execute, status } = useAction(registerBasicForm, {
    onSuccess: () => {
      toast.success("Gracias por tu interés, te contactaremos pronto.");
      form.reset();
      _onOpenChange(false, ModalTypes.BASIC);
    },
    onError: () => {
      toast.error("Hubo un error, por favor intenta de nuevo.");
    },
  });

  function onSubmit(values: z.infer<typeof BasicFormSchema>) {
    execute(values);
  }

  const onOpenChange = (open: boolean) => {
    _onOpenChange(open, ModalTypes.BASIC);
  };

  const isLoading = status === "executing" || form.formState.isSubmitting;

  // get the country code of the browser
  const country = getBrowserCountryCode();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quieres recibir más información?</DialogTitle>
          <DialogDescription>
            Déjanos tu correo y te enviaremos más información
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Escribe tu nombre" {...field} />
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
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <RPNInput.default
                      className="flex rounded-lg shadow-sm shadow-black/5"
                      international
                      flagComponent={FlagComponent}
                      countrySelectComponent={CountrySelect}
                      inputComponent={PhoneInput}
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
      </DialogContent>
    </Dialog>
  );
}

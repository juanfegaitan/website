"use client";

import { registerBasicForm } from "@/actions/basic-form";
import { BasicFormSchema } from "@/schema/basic-form";
import { useModal, useModalURLSync } from "@/store/modal";
import { ModalTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
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

export function BasicForm() {
  const isOpen = useModal((state) => state.modal === "basic");

  const _onOpenChange = useModal((state) => state.onOpenChange);

  useModalURLSync();

  const { execute, status } = useAction(registerBasicForm, {
    onSuccess: () => {
      toast.success("Gracias por tu interés, te contactaremos pronto.");
      _onOpenChange(false, ModalTypes.BASIC);
    },
    onError: () => {
      toast.error("Hubo un error, por favor intenta de nuevo.");
    },
  });

  const form = useForm<z.infer<typeof BasicFormSchema>>({
    resolver: zodResolver(BasicFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof BasicFormSchema>) {
    execute(values);
  }

  const onOpenChange = (open: boolean) => {
    _onOpenChange(open, ModalTypes.BASIC);
  };

  const isLoading = status === "executing" || form.formState.isSubmitting;

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
"use client";
import { createNewsletter } from "@/actions/create-newsletter";
import { cn } from "@/lib/cn";
import { NewsletterSection } from "@/types";
import { useFormState } from "react-dom";
import { Input } from "../input";
import { CustomPortableText } from "../shared/CustomPortableText";
import { SubmitNewsLetter } from "./submit";

type Props = {
  data?: NewsletterSection | null;
};

export function NewsletterSectionLayout({ data }: Props) {
  const [state, action] = useFormState(createNewsletter, {
    success: false,
    error: null,
  });

  if (!data) return null;

  return (
    <section className="bg-gray-50 py-12 w-full full-width">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {data.title}{" "}
      </div>

      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}

      <div className="main_container">
        <div className="h-px w-full bg-gray-300 my-10"></div>

        <form action={action}>
          <div
            className={cn("text-center mb-8", {
              hidden: !state.success && !state.error,
            })}
          >
            {data.successMessage ? (
              <CustomPortableText value={data.successMessage as any} />
            ) : (
              <div className="text-xl text-primary font-medium">
                ¡Gracias por suscribirte!
              </div>
            )}
          </div>

          <div className={cn("flex flex-col md:flex-row gap-4")}>
            <Input
              type="text"
              placeholder={data.placeholderName ?? "Escribe tu nombre"}
              name="name"
              className="h-16 md:flex-1"
              required
              maxLength={250}
            />
            <Input
              type="email"
              placeholder={data.placeholderEmail ?? "Escribe tu email"}
              name="email"
              className="h-16 md:flex-1"
              required
              maxLength={250}
            />
            <SubmitNewsLetter data={{ submitText: data.submitText }} />
          </div>
        </form>
      </div>
    </section>
  );
}

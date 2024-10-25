"use client";

import { downloadResource } from "@/actions/download-resource";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Input } from "../input";
import { DownloadSubmit } from "./download-submit";

type DownloadResourceForm = {
  resourceSlug: string;
};

export function DownloadForm(props: DownloadResourceForm) {
  const [state, action] = useFormState(downloadResource, {
    success: false,
    error: null,
    url: undefined,
  });

  const router = useRouter();

  useEffect(() => {
    console.log("state", state);
    if (!state.url) return;

    const a = document.createElement("a");
    a.href = state.url;
    a.download = state.url;
    a.click();

    console.log("downloaded", state.url);

    router.push("/gracias?resourceSlug=" + props.resourceSlug);
    return () => {
      a.remove();
    };
  }, [state]);

  return (
    <form className="flex flex-col gap-4 w-full" action={action}>
      <Input
        placeholder="Nombre comleto*"
        required
        className="h-14"
        name="name"
      />
      <Input
        placeholder="Email*"
        required
        type="email"
        className="h-14"
        name="email"
      />
      <Input name="resourceSlug" type="hidden" value={props.resourceSlug} />
      <DownloadSubmit />
    </form>
  );
}

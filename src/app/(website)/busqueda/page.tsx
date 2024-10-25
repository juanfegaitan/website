import ButtonSearch from "@/components/busqueda/button-search";
import { Input } from "@/components/input";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Busqueda() {
  return (
    <div className="full-width flex-1 relative overflow-hidden min-h-[66.75vh] flex items-center">
      {/* {overlay} */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <Image
        src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        fill
        alt="Background"
        className="object-cover"
      />
      <div className="main_container relative z-20">
        <form
          action={async (form) => {
            "use server";
            const q = form.get("q");

            redirect(`/buscar?q=${q}`);
          }}
          method="get"
          className="flex w-full"
        >
          <Input
            type="text"
            placeholder="Buscar"
            name="q"
            className="h-[50px] lg:h-[75px] rounded-none w-full focus-visible:ring-0 text-lg focus-visible:ring-offset-0"
          />
          <ButtonSearch />
        </form>
      </div>
    </div>
  );
}

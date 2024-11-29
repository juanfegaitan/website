"use client";

import { Button } from "@/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import { cn } from "@/lib/cn";
import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { MenuItem, SettingsPayload } from "@/types";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  settings: SettingsPayload;
};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const { settings } = props;

  const menuItems = settings?.menuItems || ([] as MenuItem[]);


  const logo = !!settings?.logo?.image?.asset
    ? urlForImage(settings.logo.image)?.url()
    : "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav className="h-24 bg-primary text-background flex items-center justify-between">
        <div className="main_container h-full flex items-center justify-between">
          <div className="flex items-center gap-4 ">
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="lg:hidden size-11"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>

            <Link href="/">
              <p
                className={cn("font-bold text-xl xl:text-3xl", {
                  hidden: !settings?.title || !!logo,
                })}
              >
                {settings?.title ?? "Juan Felipe Gaitán"}.
              </p>

              {!!logo && (
                <div className="aspect-video h-24 relative">
                  <Image
                    src={logo}
                    fill
                    alt={settings?.logo?.alt ?? "Logo"}
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </div>
              )}
            </Link>
          </div>

          <ul className="flex-1 lg:flex gap-8 justify-center ml-2 items-center h-full hidden">
            {menuItems.map((item) => {
              const href = resolveHref(item?._type, item?.slug);

              if (!href) return null;

              const isActive = pathname.startsWith(href);

              return (
                <li
                  key={href}
                  className={cn(
                    " text-md font-medium border-transparent border-b pb-1 transition-all hover:border-input duration-750",
                    {
                      "border-input": isActive,
                    },
                  )}
                >
                  <Link href={href} onClick={() => setOpen(false)}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/busqueda">
            <Search className="h-6 w-6" />
          </Link>
        </div>
      </nav>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {menuItems.map((item) => {
            const href = resolveHref(item?._type, item?.slug);

            if (!href) return null;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {item.title}
              </Link>
            );
          })}

          <Link
            href="/busqueda"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            Buscar
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;

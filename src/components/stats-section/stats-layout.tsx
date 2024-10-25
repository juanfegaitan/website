import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { StatsSection } from "@/types";
import Image from "next/image";

type Props = {
  data?: StatsSection | null;
};

export function StatsLAyout({ data }: Props) {
  if (!data) return null;

  if (!data.stats && !data.title) return null;

  return (
    <section
      className="bg-gray-50 py-12 w-full full-width"
      style={{ backgroundColor: data.bgColor?.hex }}
    >
      <h2 className={cn("text-sub-title font-bold text-center font-noto")}>
        {data?.title}
      </h2>

      <div className="main_container">
        {!!data.stats?.length && (
          <div className="mt-8 lg:mt-16 grid lg:grid-cols-4">
            {data?.stats?.map((stat, index) => {
              const image =
                stat.icon?.image && urlForImage(stat.icon.image)?.url();

              return (
                <div
                  key={index}
                  className="py-4 lg:px-6 flex items-center lg:text-center lg:flex-col gap-4"
                >
                  <div className="size-10 relative">
                    {image && (
                      <Image
                        src={image}
                        blurDataURL={stat.icon?.image?.asset.metadata.lqip}
                        placeholder={
                          stat.icon?.image?.asset.metadata.lqip
                            ? "blur"
                            : "empty"
                        }
                        fill
                        alt={stat.title ?? stat.description ?? ""}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold w-full flex-1">
                    {stat.value}
                  </div>
                  <div className="text-lg flex-2">
                    {stat.title ?? stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

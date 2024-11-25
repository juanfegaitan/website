import { CtaSection } from "@/types";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data: CtaSection | null;
};

export function CallToActionSectionLayout({ data }: Props) {
  if (!data) {
    return null;
  }

  return (
    <section className="py-12 w-full">
      <div className="w-full aspect-[16/4] py-12 bg-white flex flex-col gap-5 justify-center items-center">
        <div className="text-2xl text-center">
          <CustomPortableText value={data.title as any} />
        </div>

        <div className="text-xl w-full lg:w-3/4 text-center text-gray-600">
          <CustomPortableText value={data.description as any} />
        </div>

        <Cta {...data.cta} />
      </div>
    </section>
  );
}

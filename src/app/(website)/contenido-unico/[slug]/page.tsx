import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { _generateMetadata, urlForImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadBlog } from "@/sanity/loader/loadQuery";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";

const Share = dynamic(
  () => import("@/components/post/share").then((mod) => mod.Share),
  { ssr: false },
);

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadBlog(params.slug);

  return _generateMetadata({
    description: page?.seo?.description ?? page?.content,
    image: page?.seo?.image ?? page?.image?.image,
    title: page?.seo?.title ?? page?.title,
  });
}

export function generateStaticParams() {
  return generateStaticSlugs("post");
}

export default async function BlogDetail({ params }: Props) {
  const { data: blog } = await loadBlog(params.slug);

  const image =
    blog?.image?.image &&
    urlForImage(blog.image.image)?.width(1200).height(450).fit("crop").url();

  return (
    <div className="flex flex-col gap-4 py-16">
      {image && (
        <Image
          src={image}
          width={1200}
          height={450}
          alt={blog?.image?.alt ?? "blog"}
          placeholder="blur"
          blurDataURL={blog?.image?.image?.asset.metadata.lqip}
          className="object-cover w-full aspect-square lg:aspect-[16/6] rounded-2xl"
        />
      )}

      <div className=" mx-auto max-w-4xl">
        <div className="text-4xl font-bold text-center mt-8">
          {blog?.title}
        </div>

        <Share post={blog} />

        <div className="mt-12">
          <CustomPortableText value={blog?.content as any} />
        </div>
      </div>
    </div>
  );
}

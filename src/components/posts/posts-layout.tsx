import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { BlogPagePayload, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: Post[] | null;
  blogPage: BlogPagePayload | null;
};

export function PostsLayout({ posts, blogPage }: Props) {
  if (!posts) {
    return null;
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 mt-6">
      {posts.map((post) => {
        const image = post?.image?.image;

        const imageUrl =
          image && urlForImage(image)?.height(220).width(420).fit("crop").url();

        const href = resolveHref(post._type, post.slug)?.replace(
          "/blog",
          `/${blogPage?.slug ?? "blog"}`,
        );

        if (!imageUrl || !href) return null;

        return (
          <Link
            href={href}
            key={post._id}
            className="flex flex-col items-center gap-8 text-center"
          >
            <Image
              src={imageUrl}
              width={420}
              height={220}
              alt={post.title}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              blurDataURL={image.asset?.metadata?.lqip}
              placeholder="blur"
              className="object-cover w-full aspect-video rounded-2xl"
            />

            <div className="p-6 py-0 flex flex-col items-center justify-center text-center">
              <div className="font-bold text-xl">{post.title}</div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

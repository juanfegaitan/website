import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadBlogPage, loadBlogPosts } from "@/sanity/loader/loadQuery";
import { PostsLayout } from "./posts-layout";

const PostsPreview = dynamic(() => import("./posts-preview"));

export async function PostsSection() {
  const data = await loadBlogPosts();

  const { data: blogPage } = await loadBlogPage();

  if (draftMode().isEnabled) {
    return <PostsPreview initial={data} blogPage={blogPage} />;
  }

  return <PostsLayout posts={data.data} blogPage={blogPage} />;
}

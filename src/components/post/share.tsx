"use client";

import { Post } from "@/types";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

type Props = {
  post: Post | null;
};

export function Share(props: Props) {
  const shareUrl = window.location.href;

  const title = props.post?.title;

  return (
    <div className="flex items-center gap-2 mt-8">
      <FacebookShareButton
        url={shareUrl}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={shareUrl}
        className="Demo__some-network__share-button"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <XIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}

"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "./youtube.css";

export function YoutubeVideo() {
  return (
    <section className="mt-16 w-full aspect-video">
      <LiteYouTubeEmbed
        id="HaEPXoXVf2k"
        title="Amazon DynamoDB Deep Dive"
        aspectHeight={9}
        aspectWidth={16}
        poster="hqdefault"
      />
    </section>
  );
}

import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { type NextRequest, NextResponse } from "next/server";
import os from "os";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);

import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body._type !== "testimonial" || !body.video?.asset?._ref) {
      return NextResponse.json(
        { message: "Not a valid video update" },
        { status: 400 }
      );
    }

    // Get the video file URL from Sanity
    const videoAsset = await client.getDocument(body.video.asset._ref);
    if (!videoAsset?.url) {
      throw new Error("Could not get video URL from asset");
    }

    // Create temp directory if it doesn't exist
    const tempDir = path.join(os.tmpdir(), "sanity-video-processing");
    await mkdir(tempDir, { recursive: true });

    // Use proper temp directory paths
    const tempVideoPath = path.join(tempDir, `${body._id}-source.mp4`);
    const tempGifPath = path.join(tempDir, `${body._id}-output.gif`);

    console.log("Downloading video from:", videoAsset.url);
    console.log("Temp video path:", tempVideoPath);

    // Download video file
    const videoResponse = await axios({
      method: "GET",
      url: videoAsset.url,
      responseType: "arraybuffer",
    });

    await writeFile(tempVideoPath, videoResponse.data);
    console.log("Video downloaded successfully");

    // Generate GIF using ffmpeg
    console.log("Starting GIF generation");
    await new Promise((resolve, reject) => {
      ffmpeg(tempVideoPath)
        .toFormat("gif")
        .setDuration(3)
        .size("320x?")
        .fps(10)
        .on("start", (command) => {
          console.log("FFmpeg command:", command);
        })
        .on("progress", (progress) => {
          console.log("Processing:", progress.percent, "% done");
        })
        .on("end", () => {
          console.log("GIF generation completed");
          resolve(null);
        })
        .on("error", (err) => {
          console.error("FFmpeg error:", err);
          reject(err);
        })
        .save(tempGifPath);
    });

    // Read generated GIF
    console.log("Reading generated GIF");
    const gifBuffer = fs.readFileSync(tempGifPath);

    // Upload GIF to Sanity
    console.log("Uploading GIF to Sanity");
    const gifAsset = await client.assets.upload("file", gifBuffer, {
      filename: `${body._id}-preview.gif`,
      contentType: "image/gif",
    });

    // Update the original document with the GIF reference
    console.log("Updating Sanity document");
    await client
      .patch(body._id)
      .set({
        previewGif: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: gifAsset._id,
          },
        },
      })
      .commit();

    // Clean up temp files
    try {
      await unlink(tempVideoPath);
      await unlink(tempGifPath);
      console.log("Temp files cleaned up");
    } catch (cleanupError) {
      console.error("Error cleaning up temp files:", cleanupError);
    }

    return NextResponse.json({ message: "GIF generated and saved" });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { message: "Error processing video", error: String(error) },
      { status: 500 }
    );
  }
}

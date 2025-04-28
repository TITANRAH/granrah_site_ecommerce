"use client";

import { useState } from "react";
import { Music2, Video } from "lucide-react";

interface MediaPlayerProps {
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export const MediaPlayer = ({
  spotifyUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DX0KpeLFwA3tO",
  youtubeUrl = "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
}: MediaPlayerProps) => {
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("spotify");

  return (
    <div className="w-full max-w-md bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl">
      {/* Tabs */}
      <div className="flex border-white/10">
        <button
          onClick={() => setActiveTab("spotify")}
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
            activeTab === "spotify"
              ? "bg-green-500/20 text-green-400"
              : "hover:bg-white/5 text-white/70"
          }`}
        >
          <Music2 size={20} />
          <span className="font-medium">Spotify</span>
        </button>
        <button
          onClick={() => setActiveTab("youtube")}
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
            activeTab === "youtube"
              ? "bg-red-500/20 text-red-400"
              : "hover:bg-white/5 text-white/70"
          }`}
        >
          <Video size={20} />
          <span className="font-medium">YouTube</span>
        </button>
      </div>

      {/* Content */}
      <div className="h-[400px] relative rounded-b-0 bg-gray-600">
        {activeTab === "spotify" ? (
          <iframe
            src={spotifyUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="encrypted-media"
            className="absolute inset-0 rounded-t-none"
          />
        ) : (
          <iframe
            src={youtubeUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0"
          />
        )}
      </div>
    </div>
  );
};

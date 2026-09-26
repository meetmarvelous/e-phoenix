import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { VideoTour, RoomRate } from '../types';

interface VideoModalProps {
  video: VideoTour | null;
  roomRates: RoomRate[];
  onClose: () => void;
  onBookRoom: (roomType: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  roomRates,
  onClose,
  onBookRoom,
}) => {
  if (!video) return null;

  const matchedRoom = roomRates.find((r) => r.name.toLowerCase() === video.roomType.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="video-player-modal"
        className="bg-[#181818] rounded-sm w-full max-w-3xl overflow-hidden border border-neutral-700 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white p-1.5 rounded-full bg-black/70 hover:bg-black transition-colors z-20 cursor-pointer"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            poster={video.thumbnail}
            className="w-full h-full object-contain"
            src={video.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Bottom Bar Info */}
        <div className="p-5 bg-[#1f1c19] border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#c5a880] uppercase block">
              ROOM TOUR VIDEO • {video.duration}
            </span>
            <h3 className="font-playfair text-xl text-white font-normal mt-0.5">
              {video.title}
            </h3>
            {matchedRoom && (
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                {matchedRoom.description}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onBookRoom(video.roomType);
            }}
            className="shrink-0 px-5 py-2.5 bg-[#c5a880] hover:bg-[#b89569] text-black text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-2 shadow-md"
          >
            <span>RESERVE THIS ROOM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

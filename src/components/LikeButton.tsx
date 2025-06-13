"use client"
import { useState } from "react";
import { Heart } from "lucide-react";

type LikeButtonProps = {
  isLiked: boolean;
};

const LikeButton = ({ isLiked }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div onClick={() => setLiked(!liked)} style={{ cursor: "pointer" }}>
      <Heart 
        className={`menu-icon ${liked ? "text-rose-600" : "text-gray-400"} transition-colors duration-300`} 
      />
    </div>
  );
};

export default LikeButton;

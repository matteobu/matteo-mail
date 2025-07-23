import { useState } from 'react';

export const StarButton = ({
  id,
  starred,
  onToggleStar,
}: {
  id: string;
  starred: boolean;
  onToggleStar?: (id: string) => void;
}) => {
  const [isStarred, setIsStarred] = useState(starred);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsStarred(!isStarred);
        onToggleStar?.(id); // Pass action to parent
      }}
      className="cursor-pointer rounded p-1 hover:bg-gray-100"
      aria-label={isStarred ? 'Unstar' : 'Star'}>
      <img
        alt={isStarred ? 'Starred' : 'Not Starred'}
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
        className="h-5 w-5"
        style={{ color: 'transparent' }}
        src={isStarred ? '/icons/icon-star-filled.png' : '/icons/icon-star.png'}
        srcSet={
          isStarred
            ? '/icons/icon-star-filled.png 1x, /icons/icon-star-filled.png 2x'
            : '/icons/icon-star.png 1x, /icons/icon-star.png 2x'
        }
      />
    </button>
  );
};

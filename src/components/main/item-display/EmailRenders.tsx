import type { Email } from '../../../utils/constants';
import { formatDateTimeWithAgo } from '../../../utils/utils';
import { StarButton } from '../sidebar/StarButton';

export const renderHeader = (
  msg: Email,
  selectedEmailIds: Set<string>,
  fullThread: Email[],
  onToggleStar?: (id: string) => void
) => {
  const isDetailed = selectedEmailIds.has(msg.id) || fullThread.length === 1;

  return (
    <div className="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="text-sm sm:text-base font-semibold">
          {isDetailed ? (
            <>
              {msg.senderName}{' '}
              <span className="font-normal text-xs text-gray-500">
                &lt;{msg.senderEmail}&gt;
              </span>
            </>
          ) : (
            msg.senderName
          )}
        </div>
        {isDetailed && (
          <div className="text-sm text-gray-600 mt-1">
            to {msg.receiversName.join(', ')}
          </div>
        )}
      </div>
      <div className="flex items-center text-xs text-gray-500 sm:ml-4 sm:self-center space-x-2">
        <span>{formatDateTimeWithAgo(msg.time)}</span>
        <StarButton
          starred={msg.starred}
          onToggleStar={() => onToggleStar?.(msg.id)}
          id={msg.id}
        />
      </div>
    </div>
  );
};

export const renderBody = (
  msg: Email,
  selectedEmailIds: Set<string>,
  fullThread: Email[],
  setSelectedEmailIds: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  const isDetailed =
    selectedEmailIds.has(msg.id) ||
    fullThread.length === 1 ||
    msg.id === fullThread[fullThread.length - 1].id;

  return (
    <div
      className={`text-sm whitespace-pre-line ${
        isDetailed ? 'text-gray-800' : 'text-gray-600 cursor-pointer'
      }`}
      onClick={() => {
        setSelectedEmailIds((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(msg.id)) {
            newSet.delete(msg.id);
          } else {
            newSet.add(msg.id);
          }
          return newSet;
        });
      }}>
      {isDetailed
        ? msg.body
        : msg.body.slice(0, 100) + (msg.body.length > 100 ? '...' : '')}
    </div>
  );
};

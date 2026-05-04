import { formatTime } from '../utils/helpers';

const MessageBubble = ({ message, isOwn, showTail }) => {
  return (
    <div className={`flex mb-0.5 message-animate ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[65%] rounded-lg px-2.5 pt-1.5 pb-1 shadow-sm ${
          showTail ? (isOwn ? 'rounded-tr-none' : 'rounded-tl-none') : ''
        } ${
          isOwn
            ? 'bg-wa-outgoing text-wa-text-primary'
            : 'bg-wa-incoming text-wa-text-primary'
        }`}
        style={{ marginTop: showTail ? '6px' : '1px' }}
      >
        {/* Tail */}
        {showTail && (
          <div
            className={`absolute top-0 w-2 h-3 ${
              isOwn
                ? '-right-2 text-wa-outgoing'
                : '-left-2 text-wa-incoming'
            }`}
          >
            <svg viewBox="0 0 8 13" className="w-full h-full fill-current">
              {isOwn ? (
                <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
              ) : (
                <path d="M2.812 1H8v11.193L1.533 3.568C.474 2.156 1.042 1 2.812 1z" />
              )}
            </svg>
          </div>
        )}

        {/* Message text */}
        <div className="flex items-end gap-2">
          <p className="text-sm leading-[19px] break-words whitespace-pre-wrap flex-1 py-0.5">
            {message.text}
          </p>

          {/* Time & read receipt */}
          <span className="flex items-center gap-0.5 shrink-0 self-end pb-0.5">
            <span className="text-[11px] text-wa-text-secondary/70 leading-none">
              {formatTime(message.createdAt)}
            </span>
            {isOwn && (
              <svg className="w-4 h-3 text-wa-blue ml-0.5" viewBox="0 0 16 11" fill="currentColor">
                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.343.144l-.544.572a.515.515 0 0 0 .005.72l2.893 2.909a.503.503 0 0 0 .07.058.455.455 0 0 0 .283.112.505.505 0 0 0 .39-.181l6.87-8.283a.478.478 0 0 0-.002-.596l-.4-.519z"/>
                <path d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.249-.462.576 1.323 1.329a.503.503 0 0 0 .07.058.455.455 0 0 0 .283.112.505.505 0 0 0 .39-.181l6.87-8.283a.478.478 0 0 0-.002-.596l-.397-.478z"/>
              </svg>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

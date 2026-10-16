import { cn } from '../../utils/cn';

interface UserAvatarProps {
  initials: string;
  size?: 'sm' | 'lg';
}

/** Initials avatar (the template hot-linked a stock photo; this avoids that dependency). */
function UserAvatar({ initials, size = 'sm' }: UserAvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white',
        size === 'sm'
          ? 'h-9 w-9 rounded-xl text-xs ring-2 ring-blue-500/20'
          : 'h-16 w-16 rounded-2xl text-lg ring-4 ring-blue-50',
      )}
    >
      {initials}
    </div>
  );
}

export default UserAvatar;

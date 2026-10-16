/** Current time as HH:mm, used for chat message timestamps. */
export function currentTime(): string {
  return new Date().toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Current date & time as dd/mm/yyyy HH:mm, used for "last updated" labels. */
export function currentDateTime(): string {
  const now = new Date();
  const date = now.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return `${date} ${currentTime()}`;
}

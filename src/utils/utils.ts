const FIXED_NOW = new Date('2030-03-14T15:14:00');

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatEmailTime(time: string): string {
  const emailDate = new Date(time);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  return isSameDay(emailDate, FIXED_NOW)
    ? formatTime(emailDate)
    : formatDate(emailDate);
}

export function formatDateTimeWithAgo(time: string): string {
  const emailDate = new Date(time);
  const diffMs = FIXED_NOW.getTime() - emailDate.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Format date parts, e.g. Thu, Mar 14
  const datePart = emailDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  // Format time part, e.g. 10:30 AM
  const timePart = emailDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Format the "ago" part:
  let ago = '';
  if (diffDays >= 2) {
    ago = `(${diffDays} days ago)`;
  } else if (diffDays === 1) {
    ago = `(1 day ago)`;
  } else if (diffHours >= 1) {
    ago = `(${diffHours} hours ago)`;
  } else if (diffMinutes >= 1) {
    ago = `(${diffMinutes} minutes ago)`;
  } else {
    ago = `(just now)`;
  }

  return `${datePart}, ${timePart} ${ago}`;
}

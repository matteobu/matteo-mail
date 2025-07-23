import type { Email, EmailsType } from './constants';

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

  const datePart = emailDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timePart = emailDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

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

export function getLatestMessageInThread(email: Email): Email {
  const messages = [email, ...(email.replies ?? [])];

  const latest = messages.reduce((latestSoFar, current) => {
    return new Date(current.time) > new Date(latestSoFar.time)
      ? current
      : latestSoFar;
  }, messages[0]);

  return {
    ...email,
    body: latest.body,
    time: latest.time,
  };
}


export function countEmailThreadMessages(email: Email): number {
  if (email.replies && email.replies.length > 0) {
    return email.replies.length;
  }
  return 0;
}

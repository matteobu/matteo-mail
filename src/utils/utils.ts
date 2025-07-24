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

export const getEmailThread = (
  allEmails: EmailsType,
  email: Email
): Email[] => {
  const rootId = email.rootId ?? email.id;

  const threadEmails = allEmails.filter(
    (e) => e.id === rootId || e.rootId === rootId
  );

  return threadEmails.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
};

export function countEmailThreadMessages(
  email: Email,
  allEmails: EmailsType
): number {
  return allEmails.filter((e) => e.rootId === email.id).length;
}

export type ThreadRoot = Email & {
  threadStarred: boolean;
  threadUnread: boolean;
  emails: EmailsType;
};

export function groupEmailsToThreads(emails: EmailsType): Email[][] {
  const threadMap: Record<string, Email[]> = {};

  for (const email of emails) {
    const rootId = email.rootId ?? email.id;

    if (!threadMap[rootId]) {
      threadMap[rootId] = [];
    }

    threadMap[rootId].push(email);
  }

  return Object.values(threadMap);
}

export function getLatestMessageInThread(
  email: Email,
  allEmails: EmailsType
): Email {
  const rootId = email.rootId ?? email.id;

  // Get all emails in the thread: root + its replies
  const threadEmails = allEmails.filter(
    (e) => e.id === rootId || e.rootId === rootId
  );

  if (threadEmails.length === 0) return email; // fallback if nothing is found

  // Find the latest email by comparing dates
  const latest = threadEmails.reduce((latestSoFar, current) =>
    new Date(current.time) > new Date(latestSoFar.time) ? current : latestSoFar
  );

  return latest;
}

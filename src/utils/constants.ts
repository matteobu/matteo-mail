export type Email = {
  id: string;
  starred: boolean;
  trash: boolean;
  spam: boolean;
  unread: boolean;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  time: string;
  starredIconSrc: string;
  replies?: Email[];
};
export type EmailsType = Email[];

export const MOCKED_EMAILS: EmailsType = [
  // Thread 1 (3 emails) — oldest to newest
  {
    id: '001',
    starred: true,
    trash: false,
    spam: false,
    unread: true,
    senderName: 'Sarah Johnson, Mike Chen (3)',
    senderEmail: 'sarah.johnson@company.com',
    subject: 'Re: Team meeting tomorrow',
    body: "Don't forget about our team meeting tomorrow at 2 PM in the conference room.",
    time: '2030-03-13T09:20:00',
    starredIconSrc: '/icons/icon-star-filled-yellow.png',
    replies: [
      {
        id: '001-003',
        starred: false,
        trash: false,
        spam: false,
        unread: true,
        senderName: 'Mike Chen',
        senderEmail: 'mike.chen@company.com',
        subject: 'Re: Team meeting tomorrow',
        body: 'Thanks for the reminder! Should I bring the quarterly reports?',
        time: '2030-03-13T10:15:00',
        starredIconSrc: '/icons/icon-star.png',
      },
      {
        id: '001-002',
        starred: false,
        trash: false,
        spam: false,
        unread: true,
        senderName: 'Sarah Johnson',
        senderEmail: 'sarah.johnson@company.com',
        subject: 'Re: Team meeting tomorrow',
        body: "Yes, please bring the Q4 reports. Also, let's discuss the new project timeline.",
        time: '2030-03-13T11:30:00',
        starredIconSrc: '/icons/icon-star.png',
      },
    ],
  },

  // Thread 2 (3 emails) — oldest to newest
  {
    id: '002',
    starred: false,
    trash: false,
    spam: false,
    unread: true,
    senderName: 'Alex Rivera, You (3)',
    senderEmail: 'alex.rivera@company.com',
    subject: 'Re: Dinner plans this weekend?',
    body: 'Hey! Want to try that new Italian place downtown this Saturday?',
    time: '2030-03-11T18:45:00',
    starredIconSrc: '/icons/icon-star.png',
    replies: [
      {
        id: '002-003',
        starred: false,
        trash: false,
        spam: false,
        unread: true,
        senderName: 'You',
        senderEmail: 'you@example.com',
        subject: 'Re: Dinner plans this weekend?',
        body: 'Sounds great! What time works for you?',
        time: '2030-03-11T19:20:00',
        starredIconSrc: '/icons/icon-star.png',
      },
      {
        id: '002-002',
        starred: false,
        trash: false,
        spam: false,
        unread: true,
        senderName: 'Alex Rivera',
        senderEmail: 'alex.rivera@company.com',
        subject: 'Re: Dinner plans this weekend?',
        body: "How about 7 PM? I'll make a reservation for us.",
        time: '2030-03-12T09:30:00',
        starredIconSrc: '/icons/icon-star.png',
      },
    ],
  },

  // Starred email (not in a thread)
  {
    id: '003',
    starred: true,
    trash: false,
    spam: false,
    unread: false,
    senderName: 'Amazon',
    senderEmail: 'no-reply@amazon.com',
    subject: 'Your order has shipped',
    body: 'Good news! Your recent order has been shipped and is on its way to you.',
    time: '2030-03-13T15:45:00',
    starredIconSrc: '/icons/icon-star-filled-yellow.png',
  },

  // Unread single email
  {
    id: '004',
    starred: false,
    trash: false,
    spam: false,
    unread: true,
    senderName: 'Gmail Team',
    senderEmail: 'noreply@example.com',
    subject: 'Welcome to your new Gmail account',
    body: 'Welcome! Your new Gmail account is ready to use. You can now send and receive emails.',
    time: '2030-03-14T10:30:00',
    starredIconSrc: '/icons/icon-star.png',
  },

  // Unread single email
  {
    id: '005',
    starred: false,
    trash: false,
    spam: false,
    unread: false,
    senderName: 'Tech News',
    senderEmail: 'tech.news@example.com',
    subject: 'Newsletter: Weekly updates',
    body: "Here are this week's top tech stories and updates from around the industry.",
    time: '2030-03-12T08:00:00',
    starredIconSrc: '/icons/icon-star.png',
  },

  // Spam email
  {
    id: '006',
    starred: false,
    trash: false,
    spam: true,
    unread: true,
    senderName: 'New Offers',
    senderEmail: 'new.offers@example.com',
    subject: 'You won a million dollars!',
    body: 'Click here to claim your prize now!',
    time: '2030-03-11T14:23:00',
    starredIconSrc: '/icons/icon-star.png',
  },
];

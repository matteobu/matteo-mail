type Email = {
  id: string;
  starred: boolean;
  trash: boolean;
  spam: boolean;
  unread: boolean;
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  starredIconSrc: string;
  replies?: Email[];
};
export type EmailsType = Email[];

export const MOCKED_EMAILS: EmailsType = [
  // Thread 1 (3 emails)
  {
    id: '001',
    starred: true,
    trash: false,
    spam: false,
    unread: true,
    sender: 'Sarah Johnson, Mike Chen (3)',
    subject: 'Re: Team meeting tomorrow',
    snippet:
      "Yes, please bring the Q4 reports. Also, let's discuss the new project timeline.",
    time: 'Mar 13',
    starredIconSrc: '/icons/icon-star-filled-yellow.png',
    replies: [
      {
        id: '001-002',
        starred: false,
        trash: false,
        spam: false,
        unread: true,
        sender: 'Sarah Johnson',
        subject: 'Re: Team meeting tomorrow',
        snippet: 'Please confirm the agenda for tomorrow.',
        time: 'Mar 12',
        starredIconSrc: '/icons/icon-star.png',
      },
      {
        id: '001-003',
        starred: false,
        trash: false,
        spam: false,
        unread: false,
        sender: 'Mike Chen',
        subject: 'Re: Team meeting tomorrow',
        snippet: 'I have updated the project timeline as requested.',
        time: 'Mar 11',
        starredIconSrc: '/icons/icon-star.png',
      },
    ],
  },

  // Thread 2 (3 emails)
  {
    id: '002',
    starred: false,
    trash: false,
    spam: false,
    unread: true,
    sender: 'Alex Rivera, You (3)',
    subject: 'Re: Dinner plans this weekend?',
    snippet: "How about 7 PM? I'll make a reservation for us.",
    time: 'Mar 12',
    starredIconSrc: '/icons/icon-star.png',
    replies: [
      {
        id: '002-002',
        starred: false,
        trash: false,
        spam: false,
        unread: true,
        sender: 'Alex Rivera',
        subject: 'Re: Dinner plans this weekend?',
        snippet: "Sounds good to me, can't wait!",
        time: 'Mar 11',
        starredIconSrc: '/icons/icon-star.png',
      },
      {
        id: '002-003',
        starred: false,
        trash: false,
        spam: false,
        unread: false,
        sender: 'You',
        subject: 'Re: Dinner plans this weekend?',
        snippet: 'Looking forward to it!',
        time: 'Mar 10',
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
    sender: 'Amazon',
    subject: 'Your order has shipped',
    snippet:
      'Good news! Your recent order has been shipped and is on its way to you.',
    time: 'Mar 13',
    starredIconSrc: '/icons/icon-star-filled-yellow.png',
  },

  // Unread single email
  {
    id: '004',
    starred: false,
    trash: false,
    spam: false,
    unread: true,
    sender: 'Gmail Team',
    subject: 'Welcome to your new Gmail account',
    snippet:
      'Welcome! Your new Gmail account is ready to use. You can now send and receive emails.',
    time: '10:30 AM',
    starredIconSrc: '/icons/icon-star.png',
  },

  // Unread single email
  {
    id: '005',
    starred: false,
    trash: false,
    spam: false,
    unread: true,
    sender: 'Tech News',
    subject: 'Newsletter: Weekly updates',
    snippet:
      "Here are this week's top tech stories and updates from around the industry.",
    time: 'Mar 12',
    starredIconSrc: '/icons/icon-star.png',
  },

  // Spam email
  {
    id: '006',
    starred: false,
    trash: false,
    spam: true,
    unread: true,
    sender: 'Scammy Offers',
    subject: 'You won a million dollars!',
    snippet: 'Click here to claim your prize now!',
    time: 'Mar 10',
    starredIconSrc: '/icons/icon-star.png',
  },
];

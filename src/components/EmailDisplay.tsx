import { StarButton } from './StarButton';

const MailListItem = ({
  starred,
  sender,
  subject,
  snippet,
  time,
}: {
  starred?: boolean;
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  starredIconSrc: string;
}) => (
  <div
    className={`relative flex h-[40px] cursor-pointer items-center gap-3 border-b border-gray-200 px-4 text-sm hover:z-10 hover:shadow-md ${
      starred ? 'bg-gray-50' : ''
    }`}>
    <StarButton />
    <div className="w-[200px] shrink-0 truncate font-bold">{sender}</div>
    <div className="w-0 flex-1 grow truncate text-sm">
      <span className="font-semibold">{subject}</span>
      <span className="text-gray-500"> - {snippet}</span>
    </div>
    <div className="shrink-0 text-xs text-gray-500">{time}</div>
  </div>
);

const EmailDisplay = () => (
  <div className="mr-[56px] mb-4 flex grow flex-col rounded-2xl bg-white">
    <div className="flex h-[48px] items-center px-4"></div>
    <MailListItem
      starred={false}
      sender="Gmail Team"
      subject="Welcome to your new Gmail account"
      snippet="Welcome! Your new Gmail account is ready to use. You can now send and receive emails."
      time="10:30 AM"
      starredIconSrc="/icons/icon-star.png"
    />
    <MailListItem
      starred
      sender="Amazon"
      subject="Your order has shipped"
      snippet="Good news! Your recent order has been shipped and is on its way to you."
      time="Mar 13"
      starredIconSrc="/icons/icon-star-filled-yellow.png"
    />
    <MailListItem
      starred={false}
      sender="Sarah Johnson, Mike Chen (3)"
      subject="Re: Team meeting tomorrow"
      snippet="Yes, please bring the Q4 reports. Also, let's discuss the new project timeline."
      time="Mar 13"
      starredIconSrc="/icons/icon-star-filled-yellow.png"
    />
    <MailListItem
      starred={false}
      sender="Alex Rivera, You (3)"
      subject="Re: Dinner plans this weekend?"
      snippet="How about 7 PM? I'll make a reservation for us."
      time="Mar 12"
      starredIconSrc="/icons/icon-star.png"
    />
    <MailListItem
      starred
      sender="Tech News"
      subject="Newsletter: Weekly updates"
      snippet="Here are this week's top tech stories and updates from around the industry."
      time="Mar 12"
      starredIconSrc="/icons/icon-star.png"
    />
  </div>
);

export default EmailDisplay;

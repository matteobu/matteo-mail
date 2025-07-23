import EmailDisplay from './EmailDisplay';
import Header from './Header';
import SidebarMenu from './SidebarMenu';

const Main = () => (
  <div className="flex min-h-screen grow flex-col bg-[rgb(248,250,253)]">
    <Header />
    <div className="flex grow">
      <SidebarMenu />
      <EmailDisplay />
    </div>
  </div>
);

export default Main;

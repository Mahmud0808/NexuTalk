import getCurrentUser from "@/lib/actions/getCurrentUser.actions";
import DesktopSidebar from "./DesktopSidebar";
import MobileNavbar from "./MobileNavbar";

export default async function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileNavbar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

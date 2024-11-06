import Header from "~/components/header";
import UserbackAnchor from "~/components/userback";
import { ActiveProjectProvider } from "~/providers/active-project.provider";
import { RxdbProvider } from "~/providers/rxdb.provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RxdbProvider>
      <ActiveProjectProvider>
        <Header />
        {children}
        <UserbackAnchor />
      </ActiveProjectProvider>
    </RxdbProvider>
  );
}

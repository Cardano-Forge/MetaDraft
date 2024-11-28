import Header from "~/components/header";
import UserbackAnchor from "~/components/userback";
import { ActiveProjectProvider } from "~/providers/active-project.provider";
import { RxdbProvider } from "~/providers/rxdb.provider";
import { TutorialProvider } from "~/providers/tutorial.provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RxdbProvider>
      <ActiveProjectProvider>
        <TutorialProvider>
          <Header />
          {children}
          <UserbackAnchor />
        </TutorialProvider>
      </ActiveProjectProvider>
    </RxdbProvider>
  );
}

import Header from "~/components/header";
import { RxdbProvider } from "~/providers/rxdb.provider";
import { ActiveProjectProvider } from "~/providers/active-project.provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RxdbProvider>
      <ActiveProjectProvider>
        <Header />
        {children}
      </ActiveProjectProvider>
    </RxdbProvider>
  );
}

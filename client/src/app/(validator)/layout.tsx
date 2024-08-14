import { Stepper } from "~/components/stepper";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Status */}
      <Stepper />
      <main className="border-t border-white/15 py-8">
        <div className="container">{children}</div>
      </main>
    </>
  );
}

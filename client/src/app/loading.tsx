import Loader from "~/components/loader";

export default function Loading() {
  return (
    <main className="container flex h-[100vh] flex-wrap place-content-center">
      <Loader />
    </main>
  );
}

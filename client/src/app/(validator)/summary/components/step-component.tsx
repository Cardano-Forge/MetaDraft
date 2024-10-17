export default function StepComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
      {children}
    </div>
  );
}

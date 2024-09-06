import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export default function UploadAlert() {
  return (
    <AlertDialogContent className="border-destructive">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center text-2xl font-bold text-red-500">
          Format Error
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          Your metadata does not conform to the required format. <br />
          <br />
          Please review the formatting guidelines and ensure that your metadata
          matches the example provided. This includes adhering to the specified
          structure, key naming conventions, and data types. Following the
          example closely will help avoid any potential issues.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="!justify-center">
        <AlertDialogCancel className="w-full text-destructive sm:mx-6">
          Close
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

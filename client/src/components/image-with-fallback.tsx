import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

type ImageProps = React.ComponentPropsWithoutRef<typeof Avatar> & {
  imageProps?: Omit<React.ComponentPropsWithoutRef<typeof AvatarImage>, "src">;
};

const ImageWithFallback = React.forwardRef<
  HTMLDivElement,
  ImageProps & {
    src: string;
    fallbackClassName?: string;
  }
>(
  (
    { className, children, imageProps, fallbackClassName, src, ...props },
    ref,
  ) => {
    return (
      <Avatar
        ref={ref}
        className={cn(
          "aspect-square h-[initial] w-full overflow-hidden rounded-xl",
          className,
        )}
        {...props}
      >
        <AvatarFallback className={cn("rounded-xl", fallbackClassName)} />
        <AvatarImage
          className={cn("z-[0] object-contain")}
          src={src}
          {...imageProps}
        />
        {children}
      </Avatar>
    );
  },
);
ImageWithFallback.displayName = "ImageWithFallback";

export { ImageWithFallback };

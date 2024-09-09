import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

type AssetCardImageProps = React.ComponentPropsWithoutRef<typeof Avatar> & {
  imageProps?: Omit<React.ComponentPropsWithoutRef<typeof AvatarImage>, "src">;
};

const AssetCardThumbnail = React.forwardRef<
  HTMLDivElement,
  AssetCardImageProps & {
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
AssetCardThumbnail.displayName = "AssetCardThumbnail";

export { AssetCardThumbnail };

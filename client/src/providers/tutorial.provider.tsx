"use client";

import React from "react";

const TutorialContext = React.createContext<{
  active: boolean;
  handleActive: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  active: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleActive: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
});
export const useTutorial = () => React.useContext(TutorialContext);

export const TutorialProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, handleActive] = React.useState(
    !localStorage.getItem("guideOff"),
  );

  return (
    <TutorialContext.Provider value={{ active, handleActive }}>
      {children}
    </TutorialContext.Provider>
  );
};

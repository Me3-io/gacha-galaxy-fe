import { ButtonBase } from "@mui/material";
import { TourProvider } from "@reactour/tour";

import { steps } from "./config";
import styled from "./styled.module.scss";

const styles = {
  popover: (prev: any) => ({
    ...prev,
    "--reactour-accent": "#BA00FB",
    borderRadius: 8,
    backgroundColor: "#584360",
    color: "#fff",
    padding: "1.5rem",
    maxWidth: "350px",
    fontFamily: "ChakraPetch",
    fontSize: "1rem",
    top: "8px",
    left: "12px",
    boxSizing: "border-box",
  }),
  maskArea: (prev: any) => ({ ...prev, rx: 8 }),
  maskWrapper: (prev: any) => ({ ...prev, color: "#000" }),
  close: (prev: any) => ({ ...prev, right: 10, top: 10, color: "#fff" }),
};

const CustomButton = ({ children, onClick }: any) => {
  return (
    <ButtonBase className={styled.reactourButton} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export const ReactTourProvider = ({ children }: any) => {
  return (
    <TourProvider
      steps={steps}
      styles={styles}
      className={styled.reactourPopover}
      maskClassName={styled.reactourMask}
      showDots={false}
      showBadge={false}
      padding={{ mask: 8 }}
      disableInteraction={true}
      nextButton={({ currentStep, stepsLength, setIsOpen, setCurrentStep, steps }) => {
        const last = currentStep === stepsLength - 1;
        return (
          <CustomButton
            onClick={() => {
              if (last) {
                setIsOpen(false);
              } else {
                setCurrentStep((s) => (steps && s === steps?.length - 1 ? 0 : s + 1));
              }
            }}
          >
            {last ? "Close" : "Next"}
          </CustomButton>
        );
      }}
    >
      {children}
    </TourProvider>
  );
};

import { ButtonBase } from "@mui/material";
import { TourProvider } from "@reactour/tour";

import { steps } from "config/reactourConfig";

const CustomButton = ({ children, onClick }: any) => {
  return (
    <ButtonBase
      sx={{
        border: "1px solid #BA00FB",
        background: "rgba(58, 31, 80, 0.60)",
        padding: "0.5rem 2rem",
      }}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

export const ReactTourProvider = ({ children }: any) => {
  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: (prev) => ({
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
          //margin: "0.5rem"
        }),
        maskArea: (prev) => ({ ...prev, rx: 8 }),
        maskWrapper: (prev) => ({ ...prev, color: "#000" }),
        //badge: (base) => ({ ...base, display: "none" }),
        //controls: (base) => ({ ...base }),
        close: (prev) => ({ ...prev, right: 10, top: 10, color: "#fff" }),
      }}
      disableInteraction={true}
      showDots={false}
      showBadge={false}
      padding={{ mask: 8 }}
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

import { Box, Button, Grow, MobileStepper, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styled from "./styled.module.scss";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";

const steps = [
  { label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  { label: "Create an ad group",
    description: "An ad group contains one or more ads which target a shared set of keywords.",
  },
  { label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.`,
  },
  { label: "Create an ad group",
    description: "An ad group contains one or more ads which target a shared set of keywords.",
  },
  { label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.`,
  },
];

const TourModal = ({ open, handleClose }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  return (
    <Modal open={open || false} onClose={onClose} className={styled.modalContainer}>
      <>
        <CloseIcon className={styled.close} onClick={(evt: any) => onClose(evt, "close")} />
        <Grow in={open}>
          <Box className={styled.modal}>
            <Box className={styled.container}>
              <Typography p={1}>{steps[activeStep].label}</Typography>
              <Typography p={1}>{steps[activeStep].description}</Typography>
            </Box>

            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={styled.stepper}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
        </Grow>
      </>
    </Modal>
  );
};
export default TourModal;

import { Box } from '@mui/material';

const Partner = ({ buildingData }: any) => {
  return (
    <>
      <Box>
        <img src={buildingData?.logo} alt="" height={140} width={140} />
        <p>{buildingData?.description}</p>
      </Box>
    </>
  );
};

export default Partner;

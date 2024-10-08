import { Box } from '@mui/material';

const Partner = ({ buildingData }: any) => {
  const logoImg = buildingData?.partner?.logo.length() ? buildingData?.partner?.logo[0]?.url : null;

  return (
    <>
      <Box>
        <img src={logoImg} alt="logo" height={140} width={140} />
        <p>{buildingData?.partner?.description}</p>
      </Box>
    </>
  );
};

export default Partner;

import { Box, Modal, Typography } from '@mui/material';
import Button from 'components/atoms/buttons/default';
import ButtonBase from 'components/atoms/buttons/base';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import keyImage from '../../../assets/images/keyImage.png';

import { useTranslation } from 'react-i18next';

import styled from './styled.module.scss';

const KeysModal = ({ open, onClose }: any) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} className={styled.modalContainer}>
      <>
        <Box className={styled.backButton}>
          <ButtonBase onClick={onClose}>
            <ArrowBackIcon /> {t('back')}
          </ButtonBase>
        </Box>

        <Box className={styled.modal}>
          <Box className={styled.bg}>
            <Box className={styled.keyImg}>
              <img src={keyImage} alt={'keyImage'} className={styled.image} />
            </Box>
          </Box>

          <Box className={styled.container}>
            <Typography pt={2} className={styled.title}>
              Get more keys!
            </Typography>
            <Typography pt={2} pb={2} className={styled.description}>
              Earn free keys by completing the quests available in each building, or purchase additional keys below
            </Typography>

            <Button onClick={() => {}}>Buy Keys</Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};
export default KeysModal;

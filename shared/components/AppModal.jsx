import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Grid} from '@mui/material';
import {useRouter} from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-52%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AppModal({
  handleOpen,
  handleClose,
  open,
  title,
  description,
  path,
}) {
  const router = useRouter();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            color={'error'}
            component="h2"
          >
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            {description}
          </Typography>
          <Grid
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={2}
            mt={2}
          >
            <Button
              color="primary"
              onClick={() => (window.location.href = path)}
            >
              Ok
            </Button>
            <Button color={'error'} onClick={() => handleClose()}>
              Cancel
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

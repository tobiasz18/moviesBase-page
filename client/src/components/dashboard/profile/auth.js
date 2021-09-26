import * as React from 'react';
// modal      🡫
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid';
import { TextField } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AuthProfile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const users = useSelector(state => state.users)

  return (
    <div>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField value={users.data.email} variant="standard" disabled />
          </Grid>
          <Grid item>
            <EditIcon fontSize="small" color="prime" disabled />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField label="*********" variant="standard" disabled />
          </Grid>
          <Grid item>
            <EditIcon fontSize="small" color="prime" disabled />
          </Grid>
        </Grid>
      </Grid>

      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update your email
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default AuthProfile

import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Modal, Box } from '@mui/material'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxWidth: '80vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export const Timelapse = ({imagesArr, timelapsOpen, handleTimelapsClose}) => {
  return (
    <Modal
    keepMounted
    open={timelapsOpen}
    onClose={handleTimelapsClose}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
      {imagesArr.map(imgItem => {
        <Paper>
          <img style={{height: '250px', margin: 'auto'}} src={`https://denalicams.com/${imgItem.path}`} />
          <p className="legend" style={{textAlign: 'center'}}>{imgItem.modified}</p>
        </Paper>
        
      })}
      </Box>
      
    </Modal>
    
  )   
}
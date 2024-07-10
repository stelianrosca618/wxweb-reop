import * as React from 'react';
import {Link,  Card, CardMedia, Box, Container, Grid, Button, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { LineChart } from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import testImg from '../../assets/data/cam1,m240408180000864.jpg'
import emptyImg from "../../assets/empty.png";
import Modal from '@mui/material/Modal';
import { getReadImgfile } from '../../apis/apiProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const hostPath = 'https://denalicams.com/cam_images/cam4/';
export const Archive = () => {
  const [enlargeOpen, setEnlargeOpen] = React.useState(false);
  const yearlist = [2023, 2024]
  const tdayData = new Date();
  const [tdate, setTdate] = React.useState(tdayData.getDate());
  const [tyear, setTyear] = React.useState(tdayData.getFullYear());
  const [tmonth, setTmonth] = React.useState(tdayData.getMonth() + 1);
  const [thours, setThours] = React.useState(tdayData.getHours()+1);
  const [tmins, setTmins] = React.useState(tdayData.getMinutes());
  const [cam1Img, setCam1Img] = React.useState(emptyImg);
  const [cam2Img, setCam2Img] = React.useState(emptyImg);
  const [cam3Img, setCam3Img] = React.useState(emptyImg);
  const [cam4Img, setCam4Img] = React.useState(emptyImg);
  const [modalImg, setModalImg] = React.useState(emptyImg);
  const monthlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let daylist = [];
  let hrList = [];
  let minList = [];
  for (let index = 1; index < 32; index++) {
    daylist.push(index);
  }
  for (let hNum = 1; hNum < 25; hNum++) {
    hrList.push(hNum);
  }
  for (let mNum = 1; mNum < 61; mNum ++){
    minList.push(mNum);
  }
  const handleClose = () => {
    setEnlargeOpen(false);
  }
  const handleOpen = (num) => {
    switch(num){
      case 1:
        setModalImg(cam1Img);
        break;
      case 2:
        setModalImg(cam2Img);
        break;
      case 3:
        setModalImg(cam3Img);
        break;
      case 4:
        setModalImg(cam4Img);
        break
    }
    setEnlargeOpen(true);
  }

  const onYearChange = (e) => {
    console.log(e);
    setTyear(e.target.value);
  }
  const onMonthChange = (e) => {
    console.log(e);
    setTmonth(e.target.value);
  }
  const onDayChange = (e) => {
    setTdate(e.target.value);
  }
  const onHourChange = (e) => {
    setThours(e.target.value)
  }
  const onMinsChange = (e) => {
    setTmins(e.target.value)
  }
  const loadImages = async () => {
    // const loadImgPath = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/cam4-m`
    const loadImgPath = `${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}`
    console.log(loadImgPath);
    const imagesArr = await getReadImgfile(loadImgPath);
    if(imagesArr){
      console.log(imagesArr);
      if(imagesArr.cam1){
        const cam1ImgArr = imagesArr.cam1;
        const cam1Path = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/${cam1ImgArr[0].name}`
        setCam1Img(cam1Path)
      }
      if(imagesArr.cam2){
        const cam2ImgArr = imagesArr.cam2;
        const cam2Path = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/${cam2ImgArr[0].name}`
        setCam2Img(cam2Path)
      }
      if(imagesArr.cam3){
        const cam3ImgArr = imagesArr.cam3;
        const cam3Path = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/${cam3ImgArr[0].name}`
        setCam3Img(cam3Path)
      }
      if(imagesArr.cam4){
        const cam4ImgArr = imagesArr.cam4;
        const cam4Path = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/${cam4ImgArr[0].name}`
        setCam4Img(cam4Path)
      }
      // const loadingPath = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/${imagesArr[0].name}`
      // setLoaderPath(loadingPath);
    }else{
      alert('There is not the image');
    }
    
  }
  return (
    <div>
      <Box paddingY={5}>
        <Container>
          <Box>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Stack direction="flex" alignItems="start" justifyContent="space-between">
                  <Link href="/">
                    <Button variant="text">
                      <ChevronLeftIcon />
                      Back To Home
                    </Button>
                  </Link>
                  <Typography sx={{fontWeight: "bold", marginTop: '2rem'}} variant="h3">ARCHIVED IMAGES</Typography>  
                  <Typography></Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Stack direction="row" justifyContent="start" alignItems="center" useFlexGap>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tyear}
              label="Year"
              onChange={(e) => {onYearChange(e)}}
            >
               {yearlist.map((yearItem) => (
                <MenuItem
                  key={yearItem}
                  value={yearItem}
                >
                  {yearItem}
                </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tmonth}
              label="Month"
              onChange={(e) => {onMonthChange(e)}}
            >
               {monthlist.map((monthItem) => (
                <MenuItem
                  key={monthItem}
                  value={monthItem}
                >
                  {monthItem}
                </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tdate}
              label="Day"
              onChange={(e) => {onDayChange(e)}}
            >
               {daylist.map((datyItem) => (
                <MenuItem
                  key={datyItem}
                  value={datyItem}
                >
                  {datyItem}
                </MenuItem>
                ))}
            </Select>
          </FormControl>
            <span style={{paddingLeft: "30px", paddingRight: "30px"}}></span>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hour</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={thours}
              label="Hour"
              onChange={(e) => {onHourChange(e)}}
            >
               {hrList.map((hrItem) => (
                <MenuItem
                  key={hrItem}
                  value={hrItem}
                >
                  {hrItem}
                </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Min</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tmins}
              label="Min"
              onChange={(e) => {onMinsChange(e)}}
            >
               {minList.map((minItem) => (
                <MenuItem
                  key={minItem}
                  value={minItem}
                >
                  {minItem}
                </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant='contained' onClick={() => {loadImages()}} sx={{height: '56px', paddingX: '10px'}} size='large'>Load</Button>
          </Stack>
        </Container>
      </Box>
      <Box padding={5}>
        <Container>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card sx={{padding: "10px"}}>
                  <CardMedia
                    component="img"
                    alt="Yosemite National Park"
                    image={cam1Img}
                    onClick={() => {handleOpen(1)}}
                  />
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                    <Stack direction="column" spacing={0.5} useFlexGap>
                      <Typography sx={{textAlign: 'center'}}>Camera 1 NW</Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{padding: "10px"}}>
                  <CardMedia
                    component="img"
                    alt="Yosemite National Park"
                    image={cam2Img}
                    onClick={() => {handleOpen(2)}}
                  />
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                    <Stack direction="column" spacing={0.5} useFlexGap>
                      <Typography sx={{textAlign: 'center'}}>Camera 2 NE</Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{padding: "10px"}}>
                  <CardMedia
                    component="img"
                    alt="Yosemite National Park"
                    image={cam3Img}
                    onClick={() => {handleOpen(3)}}
                  />
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                    <Stack direction="column" spacing={0.5} useFlexGap>
                      <Typography sx={{textAlign: 'center'}}>Camera 3 SE</Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{padding: "10px"}}>
                  <CardMedia
                    component="img"
                    alt="Yosemite National Park"
                    image={cam4Img}
                    onClick={() => {handleOpen(4)}}
                  />
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                    <Stack direction="column" spacing={0.5} useFlexGap>
                      <Typography sx={{textAlign: 'center'}}>Camera 4 SW</Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Modal
        keepMounted
        open={enlargeOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <img style={{width: '100%'}} src={modalImg} />
        </Box>
      </Modal>
    </div>
  )
}
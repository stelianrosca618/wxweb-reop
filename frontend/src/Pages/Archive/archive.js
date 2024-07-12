import * as React from 'react';
import {Link,  Card, CardMedia, Box, Container, Grid, Button, Stack, Typography, Select, MenuItem, InputLabel, FormControl, CardContent } from "@mui/material"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { LineChart } from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import testImg from '../../assets/data/cam1,m240408180000864.jpg'
import emptyImg from "../../assets/empty.png";
import Modal from '@mui/material/Modal';
import { getCamFourFiles, getReadImgfile } from '../../apis/apiProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const mainButtonStyle = {
  color: 'white', 
   textShadow: ' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;'
 }
 const textStyle = {
  textAlign: 'center', fontWeight: 'bold', color: 'white', textShadow: ' -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;'
 }
 const mediaContentStyle = {padding: '0px !important', position: 'absolute', bottom: 0, width: '100%'}
const hostPath = 'https://denalicams.com';
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

  React.useEffect(() => {
    initLoad();
  }, [])

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
  const initLoad = async () => {
    const imagesData = await getCamFourFiles('cam4');
    if(!imagesData) return;
    // setImagePath(`${hostPath}${imagesData.path}/${imagesData.imagelist[0].name}`);
    if(imagesData.cam1){
      setCam1Img(`${hostPath}${imagesData.cam1}`)  
    }
    if(imagesData.cam2){
      setCam2Img(`${hostPath}${imagesData.cam2}`)  
    }
    if(imagesData.cam3){
      setCam3Img(`${hostPath}${imagesData.cam3}`)  
    }
    if(imagesData.cam4){
      setCam4Img(`${hostPath}${imagesData.cam4}`)  
    }
  }
  const loadImages = async () => {
    // const loadImgPath = `${hostPath}${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}/cam4-m`
    const loadImgPath = `${tyear.toString().padStart(2, '0')}/${tmonth.toString().padStart(2, '0')}/${tdate.toString().padStart(2, '0')}/${thours.toString().padStart(2, '0')}`
    console.log(loadImgPath);
    const imagesArr = await getReadImgfile(loadImgPath);
    if(imagesArr){
      console.log(imagesArr);
      if(imagesArr.cam1){
        const cam1Img = imagesArr.cam1;
        const cam1Path = `${hostPath}/${cam1Img}`
        setCam1Img(cam1Path)
      }
      if(imagesArr.cam2){
        const cam2Img = imagesArr.cam2;
        const cam2Path = `${hostPath}/${cam2Img}`
        setCam2Img(cam2Path)
      }
      if(imagesArr.cam3){
        const cam3Img = imagesArr.cam3;
        const cam3Path = `${hostPath}/${cam3Img}`
        setCam3Img(cam3Path)
      }
      if(imagesArr.cam4){
        const cam4Img = imagesArr.cam4;
        const cam4Path = `${hostPath}/${cam4Img}`
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
      <Box sx={{padding: '1rem', height: '100vh'}}>
        <Grid container sx={{paddingX: 2, paddingY: 0}} spacing={1}>
          <Grid item md={8} xs={12} order={{md: 1, xs: 2}}>
            <Box >
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <Card sx={{position: 'relative', padding: "0", maxHeight: '45vh'}}>
                    <CardMedia
                      component="img"
                      alt="Yosemite National Park"
                      image={cam1Img}
                      onClick={() => {handleOpen(1)}}
                    />
                    <CardContent sx={mediaContentStyle}>
                      <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Typography sx={textStyle}>Camera 1 NW</Typography>
                        </Stack>
                      </Stack>  
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card sx={{position: 'relative', padding: "0", maxHeight: '45vh'}}>
                    <CardMedia
                      component="img"
                      alt="Yosemite National Park"
                      image={cam2Img}
                      onClick={() => {handleOpen(2)}}
                    />
                    <CardContent  sx={mediaContentStyle}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                      <Stack direction="column" spacing={0.5} useFlexGap>
                        <Typography sx={textStyle}>Camera 2 NE</Typography>
                      </Stack>
                    </Stack>
                    </CardContent>
                    
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card sx={{position: 'relative', padding: "0", maxHeight: '45vh'}}>
                    <CardMedia
                      component="img"
                      alt="Yosemite National Park"
                      image={cam3Img}
                      onClick={() => {handleOpen(3)}}
                    />
                    <CardContent sx={mediaContentStyle}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                      <Stack direction="column" spacing={0.5} useFlexGap>
                        <Typography sx={textStyle}>Camera 3 SE</Typography>
                      </Stack>
                    </Stack>
                    </CardContent>
                    
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card sx={{position: 'relative', padding: "0", maxHeight: '45vh'}}>
                    <CardMedia
                      component="img"
                      alt="Yosemite National Park"
                      image={cam4Img}
                      onClick={() => {handleOpen(4)}}
                    />
                    <CardContent sx={mediaContentStyle}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} p={2} useFlexGap>
                      <Stack direction="column" spacing={0.5} useFlexGap>
                        <Typography sx={textStyle}>Camera 4 SW</Typography>
                      </Stack>
                    </Stack>
                    </CardContent>
                    
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={4} xs={12} order={{md: 2, xs: 1}}>
            <Box>
              <Container>
                <Typography sx={{fontWeight: "bold", marginY: 2, textAlign: 'center'}} variant="h4">ARCHIVED IMAGES</Typography> 
                <Box >
                  <Grid container spacing={1}>
                    <Grid item md={12} xs={4}  order={{md: 1, xs: 3}}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tyear}
                          sx={{color: 'white'}}
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
                    </Grid>
                    <Grid item md={12} xs={4}  order={{md: 2, xs: 4}}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tmonth}
                          sx={{color: 'white'}}
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
                    </Grid>
                    <Grid item md={12} xs={4}  order={{md: 3, xs: 5}}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Day</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tdate}
                          label="Day"
                          sx={{color: 'white'}}
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
                    </Grid>
                    <Grid item xs={12} order={{md: 4, xs: 8}}>
                    <span style={{paddingLeft: "30px", paddingRight: "30px"}}></span>
                    </Grid>
                    <Grid item md={12} xs={6} order={{md: 5, xs: 6}}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Hour</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={thours}
                          sx={{color: 'white'}}
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
                    </Grid>
                    <Grid item md={12} xs={6} order={{md: 6, xs: 7}}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Min</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tmins}
                          sx={{color: 'white'}}
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
                    </Grid>
                    <Grid item xs={12} order={{md: 7, xs: 2}}>
                    <Button variant='contained' onClick={() => {loadImages()}} sx={mainButtonStyle} fullWidth>Load</Button>
                    </Grid>
                    <Grid item xs={12} order={{md: 8, xs: 1}}>
                      <Link href="/" sx={{width: '100%'}}>
                        <Button variant='outlined' onClick={() => {loadImages()}} sx={mainButtonStyle} fullWidth><ChevronLeftIcon /> Back To Home</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Grid>
        </Grid>
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
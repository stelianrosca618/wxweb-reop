import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import emptyImg from "../../assets/empty.png";
import {Link, Card, CardMedia, Stack, Typography, Container, CardContent, Paper } from '@mui/material';
import {Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import weatherBrand from '../../assets/weatherBrand.png';
import CircularProgress from '@mui/material/CircularProgress';
import Carousel from 'react-material-ui-carousel'
import { getWeatherData, getReadImgfile, getCamFourFiles, getTimeLapsImgs } from '../../apis/apiProvider';
import { Timelapse } from './TimeLapse';
const hostPath = 'https://denalicams.com';
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

export const Home = () => {
  const [enlargeOpen, setEnlargeOpen] = React.useState(false);
  
  const [isLoadedData, setIsLoadedData] = React.useState(false);
  const [wDaydata, setWDayData] = React.useState(new Date());
  const [tempData, setTempData] = React.useState(0);
  const [dewData, setDewData] = React.useState(0);
  const [winddir, setWinddir] = React.useState(0);
  const [windGuest, setWindGuest] = React.useState(0);
  const [windSpeed, setWindSpeed] = React.useState(0);
  const [barometer, setBarometer] = React.useState(0);
  const [isUpBarometer, setIsUpBarometer] = React.useState(false);
  const [modalImg, setModalImg] = React.useState(emptyImg);
  const [image1Path, setImage1Path] = React.useState(emptyImg);
  const [image2Path, setImage2Path] = React.useState(emptyImg);
  const [image3Path, setImage3Path] = React.useState(emptyImg);
  const [image4Path, setImage4Path] = React.useState(emptyImg);
  const [camTimeVal, setCamTimeVal] = React.useState('');
  const [timelapsImgs, setTimelapsImgs] = React.useState([]);
  const [timelapsOpen, setTimelapsOpen] = React.useState(false);
  const handleClose = () => {
    setEnlargeOpen(false);
  }
  
  React.useEffect(() => {
    loadAllData()
    const loadInterval = setInterval(()=>{ loadAllData()}, 60000);
    return () => clearInterval(loadInterval);
  }, [])
  const loadAllData = async () => {
     loadWeatherData();
     loadCamData();
  }
  const loadCamData = async () => {
    const imagesData = await getCamFourFiles('cam4');
    if(!imagesData) return;
    // setImagePath(`${hostPath}${imagesData.path}/${imagesData.imagelist[0].name}`);
    if(imagesData.cam1){
      setImage1Path(`${hostPath}${imagesData.cam1}`)  
    }
    if(imagesData.cam2){
      setImage2Path(`${hostPath}${imagesData.cam2}`)  
    }
    if(imagesData.cam3){
      setImage3Path(`${hostPath}${imagesData.cam3}`)  
    }
    if(imagesData.cam4){
      setImage4Path(`${hostPath}${imagesData.cam4}`)  
    }
   
  }
  

  const loadWeatherData = async () => {
    const weatherData = await getWeatherData();
    console.log(weatherData);
    if(!weatherData) return;
    const dateVal = new Date(weatherData[0].date);
    setWDayData(dateVal);
    setTempData(weatherData[0].tempf);
    setDewData(weatherData[0].dewPoint);
    setWinddir(weatherData[0].winddir);
    setWindGuest(weatherData[0].windgustmph);
    setWindSpeed(weatherData[0].windspeedmph);
    setBarometer(weatherData[0].baromabsin);
    const isUp = (weatherData[0].baromabsin - weatherData[0].baromrelin) > 0? true : false;
    setIsUpBarometer(isUp);
    setIsLoadedData(true);
  }

  const handleOpen = (camNum) => {
    switch(camNum){
      case 1:
        setModalImg(image1Path)
        break;
      case 2:
        setModalImg(image2Path)
        break;
      case 3:
        setModalImg(image3Path)
        break;
      case 4:
        setModalImg(image4Path)
        break;
    }
    
    setEnlargeOpen(true);
  }

  const getTimeLapsImageArr = async (camStr) => {
    if(camStr !== camTimeVal){
      const nowDate = new Date();
      const yearNum = nowDate.getFullYear();
      const monthNum = nowDate.getMonth() + 1;
      const dayNum = nowDate.getDate();
      const path = `${camStr}/${yearNum.toString().padStart(2, '0')}/${monthNum.toString().padStart(2, '0')}/${dayNum.toString().padStart(2, '0')}`
      const imgRes = await getTimeLapsImgs(path);
      if(!imgRes) return;
      // imgRes.sort((a, b) => a.modified - b.modified);
      console.log(imgRes);
      setTimelapsImgs(imgRes);
      handleTimelapsOpen();
    }else if(timelapsImgs.length < 1) {
      const nowDate = new Date();
      const yearNum = nowDate.getFullYear();
      const monthNum = nowDate.getMonth() + 1;
      const dayNum = nowDate.getDate();
      const path = `${camStr}/${yearNum.toString().padStart(2, '0')}/${monthNum.toString().padStart(2, '0')}/${dayNum.toString().padStart(2, '0')}`
      const imgRes = await getTimeLapsImgs(path);
      if(!imgRes) return;
      // imgRes.sort((a, b) => a.modified - b.modified);
      console.log(imgRes);
      setTimelapsImgs(imgRes);
      handleTimelapsOpen();
    }else{
      handleTimelapsOpen();
    }
    setCamTimeVal(camStr);
  }
  const handleTimelapsOpen = () => {
    setTimelapsOpen(true);
  }
  const handleTimelapsClose = () => {
    setTimelapsOpen(false);
  }
  return (
    <div>
      <Container>
        <Box sx={{padding: '1rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Box>
                <Grid container spacing={2} padding={4}>
                  <Grid item xs={6}>
                    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={image1Path}
                        onClick={() => {handleOpen(1)}}
                      />
                      <CardContent sx={{paddingY: '0px !important'}}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Typography variant='body1' sx={{textAlign: 'center'}}>Camera 1 NW</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={1} useFlexGap>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {handleOpen(1)}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                          </Stack>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {getTimeLapsImageArr('cam1')}} variant="outlined" size="small" sx={{padding: "3px"}}>TIME-LAPSE</Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={image2Path}
                        onClick={() => {handleOpen(2)}}
                      />
                      <CardContent sx={{paddingY: '0px !important'}}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Typography sx={{textAlign: 'center'}}>Camera 2 NE</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={1} useFlexGap>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {handleOpen(2)}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                          </Stack>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {getTimeLapsImageArr('cam2')}} variant="outlined" size="small" sx={{padding: "3px"}}>TIME-LAPSE</Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                      
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={image4Path}
                        onClick={() => {handleOpen(4)}}
                      />
                      <CardContent sx={{paddingY: '0px !important'}}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Typography sx={{textAlign: 'center'}}>Camera 4 SW</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={2} useFlexGap>
                          <Stack direction='column' spacing={0.5} useFlexGap>
                            <Button onClick={() => {handleOpen(4)}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                          </Stack>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {getTimeLapsImageArr('cam3')}} variant="outlined" size="small" sx={{padding: "3px"}}>TIME-LAPSE</Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                      
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={image3Path}
                        onClick={() => {handleOpen(3)}}
                      />
                      <CardContent sx={{paddingY: '0px !important'}}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Typography sx={{textAlign: 'center'}}>Camera 3 SE</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={2} useFlexGap>
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {handleOpen(3)}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                          </Stack>
                        
                          <Stack direction="column" spacing={0.5} useFlexGap>
                            <Button onClick={() => {getTimeLapsImageArr('cam4')}} variant="outlined" sx={{padding: "3px"}} size="small">TIME-LAPSE</Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Grid container spacing={1} padding={2}>
                <Grid item xs={12} textAlign={'center'}>
                  <img style={{maxWidth: '100%', maxHeight: "120px", margin: "auto"}} src={weatherBrand}/>
                </Grid>
                {!isLoadedData &&
                  <Grid width='100%'>
                    <Stack direction="row" width='100%' height={200} spacing={10} alignItems='center' justifyContent='center' useFlexGap>
                      <CircularProgress />
                    </Stack>
                  </Grid>
                }
                {isLoadedData && <><Grid item xs={12} marginY={1}>
                  <Stack direction="row" spacing={15} alignItems='center' justifyContent='center' useFlexGap>
                    <Stack direction='column' useFlexGap>
                      <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{String((wDaydata.getMonth()+1)).padStart(2, '0')} / {String(wDaydata.getDate()).padStart(2, '0')}</Typography>
                    </Stack>
                    <Stack direction='column' useFlexGap>
                      <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{String(wDaydata.getHours()).padStart(2, '0')} : {String(wDaydata.getMinutes()).padStart(2, '0')}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} marginY={1}>
                  <Stack direction="row" spacing={15} alignItems='center' justifyContent='center' useFlexGap>
                    <Stack direction='column' useFlexGap>
                      <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{tempData} &ordm;</Typography>
                      <Typography variant='body2' sx={{textAlign: 'center'}}>TEMP</Typography>
                    </Stack>
                    <Stack direction='column' useFlexGap>
                      <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{dewData} &ordm;</Typography>
                      <Typography variant='body2' sx={{textAlign: 'center'}}>DEW POINT</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} marginY={1}>
                  <Stack direction='column' spacing={2} useFlexGap>
                    <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{winddir} &#x2da;@ {windSpeed} G {windGuest}</Typography>
                    <Typography variant='body2' sx={{textAlign: 'center'}}>WIND (KTS)</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} marginY={1}>
                  <Stack direction='column' spacing={1} useFlexGap>
                    <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{barometer} {isUpBarometer? `∆` : `∇`}</Typography>
                    <Typography variant='body2' sx={{textAlign: 'center'}}>BAROMETER (inHg)</Typography>
                  </Stack>
                </Grid></>}
                <Grid item xs={12} sx={{marginTop: '3rem'}}> 
                  <Stack direction='column' textAlign={'center'} spacing={3} useFlexGap>
                    <Link href="/wxtrends" underline="always">
                      <Button variant="white" size="large">WEATHER TRENDS</Button>
                    </Link>
                    <Link href="/archive" underline="always">
                      <Button variant="white" size="large">ARCHIVE IMAGES</Button>
                    </Link>      
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Modal
    keepMounted
    open={timelapsOpen}
    onClose={handleTimelapsClose}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Carousel>
      {timelapsImgs.map((imgItem, key) => (
        <Paper key={key} sx={{textAlign: 'center'}}>
<img style={{height: '250px', margin: 'auto'}} src={`https://denalicams.com/${imgItem.path}`} />
<p className="legend" style={{textAlign: 'center'}}>{imgItem.modified}</p>
        </Paper>
        
      ))}
      </Carousel>
      </Box>
      
    </Modal>
        <Modal
          keepMounted
          open={enlargeOpen}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <img style={{maxWidth: '500px'}} src={modalImg} />
          </Box>
        </Modal>
      </Container>
    </div>
  )
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import emptyImg from "../../assets/empty.png";
import {Link, Card, CardMedia, Stack, Typography, Container } from '@mui/material';
import {Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import weatherBrand from '../../assets/weatherBrand.png';
import CircularProgress from '@mui/material/CircularProgress';

import { getWeatherData, getReadImgfile, getCamFourFiles } from '../../apis/apiProvider';
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
  const [imagePath, setImagePath] = React.useState(emptyImg);
  const handleClose = () => {
    setEnlargeOpen(false);
  }
  
  React.useEffect(() => {
    loadCamForData();
    loadWeatherData()
    const loadInterval = setInterval(()=>{ loadWeatherData()}, 60000);
    return () => clearInterval(loadInterval);
  }, [])
  
  const loadCamForData = async () => {
    const imagesData = await getCamFourFiles('cam4');
    setImagePath(`${hostPath}${imagesData.path}/${imagesData.imagelist[0].name}`);
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

  const handleOpen = () => {
    setEnlargeOpen(true);
  }

  const getImagefiles = async () => {
    const imgRes = await getReadImgfile();
    console.log(imgRes);
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
                    <Card>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={imagePath}
                        onClick={() => {handleOpen()}}
                      />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Typography variant='body1' sx={{textAlign: 'center'}}>Camera 1 NW</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={1} useFlexGap>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button onClick={() => {handleOpen()}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                        </Stack>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button variant="outlined" size="small" sx={{padding: "3px"}}>TIME-LAPSE</Button>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={imagePath}
                        onClick={() => {handleOpen()}}
                      />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Typography sx={{textAlign: 'center'}}>Camera 2 NE</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={1} useFlexGap>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button onClick={() => {handleOpen()}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                        </Stack>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button variant="outlined" size="small" sx={{padding: "3px"}}>TIME-LAPSE</Button>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={imagePath}
                        onClick={() => {handleOpen()}}
                      />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Typography sx={{textAlign: 'center'}}>Camera 4 SW</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={2} useFlexGap>
                        <Stack direction='column' spacing={0.5} useFlexGap>
                          <Button onClick={() => {handleOpen()}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                        </Stack>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button variant="outlined" size="small" sx={{padding: "3px"}}>TIME-LAPSE</Button>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt="Yosemite National Park"
                        image={imagePath}
                        onClick={() => {handleOpen()}}
                      />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} paddingTop={1}>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Typography sx={{textAlign: 'center'}}>Camera 3 SE</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} p={2} useFlexGap>
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button onClick={() => {handleOpen()}} variant="outlined" size="small" sx={{padding: "3px"}}>ENLARGE</Button>
                        </Stack>
                      
                        <Stack direction="column" spacing={0.5} useFlexGap>
                          <Button variant="outlined" sx={{padding: "3px"}} size="small">TIME-LAPSE</Button>
                        </Stack>
                      </Stack>
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
                    <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant="h5">{winddir} &#x2da;@ {windGuest} G {windSpeed}</Typography>
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
                      <Button variant="white" size="large">WEATUER TRENDS</Button>
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
          open={enlargeOpen}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <img style={{maxWidth: '500px'}} src={imagePath} onClick={() => getImagefiles()}/>
          </Box>
        </Modal>
      </Container>
    </div>
  )
}
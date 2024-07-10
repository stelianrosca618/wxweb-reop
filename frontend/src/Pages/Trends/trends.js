import * as React from 'react';
import {Link, Box, Container, Grid, Button, Stack, Typography } from "@mui/material"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { LineChart } from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { getWeatherTrends } from '../../apis/apiProvider';
import CircularProgress from '@mui/material/CircularProgress';

const defaultSeries = [
  { id: '1', data: [4, 5, 1, 2, 3, 3, 2], area: true, stack: '1' },
  { id: '2', data: [7, 4, 6, 7, 2, 3, 5], area: true, stack: '1' },
  { id: '3', data: [6, 4, 1, 2, 6, 3, 3], area: true, stack: '1' },
  { id: '4', data: [4, 7, 6, 1, 2, 7, 7], area: true, stack: '1' },
  { id: '5', data: [2, 2, 1, 7, 1, 5, 3], area: true, stack: '1' },
  { id: '6', data: [6, 6, 1, 6, 7, 1, 1], area: true, stack: '1' },
  { id: '7', data: [7, 6, 1, 6, 4, 4, 6], area: true, stack: '1' },
  { id: '8', data: [4, 3, 1, 6, 6, 3, 5], area: true, stack: '1' },
  { id: '9', data: [7, 6, 2, 7, 4, 2, 7], area: true, stack: '1' },
].map((item, index) => ({
  ...item,
  color: mangoFusionPalette('light')[index],
}));

export const Trends = () => {
  // const [series, setSeries] = React.useState(defaultSeries);
  // const [wxSeries, setWxSeries] = React.useState([4, 5, 1, 2, 3, 3, 2]);
  // const [wtSeries, setWtSeries] = React.useState([7, 4, 6, 7, 2, 3, 5]);
  // const [nbSeries, setNbSeries] = React.useState(3);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const [xAxisData, setXAxisData] = React.useState([]);
  const [dewPoints, setDewPoints] = React.useState([]);
  const [tempPoints, setTempPoints] = React.useState([]);
  const [windSpeeds, setWindSpeeds] = React.useState([]);
  const [windGuests, setWindGuests] = React.useState([]);
  const [windDirs, setWindDirs] = React.useState([]);
  const [baromaters, setBaromaters] = React.useState([]);
  const [isloaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    getTrendsData()
    
  }, [])

  const getTrendsData = async () => {
    const trendsData = await getWeatherTrends();
    console.log('trendsData', trendsData)
    let tmpXAxis = []; let tmpWSpeeds = [];
    let tmpDews = []; let tmpWGuests = [];
    let tmpTemps = []; let tmpWDirs = [];
    let tmpBarometers = [];
    trendsData.map(tItem => {
      const itemDate = new Date(tItem.date);
      console.log(itemDate.getDate(), itemDate.getMonth(), itemDate.getHours(), itemDate.getMinutes(), itemDate.getSeconds())

      tmpXAxis.push(`${itemDate.getHours()}:${itemDate.getMinutes()}`);
      tmpDews.push(tItem.dewPoint)
      tmpTemps.push(tItem.tempf)
      tmpWSpeeds.push(tItem.windspeedmph);
      tmpWGuests.push(tItem.windgustmph);
      tmpWDirs.push(tItem.winddir);
      tmpBarometers.push(tItem.baromabsin);
    });
    setXAxisData(tmpXAxis);
    setDewPoints(tmpDews);
    setTempPoints(tmpTemps);
    setWindSpeeds(tmpWSpeeds);
    setWindGuests(tmpWGuests);
    setWindDirs(tmpWDirs);
    setBaromaters(tmpBarometers);
    setIsLoaded(true);
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
                  <Typography sx={{fontWeight: "bold", marginTop: '2rem'}} variant="h3">WEATHER DATA</Typography>  
                  <Typography></Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box>
        <Grid container spacing={3}>
          {!isloaded &&
            <Grid width='100%'>
              <Stack direction="row" width='100%' height={400} spacing={10} alignItems='center' justifyContent='center' useFlexGap>
                <CircularProgress />
              </Stack>
            </Grid>
          }
          {isloaded && <>
            <Grid item xs={12}>
              <LineChart
                xAxis={[{scaleType: 'point', data: xAxisData }]}
                series={[
                  {data: tempPoints, label: 'TEMPERATURE', showMark: false},
                  { data: dewPoints, label: 'DEW POINTS', showMark: false},
                  ]}
                skipAnimation={skipAnimation}
                height={400}
              />
            </Grid>
            <Grid item xs={12}>
              <LineChart
                xAxis={[{scaleType: 'point', data: xAxisData }]}
                series={[
                    { data: windSpeeds, label: 'WIND SPEED', showMark: false},
                    { data: windGuests, label: 'WIND GUEST', showMark: false},
                  ]}
                skipAnimation={skipAnimation}
                height={400}
              />
            </Grid>
            <Grid item xs={12}>
              <LineChart
                xAxis={[{scaleType: 'point', data: xAxisData }]}
                series={[
                    { data: windDirs, label: 'WIND DIRECTION', showMark: false},
                  ]}
                skipAnimation={skipAnimation}
                height={400}
              />
            </Grid>
            <Grid item xs={12}>
                <LineChart
                  xAxis={[{scaleType: 'point', data: xAxisData }]}
                  series={[
                    { data: baromaters, label: 'BAROMENTIC PRESSURE', showMark: false},
                  ]}
                  skipAnimation={skipAnimation}
                  height={400}
                />
            </Grid>
          </>}
        </Grid>
      
      </Box>
    </div>
  )
}
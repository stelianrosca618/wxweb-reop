
const config = require('config.json');
// var fs = require('fs');
// var { readdirSync } = require('fs');
// const fs = require('fs').promises;
// const path = require('path');

const { Client } = require("basic-ftp") 
const AmbientWeatherApi = require("ambient-weather-api");

const api = new AmbientWeatherApi({
    apiKey: "dc4f47d539594e92b9a7430908a7ce5c19617be05e2940cd8fe3af4add20ceb9",
    applicationKey: 'e1bd181957384fa4ae8e029000322fcc07ca5d2b57b94dc3ab92a747b36e33ec'
  });
module.exports = {
    readWXImgFile,
    latestCam1file,
    latestCamfile,
    getTimelapsImgs,
    readWeatherData,
    getWeatherTrends
};

// async function readWXImgFile({cameraname, yearNum, monthNum, dayNum, hour }) {
async function readWXImgFile(pathData) {
    console.log(pathData);
    const client = new Client()
    client.ftp.verbose = true;
    let listData = null;
    
    let cam1ImgPath = null;
    let cam2ImgPath = null;
    let cam3ImgPath = null;
    let cam4ImgPath = null;
    await client.access({
        port: 21,
        host: "denalicams.com",
        user: "wxwebappusr",
        password: "Dr0p!Offs",
    })
    try {
        const cam1List = await client.list(`/public_html/cam_images/cam1/${pathData.path}`);
        if(cam1List.length > 0){
            const cam1ImgItem = cam1List[cam1List.length - 1];
            cam1ImgPath = `cam_images/cam1/${pathData.path}/${cam1ImgItem.name}`
        }
        
    } catch (error) {
        cam1ImgPath = null;
    }
    try {
        const cam2List = await client.list(`/public_html/cam_images/cam2/${pathData.path}`)
        if(cam2List.length > 0){
            const cam2ImgItem = cam2List[cam2List.length - 1];
            cam2ImgPath = `cam_images/cam2/${pathData.path}/${cam2ImgItem.name}`
        }
    } catch (error) {
        cam2ImgPath = null
    }
    try {
        const cam3List = await client.list(`/public_html/cam_images/cam3/${pathData.path}`)
        if(cam3List.length > 0){
            const cam3ImgItem = cam3List[cam3List.length - 1];
            cam3ImgPath = `cam_images/cam3/${pathData.path}/${cam3ImgItem.name}`
        }
    } catch (error) {
        cam3ImgPath = null
    }
    try {
        const cam4List = await client.list(`/public_html/cam_images/cam4/${pathData.path}`);
        if(cam4List.length > 0){
            const cam4ImgItem = cam4List[cam4List.length - 1];
            cam4ImgPath = `cam_images/cam4/${pathData.path}/${cam4ImgItem.name}`
        }
    } catch (error) {
        cam4ImgPath = null
    }
    listData = {cam1: cam1ImgPath, cam2: cam2ImgPath, cam3: cam3ImgPath, cam4: cam4ImgPath};
    client.close();
    return listData;
}

async function getTimelapsImgs(pathData) {
    const client = new Client();
    // client.ftp.verbose = true;
    let yearList = null;
    await client.access({
        port: 21,
        host: "denalicams.com",
        user: "wxwebappusr",
        password: "Dr0p!Offs",
    })
    

    const camList = await client.list(`/public_html/cam_images/${pathData.path}`);
    let fileImgsList = [];
    const limitCount = camList.length > 5? 5:camList.length;
    for (let index = 0; index < limitCount; index++) {
        // const element = array[index];
        const loadedArr = await client.list(`/public_html/cam_images/${pathData.path}/${camList[index].name}`);
        loadedArr.map(fileItem => {
            console.log(fileItem);
            fileImgsList.push({
                path: `cam_images/${pathData.path}/${camList[index].name}/${fileItem.name}`,
                name: fileItem.name,
                modified: fileItem.modifiedAt
            })        
        })
    }

   
    return fileImgsList;
    // client.close()
}

async function latestCamfile(camData) {
    console.log(camData);
    const client = new Client()
    client.ftp.verbose = true;
    let resultData = null;
    
    try {
        await client.access({
            port: 21,
            host: "denalicams.com",
            user: "wxwebappusr",
            password: "Dr0p!Offs",
        })
        const cam1Path = await loadCam1Latest(client);
        const cam2Path = await loadCam2Latest(client);
        const cam3Path = await loadCam3Latest(client);
        const cam4Path = await loadCam4Latest(client);
        resultData = {cam1: cam1Path, cam2: cam2Path, cam3: cam3Path, cam4: cam4Path};
    //     const cam4List = await client.list(`/public_html/cam_images/${camData.camStr}`);
    //     const yearVal = cam4List[0].name;
    //     const cam4Months = await client.list(`/public_html/cam_images/cam4/${yearVal}`);
    //     cam4Months.sort((a, b) => parseInt(b.name) - parseInt(a.name));
    //     const dayVal = cam4Months[0].name;
    //     const cam4Days = await client.list(`/public_html/cam_images/cam4/${yearVal}/${dayVal}`);
    //     cam4Days.sort((a, b) => parseInt(b.name) - parseInt(a.name));
    //     const hourVal = cam4Days[0].name;
    //     const cam4Hours = await client.list(`/public_html/cam_images/cam4/${yearVal}/${dayVal}/${hourVal}`);
    //     cam4Hours.sort((a, b) => parseInt(b.name) - parseInt(a.name));
    //     const imgsVal = cam4Hours[0].name;
    //     const cam4Imgs = await client.list(`/public_html/cam_images/cam4/${yearVal}/${dayVal}/${hourVal}/${imgsVal}`);
    //     // cam4Imgs.sort((a, b) => parseInt(b.name) - parseInt(a.name));
    //    listData = cam4Imgs[cam4Imgs.length - 1];
    //    const imgNameStr = listData.name;
    //    imgPath = `/cam_images/cam4/${yearVal}/${dayVal}/${hourVal}/${imgsVal}/${imgNameStr}`;
       client.close()
    }
    catch(err) {
        console.log(err)
        client.close()
        resultData = null;
    }
    // client.close();
    return resultData;
}

async function loadCam1Latest(client) {
    let imgPath = null;
    try {
        const camList = await client.list(`/public_html/cam_images/cam1`);
        const yearVal = camList[0].name;
        const camMonths = await client.list(`/public_html/cam_images/cam1/${yearVal}`);
        camMonths.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const dayVal = camMonths[0].name;
        const camDays = await client.list(`/public_html/cam_images/cam1/${yearVal}/${dayVal}`);
        camDays.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const hourVal = camDays[0].name;
        const camHours = await client.list(`/public_html/cam_images/cam1/${yearVal}/${dayVal}/${hourVal}`);
        camHours.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const imgsVal = camHours[0].name;
        const camImgs = await client.list(`/public_html/cam_images/cam1/${yearVal}/${dayVal}/${hourVal}/${imgsVal}`);
        const listData = camImgs[camImgs.length - 1];
        const imgNameStr = listData.name;
        imgPath = `/cam_images/cam1/${yearVal}/${dayVal}/${hourVal}/${imgsVal}/${imgNameStr}`;
    } catch (error) {
        imgPath = null;
    }
    return imgPath;
}
async function loadCam2Latest(client) {
    let imgPath = null;
    try {
        const camList = await client.list(`/public_html/cam_images/cam2`);
        const yearVal = camList[0].name;
        const camMonths = await client.list(`/public_html/cam_images/cam2/${yearVal}`);
        camMonths.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const dayVal = camMonths[0].name;
        const camDays = await client.list(`/public_html/cam_images/cam2/${yearVal}/${dayVal}`);
        camDays.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const hourVal = camDays[0].name;
        const camHours = await client.list(`/public_html/cam_images/cam2/${yearVal}/${dayVal}/${hourVal}`);
        camHours.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const imgsVal = camHours[0].name;
        const camImgs = await client.list(`/public_html/cam_images/cam2/${yearVal}/${dayVal}/${hourVal}/${imgsVal}`);
        const listData = camImgs[camImgs.length - 1];
        const imgNameStr = listData.name;
        imgPath = `/cam_images/cam2/${yearVal}/${dayVal}/${hourVal}/${imgsVal}/${imgNameStr}`;
    } catch (error) {
        imgPath = null;
    }
    return imgPath;
}
async function loadCam3Latest(client) {
    let imgPath = null;
    try {
        const camList = await client.list(`/public_html/cam_images/cam3`);
        const yearVal = camList[0].name;
        const camMonths = await client.list(`/public_html/cam_images/cam3/${yearVal}`);
        camMonths.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const dayVal = camMonths[0].name;
        const camDays = await client.list(`/public_html/cam_images/cam3/${yearVal}/${dayVal}`);
        camDays.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const hourVal = camDays[0].name;
        const camHours = await client.list(`/public_html/cam_images/cam3/${yearVal}/${dayVal}/${hourVal}`);
        camHours.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const imgsVal = camHours[0].name;
        const camImgs = await client.list(`/public_html/cam_images/cam3/${yearVal}/${dayVal}/${hourVal}/${imgsVal}`);
        const listData = camImgs[camImgs.length - 1];
        const imgNameStr = listData.name;
        imgPath = `/cam_images/cam3/${yearVal}/${dayVal}/${hourVal}/${imgsVal}/${imgNameStr}`;
    } catch (error) {
        imgPath = null;
    }
    return imgPath;
}
async function loadCam4Latest(client) {
    let imgPath = null;
    try {
        const camList = await client.list(`/public_html/cam_images/cam4`);
        const yearVal = camList[0].name;
        const camMonths = await client.list(`/public_html/cam_images/cam4/${yearVal}`);
        camMonths.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const dayVal = camMonths[0].name;
        const camDays = await client.list(`/public_html/cam_images/cam4/${yearVal}/${dayVal}`);
        camDays.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const hourVal = camDays[0].name;
        const camHours = await client.list(`/public_html/cam_images/cam4/${yearVal}/${dayVal}/${hourVal}`);
        camHours.sort((a, b) => parseInt(b.name) - parseInt(a.name));
        const imgsVal = camHours[0].name;
        const camImgs = await client.list(`/public_html/cam_images/cam4/${yearVal}/${dayVal}/${hourVal}/${imgsVal}`);
        const listData = camImgs[camImgs.length - 1];
        const imgNameStr = listData.name;
        imgPath = `/cam_images/cam4/${yearVal}/${dayVal}/${hourVal}/${imgsVal}/${imgNameStr}`;
    } catch (error) {
        imgPath = null;
    }
    return imgPath;
}

async function latestCam1file() {
    const client = new Client()
    client.ftp.verbose = true;
    let listData = null;
    try {
        await client.access({
            port: 21,
            host: "denalicams.com",
            user: "wxwebappusr",
            password: "Dr0p!Offs",
        })
        const cam1List = await client.list(`/public_html/cam_images/cam1`);
        
        // console.log(await client.list())
        // const nowDate = new Date();
        // const yearNum = nowDate.getFullYear().toString();
        // const monthNum = nowDate.getMonth() + 1;
        // const dateNum = nowDate.getDate();
        // const directoryList = await client.list(`/cam1/${yearNum}/${monthNum.toString().padStart(2, "0")}/${dateNum.toString().padStart(2, "0")}`);
        // let modifyDate = null;
        // let pathName = null;
        // directoryList.map((item, key) => {
        //     const modItemDate = new Date(item.modifiedAt);
        //     if(item.type == 2){
        //         if(key == 0 ){
        //             modifyDate = modItemDate;
        //             pathName = item.name;
        //         }else if(modifyDate.getTime() < modItemDate.getTime()){
        //             modifyDate = modItemDate;
        //             pathName = item.name;
        //         }
        //     }
        // })
        // const fileListArr = await client.list(`/cam1/${yearNum}/${monthNum.toString().padStart(2, "0")}/${dateNum.toString().padStart(2, "0")}/${pathName}`);
        
        // fileListArr.map((fItem, indexKey) => {
        //     if(fItem.type == 1){
        //         if(indexKey == 0){
        //             listData = fItem;
        //         }else if(listData.modifiedAt < fItem.modifiedAt){
        //             listData = fItem;
        //         }
        //     }
        // })
        // if(listData){
        //     const fPath = `/cam1/${yearNum}/${monthNum.toString().padStart(2, "0")}/${dateNum.toString().padStart(2, "0")}/${pathName}/${listData.name}`
        //     await client.downloadTo('/check.jpg', fPath);
        // }
        client.close()
       
    }
    catch(err) {
        console.log(err)
    }
    client.close();
    return listData;
}

async function readWeatherData() {
    
    const devices = await api.userDevices();
    const deviceData = await api.deviceData(devices[0].macAddress, {limit: 1});
    return deviceData;
}

async function getWeatherTrends() {
    const devices = await api.userDevices();
    const deviceData = await api.deviceData(devices[0].macAddress);
    return deviceData;
}
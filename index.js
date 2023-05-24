const express = require('express');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
require('dotenv').config();


const PORT = 8080;

const APP_ID = process.env.APP_ID
const APP_CERTIFICATE = process.env.APP_CERTIFICATE

const app = express();

const nocache = (req, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pargma','no-cache');
    next();
}

const generateAccessToken = (req, resp) => {
    resp.header('Access-Control-Allow-Origin', '*');
    const channelName = req.query.channelName;
    const uid = 0;
    const role = RtcRole.PUBLISHER

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)
  
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    return resp.json({'token':token});
}

app.get('/access-token', nocache, generateAccessToken);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
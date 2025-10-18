import {StreamChat } from "stream-chat"

import "dotenv/config"

const apiKey=process.env.STEAM_API_KEY
const apiSecret=process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret){
  console.error("Please set your Steam API key and secret in your .env file")
}

const steamClient =StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async(userData)=>{
  try{
    await steamClient.upsertUsers([userData]);
    return userData;

  }catch(error){
    console.error("Error upserting stream user",error);

  }
};

export const generateStreamToken=(userId)=>{
  try{
    const userIdStr=userId.toString();
    return steamClient.createToken(userId)

  }catch(error){
    console.error("Error generating stream token",error);
  }
}
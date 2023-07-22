import ky from "ky";
const apiPrefixUrl = "https://api.dragonforged.games/.netlify/functions/";

const _API = ky.create({ prefixUrl: apiPrefixUrl });

async function dragonforgedApiCall(path, body) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await _API
      .post(path, {
        json: body,
        headers: headers,
      })
      .json();
    return response;
  } catch (e) {
    console.log(e)
    return { error: e.message };
  }
}

async function getGrid(hash) {
  const path = "getGrid";
  const body = {hash: hash};

  return await dragonforgedApiCall(path, body);
}

async function getFreePixelTime(account) {
  if (account){
    const path = "getFreePixelTime";
    const body = {account: account};

    return await dragonforgedApiCall(path, body);
  }
  else {
    return null;
  }
}

async function placePixel(account, message, signature, pixelId, color) {
  if (account){
    const path = "placePixel";
    const body = {account: account, message: message, signature: signature, pixelId: pixelId, color: color};
    return await dragonforgedApiCall(path, body);
  }
  else{
    return null;
  }
}

async function uploadData(tokenId, imgURI) {
    const path = "uploadData";
    const body = {tokenId: tokenId, imgURI: imgURI};
    return await dragonforgedApiCall(path, body);
}

export const dragonforgedAPI = {
  getGrid,
  getFreePixelTime,
  placePixel,
  uploadData
};
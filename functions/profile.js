const fetch = require("node-fetch");
const qs = require("querystring");

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET'
  };
exports.handler = async (event) => {
  const apiUri = "https://ipfs.3box.io";

  try {
    console.log(event)
    const { id } = qs.parse(event.queryStringParameters);
    console.log(id);
    console.log(event.queryStringParameters,event.queryStringParameters.id)
    const response = await fetch(`${apiUri}/profile?address=${event.queryStringParameters,event.queryStringParameters.id}`);

    // upon 404, fail silently and return
    if (!response || !response.ok || response.status !== 200) {
      return {
        statusCode: 200,
        headers,
        body: "error",
      };
    }

    const responseJson = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseJson),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: "error",
    };
  }
};

const fetch = require("node-fetch");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET",
};
exports.handler = async (event) => {
  const apiUri = "https://ipfs.3box.io";

  try {
    console.log(event);
    const id = event.queryStringParameters.series
      ? event.queryStringParameters.series
      : event.path.split("/")[2];
    console.log("id", id);

    const response = await fetch(
      `${apiUri}/profile?address=${
        (event.queryStringParameters, event.queryStringParameters.id)
      }`
    );

    // upon 404, fail silently and return
    if (!response || !response.ok || response.status !== 200) {
      return {
        statusCode: 200,
        body: "error",
      };
    }

    const responseJson = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseJson),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 200,
      body: "error",
    };
  }
};

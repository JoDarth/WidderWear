// googleSheetsService.js
const { google } = require("googleapis");
const path = require("path");

// Replace with your actual key file name
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "widderwear1858-65b3044fdfb4.json"), // e.g., 'widderwear1858-xxxx.json'
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Replace with your actual spreadsheet ID
const SPREADSHEET_ID = "17LLzalWF4NVCw1c0cn17gfI2-1HnpXIJgnlM_MCSEwE";

async function getInventory() {
  const client = await auth.getClient();
  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1", // Change if your sheet/tab has a different name
  });
  return res.data.values;
}

module.exports = { getInventory };

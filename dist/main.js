/**
 * @OnlyCurrentDoc
 */

function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

function getProducts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("products");
  const data = ws
    .getRange("A1:D")
    .getValues()
    .filter((r) => r[0] !== "");
  // Output example: [
  //  [ 1, "汝釉", 20, 1000 ],
  //  [ 2, "青花瓷", 10, 2000 ],
  //  [ 3, "杯托", 25, 3000 ],
  // ]
  return data;
}

function createProduct(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("products");
  ws.appendRow(data);
}

function updateProduct(data) {
  const row = data[0] + 1;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("products");
  const range = ws.getRange(`A${row}:D${row}`);
  // Data example: [ 1, "汝釉", 20, 1000 ]
  range.setValues([data]);
}

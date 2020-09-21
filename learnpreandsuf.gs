var CHANNEL_ACCESS_TOKEN = 'Q/RI2iBYC8Q/LPI5NM/Oj1j/yQSW8/6KmNttSWLZeLa5IGrWidUjVtvaZZ9J61xe+Ml/F/NrP5i5Hu2JjXuSOvIGQ7wCUNVvqN3cTDZshc/JX5wK6X6Jz1C+Wxdd435t4x8uRjEB9THIwsY3cut8FgdB04t89/1O/w1cDnyilFU='; 
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  
  if (typeof reply_token === 'undefined') {
    
    return;
    
  }

  var user_message = json.events[0].message.text;  
  
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1XyhzdgO1X0p8hPzMVMjAyeoMod_lLjB5AJfXtXxnoe0/edit#gid=0');
  var sheet = spreadsheet.getSheetByName("List 01");
  
  var lastRow = sheet.getLastRow();
  
  var reply_messages;
  
  for(var i=1; i<=lastRow; i++) {
    
    var rowA = sheet.getRange(i, 1);
    var rowAValue = rowA.getValue();
    
    var rowB = sheet.getRange(i, 2);
    var rowBValue = rowB.getValue();
    
    var rowC = sheet.getRange(i, 3);
    var rowCValue = rowC.getValue();
    
    var rowD = sheet.getRange(i, 4);
    var rowDValue = rowD.getValue();
    
    if (rowAValue == user_message) {
      
      reply_messages = ["「" + user_message + "」は「" + rowA.offset(0, 1).getValue() + "」という意味の「" + rowB.offset(0, 1).getValue() + "」で「" + rowC.offset(0, 1).getValue() + "」で使用されています。"];
      
    }
    
  }
  
  var messages = reply_messages.map(function (v) {
    
    return {'type': 'text', 'text': v};    
    
  });
  
  UrlFetchApp.fetch(line_endpoint, {
    
    'headers': {
      
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      
    },
    
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
      
    }),
    
  });
                      
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  
}

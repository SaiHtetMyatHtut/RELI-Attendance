function doGet(e) {
  if (!e.parameter["sid"] || !e.parameter["passcode"]) {
    var htmlOutput = HtmlService.createTemplateFromFile('index');
    htmlOutput.message = '';
    return htmlOutput.evaluate();
  }

  if (e.parameter["page"] == "index") {
    // Get The Sheet by Sheet Name
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Check In");

    // Select All Rows & Columns
    var studentData = sheet.getDataRange().getValues();

    // Current User Row
    let curStudentRow;
    // CurrentAttCol;
    let curAttendanceCol;

    // Find By Student ID 
    for (var i = 1; i < studentData.length; i++) {
      if (e.parameter["sid"] == studentData[i][0]) {
        curStudentRow = i;
      }
    }

    // Find By Passcode
    for (var i = 0; i < studentData[0].length; i++) {
      if (e.parameter["passcode"] == studentData[0][i]) {
        curAttendanceCol = i;
      }
    }

    // Check If Student Already Check In
    var isPresent = sheet.getRange(curStudentRow + 1, curAttendanceCol + 1).getValue();

    if (isPresent == "") {
      var timeStamp = new Date();
      sheet.getRange(curStudentRow + 1, curAttendanceCol + 1).setValue(timeStamp);
      var htmlOutput = HtmlService.createTemplateFromFile('thankyou');
      return htmlOutput.evaluate();
    } else {

      // Get The Sheet by Sheet Name
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Check Out");

      // Select All Rows & Columns
      var studentData = sheet.getDataRange().getValues();

      // Current User Row
      let curStudentRow;
      // CurrentAttCol;
      let curAttendanceCol;

      // Find By Student ID 
      for (var i = 1; i < studentData.length; i++) {
        if (e.parameter["sid"] == studentData[i][0]) {
          curStudentRow = i;
        }
      }

      // Find By Passcode
      for (var i = 0; i < studentData[0].length; i++) {
        if (e.parameter["passcode"] == studentData[0][i]) {
          curAttendanceCol = i;
        }
      }

      // Check If Student Already Check In
      var isPresent = sheet.getRange(curStudentRow + 1, curAttendanceCol + 1).getValue();

      if (isPresent == "") {
        // Redirecting
        var htmlOutput = HtmlService.createTemplateFromFile('signedin');
        htmlOutput.sid = e.parameter['sid'];
        htmlOutput.passcode = e.parameter['passcode'];
        return htmlOutput.evaluate();
      } else {
        var htmlOutput = HtmlService.createTemplateFromFile('thankyou');
        return htmlOutput.evaluate();
      }
    }
  }

  else if (e.parameter["page"] == "signedin") {
    // Get The Sheet by Sheet Name
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Check Out");

    // Select All Rows & Columns
    var studentData = sheet.getDataRange().getValues();

    // Current User Row
    let curStudentRow;
    // CurrentAttCol;
    let curAttendanceCol;

    // Find By Student ID 
    for (var i = 1; i < studentData.length; i++) {
      if (e.parameter["sid"] == studentData[i][0]) {
        curStudentRow = i;
      }
    }

    // Find By Passcode
    for (var i = 0; i < studentData[0].length; i++) {
      if (e.parameter["passcode"] == studentData[0][i]) {
        curAttendanceCol = i;
      }
    }

    // Check If Student Already Check In
    var isPresent = sheet.getRange(curStudentRow + 1, curAttendanceCol + 1).getValue();

    if (isPresent == "") {
      var timeStamp = new Date();
      sheet.getRange(curStudentRow + 1, curAttendanceCol + 1).setValue(timeStamp);
      var htmlOutput = HtmlService.createTemplateFromFile('thankyou');
      return htmlOutput.evaluate();
    } else {
      var htmlOutput = HtmlService.createTemplateFromFile('thankyou');
      return htmlOutput.evaluate();
    }

  }
}

function getUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}
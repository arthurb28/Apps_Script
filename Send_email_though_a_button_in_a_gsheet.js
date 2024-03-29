2 different scripts that needs to be added separately:
https://www.youtube.com/watch?v=MZ_D5Zgva5M

1st :
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Send Email')
      .addItem('Confirm sending', 'sendEmailToStudent')
      .addToUi();
}


2nd:
function sendEmailToStudent() 
{
  
  //capture the sheet with this identifier
  var sheet = SpreadsheetApp.getActive().getSheetByName("ChCh");
  var n = sheet.getLastRow();
  //get the email address of the student
  var email = sheet.getRange(2, 4).getValue(); //loads the current email address into variable "email". Notice columns are referred to as numbers.
  
  //get student data for this kid
  var dataGrid = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues(); //loads the data in this range at the time
  var message = ""; //container to hold final email content
  
  //set up the HTML to be rendered by sendEmail eventually.
  //adding a table for the column headings and content inside it.
  
  message = "  <table>";
  message += "<tr>"
  message += "<td><b>Lead</td>"
  message += "<td><b>Vin</td>"
  message += "<td><b>Immat</td>"
  message += "</b> </tr>"
  var encc = "arthur.bignon@autohero.com" 
  //Loop through the content in data grid and set them up in each column with new row for each.
  for(var i=1;i<dataGrid.length; i++)
  {
    message+= "<tr>"
    message+= "<td>" + dataGrid[i][0] + "</td>"
    message+= "<td>" + dataGrid[i][1] + "</td>"
    message+= "<td>" + dataGrid[i][2] + "</td>"
    message+= "</tr>"
  }
  //end of table tag
  message +="</table>"
  for (var i = 2; i < n +1; i ++) {

    var sent = sheet.getRange(i,5).getValue();
    sheet.getRange(i,5).setValue("YES");
  //send email. Done! 
  }
MailApp.sendEmail("arthur.bignon@autohero.com", "Préparation eshtétique", encc, {htmlBody:message});
  Browser.msgBox("Email sent !"); 
  
  }

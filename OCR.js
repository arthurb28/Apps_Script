//Google Apps script for performing OCR on all JPEGS found in the specified Drive folder. Extracts text to a Google sheet, where it's mapped to the JPEG's filename.

function extractTextOnOpen() {

    //ADD YOUR VALUES BELOW
    var folderName = "[YOUR PROJECT FOLDER]";
    var sheetId = "[YOUR SHEET ID]";

    //Define folder
    var folder = DriveApp.getFoldersByName(folderName).next();
    var folderId = folder.getId();

    //Find all jpegs in folder
    var images = folder.getFilesByType("image/jpeg");
    while (images.hasNext()) {
    	//Convert each jpeg to a Google Doc with OCR
        var image = images.next();
        var imageName = image.getName();
        var docName = imageName.split("\.")[0];
        var file = {
            title: docName,
            mimeType: "image/jpeg"
        }
        Drive.Files.insert(file, image, { ocr: true });
        //Store newly-created Google Doc in project folder
        var newFile = DriveApp.getFilesByName(docName).next();
        folder.addFile(newFile);
        var rootFolder = DriveApp.getRootFolder();
        rootFolder.removeFile(newFile);
    }

    //Find all Google Docs in folder
    var docs = folder.getFilesByType("application/vnd.google-apps.document");

    //Set up spreadsheet
    var ss = SpreadsheetApp.openById(sheetId);
    SpreadsheetApp.setActiveSpreadsheet(ss);
    Logger.log('File name: ' + ss.getName());
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.clear();
    sheet.appendRow(["Filename", "Text"]);

    //Populate spreadsheet with OCR text
    while (docs.hasNext()) {
        var file = docs.next();
        var docId = file.getId();
        var doc = DocumentApp.openById(docId);
        var name = doc.getName();
        var body = doc.getBody().getText();
        //Add item data to spreadsheet
        sheet.appendRow([name, body]);
    }
};

// "Drive" is not defined" error : Open menu from your script ( the place you start with Code.gs) and use : Resources - Advanced Google services and check on the Drive API v2

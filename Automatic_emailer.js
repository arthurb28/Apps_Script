function send_email(e) {
  var gs =SpreadsheetApp.openById('18EXAlU0nV7vHQGnAJ3vhdd0T0Vs3ssqAsn2SGRFcujI')
  var src_sheet=gs.getSheetByName('CT à faire')
  var sheet1=gs.getSheetByName('Email_contacts')
  var destinataire=sheet1.getRange(2,1).getValue()
  var cc=sheet1.getRange(2,2).getValue()
  Logger.log(cc)
  Logger.log(destinataire)
  var row = e.range.getRow();
  var col = e.range.getColumn();
  if (col === 2 && row > 2 && e.source.getActiveSheet().getName() === 'CT à faire'&& e.source.getActiveSheet().getRange(row,col).getValue()!=""){
    var dt = Utilities.formatDate(new Date(), 'Europe/Paris', 'dd/MM/YYYY').toString()
    var lead=src_sheet.getRange(row,2).getValue()
    Logger.log(lead)
    subject="CF à faire "+lead+" "+dt
    Logger.log(subject)
    var body1= "Hello, <br> <p>Le contrôle technique du véhicule en objet n'est plus valable.<br><br>Cordialement,<br>Equipe Retail</p>"
      MailApp.sendEmail({
      to: destinataire,
      cc:cc,
      subject: subject,
      htmlBody: body1
    })
}}

// dans la feuille "CT à faire" -> chaque fois qu'un nouveau lead est rentrée en colonne B, ça envoie un mail :)))
// + ajouter un déclencheur basé dur la feuille de calcul - lors d'une modification
// premier outil a profiter de ce script : "https://docs.google.com/spreadsheets/d/18EXAlU0nV7vHQGnAJ3vhdd0T0Vs3ssqAsn2SGRFcujI/edit#gid=115660544"

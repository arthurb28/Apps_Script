// https://developers.google.com/apps-script/reference/script/clock-trigger-builder

function copyPaste(src_gs_id, src_s_name, tgt_gs_id, tst_s_name) {
var gs = SpreadsheetApp.openById(src_gs_id);
 var src_sheet = gs.getSheetByName(src_s_name);
    var range_src_sheet = src_sheet.getRange("A:R");
    var data = range_src_sheet.getValues();
    var src_last_row = range_src_sheet.getLastRow();
    var src_last_col = range_src_sheet.getLastColumn();

    var dest_gs = SpreadsheetApp.openById(tgt_gs_id);
    var target = dest_gs.getSheetByName(tst_s_name)
    target.getRange("A:R").clearContent() //clear old data. Remove this if you wanna stack your data.
    target.getRange(1, 1, src_last_row, src_last_col).setValues(data);
}

function gs_2_gs_copy_paste() {
    // Change the following values (Lines 18 to 21) according to your requirement.
    // src --> source, tgt --> target
    var src_gs_id = '17E64Ac4vFBSC5W2EWMk5oit7rJQ1MFaos3YPMZlCknA'
    var src_s_name = 'Extract_CMS'
    var tgt_gs_id = '1yLkjDmFXmkHFxdutKEUPrAoZDHgJD3iCNaydyoMsh6I'
    var tst_s_name = 'Extract_CMS'
    copyPaste(src_gs_id, src_s_name, tgt_gs_id, tst_s_name)
}

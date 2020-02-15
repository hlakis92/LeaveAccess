let tbl_PaperWorkReviewDocument = "tbl_PaperWorkReviewDocument";

let query = {
  /* add paper work review document query start */
  addPaperWorkReviewDocumentQuery: {
    table: tbl_PaperWorkReviewDocument,
    insert: {
      field: ['leaveInfoId', 'documentName'],
      fValue: []
    }
  }, // add paper work review document query end
};


module.exports = query;
const emptyNoteContent = {
  "entityMap": {},
  "blocks": [
    {
      "key": "1ppsn",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ]
};

export function newEmptyNoteContent() {
  return emptyNoteContent;
}

export function getNoteAbbreviationText(noteContent) {
  if (noteContent === undefined) return '';
  return noteContent.blocks[0].text;
}

export function formatDate(dateStrFromDB) {
  return dateStrFromDB.split('T')[0];
}

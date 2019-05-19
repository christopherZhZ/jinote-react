import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

export function getEditorStateWithRawJson(rawJson) {
  const contentState = convertFromRaw(rawJson);
  return EditorState.createWithContent(contentState);
}

export function editorStateToRawJson(editorState) {
  const contentState = editorState.getCurrentContent();
  const plainText = contentState.getPlainText();
  const jsonStr = convertToRaw(contentState);
  return jsonStr;
}

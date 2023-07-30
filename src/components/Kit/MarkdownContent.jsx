import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor/ckeditor";

function MarkdownEditor() {
  return (
    <CKEditor
      editor={Editor}
      data="# Hello from CKEditor 5!"
      onReady={(editor) => {
        console.log("Editor is ready to use!", editor);
        // You can store the "editor" and use when it is needed.
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
  );
}

function MarkdownContent() {
  return <MarkdownEditor />;
}

export default MarkdownContent;

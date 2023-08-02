import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toFormData } from "@turistikrota/ui/utils/transform";
import Editor from "ckeditor/ckeditor";
import { useEffect, useState } from "react";

function MarkdownEditor({ value, onChange }) {
  return (
    <CKEditor
      editor={Editor}
      data={value}
      onReady={() => {
        // You can store the "editor" and use when it is needed.
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export function useMdContent(value) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (value) {
      fetch(value, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
        .then((res) => res.text())
        .then((res) => setContent(res));
    }
  }, [value]);

  return [content, setContent];
}

export async function uploadMdContent(
  content,
  app,
  options = {
    randomName: true,
  }
) {
  const file = new File([content], "content.md", { type: "text/markdown" });
  const res = await httpClient
    .post(
      apiUrl(Services.Upload, "/md"),
      toFormData({
        ...options,
        dirName: app,
        markdown: file,
      })
    )
    .catch(() => ({ data: { url: null } }));
  return res.data.url;
}

export default MarkdownEditor;

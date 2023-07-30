import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toFormData } from "@turistikrota/ui/utils/transform";
import Editor from "ckeditor/ckeditor";

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
      fetch(value)
        .then((res) => res.text())
        .then((res) => setContent(res));
    }
  }, [value]);

  return [content, setContent];
}

export async function uploadMdContent(content, app) {
  const res = httpClient
    .post(
      apiUrl(Services.Upload, "/md"),
      toFormData({
        randomName: true,
        dirName: app,
        markdown: content,
      })
    )
    .catch(() => ({ data: { url: null } }));
  return res.data.url;
}

export default MarkdownEditor;

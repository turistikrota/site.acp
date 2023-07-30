import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { toFormData } from "@turistikrota/ui/utils/transform";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Button, Card } from "reactstrap";

function ImagePreview({ files, onRemove }) {
  const { t } = useTranslation("dropzone");
  return (
    <div className="dropzone-previews mt-3 dz-processing dz-image-preview dz-success dz-complete">
      {files.map((f, i) => (
        <Card className="border dropzone-preview" key={i + "-file"}>
          <img data-dz-thumbnail="" className="rounded" src={f} />
          <Button color="danger" onClick={() => onRemove(f)}>
            <i className="bx bx-xs bx-trash"></i>
            {t("remove")}
          </Button>
        </Card>
      ))}
    </div>
  );
}

function ImageUploader({ onChange, randomName = true, app }) {
  const { t } = useTranslation("dropzone");

  const uploadFiles = async (files) => {
    if (!app) return;
    const result = [];
    for (const file of files) {
      const res = await httpClient
        .post(
          apiUrl(Services.Upload, "/image"),
          toFormData({
            randomName: randomName,
            dirName: app,
            image: file,
          })
        )
        .catch(() => ({ data: { url: null } }));
      if (res.data.url) result.push(res.data.url);
    }
    return result;
  };

  const handleAcceptedFiles = async (files) => {
    const result = await uploadFiles(files);
    if (result) {
      const newFiles = [...files, ...result];
      onChange(newFiles);
    }
  };

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        handleAcceptedFiles(acceptedFiles);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone">
          <div className="dz-message needsclick" {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="dz-message needsclick">
              <div className="mb-3">
                <i className="display-4 text-muted bx bxs-cloud-upload" />
              </div>
              <h4>{t("text")}</h4>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

ImageUploader.Preview = ImagePreview;

export default ImageUploader;

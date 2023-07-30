import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { toFormData } from "@turistikrota/ui/utils/transform";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Card } from "reactstrap";

function ImagePreview({ files, onRemove }) {
  return (
    <div
      className="dropzone-previews mt-3 dz-processing dz-image-preview dz-success dz-complete"
      id="file-previews"
    >
      {files.map((f, i) => (
        <Card className="mt-1 mb-0 shadow-none border " key={i + "-file"}>
          <div className="p-2 relative">
            <img
              data-dz-thumbnail=""
              height="80"
              className="avatar-sm rounded bg-light"
              src={f}
            />
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => onRemove(i)}
            >
              <i className="bx bx-x-circle text-danger" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ImageUploader({ onChange, slug, randomName = false, app }) {
  const { t } = useTranslation("dropzone");

  const uploadFiles = async (files) => {
    if ((!randomName && !slug) || !app) return;
    const result = [];
    for (const file of files) {
      const perfectNumber =
        new Date().getTime() + Math.floor(Math.random() * 100);
      const res = await httpClient
        .post(
          apiUrl(Services.Upload, "/image"),
          toFormData({
            randomName: randomName,
            dirName: app,
            image: file,
            fileName: slug + "-" + perfectNumber,
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

import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { toFormData } from "@turistikrota/ui/utils/transform";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Button, Card } from "reactstrap";
import DraggableContainer, { move } from "s-dnm";
import "s-dnm/dist/style.css";
import { InputError } from "./InputGroup";

function ImageGroupLightbox({
  open = false,
  index = 0,
  setIndex,
  images,
  onClose,
}) {
  return (
    <>
      {open ? (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          enableZoom={true}
          onCloseRequest={() => {
            onClose();
          }}
          onMovePrevRequest={() => {
            setIndex((index + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setIndex((index + 1) % images.length);
          }}
          imageCaption={"Project " + parseFloat(index + 1)}
        />
      ) : null}
    </>
  );
}



const DetailRenderer = ({
  files,
  openPreview,
  onRemove,
  onCopyToClipboard,
  removeable,
}) => {
  const { t } = useTranslation("dropzone");
  return files.map((f, i) => (
    <Card className="border dropzone-preview mb-5" key={i}>
      <img
        data-dz-thumbnail=""
        className="rounded"
        src={f}
        onClick={() => openPreview(i)}
      />
      {removeable && (
        <Button color="danger" onClick={() => onRemove(f)}>
          <i className="bx bx-xs bx-trash"></i>
          {t("remove")}
        </Button>
      )}
      <Button color="primary" onClick={() => onCopyToClipboard(f)}>
        <i className="bx bx-xs bx-copy"></i>
        {t("copy")}
      </Button>
    </Card>
  ))
}


function ImagePreview({
  files,
  onRemove,
  onChange,
  draggable = true,
  removeable = true,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const { t } = useTranslation("dropzone");

  const openPreview = (index) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const onOrderChange = (current, to) => {
    console.log('sa')
    onChange(move(files, current, to));
  };

  const onCopyToClipboard = (file) => {
    navigator.clipboard.writeText(file);
  };
  return (
    <>
      <ImageGroupLightbox
        open={previewOpen}
        index={previewIndex}
        images={files}
        onClose={() => setPreviewOpen(false)}
        setIndex={(index) => setPreviewIndex(index)}
      />
      <div className="mt-3 dropzone-previews dz-processing dz-image-preview dz-success dz-complete">
        {draggable ? (
          <>
            <DraggableContainer onOrderChange={onOrderChange}>
            {files.map((f, i) => (
            <Card className="border dropzone-preview mb-5" key={i}>
              <img
                data-dz-thumbnail=""
                className="rounded"
                src={f}
                onClick={() => openPreview(i)}
              />
              {removeable && <Button color="danger" onClick={() => onRemove(f)}>
                <i className="bx bx-xs bx-trash"></i>
                {t("remove")}
              </Button>}
              <Button color="primary" onClick={() => onCopyToClipboard(f)}>
                <i className="bx bx-xs bx-copy"></i>
                {t("copy")}
              </Button>
            </Card>
          ))}
            </DraggableContainer>
          </>
        ) : (
          <div>
            <DetailRenderer
              files={files}
              openPreview={openPreview}
              onRemove={onRemove}
              onCopyToClipboard={onCopyToClipboard}
              removeable={removeable}
            />
          </div>
        )}
      </div>
    </>
  );
}

function ImageUploader({
  value,
  onChange,
  randomName = true,
  slugText,
  minifyLevel = undefined,
  app,
  invalid,
  error,
  setLoading,
}) {
  const { t } = useTranslation("dropzone");

  const uploadFiles = async (files) => {
    if (!app) return;
    if (setLoading) setLoading(true);
    const [...responses] = await Promise.all(
      files.map((file) =>
        httpClient
          .post(
            apiUrl(Services.Upload, "/image"),
            toFormData({
              randomName: randomName,
              slugify: !!slugText,
              fileName: slugText ? slugText : undefined,
              minifyLevel: minifyLevel,
              dirName: app,
              image: file,
            })
          )
          .catch(() => ({ data: { url: null } }))
          .finally(() => {
            if (setLoading) setLoading(false);
          })
      )
    );
    return responses.filter((res) => !!res.data.url).map((res) => res.data.url);
  };

  const handleAcceptedFiles = async (files) => {
    const result = await uploadFiles(files);
    if (result) {
      const newFiles = [...value, ...result];
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
            <input
              {...getInputProps()}
              className={invalid ? `is-invalid` : ""}
              aria-invalid={invalid}
            />
            <div className="dz-message needsclick">
              <div className="mb-3">
                <i className="display-4 text-muted bx bxs-cloud-upload" />
              </div>
              <h4>{t("text")}</h4>
            </div>
            <InputError error={error} />
          </div>
        </div>
      )}
    </Dropzone>
  );
}

ImageUploader.Preview = ImagePreview;

export default ImageUploader;

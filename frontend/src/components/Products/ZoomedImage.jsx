import React from "react";
import useImageZoom from "react-image-zoom-hook";

const ZoomedImage = ({ image, previewImage }) => {
  const imgHeight = 416;
  const imgWidth = 376;
  const lensHeight = 100;
  const lensWidth = 100;
  const previewLensHeight = 600;
  const img = image;
  const previewImg = previewImage;
  const {
    moveLens,
    imgDimesions,
    lensDimensions,
    previewLensDimensions,
    previewImgDimensions,
    imgContainerDimesions,
    imgRefCallback,
    meshRefCallback,
    imagePreviewRefCallback,
  } = useImageZoom({
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
    img,
    previewImg,
  });
  return (
    <div className="flex container relative">
      <div
        className="img-main-container"
        onMouseMove={moveLens}
        style={{
          ...imgContainerDimesions,
        }}
      >
        <div
          ref={meshRefCallback}
          className="mesh"
          style={{
            ...lensDimensions,
          }}
        />

        <img
          style={{
            ...imgDimesions,
          }}
          ref={imgRefCallback}
          alt="test"
          src={img}
        />
      </div>

      <div
        className="img-preview-section-container"
        // ref={imagePreviewRefContainer}

        style={{
          ...previewLensDimensions,
        }}
      >
        <img
          ref={imagePreviewRefCallback}
          alt="test-preview"
          src={previewImg}
          style={{
            ...previewImgDimensions,
          }}
          className="img-preview-section"
        />
      </div>
    </div>
  );
};

export default ZoomedImage;

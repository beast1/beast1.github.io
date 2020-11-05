"use strict";
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const showMultipleImages = (images, parent) => {
  const template = document.querySelector(`#preview-img`);
  const imagesArr = Array.from(images);

  imagesArr.forEach((image) => {
    const imageName = image.name.toLowerCase();
    const matches = FILE_TYPES.some((ending) => {
      return imageName.endsWith(ending);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        const markup = template.content.querySelector(`img`).cloneNode(true);
        markup.src = reader.result;
        parent.appendChild(markup);
      });
      reader.readAsDataURL(image);
    }
  });
};

const initImgInput = (inputSelector, previewSelector, isMultiple) => {
  const input = document.querySelector(inputSelector);
  const preview = document.querySelector(previewSelector);

  input.addEventListener(`change`, () => {
    if (input.files.length === 1) {
      const file = input.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((ending) => {
        return fileName.endsWith(ending);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    } else if (isMultiple) {
      showMultipleImages(input.files, preview);
    }
  });
};

window.imgInput = {
  init: initImgInput
};

export const mapAndSortImages = (images) => {
    return images.sort((a, b) => a.order - b.order).map((image) => image.url)
  }
// breakpoints for srcSet (optional)
const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

const modules = import.meta.glob("/public/photos/*.{jpg,jpeg,png,gif}", {
  eager: true,
});

function imageLink(asset, size) {
  return asset;
}

function getSlide(asset) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      resolve({
        src: imageLink(asset),
        width,
        height,
        srcSet: breakpoints.map((bp) => ({
          src: imageLink(asset),
          width: bp,
          height: Math.round((height / width) * bp),
        })),
      });
    };
    img.src = asset;
  });
}

export async function generateSlides() {
  const assets = Object.keys(modules).map((path) =>
    path.replace("/public", ""),
  );
  const slides = await Promise.all(assets.map(getSlide));
  return slides;
}

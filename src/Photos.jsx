import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import "./Photos.css";

const modules = import.meta.glob("/public/photos/*.{jpg,jpeg,png,gif}", {
  eager: true,
});

const slides = Object.keys(modules).map((path) => ({
  src: path.replace("/public", ""),
  width: 600,
  height: 500,
}));

export default function Photos() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="photos-page">
      <h1 className="text-2xl font-bold mb-6 text-center">Photos</h1>

      <RowsPhotoAlbum
        photos={slides}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </div>
  );
}

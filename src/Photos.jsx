import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Link } from "react-router-dom";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import "./Photos.css";

import { generateSlides } from "./slides";

export default function Photos() {
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    generateSlides().then((s) => setSlides(s));
  }, []);

  return (
    <div className="photos-page">
      <Link to={"/"}>Back</Link>
      <h1 className="text-2xl font-bold mb-6 text-center">Photos</h1>

      <p>
        I bought my first camera at the start of 2025. I went with the Pentax
        17. <br /> I later bought a Canon AE1.
      </p>

      <RowsPhotoAlbum
        photos={slides}
        targetRowHeight={250}
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

"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

const galleryImages = [
  { id: "photo-1460925895917-afdab827c52f", title: "Overview", description: "A closer look at the main experience." },
  { id: "photo-1559028012-481c04fa702d", title: "Interface details", description: "Visual language and layout exploration." },
  { id: "photo-1558655146-d09347e92766", title: "Design system", description: "Color, typography, and component direction." },
  { id: "photo-1551650975-87deedd944c3", title: "Mobile experience", description: "A responsive view of the product." },
  { id: "photo-1517292987719-0369a794ec0f", title: "Product screens", description: "Selected screens from the concept." },
];

const imageSrc = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function ProjectGallery({ projectTitle }: { projectTitle: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const previous = useCallback(() => {
    setActiveIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, next, previous]);

  return (
    <>
      <section className="detail-gallery" data-scroll-reveal aria-label={`${projectTitle} image gallery`}>
        <div className="detail-gallery-heading">
          <p className="detail-section-label">04 / PROJECT GALLERY</p>
          <div className="detail-gallery-title-row">
            <h2>Inside the experience.</h2>
            <p>A closer look at selected screens and visual details.</p>
          </div>
        </div>

        <div className="detail-gallery-track">
          {galleryImages.map((image, index) => (
            <button
              className={`detail-gallery-card${index === activeIndex ? " is-active" : ""}`}
              key={image.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setLightboxOpen(true);
              }}
              aria-label={`View image ${index + 1}: ${image.title}`}
            >
              <span className="detail-gallery-card-image">
                <img src={imageSrc(image.id, 1000)} alt={`${projectTitle} — ${image.title}`} loading="lazy" />
                <span className="detail-gallery-expand"><Expand size={17} /></span>
              </span>
              <span className="detail-gallery-card-caption">
                <span><strong>{image.title}</strong><small>{image.description}</small></span>
                <span className="detail-gallery-index">0{index + 1}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="detail-gallery-bottom">
          <span className="detail-gallery-count">0{activeIndex + 1} <i>/</i> 0{galleryImages.length}</span>
          <div className="detail-gallery-controls">
            <button type="button" onClick={previous} aria-label="Previous image"><ArrowLeft size={17} /></button>
            <button type="button" onClick={next} aria-label="Next image"><ArrowRight size={17} /></button>
          </div>
          <span className="detail-gallery-hint">SELECT AN IMAGE TO EXPAND</span>
        </div>
      </section>

      {lightboxOpen && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${projectTitle} gallery viewer`} onClick={() => setLightboxOpen(false)}>
          <button className="gallery-lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="Close image viewer"><X size={22} /></button>
          <button className="gallery-lightbox-arrow gallery-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous image"><ArrowLeft size={22} /></button>
          <div className="gallery-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={imageSrc(galleryImages[activeIndex].id, 2200)} alt={`${projectTitle} — ${galleryImages[activeIndex].title}`} />
            <div className="gallery-lightbox-caption">
              <div><span>0{activeIndex + 1} / 0{galleryImages.length}</span><h3>{galleryImages[activeIndex].title}</h3><p>{galleryImages[activeIndex].description}</p></div>
              <span>{projectTitle}</span>
            </div>
          </div>
          <button className="gallery-lightbox-arrow gallery-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next image"><ArrowRight size={22} /></button>
        </div>
      )}
    </>
  );
}

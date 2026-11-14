"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import { setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const CLINIC_LNG_LAT: [number, number] = [36.8060076, -1.2559186];
const CLINIC_NAME = "Konfidental Clinic";

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    setWorkerUrl(
      new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString()
    );

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: CLINIC_LNG_LAT,
      zoom: 15,
      pitch: 25,
      bearing: -15,
      attributionControl: false,
    });

    // Controls
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "bottom-right");
    map.addControl(
      new maplibregl.FullscreenControl({
        container: wrapperRef.current as HTMLElement,
      }),
      "bottom-right"
    );
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    // Custom Pin Marker
    const el = document.createElement("div");
    el.className = "custom-map-pin";
    // The pin shape (SVG) and a shadow dot underneath
    el.innerHTML = `
      <div class="custom-map-pin__shadow"></div>
      <svg class="custom-map-pin__svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2ZM12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13Z" fill="#075874"/>
      </svg>
    `;

    new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(CLINIC_LNG_LAT)
      .setPopup(
        new maplibregl.Popup({ offset: 40, closeButton: false }).setHTML(
          `<div style="font-family:inherit;padding:4px 6px">
             <strong style="font-size:13px;color:#171717">${CLINIC_NAME}</strong>
           </div>`
        )
      )
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
"use client";

import Container from "@mui/material/Container";
import { serviceAreas as defaultServiceAreas } from "@/utlis/serviceAreaData";
import { useEffect, useRef, useState } from "react";
import styles from "./ServiceAreaMap.module.scss";

const createPinIcon = (Leaflet, isActive = false) =>
  Leaflet.divIcon({
    className: `luxury-map-marker${isActive ? " luxury-map-marker-active" : ""}`,
    html: "<span></span>",
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    popupAnchor: [0, -34],
  });

export default function ServiceAreaMap({
  areas = defaultServiceAreas,
  eyebrow = "SERVICE AREA",
  headline = "Cleaning across Tauranga, the Mount, Papamoa and the western Bay.",
  description = "Select a suburb to see where we work. Availability can vary by day, especially for flexible and one-off visits.",
  mapLabel = "Luxury Cleaning service map",
}) {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const markersRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    import("leaflet").then((module) => {
      if (!isMounted || !mapElementRef.current || mapRef.current) return;

      const Leaflet = module.default;
      leafletRef.current = Leaflet;

      const map = Leaflet.map(mapElementRef.current, {
        attributionControl: false,
        scrollWheelZoom: false,
        zoomControl: false,
      }).setView([-37.72, 176.2], 10);

      Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      Leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      Leaflet.control
        .attribution({ prefix: false, position: "bottomleft" })
        .addAttribution("&copy; OpenStreetMap")
        .addTo(map);

      markersRef.current = areas.map((area, index) => {
        const marker = Leaflet.marker(area.coordinates, {
          icon: createPinIcon(Leaflet, index === 0),
          riseOnHover: true,
          title: area.name,
        })
          .addTo(map)
          .bindPopup(`<strong>${area.name}</strong>`);

        marker.on("click", () => setActiveIndex(index));

        return marker;
      });

      const markerGroup = Leaflet.featureGroup(markersRef.current);
      map.fitBounds(markerGroup.getBounds(), {
        maxZoom: 11,
        padding: [42, 42],
      });
      mapRef.current = map;

      window.setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(markerGroup.getBounds(), {
          maxZoom: 11,
          padding: [42, 42],
        });
      }, 120);
    });

    return () => {
      isMounted = false;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [areas]);

  useEffect(() => {
    const Leaflet = leafletRef.current;
    const map = mapRef.current;

    if (!Leaflet || !map || !areas[activeIndex]) return;

    markersRef.current.forEach((marker, index) => {
      marker.setIcon(createPinIcon(Leaflet, index === activeIndex));
    });

    const activeArea = areas[activeIndex];
    map.flyTo(activeArea.coordinates, activeArea.zoom || 13, {
      duration: 0.8,
    });
    markersRef.current[activeIndex]?.openPopup();
  }, [activeIndex, areas]);

  if (!areas.length) return null;

  return (
    <section className={styles.serviceArea}>
      <Container maxWidth="xl" className={styles.serviceAreaContainer}>
        <div className={styles.serviceAreaContent}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {headline && <h2>{headline}</h2>}
          {description && <p>{description}</p>}

          <div className={styles.suburbList}>
            {areas.map((area, index) => (
              <button
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? styles.activeSuburb : ""}
                key={area.name}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{area.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mapCard}>
          <div className={styles.mapHeader}>
            <span>{mapLabel}</span>
            <strong>{areas[activeIndex]?.name}</strong>
          </div>
          <div
            aria-label="Interactive map of Luxury Cleaning service suburbs"
            className={styles.map}
            ref={mapElementRef}
          />
        </div>
      </Container>
    </section>
  );
}

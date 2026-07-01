"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import Image from "next/image";
import styles from "./SolutionBentoSection.module.scss";

const iconMap = {
  clock: AccessTimeOutlinedIcon,
  AccessTimeOutlined: AccessTimeOutlinedIcon,
  refresh: AutorenewOutlinedIcon,
  AutorenewOutlined: AutorenewOutlinedIcon,
  shield: GppGoodOutlinedIcon,
  GppGoodOutlined: GppGoodOutlinedIcon,
  "calendar-check": EventAvailableOutlinedIcon,
  EventAvailableOutlined: EventAvailableOutlinedIcon,
  "check-circle": FactCheckOutlinedIcon,
  checklist: FactCheckOutlinedIcon,
  FactCheckOutlined: FactCheckOutlinedIcon,
  ChecklistOutlined: ChecklistOutlinedIcon,
  AssignmentTurnedInOutlined: AssignmentTurnedInOutlinedIcon,
  team: PeopleAltOutlinedIcon,
  people: PeopleAltOutlinedIcon,
  PeopleAltOutlined: PeopleAltOutlinedIcon,
  groups: GroupsOutlinedIcon,
  GroupsOutlined: GroupsOutlinedIcon,
  premium: WorkspacePremiumOutlinedIcon,
  WorkspacePremiumOutlined: WorkspacePremiumOutlinedIcon,
  badge: VerifiedOutlinedIcon,
  VerifiedOutlined: VerifiedOutlinedIcon,
  price: PriceCheckOutlinedIcon,
  PriceCheckOutlined: PriceCheckOutlinedIcon,
  tag: SellOutlinedIcon,
  SellOutlined: SellOutlinedIcon,
  cleaning: CleaningServicesOutlinedIcon,
  CleaningServicesOutlined: CleaningServicesOutlinedIcon,
};

const getNormalizedIconKey = (icon) => String(icon || "").trim().replace(/Icon$/, "");

const getIconComponent = (icon) => {
  const iconKey = String(icon || "").trim();
  if (!iconKey) return null;

  const normalizedIconKey = getNormalizedIconKey(iconKey);

  return iconMap[iconKey] || iconMap[normalizedIconKey] || null;
};

const layoutDefaults = {
  feature: {
    columnSpan: 6,
    rowSpan: 4,
    aspectRatio: "1 / 1",
  },
  wide: {
    columnSpan: 6,
    rowSpan: 2,
    aspectRatio: "16 / 9",
  },
  standard: {
    columnSpan: 3,
    rowSpan: 2,
    aspectRatio: "4 / 3",
  },
};

export default function SolutionBentoSection({ eyebrow, headline, tiles = [] }) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.heading}>
          {eyebrow && (
            <Typography component="p" className={styles.eyebrow}>
              {eyebrow}
            </Typography>
          )}
          <Typography
            component="h2"
            className={styles.headline}
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        </div>

        <div className={styles.grid}>
          {tiles.map((tile, index) => {
            const Icon = getIconComponent(tile.icon);
            const hasImage = tile.media_type === "image" && tile.image?.src;
            const hasIcon = tile.media_type === "icon" && Icon;
            const hasContent = tile.title || tile.body;
            const isImageOnly = hasImage && !hasContent;
            const layout = layoutDefaults[tile.size] || layoutDefaults.standard;
            const tileClassName = [
              styles.tile,
              styles[tile.size] || "",
              styles[tile.tone] || "",
              tile.hide_on_mobile ? styles.hideOnMobile : "",
              isImageOnly ? styles.imageOnly : "",
            ]
              .filter(Boolean)
              .join(" ");
            const tileStyle = {
              "--column-span": tile.column_span || layout.columnSpan,
              "--tablet-column-span":
                tile.tablet_column_span ||
                Math.min(tile.column_span || layout.columnSpan, 6),
              "--row-span": tile.row_span || layout.rowSpan,
              "--media-aspect-ratio": tile.aspect_ratio || layout.aspectRatio,
              "--mobile-aspect-ratio":
                tile.mobile_aspect_ratio || tile.aspect_ratio || "16 / 10",
              "--media-object-fit": tile.object_fit || "cover",
              "--media-object-position": tile.object_position || "center",
              "--graphic-title-color":
                tile.graphic_title_color || "rgba(107, 75, 27, 0.48)",
              "--tile-background":
                tile.background ||
                (tile.graphicTitle
                  ? "linear-gradient(145deg, #ebe2d3 0%, #d8c8ad 52%, #b89a5a 100%)"
                  : undefined),
            };

            return (
              <article
                className={tileClassName}
                key={tile.id || `${index}-${tile.title || tile.image?.src}`}
                style={tileStyle}
              >
                {hasImage ? (
                  <div className={styles.media}>
                    {tile.graphicTitle && (
                      <span className={styles.graphicTitle} aria-hidden="true">
                        {tile.graphicTitle}
                      </span>
                    )}
                    <Image
                      src={tile.image.src}
                      alt={tile.image.alt || ""}
                      fill
                      sizes="(max-width: 760px) 100vw, 100vw"
                    />
                  </div>
                ) : hasIcon ? (
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon />
                  </div>
                ) : null}

                {hasContent && (
                  <div className={styles.content}>
                    {tile.title && (
                      <Typography component="h3" className={styles.title}>
                        {tile.title}
                      </Typography>
                    )}
                    {tile.body && (
                      <div
                        className={styles.body}
                        dangerouslySetInnerHTML={{ __html: tile.body }}
                      />
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

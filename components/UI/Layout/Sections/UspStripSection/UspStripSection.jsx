import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Container from "@mui/material/Container";
import styles from "./UspStripSection.module.scss";

const iconMap = {
  tag: SellOutlinedIcon,
  SellOutlined: SellOutlinedIcon,
  "check-circle": FactCheckOutlinedIcon,
  FactCheckOutlined: FactCheckOutlinedIcon,
  badge: VerifiedOutlinedIcon,
  VerifiedOutlined: VerifiedOutlinedIcon,
  VerifiedOutlinedIcon,
  shield: GppGoodOutlinedIcon,
  GppGoodOutlined: GppGoodOutlinedIcon,
  calendar: EventAvailableOutlinedIcon,
  EventAvailableOutlined: EventAvailableOutlinedIcon,
};

const getIconKey = (icon) => String(icon || "").trim().replace(/Icon$/, "");

const renderIcon = (icon) => {
  const iconKey = String(icon || "").trim();
  const Icon =
    iconMap[iconKey] ||
    iconMap[getIconKey(iconKey)] ||
    CheckCircleOutlineRoundedIcon;

  return <Icon aria-hidden="true" />;
};

export default function UspStripSection({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className={styles.section} aria-label="Why choose Luxury Cleaning">
      <Container maxWidth="xl" className={styles.container}>
        {items.map((item) => (
          <article className={styles.item} key={item.title}>
            {renderIcon(item.icon)}
            <div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

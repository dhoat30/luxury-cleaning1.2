"use client";
import React from "react";

import Layout from "../UI/Layout/Layout";
export default function HomePage({ data, techLogos }) {
  if (!data.length) return null;

  const sections = data[0].acf?.sections;
  return <>{sections && <Layout sections={sections} />}</>;
}

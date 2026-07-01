"use client";

import React from "react";
import ZigZagCardsSection from "./Sections/ZigZagCardsSection/ZigZagCardsSection";
import RowSection from "./Sections/RowSection/RowSection";
import ServicesSection from "./Sections/ServicesSection/ServicesSection";
import ProcessSection from "./Sections/ProcessSection/ProcessSection";
import VideoSection from "./Sections/VideoSection/VideoSection";
import HeroSection from "./Sections/HeroSection/HeroSection";
import ProblemSection from "./Sections/ProblemSection/ProblemSection";
import SolutionBentoSection from "./Sections/SolutionBentoSection/SolutionBentoSection";
import GuaranteeBand from "./Sections/GuaranteeBand/GuaranteeBand";
import TestimonialsSection from "./Sections/TestimonialsSection/TestimonialsSection";
import FrequencyOptionsSection from "./Sections/FrequencyOptionsSection/FrequencyOptionsSection";
import FaqSection from "./Sections/FaqSection/FaqSection";
import UspStripSection from "./Sections/UspStripSection/UspStripSection";
export default function Layout({ sections }) {
  const sectionsJSX = sections.map((section, index) => {
    if (section.acf_fc_layout === "hero") {
      return (
        <HeroSection
          key={index}
          eyebrow={section.eyebrow}
          title={section.title}
          headlineVariants={section.headline_variants}
          headlineVariant={section.headline_variant}
          subhead={section.subhead}
          primaryCta={section.primary_cta}
          secondaryCta={section.secondary_cta}
          trustItems={section.trust_items}
          summary={section.summary}
          graphic={section.graphic}
        />
      );
    }
    if (section.acf_fc_layout === "usp_strip") {
      return <UspStripSection key={index} items={section.items} />;
    }
    if (section.acf_fc_layout === "zigzag_cards") {
      return (
        <ZigZagCardsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row") {
      return (
        <RowSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.card}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <ProcessSection
          key={index}
          eyebrow={section.eyebrow}
          headline={section.headline}
          title={section.title}
          description={section.description}
          cards={section.cards}
          steps={section.steps}
          primaryCta={section.primary_cta}
        />
      );
    }
    if (
      section.acf_fc_layout === "video_section" ||
      section.acf_fc_layout === "video" 
    ) {
      return (
        <VideoSection
          key={index}
          videoID={section.video_id || section.youtube_id}
          placeholderImage={section.placeholder_image}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
      );
    }
    if (
      section.acf_fc_layout === "problem_section" ||
      section.acf_fc_layout === "problem"
    ) {
      return (
        <ProblemSection
          key={index}
          headline={section.headline}
          points={section.points}
          closing={section.closing}
          primaryCta={section.primary_cta}
        />
      );
    }
    if (section.acf_fc_layout === "solution_bento") {
      return (
        <SolutionBentoSection
          key={index}
          eyebrow={section.eyebrow}
          headline={section.headline}
          tiles={section.tiles}
        />
      );
    }
    if (section.acf_fc_layout === "guarantee_band") {
      return (
        <GuaranteeBand
          key={index}
          badge={section.badge}
            image={section.image}
          eyebrow={section.eyebrow}
          headline={section.headline}
          body={section.body}
          steps={section.steps}
          reassurance={section.reassurance}
          primaryCta={section.primary_cta}
        />
      );
    }
    if (section.acf_fc_layout === "testimonials") {
      return (
        <TestimonialsSection
          key={index}
          eyebrow={section.eyebrow}
          headline={section.headline}
          testimonials={section.testimonials}
        />
      );
    }
    if (section.acf_fc_layout === "frequency_options") {
      return (
        <FrequencyOptionsSection
          key={index}
          eyebrow={section.eyebrow}
          headline={section.headline}
          intro={section.intro}
          options={section.options}
          note={section.note}
        />
      );
    }
    if (section.acf_fc_layout === "faq") {
      return (
        <FaqSection
          key={index}
          eyebrow={section.eyebrow}
          headline={section.headline}
          faqs={section.faqs}
        />
      );
    }
  });

  return <div>{sectionsJSX} </div>;
}

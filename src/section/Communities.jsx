import React from 'react';
import SectionHeading from '../components/SectionHeading';
import CommunityCard from '../components/CommunityCard';
import { communitiesData } from '../constants/communities';

export default function Communities() {
  return (
    <section id="communities" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Ecosystem & Impact"
        title="Developer Communities"
        subtitle="Empowering early-stage developers, spearheading tech communities across Nigeria, and fostering collaborative learning."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {communitiesData.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </section>
  );
}

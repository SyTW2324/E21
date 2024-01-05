import React from 'react';
import Netflix from "src/streamingPlatformIcons/netflix";
import AmazonPrime from "src/streamingPlatformIcons/amazonPrime";
import DisneyPlus from "src/streamingPlatformIcons/disneyPlus";
import HBO from "src/streamingPlatformIcons/HBO";
import Hulu from "src/streamingPlatformIcons/hulu";

const PlatformLogos = ({ platforms, className }) => {
  const allowedPlatforms = ['Netflix', 'DisneyPlus', 'Amazon Prime Video', 'HBO Max', 'Hulu'];

  const platformComponents = {
    netflix: Netflix,
    amazonprimevideo: AmazonPrime,
    disneyplus: DisneyPlus,
    hbomax: HBO,
    hulu: Hulu,
  };

  const availablePlatforms = platforms.filter(platform => allowedPlatforms.includes(platform));

  return (
    <div className={className}>
      {availablePlatforms.map((platform, index) => {
        const PlatformLogoComponent = platformComponents[platform.toLowerCase().trim().replace(/\s/g, '')];

        return (
          <React.Fragment key={index}>
            {PlatformLogoComponent && <PlatformLogoComponent/>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default PlatformLogos;
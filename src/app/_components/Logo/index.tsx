import { LOGO_IMAGE_URL as logoUrl, LOGO_IMAGE_HEIGHT } from '@/app/_data/customizations';

const Logo = () => {
  if (logoUrl && logoUrl.includes('https')) {
    return (
      <img
        src={logoUrl}
        alt="Watts Water Technologies"
        className="mr-8 w-auto"
        style={{ height: `${LOGO_IMAGE_HEIGHT}px` }}
      />
    );
  }

  return <span className="mr-8 text-xl font-semibold text-[#0f3d6f]">Watts</span>;

};

export default Logo;

// To override various default items and branding within the repository, apply your changes to the below variables.


// Overrides Sitecore logo in Header - Copy full logo URL from your customer's website
export const LOGO_IMAGE_URL = 'https://cdn.avid.com/avidcom/images/shared/avid-logo-desktop.svg';

// helps adjust size of logo, if needed
export const LOGO_IMAGE_HEIGHT = '40'

// Changes the background color of the header component. Must use Hex syntax
export const HEADER_BACKGROUND_COLOR = '#000000'

// Changes the background color of the footer component. Must use Hex syntax
export const FOOTER_BACKGROUND_COLOR = '#000000'

// Changes the text color of the footer component. Must use Hex syntax
export const FOOTER_TEXT_COLOR = '#FFFFFF'

// Change if you choose to use a custom hero widget
export const HOME_HERO_RFKID = 'home_hero'

// Homepage hero banner video and copy (matches avid.com)
export const HOME_HERO_VIDEO_URL =
  'https://images.avid.com/avidcom/Videos/Homepage/Homepage%20Banner%20Video%2026Q3.mp4';

export const HOME_HERO_HEADLINE = 'Powering greater creators';

export const HOME_HERO_SUBHEADLINE = 'The intelligence layer for modern media';

export const HOME_HERO_DESCRIPTION =
  'Avid integrates AI-powered workflow orchestration and intelligent recommendations into the creative process to power iconic movies, binge-worthy TV, news, sports, music, and live performances.';

// Overrides default question in the Q&A widget on the homepage
export const DEFAULT_QUESTION = 'what is sitecore?' 

// Change if you choose to use a custom highlighted articles widget
export const HIGHLIGHTED_ARTICLES_RFKID = 'search_home_highlight_articles' 

// Change if you want to show a different content type in the highlighted articles widget. This value is case-sensitive. Default is website_content.
export const HIGHLIGHTED_ARTICLES_CONTENT_TYPE = 'website_content'

// Fallback image when the index has no image or the URL fails to load
export const DEFAULT_IMG_URL =
  'https://edge.sitecorecloud.io/avidtech-d6a2e9a9/media/images/all-products-page-images/pt_1000x750.jpg';

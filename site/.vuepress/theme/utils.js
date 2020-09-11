/*
 * Shared func
 */

import convertCssColorNameToHex from 'convert-css-color-name-to-hex';
import {hexToCSSFilter} from 'hex-to-css-filter';

// Defaults
const defaultDark = '#47474a';
const defaultPink = '#ed3f7a';

// Get color filter
const getColorFilter = (color = defaultDark) => hexToCSSFilter(convertCssColorNameToHex(color));

// Get case study background style
const getWorkBackgroundStyles = topper => topper.background ? topper.background : {background: defaultPink};

// Get case study text color
const getWorkTextColor = theme => theme.text ? theme.text : 'white';

// Get case study hover color
const getHoverColor = theme => theme.headerHover ? theme.headerHover : defaultPink;

// Get case study bg color
const getBgColor = theme => theme.background ? theme.background : defaultPink;

// Parse case study front matter
const parseWorkFrontMatter = (frontmatter = {}) => {
  // Get the defaults
  const defaults = {
    client: frontmatter.client || frontmatter.org,
    image: frontmatter.image,
    link: frontmatter.link,
    title: frontmatter.summary || frontmatter.byline || frontmatter.title,
    logo: frontmatter.logo,
    theme: {
      background: '#ed3f7a',
      text: '#fff',
      headerActive: 'white',
      headerHover: 'white',
      headerColor: 'white',
    },
  };
  // Merge in new header key if we have it
  if (frontmatter.header) {
    Object.assign(defaults, frontmatter.header);
  }
  // Return
  return defaults;
};

// Determine whether this should be an internal link or not
const resolveLink = page => {
  return (page.frontmatter.link2Original) ? page.frontmatter.originalLink : page.path;
};

// Normalize tags and return
const resolveTags = tags => {
  if (!tags || Array.isArray(tags)) return tags;
  return [tags];
};

// Checks if webP is supported.
const checkForWebp = (image) => {
  let supported = false;
  let img = new Image();
  // Checks for lossy webp.
  img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
  supported = img.onload = () => {
    return (img.width > 0) && (img.height > 0);
  };
  return supported ? image.replace(/.png|.jpg|.jpeg/gi, '.webp') : image;
};

export default {
  getBgColor,
  getColorFilter,
  getHoverColor,
  getWorkBackgroundStyles,
  getWorkTextColor,
  parseWorkFrontMatter,
  resolveLink,
  resolveTags,
  checkForWebp,
};

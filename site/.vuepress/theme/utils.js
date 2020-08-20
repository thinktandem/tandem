/*
 * Shared func
 */

import convertCssColorNameToHex from 'convert-css-color-name-to-hex';
import {hexToCSSFilter} from 'hex-to-css-filter';

// Defaults
const defaultDark = '#47474a';

// Get color filter
const getColorFilter = (color = defaultDark) => hexToCSSFilter(convertCssColorNameToHex(color));

// Get case study background style
const getWorkBackgroundStyles = topper => topper.background ? topper.background : {};

// Get case study text color
const getWorkTextColor = theme => theme.text ? theme.text : defaultDark;

// Parse case study front matter
const parseWorkFrontMatter = (frontmatter = {}) => {
  // Get the defaults
  const defaults = {
    client: frontmatter.client || frontmatter.org,
    image: frontmatter.image,
    link: frontmatter.link,
    title: frontmatter.summary || frontmatter.byline || frontmatter.title,
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

export default {
  getColorFilter,
  getWorkBackgroundStyles,
  getWorkTextColor,
  parseWorkFrontMatter,
  resolveLink,
  resolveTags,
};

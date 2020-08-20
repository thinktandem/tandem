/*
 * Shared func
 */

// Determine whether this should be an internal link or not
exports.resolveLink = page => {
  return (page.frontmatter.link2Original) ? page.frontmatter.originalLink : page.path;
};

// Normalize tags and return
exports.resolveTags = tags => {
  if (!tags || Array.isArray(tags)) return tags;
  return [tags];
};

# Academica 2 Overview

An experimental design system and Drupal theme built with postCSS, CSS variables, and Single Directory Components. This version of Academica utilizes Drupals UI Suite:

- https://project.pages.drupalcode.org/ui_patterns/
- https://www.drupal.org/project/ui_patterns
- https://www.drupal.org/project/ui_styles
- https://www.drupal.org/project/ui_skins
- https://www.drupal.org/project/ui_icons

Academica follows atomic design practices with Drupal Single Directory Components. Integrates PostCSS, which is compiled per component using vite. Uses CSS variables, including primitive and semantic layers for the color palette.

# Starting

Academica uses Vite to compile postCSS with a type of HTML.

To run postCSS compiling:

<code>npm run dev</code>

# Using PostCSS

<code>npm install autoprefixer</code>
<code>npm i postcss-nested</code>
<code>npm i postcss-import</code>
<code>npm i -D postcss-load-config</code>

## postcss.config.js
Create a file named postcss.config.js in the root of your project, and add this content:

<code>
module.exports = {
  // Add your installed PostCSS plugins here:
  plugins: [
    require('postcss-import'), // postcss-import must be first
    require('autoprefixer'),
    require('postcss-nested')
    // don't put devDependencies here, only dependencies
  ],
};
</code>

# Using Vite

This project includes vite.config.js and includes > vite.theme

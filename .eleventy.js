const fs = require("fs");
const htmlmin = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const Terser = require("terser");
const glob = require("glob");

module.exports = function(eleventyConfig) {
  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return await htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });

  // After build: minify CSS and JS assets
  eleventyConfig.on("afterBuild", () => {
    // Minify CSS
    glob("_site/assets/css/*.css", (err, files) => {
      if (!err) files.forEach(file => {
        const input = fs.readFileSync(file, "utf-8");
        const output = new CleanCSS().minify(input).styles;
        fs.writeFileSync(file, output);
      });
    });
    // Minify JS
    glob("_site/assets/js/*.js", (err, files) => {
      if (!err) files.forEach(async file => {
        const input = fs.readFileSync(file, "utf-8");
        const result = await Terser.minify(input);
        if (result.code) fs.writeFileSync(file, result.code);
      });
    });
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};

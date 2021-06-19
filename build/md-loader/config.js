const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

const config = new Config();

config
  .options.html(true).end()

  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2,
      slugify: slugify,
      permalink: true,
      permalinkBefore: true
    }
  ]).end()

  .plugin('containers').use(containers).end();

const md = config.toMd();
overWriteFenceRule(md);

// const wrap = function(render) {
//   return function() {
//     return render.apply(this, arguments)
//       .replace('<code v-pre class="', '<code class="hljs ')
//       .replace('<code>', '<code class="hljs">')
//   }
// }

// md.renderer.rules.fence  = wrap(md.renderer.rules.fence )
module.exports = md;

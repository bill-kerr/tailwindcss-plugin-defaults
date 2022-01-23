const plugin = require('tailwindcss/plugin');
const selectorParser = require('postcss-selector-parser');

function isKeyframeRule(rule) {
  return rule.parent && rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name);
}

function splitByNotEscapedCommas(str) {
  let chunks = [];
  let currentChunk = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ',' && str[i - 1] !== '\\') {
      chunks.push(currentChunk);
      currentChunk = '';
    } else {
      currentChunk += str[i];
    }
  }
  chunks.push(currentChunk);
  return chunks;
}

function updateAllClasses(selectors, updateClass) {
  const parser = selectorParser(selectors => {
    selectors.walkClasses(sel => {
      let updatedClass = updateClass(sel.value, {
        withPseudo(className, pseudo) {
          sel.parent.insertAfter(sel, selectorParser.pseudo({ value: `, ${pseudo}` }));
          return className;
        },
      });
      sel.value = updatedClass;
      if (sel.raws && sel.raws.value) {
        sel.raws.value = escapeCommas(sel.raws.value);
      }
    });
  });

  return parser.processSync(selectors);
}

function escapeCommas(className) {
  return className.replace(/\\,/g, '\\2c ');
}

function transformAllSelectors(transformSelector, { wrap, withRule } = {}) {
  return ({ container }) => {
    container.walkRules(rule => {
      if (isKeyframeRule(rule)) {
        return rule;
      }
      let transformed = splitByNotEscapedCommas(rule.selector).map(transformSelector).join(',');
      rule.selector = transformed;
      if (withRule) {
        withRule(rule);
      }
      return rule;
    });

    if (wrap) {
      let wrapper = wrap();
      let nodes = container.nodes;
      container.removeAll();
      wrapper.append(nodes);
      container.append(wrapper);
    }
  };
}

const defaults = plugin(function ({ addVariant, e, config }) {
  addVariant(
    'd',
    transformAllSelectors(selector => {
      return updateAllClasses(selector, (className, { withPseudo }) => {
        return withPseudo(className, `:where(.${e(`d${config('separator')}${className}`)})`);
      });
    })
  );
});

module.exports = defaults;

import plugin from "tailwindcss/plugin";

type DefaultsOptions = {
  modifier?: string;
};

const defaults = plugin.withOptions(function (options: DefaultsOptions = {}) {
  const modifier =
    options.modifier && typeof options.modifier === "string"
      ? options.modifier
      : "d";

  return function ({ addVariant }) {
    addVariant(modifier, () => "html:where(&)");
  };
});

export = defaults;

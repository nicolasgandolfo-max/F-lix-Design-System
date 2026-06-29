/**
 * @param {import("node-plop").NodePlopAPI} plop
 */
export default function (plop) {
  plop.setHelper("kebabCase", (name) =>
    String(name)
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase()
  );

  plop.setHelper(
    "camelCase",
    (name) => String(name).charAt(0).toLowerCase() + String(name).slice(1)
  );

  /** Match the section header line (one per file). */
  const sectionLinePattern = {
    Atoms: /^\/\/ ─── Atoms .*\r?\n/m,
    Molecules: /^\/\/ ─── Molecules .*\r?\n/m,
    Organisms: /^\/\/ ─── Organisms .*\r?\n/m,
  };

  plop.setGenerator("component", {
    description:
      "Generate a new Felix UI component (single file, forwardRef + CVA). Compound/Radix organisms need manual follow-up.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Component name (PascalCase, e.g. "Tooltip"):',
        validate: (value) => {
          if (/^[A-Z][a-zA-Z0-9]+$/.test(String(value).trim())) return true;
          return 'Use PascalCase (e.g. "Tooltip", "DatePicker").';
        },
      },
      {
        type: "list",
        name: "type",
        message: "Layer:",
        choices: [
          {
            name: "Atom — smallest building block",
            value: "Atoms",
          },
          {
            name: "Molecule — composes atoms",
            value: "Molecules",
          },
          {
            name: "Organism — complex UI (scaffold is still one file; extend manually)",
            value: "Organisms",
          },
        ],
      },
    ],
    actions: (data) => {
      const name = String(data.name).trim();
      const type = data.type;
      const kebab = plop.getHelper("kebabCase")(name);
      const camel = plop.getHelper("camelCase")(name);
      const pattern = sectionLinePattern[type];
      if (!pattern) {
        throw new Error(`Unknown layer: ${type}`);
      }

      return [
        {
          type: "add",
          path: `packages/ui/src/components/${type}/${kebab}.tsx`,
          templateFile: "plop-templates/component/component.tsx.hbs",
        },
        {
          type: "add",
          path: `packages/ui/src/components/${type}/${kebab}.test.tsx`,
          templateFile: "plop-templates/component/component.test.tsx.hbs",
        },
        {
          type: "add",
          path: `storybook/stories/${name}.stories.tsx`,
          templateFile: "plop-templates/component/component.stories.tsx.hbs",
        },
        {
          type: "append",
          path: "packages/ui/src/index.ts",
          pattern,
          template: `export { ${name}, ${camel}Variants } from "./components/${type}/${kebab}";\nexport type { ${name}Props } from "./components/${type}/${kebab}";\n\n`,
        },
      ];
    },
  });
}

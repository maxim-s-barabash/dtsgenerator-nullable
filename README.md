# dtsgenerator-nullable

This is a `dtsgenerator` preProcess plugin.

Recursively removes from the schema properties whose names match the regular expression.


# Install

```
npm install dtsgenerator-nullable
```

# Usage

`dtsgen.json`
```json
{
  "plugins": {
    "dtsgenerator-nullable": "^maxItems$|^description$|^example$"
  }
}
```

# Development

```
npm run build
npm test
```

## Stacks

- TypeScript
- eslint
- prettier

## Files

- `index.ts`: plugin main file

## npm scripts

### main scripts

- `npm run build`: transpile this plugin. This command need before publishing this plugin.
- `npm test`: test this plugin with coverage.
- `npm run clean`: remove all compiled files.

### sub scripts

- `npm run watch`: watch editing files for compile.
- `npm run lint:fix`: fix lint error automatically.

import * as fs from "fs";
import * as path from "path";

// ----- types -----

interface DtcgColorValue {
  colorSpace: string;
  components: [number, number, number];
  alpha: number;
  hex: string;
}

interface DtcgToken {
  $type: string;
  $value: DtcgColorValue | string | number;
  $extensions?: Record<string, unknown>;
}

// ----- helpers -----

function isToken(obj: unknown): obj is DtcgToken {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "$type" in obj &&
    "$value" in obj
  );
}

/** Convert a DTCG sRGB color value to a CSS color string. */
function colorToCss(value: DtcgColorValue): string {
  const hex = value.hex;
  if (value.alpha !== undefined && value.alpha < 1) {
    const [r, g, b] = value.components.map((c) => Math.round(c * 255));
    const a = parseFloat(value.alpha.toFixed(2));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return hex;
}

/**
 * Flatten a nested token object into a map of dot-separated paths to tokens.
 * Only includes leaf tokens (objects with $type and $value).
 */
function flattenTokens(
  obj: Record<string, unknown>,
  prefix: string = ""
): Map<string, DtcgToken> {
  const result = new Map<string, DtcgToken>();

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isToken(value)) {
      result.set(path, value as DtcgToken);
    } else if (typeof value === "object" && value !== null) {
      const nested = flattenTokens(value as Record<string, unknown>, path);
      for (const [k, v] of nested) {
        result.set(k, v);
      }
    }
  }

  return result;
}

/**
 * Build a lookup map from the primitives file.
 * The Light Mode file references use the "colour." prefix namespace,
 * so we build multiple lookup paths to handle the mapping:
 *
 * Primitives structure        ->  Light Mode reference
 * primary.50                  ->  colour.brandMode.primary.50
 * singleTone.white.white-100  ->  colour.singleTone.modeSwitch.white.white-100
 * singleTone.black.black-100  ->  colour.singleTone.modeSwitch.black.black-100
 * silverGray.50               ->  colour.silverGray.50
 * semantic.green.50           ->  colour.semantic.success.50
 * semantic.lightBlue.50       ->  colour.semantic.info.50
 * semantic.red.50             ->  colour.semantic.error.50
 * semantic.orange.50          ->  colour.semantic.warning.50
 * semantic.rose.50            ->  colour.semantic.danger.50
 */
function buildPrimitiveLookup(
  primitives: Map<string, DtcgToken>
): Map<string, string> {
  const lookup = new Map<string, string>();

  for (const [tokenPath, token] of primitives) {
    if (token.$type !== "color") continue;
    const value = token.$value as DtcgColorValue;
    const css = colorToCss(value);

    // Store under original path (e.g. "primary.50")
    lookup.set(tokenPath, css);

    // Map to the reference namespace used in Light Mode
    // primary.XX -> colour.brandMode.primary.XX
    if (tokenPath.startsWith("primary.")) {
      lookup.set(`colour.brandMode.${tokenPath}`, css);
    }

    // singleTone.white.XX -> colour.singleTone.modeSwitch.white.XX
    if (tokenPath.startsWith("singleTone.white.")) {
      const suffix = tokenPath.replace("singleTone.white.", "");
      lookup.set(`colour.singleTone.modeSwitch.white.${suffix}`, css);
    }

    // singleTone.black.XX -> colour.singleTone.modeSwitch.black.XX
    if (tokenPath.startsWith("singleTone.black.")) {
      const suffix = tokenPath.replace("singleTone.black.", "");
      lookup.set(`colour.singleTone.modeSwitch.black.${suffix}`, css);
    }

    // silverGray.XX -> colour.silverGray.XX
    if (tokenPath.startsWith("silverGray.")) {
      lookup.set(`colour.${tokenPath}`, css);
    }

    // semantic.green.XX -> colour.semantic.success.XX
    if (tokenPath.startsWith("semantic.green.")) {
      const shade = tokenPath.replace("semantic.green.", "");
      lookup.set(`colour.semantic.success.${shade}`, css);
    }

    // semantic.lightBlue.XX -> colour.semantic.info.XX
    if (tokenPath.startsWith("semantic.lightBlue.")) {
      const shade = tokenPath.replace("semantic.lightBlue.", "");
      lookup.set(`colour.semantic.info.${shade}`, css);
    }

    // semantic.red.XX -> colour.semantic.error.XX
    if (tokenPath.startsWith("semantic.red.")) {
      const shade = tokenPath.replace("semantic.red.", "");
      lookup.set(`colour.semantic.error.${shade}`, css);
    }

    // semantic.orange.XX -> colour.semantic.warning.XX
    if (tokenPath.startsWith("semantic.orange.")) {
      const shade = tokenPath.replace("semantic.orange.", "");
      lookup.set(`colour.semantic.warning.${shade}`, css);
    }

    // semantic.rose.XX -> colour.semantic.danger.XX
    if (tokenPath.startsWith("semantic.rose.")) {
      const shade = tokenPath.replace("semantic.rose.", "");
      lookup.set(`colour.semantic.danger.${shade}`, css);
    }
  }

  return lookup;
}

/** Convert a dot-path to a CSS variable name: colour.interface.surface.base -> --colour-interface-surface-base */
function toCssVarName(tokenPath: string): string {
  return "--" + tokenPath.replace(/\./g, "-").replace(/\s+/g, "-");
}

/**
 * Resolve a reference string like "{colour.brandMode.primary.50}" using the lookup.
 */
function resolveReference(ref: string, lookup: Map<string, string>): string | null {
  // Strip { and }
  const refPath = ref.replace(/^\{/, "").replace(/\}$/, "");
  return lookup.get(refPath) ?? null;
}

// ----- main -----

function main() {
  const tokensDir = path.resolve(__dirname, "..", "tokens");
  const outputPath = path.resolve(__dirname, "..", "src", "styles", "tokens.css");

  const primitivesRaw = JSON.parse(
    fs.readFileSync(path.join(tokensDir, "primitives.tokens.json"), "utf-8")
  );
  const lightModeRaw = JSON.parse(
    fs.readFileSync(path.join(tokensDir, "light-mode.tokens.json"), "utf-8")
  );

  // Flatten both token files
  const primitiveTokens = flattenTokens(primitivesRaw);
  const lightModeTokens = flattenTokens(lightModeRaw);

  // Build lookup from primitives
  const primitiveLookup = buildPrimitiveLookup(primitiveTokens);

  // Also add primitives directly mapped under their Light Mode paths
  // (e.g. the Light Mode file itself defines tokens under "colour" namespace)
  // For Light Mode tokens that have inline colour values (not references),
  // we also need those from the Light Mode's own "colour.silverGray", "colour.brandMode" etc.
  // These are already defined under the "colour.*" namespace in the Light Mode file itself.

  const cssLines: string[] = [];
  const emittedVars = new Set<string>();
  const unresolvedRefs: string[] = [];

  // Process Light Mode colour tokens (interface tokens = the semantic layer)
  for (const [tokenPath, token] of lightModeTokens) {
    if (token.$type !== "color") continue;

    const fullPath = tokenPath;
    const varName = toCssVarName(fullPath);
    let cssValue: string;

    if (typeof token.$value === "string" && token.$value.startsWith("{")) {
      // It's a reference - resolve it
      const resolved = resolveReference(token.$value, primitiveLookup);
      if (resolved) {
        cssValue = resolved;
      } else {
        unresolvedRefs.push(`${fullPath}: ${token.$value}`);
        continue;
      }
    } else if (typeof token.$value === "object" && "hex" in token.$value) {
      // Inline color value
      cssValue = colorToCss(token.$value as DtcgColorValue);
    } else {
      continue;
    }

    if (!emittedVars.has(varName)) {
      emittedVars.add(varName);
      cssLines.push(`  ${varName}: ${cssValue};`);
    }
  }

  // Also output primitive colour tokens for direct use
  for (const [tokenPath, token] of primitiveTokens) {
    if (token.$type !== "color") continue;
    const varName = toCssVarName(tokenPath);
    if (emittedVars.has(varName)) continue;
    emittedVars.add(varName);
    const cssValue = colorToCss(token.$value as DtcgColorValue);
    cssLines.push(`  ${varName}: ${cssValue};`);
  }

  // Process number tokens (spacing, radius) from Light Mode
  for (const [tokenPath, token] of lightModeTokens) {
    if (token.$type !== "number") continue;
    const varName = toCssVarName(tokenPath);
    if (emittedVars.has(varName)) continue;
    emittedVars.add(varName);
    const value = token.$value as number;
    cssLines.push(`  ${varName}: ${value}px;`);
  }

  // Also output primitive number tokens
  for (const [tokenPath, token] of primitiveTokens) {
    if (token.$type !== "number") continue;
    const varName = toCssVarName(tokenPath);
    if (emittedVars.has(varName)) continue;
    emittedVars.add(varName);
    const value = token.$value as number;
    cssLines.push(`  ${varName}: ${value}px;`);
  }

  if (unresolvedRefs.length > 0) {
    console.error("Error: unresolved token references:");
    for (const ref of unresolvedRefs) {
      console.error(`  ${ref}`);
    }
    process.exit(1);
  }

  const output = `/* Auto-generated from Figma design tokens. Do not edit manually. */\n/* Run "npm run tokens:build" to regenerate. */\n\n:root {\n${cssLines.join("\n")}\n}\n`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf-8");

  console.log(`Generated ${cssLines.length} CSS custom properties -> ${outputPath}`);
}

main();

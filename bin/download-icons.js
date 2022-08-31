import { cacheDownload } from "./src/cacheDownload.js";

const manifestUrl =
  "https://raw.githubusercontent.com/msikma/pokesprite/master/data/pokemon.json";
const imageBaseUrl =
  "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular";

const ICON_FORMES = [
  "mega",
  "mega-x",
  "mega-y",
  "alola",
  "libre",
  "galar",
  "hisui",
  "rainy",
  "snowy",
  "sunny",
  "primal",
  "attack",
  "defense",
  "speed",
  "plant",
  "sandy",
  "trash",
  "sunshine",
  "east",
  "west",
  "fan",
  "frost",
  "heat",
  "mow",
  "wash",
  "origin",
  "sky",
  "zen",
  "galar-zen",
  "therian",
  "resolute",
  "pirouette",
  "ash",
  "blade",
  "large",
  "small",
  "super",
  "active",
  "10",
  "complete",
  "unbound",
  "pau",
  "pom-pom",
  "sensu",
  "dusk",
  "midnight",
  "school",
  "dawn",
  "dusk",
  "ultra",
  "original",
  "low-key",
  "noice",
  "hangry",
  "crowned",
  "ice-rider",
  "shadow-rider",
];

const manifest = await fetch(manifestUrl).then((r) => r.json());
for (const index in manifest) {
  const descriptor = manifest[index];

  await cacheDownload(
    `${imageBaseUrl}/${descriptor.slug.eng}.png`,
    `${process.cwd()}/assets/icons/${index}.png`
  );

  const forms = descriptor?.["gen-8"]?.["forms"];
  for (const forme in forms) {
    if (forme === "$") continue;
    if (
      forme === "gmax" ||
      forme === "eternamax" ||
      forme === "rapid-strike-gmax"
    ) {
      const suffix =
        forme === "rapid-strike-gmax" ? "rapid-strike-max " : "max";
      await cacheDownload(
        `${imageBaseUrl}/${descriptor.slug.eng}-${forme}.png`,
        `${process.cwd()}/assets/icons/${index}-${suffix}.png`
      );
    } else if (ICON_FORMES.includes(forme)) {
      if (forms[forme].is_alias_of === "$") continue;
      await cacheDownload(
        `${imageBaseUrl}/${descriptor.slug.eng}-${forme}.png`,
        `${process.cwd()}/assets/icons/${index}-${forme}.png`
      );
    }
  }
}

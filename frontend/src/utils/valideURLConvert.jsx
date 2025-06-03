export const valideURLConvert = (name) => {
  if (!name) return "";

  const url = name
    .toString()
    .trim()
    .toLowerCase()
    .replaceAll(/[ ,&]+/g, "-")         // replaces spaces, commas, & with single dash
    .replace(/-+/g, "-");               // replaces multiple dashes with a single dash

  return url;
};

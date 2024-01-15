export const getTranslation = (obj, locale, def = undefined) => {
    if(obj[locale]) return obj[locale];
    if(obj['en']) return obj['en'];
    if(obj['tr']) return obj['tr'];
    return def;
}
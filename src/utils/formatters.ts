import { getLocales } from 'expo-localization';

export const lang = getLocales()[0].languageTag;

export function formatNumber(value: number, top?: number) {
    let digits = 2;
    if (top && value > top) digits = 0;

    return value.toLocaleString(
        lang,
        {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }
    );
}

export function formatInt(value: number) {
    return value.toLocaleString(
        lang,
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );
}

function hyphenateSpanishWord(word: string) {
    const vowels = "aeiouáéíóú";
    const strongVowels = "aeoáéó";
    const weakVowels = "iuíú";
    const consonants = "bcdfghjklmnñpqrstvwxyz";
    const specialGroups = ["bl", "br", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "pl", "pr", "tr"];

    let result = "";
    let i = 0;

    while (i < word.length) {
        const current = word[i];
        const next = word[i + 1] || "";
        const nextNext = word[i + 2] || "";

        result += current;

        if (i === word.length - 1) break;

        // REGLA 1: Separar hiatos (dos vocales fuertes)
        if (strongVowels.includes(current) && strongVowels.includes(next)) {
            result += "\u00AD";
        }
        // REGLA 2: No separar diptongos (vocal fuerte + vocal débil o dos débiles)
        else if (
            (strongVowels.includes(current) && weakVowels.includes(next)) ||
            (weakVowels.includes(current) && strongVowels.includes(next)) ||
            (weakVowels.includes(current) && weakVowels.includes(next))
        ) {
            // No hacer nada (no insertar guion)
        }
        // REGLA 3: Una consonante entre vocales se une con la segunda vocal
        else if (
            vowels.includes(current) &&
            consonants.includes(next) &&
            vowels.includes(nextNext)
        ) {
            result += "\u00AD";
        }
        // REGLA 4: Dos consonantes se separan, excepto grupos especiales
        else if (
            consonants.includes(current) &&
            consonants.includes(next) &&
            vowels.includes(nextNext) &&
            !specialGroups.includes(current + next)
        ) {
            result += "\u00AD";
        }
        // REGLA 5: Tres consonantes se separan en patrón válido (ej. "ins-ta-lar")
        else if (
            consonants.includes(current) &&
            consonants.includes(next) &&
            consonants.includes(nextNext) &&
            vowels.includes(word[i + 3] || "")
        ) {
            result += "\u00AD";
        }

        i++;
    }

    return result;
}

export function hyphenateText(text: string, maxLineLen: number) {
    const words = text.split(" ");
    let currentLen = 0;

    const hyphenWords = words.map(word => {
        if (currentLen + word.length + 1 <= maxLineLen) {
            currentLen += word.length + 1;
            return word
        }
        else {
            currentLen = 0;
            return hyphenateSpanishWord(word);
        }
    });

    return hyphenWords.join(" ");
}
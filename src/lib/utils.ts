/**
 * Regex pattern to detect common key-smash sequences.
 */
const KEYSMASH_PATTERNS =
  /(asdf|qwer|zxcv|hjkl|poiuy|lkjhg|mnbvc|sdfgh|qazwsx|1q2w3e|0000|1111|xxxx)/i

/**
 * Calculates the ratio of vowels to total alphabetic characters in the given text.
 * @param text - The input string to analyze.
 * @returns The vowel ratio (0–1). Returns 0 if no alphabetic characters are found.
 */
function vowelRatio(text: string) {
  const letters = (text.match(/[a-z]/gi) || []).length
  const vowels = (text.match(/[aeiou]/gi) || []).length
  return letters === 0 ? 0 : vowels / letters
}

/**
 * Calculates the ratio of the most frequently occurring character to the total length of the text.
 * @param text - The input string to analyze.
 * @returns The repeated character ratio (0–1). Returns 0 for empty strings.
 */
function repeatedCharRatio(text: string) {
  if (!text) return 0
  const counts = new Map<string, number>()
  for (const ch of text) {
    counts.set(ch, (counts.get(ch) || 0) + 1)
  }
  const max = Math.max(...Array.from(counts.values()))
  return max / text.length
}

/**
 * Calculates the ratio of non-alphanumeric characters (excluding whitespace) to the total length of the text.
 * @param text - The input string to analyze.
 * @returns The non-alphanumeric ratio (0–1). Returns 0 for empty strings.
 */
function nonAlphaNumRatio(text: string) {
  const total = text.length
  const non = (text.match(/[^a-z0-9\s]/gi) || []).length
  return total === 0 ? 0 : non / total
}

/**
 * Determines whether the provided input appears to be gibberish based on various heuristics.
 * @param input - The string to evaluate.
 * @returns An object with `jibberish` set to `true` and an optional `reason` if gibberish is detected; otherwise, `jibberish` is `false`.
 */
export function isJibberish(input: string): {
  jibberish: boolean
  reason?: string
} {
  const text = (input || '').trim()
  if (text.length === 0) return { jibberish: true, reason: 'Empty content' }

  // Heuristics
  const vRatio = vowelRatio(text)
  const rRatio = repeatedCharRatio(text)
  const nRatio = nonAlphaNumRatio(text)
  const longNoSpaces = text.length > 20 && !/\s/.test(text)

  if (KEYSMASH_PATTERNS.test(text)) {
    return { jibberish: true, reason: 'Key smash detected' }
  }

  if (vRatio < 0.2 && text.length > 8) {
    return { jibberish: true, reason: 'Low vowel ratio' }
  }

  if (rRatio > 0.5 && text.length > 6) {
    return { jibberish: true, reason: 'Excessive repeated characters' }
  }

  if (nRatio > 0.35) {
    return { jibberish: true, reason: 'Too many symbols' }
  }

  if (longNoSpaces && vRatio < 0.25) {
    return { jibberish: true, reason: 'Random-looking sequence' }
  }

  return { jibberish: false }
}

/**
 * Generates a user-friendly message indicating that the provided field contains gibberish.
 * @param field - The field type, either 'name' or 'message'.
 * @param reason - Optional reason explaining why the content was flagged as gibberish.
 * @returns A formatted message string prompting the user to provide valid input.
 */
export function getJibberishMessage(
  field: 'name' | 'message',
  reason?: string
): string {
  const base =
    field === 'name'
      ? 'Please enter a valid name.'
      : 'Please write a meaningful message.'
  if (!reason) return base
  return `${base} (${reason})`
}

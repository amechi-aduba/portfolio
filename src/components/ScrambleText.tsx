import { useCallback, useEffect, useRef, useState } from 'react'

interface ScrambleTextProps {
  id: string
  text: string
}

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?<>[]{}'

const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)]

const getScramblePair = (characters: string[], anchorIndex: number) => {
  const letterIndices = characters
    .map((character, index) => (character === ' ' ? -1 : index))
    .filter((index) => index >= 0)

  const anchorPosition = letterIndices.indexOf(anchorIndex)

  if (anchorPosition >= 0) {
    const neighborPosition = anchorPosition < letterIndices.length - 1
      ? anchorPosition + 1
      : anchorPosition - 1

    return [letterIndices[anchorPosition], letterIndices[neighborPosition]].filter(
      (index): index is number => index !== undefined,
    )
  }

  return [...letterIndices]
    .sort((first, second) => Math.abs(first - anchorIndex) - Math.abs(second - anchorIndex))
    .slice(0, 2)
    .sort((first, second) => first - second)
}

export default function ScrambleText({ id, text }: ScrambleTextProps) {
  const characters = [...text]
  const [scrambledGlyphs, setScrambledGlyphs] = useState<Record<number, string>>({})
  const intervalRef = useRef<number | null>(null)

  const clearScrambleTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stopScramble = useCallback(() => {
    clearScrambleTimer()
    setScrambledGlyphs({})
  }, [clearScrambleTimer])

  const startScramble = useCallback(
    (anchorIndex: number) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      clearScrambleTimer()
      const pair = getScramblePair([...text], anchorIndex)
      const updateGlyphs = () => {
        setScrambledGlyphs(Object.fromEntries(pair.map((index) => [index, randomGlyph()])))
      }

      updateGlyphs()
      intervalRef.current = window.setInterval(updateGlyphs, 72)
    },
    [clearScrambleTimer, text],
  )

  useEffect(() => clearScrambleTimer, [clearScrambleTimer])

  let characterIndex = 0

  return (
    <h1
      className="scramble-title"
      id={id}
      aria-label={text}
      tabIndex={0}
      onFocus={() => startScramble(Math.floor(characters.length / 2))}
      onBlur={stopScramble}
      onPointerLeave={stopScramble}
    >
      <span aria-hidden="true">
        {text.split(' ').map((word, wordIndex, words) => {
          const wordStartIndex = characterIndex
          characterIndex += word.length + 1

          return (
            <span className="scramble-title__segment" key={`${word}-${wordIndex}`}>
              <span className="scramble-title__word">
                {[...word].map((character, index) => {
                  const indexInText = wordStartIndex + index
                  const scrambledGlyph = scrambledGlyphs[indexInText]

                  return (
                    <span
                      className={scrambledGlyph
                        ? 'scramble-character is-scrambled'
                        : 'scramble-character'}
                      onPointerEnter={() => startScramble(indexInText)}
                      key={indexInText}
                    >
                      <span className="scramble-character__original">{character}</span>
                      {scrambledGlyph ? (
                        <span className="scramble-character__glyph">{scrambledGlyph}</span>
                      ) : null}
                    </span>
                  )
                })}
              </span>
              {wordIndex < words.length - 1 ? (
                <span
                  className="scramble-title__space"
                  onPointerEnter={() => startScramble(wordStartIndex + word.length)}
                >{' '}</span>
              ) : null}
            </span>
          )
        })}
      </span>
    </h1>
  )
}

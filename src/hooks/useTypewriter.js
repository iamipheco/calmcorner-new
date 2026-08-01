import { useEffect, useState } from 'react'

/**
 * Reveals `text` one character at a time. Restarts automatically
 * whenever `text` changes (e.g. when the slide changes), as long
 * as `active` is true.
 */
export function useTypewriter(text, { speed = 28, active = true, startDelay = 120 } = {}) {
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (!active) return undefined
    setOutput('')
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOutput(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, active, speed, startDelay])

  return output
}

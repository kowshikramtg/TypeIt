import words from "../data/words"

const generateWords = (count: number) => {
  const paragraph = words[Math.floor(Math.random() * words.length)]
  const parts = paragraph.split(/\s+/).filter(Boolean)

  if (parts.length <= count) {
    return paragraph
  }

  const maxStart = parts.length - count
  const start = Math.floor(Math.random() * (maxStart + 1))

  return parts.slice(start, start + count).join(" ")
}

export default generateWords
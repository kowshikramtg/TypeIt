import words from "../data/words"

const generateWords = (count: number) => {
  const result: string[] = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * words.length)

    result.push(words[randomIndex])
  }

  return result.join(" ")
}

export default generateWords
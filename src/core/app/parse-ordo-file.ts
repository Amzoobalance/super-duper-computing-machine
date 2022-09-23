export const parseOrdoFile = (raw: string) => {
  return {
    raw,
    content: raw.split("\n"),
  }
}

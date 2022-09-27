export const EditorKeys: Record<string, (event: KeyboardEvent) => boolean> = {
  arrowLeft: (event: KeyboardEvent) => event.key === "ArrowLeft",
  shiftArrowLeft: (event: KeyboardEvent) => event.key === "ArrowLeft" && event.shiftKey,
  ctrlArrowLeft: (event: KeyboardEvent) =>
    event.key === "ArrowLeft" && (event.ctrlKey || event.metaKey),
  arrowRight: (event: KeyboardEvent) => event.key === "ArrowRight",
  shiftArrowRight: (event: KeyboardEvent) => event.key === "ArrowRight" && event.shiftKey,
  ctrlArrowRight: (event: KeyboardEvent) =>
    event.key === "ArrowRight" && (event.ctrlKey || event.metaKey),
  arrowDown: (event: KeyboardEvent) => event.key === "ArrowDown",
  shiftArrowDown: (event: KeyboardEvent) => event.key === "ArrowDown" && event.shiftKey,
  arrowUp: (event: KeyboardEvent) => event.key === "ArrowUp",
  shiftArrowUp: (event: KeyboardEvent) => event.key === "ArrowUp" && event.shiftKey,
  enter: (event: KeyboardEvent) => event.key === "Enter",
  backspace: (event: KeyboardEvent) => event.key === "Backspace",
  ctrlBackspace: (event: KeyboardEvent) =>
    event.key === "Backspace" && (event.ctrlKey || event.metaKey),
  delete: (event: KeyboardEvent) => event.key === "Delete",
  ctrlDelete: (event: KeyboardEvent) => event.key === "Delete" && (event.ctrlKey || event.metaKey),
  char: (event: KeyboardEvent) => event.key.length === 1,
}

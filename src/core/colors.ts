export enum Color {
  NONE = "",
  NEUTRAL = "neutral",
  RED = "red",
  PINK = "pink",
  ORANGE = "orange",
  YELLOW = "yellow",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
}

/**
 * A set of colors supported natively in Ordo for file and folder customisation.
 */
export const Colors = [
  Color.NONE,
  Color.NEUTRAL,
  Color.RED,
  Color.PINK,
  Color.ORANGE,
  Color.YELLOW,
  Color.GREEN,
  Color.BLUE,
  Color.PURPLE,
] as const

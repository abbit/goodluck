declare module "random-weighted-choice" {
  export type TableItem = {
    weight: number
    id: string
  }

  export type Table = TableItem[]

  export default function rwc(table: Table): string
}

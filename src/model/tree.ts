export interface Node<T> {
  parent: Node<T> | null
  children: Node<T>[]
  content: T
}

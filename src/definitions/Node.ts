export default interface Node {
    id: string,
    name: string,
    type: NodeTypes,
    content: string
}

enum NodeTypes {
    file = "file",
    slave = "slave"
}
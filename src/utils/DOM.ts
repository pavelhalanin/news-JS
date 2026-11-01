export function querySelector<T extends Element = HTMLElement>(selector: string, node: ParentNode = document): T {
    const childrenNode = node.querySelector<T>(selector);

    if (!childrenNode) {
        throw new Error(`Node is not found: ${selector}`);
    }

    return childrenNode;
}

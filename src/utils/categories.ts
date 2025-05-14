import { CATEGORY_COLORS, CATEGORY_ICONS, CategoryColorKey, CategoryIconKey } from "@/db/ui";

function addGeneralCategory(node: CategoryNode) {
    if (node.children.length === 0)
        node.children.push({
            id: node.id,
            name: "General",
            children: []
        });
}

export function getCategoriesTree(data: CategoryData) {
    const roots: CategoryNode[] = [];

    data.forEach(item => {
        const node = data.get(item.id)

        if (!node) return;

        if (item.idFather) {
            const parent = data.get(item.idFather);

            if (parent) {
                addGeneralCategory(parent);
                parent.children.push(node);
            }

        } else {
            roots.push(node);

            if (node.children.length === 0)
                addGeneralCategory(node);
        }
    });

    roots.sort((a, b) => Number(a.id) - Number(b.id));

    return roots;
}

export function getUiElements (id: Id, catIdFather?: Id) {
    const icon = CATEGORY_ICONS[id as CategoryIconKey];
      const color =
        CATEGORY_COLORS[
          (catIdFather as CategoryColorKey) ||
            (id as CategoryColorKey)
        ];
    
        return {
            icon,
            color
        }
}
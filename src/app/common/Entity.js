export class Entity {
    constructor(id, name) {
        this.isChild = false;
        this.isParent = false;
        this.isLeaf = false;
        /**
         * Attributes as node
        */
        this.indeterminate = false;
        this.expanded = false;
        this.checked = false;
        /**
        * Basic Attributes
        */
        this.id = id;
        this.name = name;
        this.parent = {}
    }
}
export class EntryEntity {
    constructor(id, getEntity = () => null) {
        this.id = id;
        this.getEntity = getEntity;
    }
}
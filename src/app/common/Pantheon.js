import { EntryEntity, Entity } from "./Entity";


function entity_has_children(entity) {
    return entity && Object.keys(entity.children || {}).length > 0;
}

function create_entry(pantheon, id) {
    return new EntryEntity(id, () => {
        return pantheon.getEntity(id);
    });
}

function create_entities_with_data(pantheon, data = {}, parent = {}, depth = 0) {
    const keys = Object.keys(data);
    return keys.map((keys, index) => {
        const value = data[keys];
        const is_parent = entity_has_children(value);
        const entity = new Entity(value.id, value.name);
        entity.isParent = is_parent;
        entity.isLeaf = !is_parent;
        entity.isChild = !(!parent.id);
        entity.parent = create_entry(pantheon, parent.id);
        entity.expanded = false;
        entity.checked = false;
        entity.indeterminate = false;
        entity.children = create_entities_with_data(pantheon, value.children || {}, value, depth + 1);
        pantheon.entities[entity.id] = entity;
        return create_entry(pantheon, entity.id);
    });
}


export default class Pantheon {
    constructor() {
        this.entities = {};
    }

    static SupportedAttributes() {
        return ['expanded', 'indeterminate', 'checked'];
    }

    static from(data) {
        const pantheon = new Pantheon();
        const entities = create_entities_with_data(pantheon, data);
        return {
            pantheon,
            entities
        };
    }

    /**
    * Fill attributes
    * @param attributes_changes identificadores das entidades com os seus atributos
    * @return {Pantheon} {Pantheon}
    **/
    fill(attributes_changes) {
        const attributes = Pantheon.SupportedAttributes();
        attributes.forEach((attribute) => {
            if (attributes_changes[attribute])
                attributes_changes[attribute].forEach((id) => {
                    if (this.entities[id] !== undefined) {
                        this.entities[id][attribute] = true;
                    }
                });
        });
        return this;
    }

    /**
     * Get Entity
     * @param {String} id identificador da entidade
     * @return {Entity} retorna entidade encontrada
    **/
    getEntity(id) {
        const self = this;
        return self.entities[id];
    }

    /**
     * Get Attributes Changes
     * @return {Mixed} retorna hash com os ids das entidades que tiveram atributos alterados
    **/
    getAttributesChanges() {
        let attributes_changes = {};
        const attributes = Pantheon.SupportedAttributes();
        const fn_get_changes = (attribute) => {
            const changes_ids = [];
            Object.keys(this.entities).forEach((id) => {
                if (this.entities[id][attribute]) {
                    changes_ids.push(id);
                }
            });
            return changes_ids;
        };
        attributes.forEach(attribute => {
            attributes_changes[attribute] = fn_get_changes(attribute);
        });
        return attributes_changes;
    }

    /**
     * Set Expand
     * @param {String} id identificador da entidade
     * @param {Boolean} expand informa se é para entrar em estado de ´expanded´
     * @return {Pantheon} {Pantheon}
    **/
    setExpand(id, expand) {
        const entity = this.getEntity(id);
        entity.expanded = expand;
        return this;
    }

    /**
    * Set Checked
    * @param {String} id identificador da entidade
    * @param {Boolean} check informa se é para entrar em estado de ´checked´
    * @param {Boolean} inCascade impede que a interação entre em loop e entidade pai e filho
    * @return {Pantheon} {Pantheon}
    **/
    setChecked(id, check, inCascade = true) {
        const entity = this.getEntity(id);
        entity.checked = check;
        entity.indeterminate = false;

        //Coloca todos os filhos em ´checked´
        if (entity.children)
            entity.children.forEach((child) => {
                this.setChecked(child.id, check, false);
            });

        if (inCascade && entity.isChild) {
            this.setCheckedParent(entity.parent.id);
        }
        return this;
    }

    /**
    * Set Checked Parent
    * @param {String} id identificador da entidade
    * @return {Pantheon} {Pantheon}
    **/
    setCheckedParent(id) {
        const entity = this.getEntity(id);
        //verifica se alguns dos filhos está em ´checked´ ou ´indeterminate´ e fica em ´indeterminate´
        entity.indeterminate = entity.children.some(({ id }) => {
            const child = this.getEntity(id);
            return child.checked || child.indeterminate;
        });
        //verifica se alguns todos os filhos estão em ´checked´ e fica em ´checked´
        entity.checked = entity.children.every(({ id }) => {
            const child = this.getEntity(id);
            return child.checked;
        });
        if (entity.isChild)
            this.setCheckedParent(entity.parent.id);
        return this;
    }
}

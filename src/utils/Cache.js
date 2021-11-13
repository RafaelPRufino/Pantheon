function createguid() {
    return 'cache-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const write = async (values, name = null) => {
    const json_string = JSON.stringify({ cache: values });
    const id = name || createguid();
    window.sessionStorage.setItem(id, json_string);
    return id;
};

const read = async (name) => {
    const json_string = window.sessionStorage.getItem(name);
    const json_value = JSON.parse(json_string || '{"cache":null }');
    return ((json_value || {}).cache || {});
};

const remove = async (name) => {
    window.sessionStorage.removeItem(name);
    return true
};

const flux = async (name) => {
    const values = await read(name);
    await remove(name);
    return values;
};

const cache = { write, read, remove, flux }

export default cache
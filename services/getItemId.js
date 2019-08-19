module.exports = (thing) => {
    if (typeof thing === "object") {
        return thing.id;
    } else {
        return thing;
    }
}; // close getItemId

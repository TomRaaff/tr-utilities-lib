/**
 * mergeObjects merges the baseObject with the fields defined in the updatesObject. Fields with primitive values or
 * primitives arrays are simply overwritten, fields with objects are recursively updated.
 *
 * When the field is an array, the updates array will be leading. Meaning:
 *
 * If your update array contains LESS objects than the base array, it will update the existing objects in the
 * BASE array and DELETE the non-updated items.
 *
 * If your update array contains MORE objects than the base array, it will update the existing
 * objects in the BASE array and ADD update-objects.
 *
 * @param baseObj: any
 * @param updatesObj: any
 * @returns {*}
 */
export default function mergeObjects(baseObj: any, updatesObj: any): any {
    const base = { ...baseObj };
    base.__proto__ = baseObj.__proto__;

    const updates = { ...updatesObj };
    const whenArray = (baseArr: any[], updateArr: any[]) => {
        if (Array.isArray(baseArr[0])) {
            console.error('2+-Dimensional arrays are not supported yet', baseArr);
            return undefined;
        }
        if (typeof baseArr[0] === 'object') {
            return updateArr.map((update, index) => (baseArr[index] != null)
                ? mergeObjects(baseArr[index], update)
                : update);
        }
        return updateArr;
    }

    Object.keys(updates)
        .forEach(key => {
            if (typeof base[key] === 'function') return;
            if (base[key] === null || base[key] === undefined) {
                base[key] = updates[key];
                return;
            }
            if (Array.isArray(base[key])) {
                base[key] = whenArray(base[key], updates[key]);
                return;
            }
            if (typeof base[key] === 'object') {
                base[key] = mergeObjects(base[key], updates[key]);
                return;
            }
            base[key] = updates[key];
        });
    return base;
}
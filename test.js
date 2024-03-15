function get(object, ...path) {
    return path.map((item) => {
        let res = object;
        console.log(object);
        item.replace(/\[/g, ".")
            .replace(/\]/g, "")
            .split('.')
            .map(path => {
                res = res && res[path]
                console.log(path + '\n');
            });

        return res;
    })
}

// input
const obj = { 选择器: { to: { toutiao: "FE Coder" } }, target: [1, 2, { name: 'byted' }] };
get(obj, '选择器.to.toutiao', 'target[0]', 'target[2].name');


// output
['FE coder', 1, 'byted']


function* gen() {}

let it = gen()
// 数组上都有 的 凡是有这个属性的，就可以通过for循环来迭代
console.log(it[Symbol.iterator])
function* gen2() {}

export default class Random {
  static indexs (size, min, max) {
    let index = [];
    for (let i = 0; i < size; i++) {
      while (true) {
        let r = Random.getInt(min, max);
        if (index.indexOf(r) === -1) {
          index[i] = r;
          break;
        }
      }
    }
    return index;
  }
  static indexStr (size, min, max) {
    let lists = Random.indexs(size, min, max);
    return lists.map(value => {
      return value > 9 ? String(value) : String('0' + value);
    })
  }
  static getInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

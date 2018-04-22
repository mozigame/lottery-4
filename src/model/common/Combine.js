export default class Combine {
  constructor (allItem) {
    this.allItem = allItem;
  }
  startCombine (count) {
    let results = [];
    this.combineRecursion(this.allItem.length, count, [], results);
    return results.reverse();
  }
  combineRecursion (n, m, combine, results) {
    for (let i = n; i >= m; i--) {
      combine[m - 1] = i - 1;
      if (m > 1) {
        this.combineRecursion(i - 1, m - 1, combine, results);
      } else {
        results.push(combine.map(v => this.allItem[v]));
      }
    }
  }
}

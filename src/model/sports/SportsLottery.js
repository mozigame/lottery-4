/**
 * 竟彩基类
 */
export default class SportsLottery {
  constructor (obj) {
    this.lottery_id = obj.lottery_id;
    this.betting_order = obj.betting_order;
    this.result_odds = obj.result_odds;
    this.score = obj.score;
    this.home = obj.home;
    this.guest = obj.guest;
    this.round_no = obj.round_no;
    this.scoreText = obj.score && obj.score.final;
    this.finalArr = this.score && this.score.final && this.score.final.split(':');
    this.analysePointText();
  }
  // 设置让球让分
  analysePointText () {
    this.team = {};
    let order = this.betting_order;
    for (let key in order) {
      if (key === 'betting_score_concede') {
        this.team.letPointText = order[key].let_point > 0 ? '+' + order[key].let_point : order[key].let_point;
      }
      if (key === 'betting_score_dxf') {
        this.team.basePointText = order[key].base_point;
      }
    }
  }
  analyseBettingOrder () {
    // 处理投注内容
  }
  analyseBettingResult () {
    // 处理投注结果
  }
  // 设置选择结果的
  setBettingChecked () {
    let result = this.result;
    if (result && result.length > 0) {
      result.map(r => {
        this.betting.map(b => {
          if (String(r.text) === String(b.text)) {
            b.checked = true;
          }
          return b;
        })
      })
    }
  }
  analyseBettingOrderByLottery (lottery) {
    if (lottery) {
      let order = this.betting_order;
      let betting = [];
      for (let key in lottery) {
        if (order.hasOwnProperty(key)) {
          for (let o in order[key]) {
            if (lottery[key].hasOwnProperty(o)) {
              betting.push({
                text: lottery[key][o], value: order[key][o]
              })
            }
          }
        }
      }
      this.betting = betting;
    }
  }
  analyseBettingResultByLottery (lottery) {
    if (!lottery) {
      return;
    }
    let result = [];
    let finalArr = this.finalArr;
    let order = this.betting_order;
    let resultOdds = this.result_odds;
    if (finalArr && finalArr.length > 0) {
      finalArr = finalArr.map(val => parseInt(val));
      for (let key in lottery) {
        if (order.hasOwnProperty(key)) {
          let k = '';
          switch (key) {
            case 'betting_score_no_concede':
              k = finalArr[0] > finalArr[1] ? '3' : finalArr[0] === finalArr[1] ? '1' : '0';
              break;
            case 'betting_score_concede':
              let z = (finalArr[0] + order[key]['let_point']); // 主队的分数
              k = z > finalArr[1] ? '3' : z === finalArr[1] ? '1' : '0';
              break;
            case 'betting_score_scores':
              if (lottery[key]['v' + finalArr[0] + finalArr[1]]) {
                k = '' + finalArr[0] + finalArr[1];
              } else {
                k = finalArr[0] > finalArr[1] ? '90' : finalArr[0] === finalArr[1] ? '99' : '09';
              }
              break;
            case 'betting_score_balls':
              k = +finalArr[0] + (+finalArr[1]);
              if (k > 6) { k = 7; }
              break;
            case 'betting_score_half':
              let scoreHalf = this.score.half;
              let halfArr = scoreHalf.split(':');
              let t1 = halfArr[0] > halfArr[1] ? '3' : halfArr[0] === halfArr[1] ? '1' : '0';
              let t2 = finalArr[0] > finalArr[1] ? '3' : finalArr[0] === finalArr[1] ? '1' : '0';
              k = t1 + t2;
              break;
            case 'betting_score_sfc':
              let compare = finalArr[0] - finalArr[1];
              let tail = Math.floor((Math.abs(compare) - 1) / 5) + 1;
              tail = tail > 6 ? 6 : tail;
              k = (finalArr[0] > finalArr[1] ? '0' : '1') + tail;
              break;
            case 'betting_score_dxf':
              let total = +finalArr[0] + (+finalArr[1]);
              k = total >= order[key]['base_point'] ? 1 : 2;
              break;
          }
          let temp = { text: lottery[key]['v' + k], value: order[key]['v' + k] };
          if (!temp.value && resultOdds && resultOdds[lottery[key]['key']]) {
            temp.value = resultOdds[lottery[key]['key']]['v' + k];
          }
          // 中奖时取betOrders，不中时取resultOdds
          result.push(temp);
        }
      }
    }
    this.result = result;
  }
}

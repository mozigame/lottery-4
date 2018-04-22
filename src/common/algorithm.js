import { LotteryFootballKey, LotteryKey,
  LotteryBasketballKey, PlayType, SeriesType } from '../store/constants';
import Util from './util';

export function analyseBettingOrder (order, lottery) {
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
  return betting;
}

function analysePointText (order) {
  let result = {};
  for (let key in order) {
    if (key === 'betting_score_concede') {
      result.letPointText = order[key].let_point > 0 ? '+' + order[key].let_point : order[key].let_point;
    }
    if (key === 'betting_score_dxf') {
      result.basePointText = order[key].base_point;
    }
  }
  return result;
}

function analyseBettingResult (order, resultOdds, lottery, finalArr, scoreHalf) {
  let result = [];
  if (finalArr) {
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
              k = finalArr[0] + finalArr[1];
            } else {
              k = finalArr[0] > finalArr[1] ? '90' : finalArr[0] === finalArr[1] ? '99' : '09';
            }
            break;
          case 'betting_score_balls':
            k = +finalArr[0] + (+finalArr[1]);
            if (k > 6) { k = 7; }
            break;
          case 'betting_score_half':
            let halfArr = scoreHalf.split(':');
            let t1 = halfArr[0] > halfArr[1] ? '3' : halfArr[0] === halfArr[1] ? '1' : '0';
            let t2 = finalArr[0] > finalArr[1] ? '3' : finalArr[0] === finalArr[1] ? '1' : '0';
            k = t1 + t2;
            break;
          case 'betting_score_sfc':
            let compare = finalArr[0] - finalArr[1];
            let tail = Math.floor(Math.abs(compare) / 5) + 1;
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
  return result;
}
// 胜负彩和任九的投资解析
function analyseBettingNum (betNum) {
  const comma = ',';
  const verticalLine = '|';
  let bettingArr;
  if (betNum.indexOf(comma) !== -1) {   // 判断betting_num
    bettingArr = betNum.split(comma).map(value => {
      return { text: value };
    })
  } else if (betNum.indexOf(verticalLine) !== -1) {
    bettingArr = betNum.split(verticalLine).map(value => {
      return { text: value };
    })
  } else {
    bettingArr = [{ text: betNum }];
  }
  return bettingArr;
}

export function betContentAndResult (betting, result) {
  if (result && result.length > 0) {
    result.map(r => {
      betting.map(b => {
        if (String(r.text) === String(b.text)) {
          b.checked = true;
        }
        return b;
      })
    })
  }
}
// 投注内容/出票赔率
export function betContentHandle (value, lId) {
  const lotteryId = String(lId || value.lottery_id);
  const order = value.betting_order;
  const odds = value.result_odds;
  const score = value.score;
  let finalArr = null;
  if (score && score.final) {
    finalArr = score.final.split(':');
    value.scoreText = score.final;
  }
  if (Util.isFootball(lotteryId)) {
    value.homeFirst = true;
    value.team = analysePointText(order);
    value.betting = analyseBettingOrder(order, LotteryFootballKey);
    value.result = analyseBettingResult(order, odds, LotteryFootballKey, finalArr)// 彩果
    value.showCheck = true;
  }
  if (Util.isBasketball(lotteryId)) {
    value.homeFirst = false;
    value.team = analysePointText(order);
    value.betting = analyseBettingOrder(order, LotteryBasketballKey);
    if (finalArr) {
      let tempArr = [finalArr[1], finalArr[0]]
      value.scoreText = tempArr.join(':');
    }
    value.result = analyseBettingResult(order, odds, LotteryBasketballKey, finalArr, score.half)// 彩果
    value.showCheck = true;
  }
  if (lotteryId === '20' || lotteryId === '21') {
    value.homeFirst = true;
    value.team = analysePointText(order);
    value.betting = analyseBettingNum(value.betting_order['betting_num']);
    value.round_no = `第${value.round_no}场`;
    value.result = [{text: undefined}];
    // 计算彩果
    if (finalArr) {
      value.result[0].text = finalArr[0] > finalArr[1] ? 3
        : finalArr[0] === finalArr[1] ? 1 : 0;
    }
  }
  betContentAndResult(value.betting, value.result);
  return value;
}
// tickets数据出来
export function ticketsHandle (value) {
  let betNumber = value.bet_number || '';
  let result = {};
  let results = [];
  let hasBlock = betNumber.indexOf('#') !== -1;
  result.block = hasBlock ? betNumber.split('#') : [betNumber];
  result.block.map(value => {
    let hasFixed = value.indexOf('@') !== -1;
    let obj = {};
    if (hasFixed) {
      let temp = value.split('@');
      obj.pre = temp[0].split(',');
      obj.next = temp[1].split(',');
    } else {
      obj.next = value.split(',');
    }
    results.push(obj);
  });
  value.result = results;
  value.playTypeText = PlayType[value.play_type];
  return value;
}
// 数字彩结果处理
export function prizeNumberResult (prize) {
  if (!prize) {
    return [];
  }
  let hasBlock = prize.indexOf('#') !== -1;
  let result = {};
  let results = [];
  result.block = hasBlock ? prize.split('#') : [prize];
  result.block.map(value => {
    let obj = {};
    obj.next = value.split(',');
    results.push(obj);
  });
  return results;
}
// 投注方式对照表出来
export function seriesArray (str) {
  return String(str).split(',').map(value => {
    return SeriesType[value];
  })
}

// 订单确认页的 bet_number 解析
export function confirmOrderBetNumberHandle (betNumber) {
  let betArr = betNumber.split('|');
  let result = [];
  betArr.map(value => {
    const temp = value.split(':');
    const schedule = temp[1].split(',');
    if (Util.isFootball(temp[0])) {
      schedule.map(v => {
        result.push({ text: LotteryFootballKey[LotteryKey[temp[0]]]['v' + v] });
      })
    } else if (Util.isBasketball(temp[0])) {
      schedule.map(v => {
        result.push({ text: LotteryBasketballKey[LotteryKey[temp[0]]]['v' + v] });
      })
    }
  });
  return result;
}

export function confirmOrderShowTeam (value, lotteryId) {
  if (Util.isFootball(lotteryId)) {
    return {
      left: value.home, right: value.guest
    }
  } else if (Util.isBasketball(lotteryId)) {
    return {
      left: value.guest, right: value.home
    }
  } else {
    return {
      left: value.home, right: value.guest
    }
  }
}

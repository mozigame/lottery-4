import { LotteryFootballKey, LotteryBasketballKey, SeriesType } from '../../../store/constants.js'
import SportsCalculate from '../../../model/sports/SportsCalculate'
import Util from '../../../common/util';

export default class compute {
  constructor (groups) {
    this.groups = JSON.parse(JSON.stringify(groups))
    return this.computeOdds()
  }

  sfcCompute (item) {
    // 胜负彩
    item.jc_info = item.jc_info.map((item2, index) => {
      item2.betTxt = []
      let arr = item2.betting_order.betting_num.split(',')
      item2.betTxt[index] = arr.map(item3 => {
        return {txt: item3, odds: ''}
      })
      return item2
    })
    return item
  }

  basketballFootball (scheduleList, jcInfo, data) {
    scheduleList.forEach(item => {
      let betTxt = []
      let index = jcInfo.findIndex(Info => {
        if (Info.id === item.id) {
          const betContent = JSON.parse(Info.bet_content)
          for (let key in betContent) {
            betTxt.push(betContent[key].map(odds => {
              // 计算最大最小金额
              let countOdds = Info.result_odds[key][odds]
              if (Util.isFootball(Info.lottery_id)) {
                return {
                  id: key,
                  key: odds,
                  value: countOdds,
                  text: ResolveFootball(key, odds, Info),
                  txt: ResolveFootball(key, odds, Info),
                  odds: countOdds
                }
              } else if (Util.isBasketball(Info.lottery_id)) {
                return {
                  id: key,
                  key: odds,
                  value: countOdds,
                  text: ResolveBasketball(key, odds, Info),
                  txt: ResolveBasketball(key, odds, Info),
                  odds: countOdds
                }
              }
              return
            }))
          }
          return true
        }
        return false
      });
      // 数据修改为可以计算奖金的数据格式
      if (index !== -1) {
        jcInfo[index].betTxt = betTxt
        jcInfo[index].selected = betTxt
        jcInfo[index].lotteryId = parseInt(data.jc_info[index].lottery_id)
      } else {
        jcInfo[0].selected = []
      }
    });
    return {scheduleList, jcInfo}
  }

  computeOdds () {
    let save = []
    let PromsSave = []
    const groupsList = this.groups.map((List, indexL) => {
      List.list = List.list.map((item, indexA) => {
        if (item.lottery_id === '20' || item.lottery_id === '21') {
          return this.sfcCompute(item)
        }
        //   // -
        let series = []
        const data = this.basketballFootball(item.schedule_list, item.jc_info, item)
        item.schedule_list = data.scheduleList
        item.jc_info = data.jcInfo
        if (item.series) {
          item.seriesText = SeriesType[item.series];
          series.push({key: item.series, value: SeriesType[item.series]})
        }
        save.push([indexL, indexA])
        PromsSave.push(this.setProjectBonus(item.lottery_id, series, item.jc_info, item.multiple))
        return item
      })
      return List
    })
    return Promise.all(PromsSave).then(yes => {
      return new Promise((resolve) => {
        save.forEach((item, index) => {
          // console.log(JSON.parse(JSON.stringify(yes[index])))
          if (Object.prototype.toString.call(yes[index]) === `[object Object]`) {
            groupsList[item[0]].list[item[1]].calculatePrice = yes[index]
            groupsList[item[0]].list[item[1]].oddsMin = (yes[index].min).toFixed(2)
            groupsList[item[0]].list[item[1]].oddsMax = (yes[index].max).toFixed(2)
          } else {
            groupsList[item[0]].list[item[1]].oddsMin = 0
            groupsList[item[0]].list[item[1]].oddsMax = 0
          }
        })
        resolve(groupsList)
      })
    })
  }

  setProjectBonus (lotteryId, series, orders, multiple) {
    return new SportsCalculate(lotteryId).setProjectBonus(series, orders, multiple)
  }
}

function ResolveFootball (key, odd, points) {
  let txt = ''
  switch (key) {
    case '601':
      txt = LotteryFootballKey['betting_score_no_concede'][odd];
      break;
    case '602':
      txt = `${LotteryFootballKey['betting_score_concede'][odd]}[${points.let_point}]`;
      break;
    case '603':
      txt = LotteryFootballKey['betting_score_scores'][odd];
      break;
    case '604':
      txt = LotteryFootballKey['betting_score_balls'][odd];
      break;
    case '605':
      txt = LotteryFootballKey['betting_score_half'][odd];
      break;
    default:

  }
  return txt
}

function ResolveBasketball (key, odd, points) {
  let txt = ''
  switch (key) {
    case '701':
      txt = LotteryBasketballKey['betting_score_no_concede'][odd];
      break;
    case '702':
      txt = `${LotteryBasketballKey['betting_score_concede'][odd]}[${points.let_point}]`;
      break;
    case '703':
      txt = LotteryBasketballKey['betting_score_sfc'][odd];
      break;
    case '704':
      txt = LotteryBasketballKey['betting_score_dxf'][odd];
      break;
    default:

  }
  return txt
}

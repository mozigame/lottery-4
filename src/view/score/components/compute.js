// import { SeriesType } from '../../../../../store/constants'
import { LotteryFootballKey, LotteryBasketballKey, SeriesType } from '../../../store/constants.js'
import SportsCalculate from '../../../model/sports/SportsCalculate'
import Util from '../../../common/util';

let calculate
export default class compute {
  constructor (list) {
    this.list = JSON.parse(JSON.stringify(list))
    return this.computeOdds()
  }

  computeOdds () {
    this.list.findIndex(item => {
      console.log(item, item)
      if (!calculate) {
        calculate = new SportsCalculate(item.lotteryId)
      }
      calculate.setPlayType(item.lotteryId);
      let series = [{key: item.series, value: SeriesType[item.series]}]
      calculate.setProjectBonus(series, item.jc_info, item.multiple).then((value) => {
        console.log(value, 987);
      }).catch(console.log);
      console.log(item)
      return true
    })
    const list = this.list.map(item => {
      let oddsMax = []
      let oddsMix = []
      if (item.lottery_id === '20' || item.lottery_id === '21') {
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
      item.schedule_list.forEach((item2, item2Index) => {
        let betTxt = []
        let index = -1
        index = item.jc_info.findIndex(item3 => {
          if (item3.id === item2.id) {
            let betContent = JSON.parse(item3.bet_content)
            for (let key in betContent) {
              betTxt.push(betContent[key].map(odds => {
                // 计算最大最小金额
                let countOdds = item3.result_odds[key][odds]
                if (!oddsMax[item2Index]) {
                  oddsMax[item2Index] = parseFloat(countOdds)
                } else if (oddsMax[item2Index] < countOdds) {
                  oddsMax[item2Index] = parseFloat(countOdds)
                }
                if (!oddsMix[item2Index]) {
                  oddsMix[item2Index] = parseFloat(countOdds)
                } else if (countOdds < oddsMix[item2Index]) {
                  oddsMix[item2Index] = parseFloat(countOdds)
                }
                // console.log(oddsMax[item2Index], oddsMix[item2Index])
                if (Util.isFootball(item3.lottery_id)) {
                  return {
                    txt: ResolveFootball(key, odds, item3),
                    odds: countOdds
                  }
                } else if (Util.isBasketball(item3.lottery_id)) {
                  return {
                    txt: ResolveBasketball(key, odds, item3),
                    odds: countOdds
                  }
                }
              }))
            }
            return true
          }
          return false
        })
        if (index !== -1) {
          item.jc_info[index].betTxt = betTxt
        }
      })
      if (item.series) {
        item.seriesText = SeriesType[item.series];
      }
      // console.log(oddsMax, oddsMix)
      let max = item.multiple * 2
      let min = item.multiple * 2
      for (let i in oddsMax) {
        max *= oddsMax[i]
        min *= oddsMix[i]
      }
      item.oddsMax = max.toFixed(2)
      item.oddsMin = min.toFixed(2)
      return item
    })
    // console.log(list)
    return list
  }

  computeOdds2 () {

    // return this.list.map(item => {
    //   if (!calculate) {
    //     calculate = new SportsCalculate(item.lotteryId)
    //   }
    //   calculate.setPlayType(item.lotteryId);
    //   let series = [{key: item.series, value: SeriesType[item.series]}]
    //   calculate.setProjectBonus(series, item.jc_info, item.multiple).then((value) => {
    //     console.log(value, 987);
    //   });
    //   return item
    // })
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

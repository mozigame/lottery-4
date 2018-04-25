import Lottery from '../common/Lottery';
import Series from '../common/Series';
import Util from '../../common/util';
import { LOTTERYIDS } from '../../store/constants';

const PLAY_TYPE_JCZQ = 46;
const PLAY_TYPE_JCLQ = 47;

const CONVENT_LOTTERY_ID = {
  '601': '354',
  '602': '269',
  '603': '271',
  '604': '270',
  '605': '272',
  '701': '274',
  '702': '275',
  '703': '276',
  '704': '277'
}

export default class SportsCalculate {
  constructor (lotteryId) {
    this.isMix = 1;
    this.isDup = 1;
    this.multiple = 1;
    this.setPlayType(lotteryId);
  }

  setPlayType (lotteryId) {
    if (Lottery.isFootBall(lotteryId)) {
      this.playType = PLAY_TYPE_JCZQ;
    } else {
      this.playType = PLAY_TYPE_JCLQ;
    }
  }

  initScript () {
    // window.calculateScript外部脚本
    return new Promise((resolve, reject) => {
      const SCRIPT = `SCRIPT`
      if (window.calculateScript) {
        if (window.calculateScript === SCRIPT) {
          setInterval(() => {
            if (window.calculateScript !== SCRIPT) {
              resolve(window.calculateScript)
            }
          }, 300)
        } else {
          resolve(window.calculateScript)
        }
      } else {
        window.calculateScript = SCRIPT
        Util.loadingCalculator((Module) => {
          window.calculateScript = Module.cwrap('api_calc_bet', 'number', ['number', 'string', 'string', 'number', 'number', 'number', 'number', 'number', 'string'])
          resolve(window.calculateScript)
        });
      }
    })
  }

  setProjectBonus (series, orders, multiple) {
    // 返回promise计算脚本
    this.setSeriesTypes(series);
    this.setBetContent(orders);
    this.multiple = multiple;
    return this.initScript().then(calculate => {
      return Promise.resolve(calculate && calculate(this.playType, this.seriesTypes, this.betContent, this.isMix, this.isDup, null, null, null))
    })
  }

  setSeriesTypes (series) {
    let seriesTypes = '';
    series.map(value => {
      let str = Series.getSeriesStr(value.key);
      if (str) {
        seriesTypes += (str + ';');
      }
    });
    this.seriesTypes = seriesTypes;
  }

  setBetContent (orders) {
    let betContent = '';
    orders.map(order => {
      let content = '';
      if (order.lotteryId === 606) {
        for (let i = 0; i < 5; i++) {
          content += this.getScheduleContent(parseInt('60{0}'.format(i + 1)), order.selected[i] || []);
        }
      } else if (order.lotteryId === 705) {
        for (let i = 0; i < 4; i++) {
          content += this.getScheduleContent(parseInt('70{0}'.format(i + 1)), order.selected[i] || []);
        }
      } else {
        content = this.getScheduleContent(order.lotteryId, order.selected);
      }
      betContent = `${betContent}${order.schedule_id || order.id}|${this.getLetPoint(order)}|${(order.is_sure > 0 || order.isSure > 0) ? '1' : '0'}|${content};`
    })
    this.betContent = betContent;
  }

  getLetPoint (betting) {
    return betting.let_point || betting.letPoints || '0';
  }

  getScheduleContent (lotteryId, selected) {
    let content = '';

    const convertSelected = (value) => {
      if (value.id && parseInt(value.id) !== lotteryId) {
        lotteryId = parseInt(value.id)
      }
      let typeStr = '';
      if (lotteryId === 603) {
        if (value.key === 'v90') typeStr = '999:0';
        else if (value.key === 'v99') typeStr = '999:999';
        else if (value.key === 'v09') typeStr = '0:999';
        else {
          typeStr = `${value.key.substr(1, 1)}:${value.key.substr(2, 1)}`
        }
      } else if (lotteryId === 703) {
        typeStr = this.getSfcFormatted(value.key);
      } else if (lotteryId === 704) {
        if (value.key === 'v1') {
          typeStr = '+{0}'.format(value.basePoint);
        } else if (value.key === 'v2') {
          typeStr = '-{0}'.format(value.basePoint);
        }
      } else {
        typeStr = value.key.substr(1);
      }
      content = `${content}${CONVENT_LOTTERY_ID[`${lotteryId}`]}#${typeStr}#${value.value}/`;
    }
    // console.log(selected)
    selected.forEach(value => {
      if (Object.prototype.toString.call(value) === `[object Array]`) {
        value.forEach(item => {
          convertSelected(item)
        })
      } else {
        convertSelected(value)
      }
    })
    return content
  }

  getSfcFormatted (type) {
    switch (type) {
      case 'v01':
        return 0;
      case 'v02':
        return 1;
      case 'v03':
        return 2;
      case 'v04':
        return 3;
      case 'v05':
        return 4;
      case 'v06':
        return 5;
      case 'v11':
        return 6;
      case 'v12':
        return 7;
      case 'v13':
        return 8;
      case 'v14':
        return 9;
      case 'v15':
        return 10;
      case 'v16':
        return 11;
    }
  }

  getSportTickets (orders) {
    let simpleBetInfos = [];
    if (this.tickets) {
      let stakes = this.tickets.split('|');
      for (let bets of stakes) {
        let sportTicket = [];
        let bet = bets.split(';');
        for (let betInfo of bet) {
          let betDetail = betInfo.split('#');
          let simpleBetInfo = {
            scheduleId: betDetail[0],
            lotteryId: this.convertLotteryId(betDetail[1]),
            betNum: this.convertBetNum(this.convertLotteryId(betDetail[1]), betDetail[2]),
            odds: betDetail[3]
          }
          orders.map(schedule => {
            if (schedule.id === simpleBetInfo.scheduleId) {
              simpleBetInfo.roundNo = schedule.round_no;
              simpleBetInfo.home = schedule.home;
              simpleBetInfo.guest = schedule.guest;
              if (schedule.concede) {
                simpleBetInfo.letPoint = schedule.concede['let_point'];
              } else {
                simpleBetInfo.letPoint = '';
              }
            }
          });
          sportTicket.push(simpleBetInfo);
        }
        simpleBetInfos.push(sportTicket);
      }
    }
    return simpleBetInfos;
  }

  convertLotteryId (lotteryId) {
    for (let key in CONVENT_LOTTERY_ID) {
      if (CONVENT_LOTTERY_ID[key] === lotteryId) {
        return key;
      }
    }
  }

  convertBetNumSfc (number) {
    let converts = ['v01', 'v02', 'v03', 'v04', 'v05', 'v06', 'v11', 'v12', 'v13', 'v14', 'v15', 'v16'];
    return converts[number];
  }

  convertBetNumbDxf (number) {
    if (number[0] === '+') {
      return 'v1';
    } else {
      return 'v2';
    }
  }

  convertBetNum (lotteryId, betNum) {
    lotteryId = parseInt(lotteryId);
    let result;
    if (lotteryId === LOTTERYIDS.FOOTBALL_BF) {
      if (betNum === '999:0') {
        result = 'v90';
      } else if (betNum === '999:999') {
        result = 'v99';
      } else if (betNum === '0:999') {
        result = 'v09';
      } else if (betNum.length === 3) {
        result = 'v{0}{1}'.format(betNum[0], betNum[2]);
      }
    } else if (lotteryId === LOTTERYIDS.BASKETBALL_SFC) {
      result = this.convertBetNumSfc(betNum);
    } else if (lotteryId === LOTTERYIDS.BASKETBALL_DXF) {
      result = this.convertBetNumbDxf(betNum);
    } else {
      result = 'v{0}'.format(betNum);
    }
    return result;
  }
}

import { LOTTERYIDS, SeriesType } from '../../store/constants';
const SERIES_TYPE = {
  X11: '101',
  X21: '102',
  X31: '103',
  X33: '104',
  X34: '105',
  X41: '106',
  X44: '107',
  X45: '108',
  X46: '109',
  X411: '110',
  X51: '111',
  X55: '112',
  X56: '113',
  X510: '114',
  X516: '115',
  X520: '116',
  X526: '117',
  X61: '118',
  X66: '119',
  X67: '120',
  X615: '121',
  X620: '122',
  X622: '123',
  X635: '124',
  X642: '125',
  X650: '126',
  X657: '127',
  X71: '128',
  X77: '129',
  X78: '130',
  X721: '131',
  X735: '132',
  X7120: '133',
  X81: '134',
  X88: '135',
  X89: '136',
  X828: '137',
  X856: '138',
  X870: '139',
  X8247: '140'
}
const SERIES_STR = {
  [SERIES_TYPE.X11]: '1*1',
  [SERIES_TYPE.X21]: '2*1',
  [SERIES_TYPE.X31]: '3*1',
  [SERIES_TYPE.X33]: '3*3',
  [SERIES_TYPE.X34]: '3*4',
  [SERIES_TYPE.X41]: '4*1',
  [SERIES_TYPE.X44]: '4*4',
  [SERIES_TYPE.X45]: '4*5',
  [SERIES_TYPE.X46]: '4*6',
  [SERIES_TYPE.X411]: '4*11',
  [SERIES_TYPE.X51]: '5*1',
  [SERIES_TYPE.X55]: '5*5',
  [SERIES_TYPE.X56]: '5*6',
  [SERIES_TYPE.X510]: '5*10',
  [SERIES_TYPE.X516]: '5*16',
  [SERIES_TYPE.X520]: '5*20',
  [SERIES_TYPE.X526]: '5*26',
  [SERIES_TYPE.X61]: '6*1',
  [SERIES_TYPE.X66]: '6*6',
  [SERIES_TYPE.X67]: '6*7',
  [SERIES_TYPE.X615]: '6*15',
  [SERIES_TYPE.X620]: '6*20',
  [SERIES_TYPE.X622]: '6*22',
  [SERIES_TYPE.X635]: '6*35',
  [SERIES_TYPE.X642]: '6*42',
  [SERIES_TYPE.X650]: '6*50',
  [SERIES_TYPE.X657]: '6*57',
  [SERIES_TYPE.X71]: '7*1',
  [SERIES_TYPE.X77]: '7*7',
  [SERIES_TYPE.X78]: '7*8',
  [SERIES_TYPE.X721]: '7*21',
  [SERIES_TYPE.X735]: '7*35',
  [SERIES_TYPE.X7120]: '7*120',
  [SERIES_TYPE.X81]: '8*1',
  [SERIES_TYPE.X88]: '8*8',
  [SERIES_TYPE.X89]: '8*9',
  [SERIES_TYPE.X828]: '8*28',
  [SERIES_TYPE.X856]: '8*56',
  [SERIES_TYPE.X870]: '8*70',
  [SERIES_TYPE.X8247]: '8*247'
}
const SERIES_LIST = [
  [{ key: SERIES_TYPE.X21, value: SeriesType[SERIES_TYPE.X21]
  }, {
    key: SERIES_TYPE.X31, value: SeriesType[SERIES_TYPE.X31]
  }, {
    key: SERIES_TYPE.X41, value: SeriesType[SERIES_TYPE.X41]
  }, {
    key: SERIES_TYPE.X51, value: SeriesType[SERIES_TYPE.X51]
  }, {
    key: SERIES_TYPE.X61, value: SeriesType[SERIES_TYPE.X61]
  }, {
    key: SERIES_TYPE.X71, value: SeriesType[SERIES_TYPE.X71]
  }, {
    key: SERIES_TYPE.X81, value: SeriesType[SERIES_TYPE.X81]
  }],
  [{ key: SERIES_TYPE.X33, value: SeriesType[SERIES_TYPE.X33]
  }, {
    key: SERIES_TYPE.X34, value: SeriesType[SERIES_TYPE.X34]
  }, {
    key: SERIES_TYPE.X44, value: SeriesType[SERIES_TYPE.X44]
  }, {
    key: SERIES_TYPE.X45, value: SeriesType[SERIES_TYPE.X45]
  }, {
    key: SERIES_TYPE.X46, value: SeriesType[SERIES_TYPE.X46]
  }, {
    key: SERIES_TYPE.X411, value: SeriesType[SERIES_TYPE.X411]
  }, {
    key: SERIES_TYPE.X55, value: SeriesType[SERIES_TYPE.X55]
  }, {
    key: SERIES_TYPE.X56, value: SeriesType[SERIES_TYPE.X56]
  }, {
    key: SERIES_TYPE.X510, value: SeriesType[SERIES_TYPE.X510]
  }, {
    key: SERIES_TYPE.X516, value: SeriesType[SERIES_TYPE.X516]
  }, {
    key: SERIES_TYPE.X520, value: SeriesType[SERIES_TYPE.X520]
  }, {
    key: SERIES_TYPE.X526, value: SeriesType[SERIES_TYPE.X526]
  }, {
    key: SERIES_TYPE.X66, value: SeriesType[SERIES_TYPE.X66]
  }, {
    key: SERIES_TYPE.X67, value: SeriesType[SERIES_TYPE.X67]
  }, {
    key: SERIES_TYPE.X615, value: SeriesType[SERIES_TYPE.X615]
  }, {
    key: SERIES_TYPE.X620, value: SeriesType[SERIES_TYPE.X620]
  }, {
    key: SERIES_TYPE.X622, value: SeriesType[SERIES_TYPE.X622]
  }, {
    key: SERIES_TYPE.X635, value: SeriesType[SERIES_TYPE.X635]
  }, {
    key: SERIES_TYPE.X642, value: SeriesType[SERIES_TYPE.X642]
  }, {
    key: SERIES_TYPE.X650, value: SeriesType[SERIES_TYPE.X650]
  }, {
    key: SERIES_TYPE.X657, value: SeriesType[SERIES_TYPE.X657]
  }, {
    key: SERIES_TYPE.X77, value: SeriesType[SERIES_TYPE.X77]
  }, {
    key: SERIES_TYPE.X78, value: SeriesType[SERIES_TYPE.X78]
  }, {
    key: SERIES_TYPE.X721, value: SeriesType[SERIES_TYPE.X721]
  }, {
    key: SERIES_TYPE.X735, value: SeriesType[SERIES_TYPE.X735]
  }, {
    key: SERIES_TYPE.X7120, value: SeriesType[SERIES_TYPE.X7120]
  }, {
    key: SERIES_TYPE.X88, value: SeriesType[SERIES_TYPE.X88]
  }, {
    key: SERIES_TYPE.X89, value: SeriesType[SERIES_TYPE.X89]
  }, {
    key: SERIES_TYPE.X828, value: SeriesType[SERIES_TYPE.X828]
  }, {
    key: SERIES_TYPE.X856, value: SeriesType[SERIES_TYPE.X856]
  }, {
    key: SERIES_TYPE.X870, value: SeriesType[SERIES_TYPE.X870]
  }, {
    key: SERIES_TYPE.X8247, value: SeriesType[SERIES_TYPE.X8247]
  }]
];
const SeriesPlayTypeLimit = {
  [LOTTERYIDS.FOOTBALL_SPF]: 8,
  [LOTTERYIDS.FOOTBALL_RQSPF]: 8,
  [LOTTERYIDS.FOOTBALL_BF]: 4,
  [LOTTERYIDS.FOOTBALL_ZJQ]: 6,
  [LOTTERYIDS.FOOTBALL_BQC]: 6,
  [LOTTERYIDS.BASKETBALL_SF]: 8,
  [LOTTERYIDS.BASKETBALL_RFSF]: 8,
  [LOTTERYIDS.BASKETBALL_SFC]: 4,
  [LOTTERYIDS.BASKETBALL_DXF]: 8
}

export default class Series {
  static getSeriesLimit (lotteryIds, count) {
    if (Array.isArray(lotteryIds)) {
      let min = 8;
      lotteryIds.map(value => {
        if (min > SeriesPlayTypeLimit[value]) {
          min = SeriesPlayTypeLimit[value];
        }
      });
      return Math.min(min, count);
    } else {
      return Math.min(SeriesPlayTypeLimit[lotteryIds], count);
    }
  }
  static getSeriesList (lotteryId, bettingList, sure) {
    let count = bettingList.length;
    let lotteryArr = [];
    let params = lotteryId;
    if (lotteryId === LOTTERYIDS.FOOTBALL_HH || lotteryId === LOTTERYIDS.BASKETBALL_HH) {
      bettingList.map(value => {
        value.selected.map((v, i) => {
          if (v.length > 0) {
            let key;
            if (lotteryId === LOTTERYIDS.FOOTBALL_HH) {
              key = '60{0}'.format(i + 1);
            } else {
              key = '70{0}'.format(i + 1)
            }
            if (lotteryArr.indexOf(key) === -1) {
              lotteryArr.push(key);
            }
          }
        })
      });
      params = lotteryArr;
    }
    let number = Series.getSeriesLimit(params, count);
    if (sure && sure > 0) {
      switch (sure) {
        case 1: return [SERIES_LIST[0].slice(0, number - 1), []];
        case 2: return [SERIES_LIST[0].slice(1, number - 1), []];
        case 3: return [SERIES_LIST[0].slice(2, number - 1), []];
        case 4: return [SERIES_LIST[0].slice(3, number - 1), []];
        case 5: return [SERIES_LIST[0].slice(4, number - 1), []];
        case 6: return [SERIES_LIST[0].slice(5, number - 1), []];
        case 7: return [SERIES_LIST[0].slice(6, number - 1), []];
        default: return [[], []]
      }
    } else {
      switch (number) {
        case 2: return [SERIES_LIST[0].slice(0, 1), []];
        case 3: return [SERIES_LIST[0].slice(0, 2), SERIES_LIST[1].slice(0, 2)]
        case 4: return [SERIES_LIST[0].slice(0, 3), SERIES_LIST[1].slice(0, 6)]
        case 5: return [SERIES_LIST[0].slice(0, 4), SERIES_LIST[1].slice(0, 12)]
        case 6: return [SERIES_LIST[0].slice(0, 5), SERIES_LIST[1].slice(0, 21)]
        case 7: return [SERIES_LIST[0].slice(0, 6), SERIES_LIST[1].slice(0, 26)]
        case 8: return [SERIES_LIST[0].slice(0, 7), SERIES_LIST[1].slice(0, 32)]
        default: return [[], []]
      }
    }
  }
  static sureCount (list) {
    let total = 10;
    list.map(value => {
      let i = 0;
      switch (value.key) {
        case SERIES_TYPE.X21: i = 1; break;
        case SERIES_TYPE.X31: i = 2; break;
        case SERIES_TYPE.X41: i = 3; break;
        case SERIES_TYPE.X51: i = 4; break;
        case SERIES_TYPE.X61: i = 5; break;
        case SERIES_TYPE.X71: i = 6; break;
        case SERIES_TYPE.X81: i = 7; break;
      }
      if (total > i) total = i;
    });
    return total;
  }
  static getSeriesStr (type) {
    return SERIES_STR[type];
  }
}

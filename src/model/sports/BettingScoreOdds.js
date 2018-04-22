export const NO_CONCEDE = 'betting_score_no_concede';
export const CONCEDE = 'betting_score_concede';
export const SCORES = 'betting_score_scores';
export const BALLS = 'betting_score_balls';
export const HALF = 'betting_score_half';
export const SFC = 'betting_score_sfc';
export const DXF = 'betting_score_dxf';

export class BettingScoreOdds {
  static getShowText (lotteryId, key) {
    let type, result;
    switch (parseInt(lotteryId)) {
      case 601:
      case 701: type = NO_CONCEDE; break;
      case 602:
      case 702: type = CONCEDE; break;
      case 603: type = SCORES; break;
      case 604: type = BALLS; break;
      case 605: type = HALF; break;
      case 703: type = SFC; break;
      case 704: type = DXF; break;
    }
    if (type === SCORES) {
      BettingScoreOdds.getType(type).map(value => {
        if (value[key]) {
          result = value[key];
        }
      })
    } else {
      result = BettingScoreOdds.getType(type)[key];
    }
    return result;
  }
  static getType (type) {
    switch (type) {
      case NO_CONCEDE:
        return {
          v0: '主负',
          v1: '平',
          v3: '主胜'
        }
      case CONCEDE:
        return {
          v0: '主负',
          v1: '平',
          v3: '主胜'
        }
      case SCORES:
        return [{
          v10: '1:0', v20: '2:0', v21: '2:1', v30: '3:0', v31: '3:1', v32: '3:2', v40: '4:0', v41: '4:1', v42: '4:2', v50: '5:0', v51: '5:1', v52: '5:2', v90: '胜其他'
        }, {
          v00: '0:0', v11: '1:1', v22: '2:2', v33: '3:3', v99: '平其他'
        }, {
          v01: '0:1', v02: '0:2', v12: '1:2', v03: '0:3', v13: '1:3', v23: '2:3', v04: '0:4', v14: '1:4', v24: '2:4', v05: '0:5', v15: '1:5', v25: '2:5', v09: '负其他'
        }]
      case BALLS:
        return {
          v0: '0',
          v1: '1',
          v2: '2',
          v3: '3',
          v4: '4',
          v5: '5',
          v6: '6',
          v7: '7+'
        }
      case HALF:
        return {
          v33: '胜胜',
          v31: '胜平',
          v30: '胜负',
          v13: '平胜',
          v11: '平平',
          v10: '平负',
          v03: '负胜',
          v01: '负平',
          v00: '负负'
        }
      case SFC:
        return {
          v01: '1-5',
          v02: '6-10',
          v03: '11-15',
          v04: '16-20',
          v05: '21-25',
          v06: '26+',
          v11: '1-5',
          v12: '6-10',
          v13: '11-15',
          v14: '16-20',
          v15: '21-25',
          v16: '26+'
        }
      case DXF:
        return {
          v1: '大分',
          v2: '小分'
        }
    }
  }
}

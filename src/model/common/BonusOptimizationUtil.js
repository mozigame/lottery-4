import Lottery from '../../model/common/Lottery';
export default class BonusOptimizationUtil {
  static optimize (amount, type, tickets) {
    switch (type) {
      case 0: // 平均优化
        return BonusOptimizationUtil.averageOptimize(amount, tickets);
      case 1:
      case 2:
        return BonusOptimizationUtil.maxMinBonusOptimize(amount, tickets, type);
    }
  }
  static averageOptimize (amount, tickets) {
    if (amount % 2 === 0) {
      let stakeCount = amount / 2;
      if (tickets.length <= stakeCount) {
        let b = 0;
        tickets.map(value => {
          b += (1 / value[0].money.toFixed(6))
        });
        let a = stakeCount / b;
        tickets = tickets.map(value => {
          value[0].stake = a / value[0].money;
          return value;
        });
        let count = 0;
        tickets = tickets.map(value => {
          let maxStake = Math.max(1, Math.floor(value[0].stake));
          value[0].stake = maxStake;
          count += maxStake;
          return value;
        });
        let diff = count - stakeCount;
        if (diff > 0) {
          while (true) {
            let maxIndex = 0;
            tickets.map((value, index) => {
              if (tickets[maxIndex][0].stake <= value[0].stake) {
                maxIndex = index;
              }
            });
            if (tickets[maxIndex][0].stake > 1) {
              tickets[maxIndex][0].stake = tickets[maxIndex][0].stake - 1;
              diff--;
              if (diff <= 0) { return tickets; }
            }
          }
        } else if (diff < 0) {
          while (true) {
            let minIndex = 0;
            tickets.map((value, index) => {
              if (tickets[minIndex][0].money * tickets[minIndex][0].stake > value[0].money * value[0].stake) {
                minIndex = index;
              }
            });
            tickets[minIndex][0].stake = tickets[minIndex][0].stake + 1;
            diff++;
            if (diff === 0) { return tickets; }
          }
        }
        return tickets;
      }
    }
  }
  static maxMinBonusOptimize (amount, tickets, type) {
    if (amount % 2 === 0 && tickets.length > 0) {
      let stakeCount = amount / 2;
      if (stakeCount < 2) {
        tickets[0][0].stake = stakeCount;
        return tickets;
      } else {
        let sum = 0;
        tickets = tickets.map(value => {
          let stake = Math.ceil(amount / value[0].money.toFixed(6));
          value[0].stake = stake;
          sum += stake;
          return value;
        });
        if (sum > stakeCount) {
          let diff = sum - stakeCount;
          for (let ticket of tickets) {
            let overStake = Math.min(diff, Math.max(1, ticket[0].stake));
            if (overStake < ticket[0].stake) {
              ticket[0].stake = ticket[0].stake - overStake;
              diff -= overStake;
            }
            if (diff <= 0) {
              return tickets;
            }
          }
          if (diff > 0) {
            while (true) {
              let maxIndex = 0;
              tickets.map((value, index) => {
                if (tickets[maxIndex][0].stake <= value[0].stake) {
                  maxIndex = index;
                }
              });
              if (tickets[maxIndex][0].stake > 1) {
                tickets[maxIndex][0].stake = tickets[maxIndex][0].stake - 1;
                diff--;
                if (diff <= 0) { return tickets; }
              }
            }
          }
        } else {
          let diff = stakeCount - sum;
          if (diff > 0) {
            let ticketIndex = type === 1 ? 0 : tickets.length - 1;
            tickets[ticketIndex][0].stake += diff;
            return tickets;
          }
        }
        return tickets;
      }
    }
  }
  static getMaxBonus (groupScoreKeys, tickets) {
    let prizes = [];
    let maxPrize = 0;
    groupScoreKeys.map(keys => {
      let prize = 0;
      tickets.map(ticket => {
        let isMatch = BonusOptimizationUtil.isMatchBetInfo(keys, ticket);
        if (isMatch) {
          prize += ticket[0].money * ticket[0].stake;
        }
      });
      maxPrize = Math.max(maxPrize, prize);
      prizes.push(prize);
    });
    return maxPrize;
  }
  static getGroupScoreKeys (schedules, lotteryId) {
    let scoreKeys;
    if (Lottery.isFootBall(lotteryId)) {
      scoreKeys = BonusOptimizationUtil.getJZScoreKeys(schedules);
    } else if (Lottery.isBasketBall(lotteryId)) {
      scoreKeys = BonusOptimizationUtil.getJLScoreKeys(schedules);
    }
    let scheduleScoreKeys = [];
    let groupScoreKeys = [];
    BonusOptimizationUtil.betMapScoreKeys(scoreKeys, 0, scheduleScoreKeys, groupScoreKeys);
    return groupScoreKeys;
  }
  static betMapScoreKeys (scoreKeys, index, scheduleScoreKeys, groupScoreKeys) {
    if (index >= scoreKeys.length) {
      groupScoreKeys.push([...scheduleScoreKeys]);
      scheduleScoreKeys.splice(scheduleScoreKeys.length - 1, 1);
    } else {
      let currentKeys = scoreKeys[index];
      currentKeys.map(keys => {
        scheduleScoreKeys.push(keys);
        BonusOptimizationUtil.betMapScoreKeys(scoreKeys, index + 1, scheduleScoreKeys, groupScoreKeys);
      });
      if (index > 0) {
        scheduleScoreKeys.splice(scheduleScoreKeys.length - 1, 1);
      }
    }
  }
  static getJZScoreKeys (schedules) {
    let scoreKeys = [];
    schedules.map(schedule => {
      let isWin = false;
      let isDrawn = false;
      let isLose = false;
      let subScoreKeys = [];
      let spfScores = BonusOptimizationUtil.selectedOdds(schedule, 601);
      let rqspfScores = BonusOptimizationUtil.selectedOdds(schedule, 602);
      let bfScores = BonusOptimizationUtil.selectedOdds(schedule, 603);
      let zjqScores = BonusOptimizationUtil.selectedOdds(schedule, 604);
      let bqcScores = BonusOptimizationUtil.selectedOdds(schedule, 605);
      let optimizeBfScores = bfScores || [];
      if (zjqScores) {
        optimizeBfScores = optimizeBfScores.concat(BonusOptimizationUtil.zjqToBf(zjqScores));
      }
      optimizeBfScores.map(score => {
        let home = parseInt(score.substr(1, 2));
        let guest = parseInt(score.substr(2, 3));
        let spf = 0;
        if (home > guest) {
          isWin = true;
          spf = 3;
        } else if (home === guest) {
          isDrawn = true;
          spf = 1;
        } else {
          isLose = true;
          spf = 0;
        }
        let selectKeys = [];
        selectKeys.push(schedule.id + score);
        selectKeys.push(schedule.id + 'v' + spf);
        let zjq = (home + guest > 7 ? 7 : home + guest);
        selectKeys.push(schedule.id + 'vj' + zjq);
        subScoreKeys.push(selectKeys);
      });
      if (rqspfScores) {
        rqspfScores.map(score => {
          let letPoint = schedule.letPoints;
          if (letPoint > 0) {
            let selectKeys = [];
            if (score === 'v3') {
              if (!isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              if (!isDrawn) {
                isDrawn = true;
                selectKeys.push(schedule.id + 'v1');
              }
              if (letPoint > 1 && !isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              selectKeys.push(schedule.id + 'r3');
              selectKeys.push(schedule.id + 'vj1');
            }
            if (score === 'v1') {
              if (!isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              selectKeys.push(schedule.id + 'r1');
              selectKeys.push(schedule.id + 'vj0');
            }
            if (score === 'v0') {
              if (!isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              selectKeys.push(schedule.id + 'r0');
              selectKeys.push(schedule.id + 'vj1');
            }
            subScoreKeys.push(selectKeys);
          }
          if (letPoint < 0) {
            let selectKeys = [];
            if (score === 'v3') {
              if (!isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              selectKeys.push(schedule.id + 'r3');
              selectKeys.push(schedule.id + 'vj1');
            }
            if (score === 'v1') {
              if (!isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              selectKeys.push(schedule.id + 'r1');
              selectKeys.push(schedule.id + 'vj0');
            }
            if (score === 'v0') {
              if (!isDrawn) {
                isDrawn = true;
                selectKeys.push(schedule.id + 'v1');
              }
              if (!isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              if (letPoint < -1 && !isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              selectKeys.push(schedule.id + 'r0');
              selectKeys.push(schedule.id + 'vj1');
            }
            subScoreKeys.push(selectKeys);
          }
        })
      }
      let optimizeSPFScores = spfScores || [];
      if (bqcScores) {
        optimizeSPFScores = optimizeSPFScores.concat(bqcScores);
      }
      optimizeSPFScores.map(score => {
        let scoreLength = score.length;
        let key = parseInt(score.substr(scoreLength - 1, scoreLength));
        if (key === 3 && !isWin) {
          let selectKeys = [];
          selectKeys.push(schedule.id + 'v__');
          selectKeys.push(schedule.id + 'v3');
          selectKeys.push(schedule.id + 'vj1');
          subScoreKeys.push(selectKeys);
        }
        if (key === 1 && !isDrawn) {
          let selectKeys = [];
          selectKeys.push(schedule.id + 'v__');
          selectKeys.push(schedule.id + 'v1');
          selectKeys.push(schedule.id + 'vj0');
          subScoreKeys.push(selectKeys);
        }
        if (key === 0 && !isLose) {
          let selectKeys = [];
          selectKeys.push(schedule.id + 'v__');
          selectKeys.push(schedule.id + 'v0');
          selectKeys.push(schedule.id + 'vj1');
          subScoreKeys.push(selectKeys);
        }
      })
      scoreKeys.push(subScoreKeys);
    })
    return scoreKeys;
  }
  static getJLScoreKeys (schedules) {
    let scoreKeys = [];
    schedules.map(schedule => {
      let isWin = false;
      let isLose = false;
      let subScoreKeys = [];
      let sfScores = BonusOptimizationUtil.selectedOdds(schedule, 701);
      let rfsfScores = BonusOptimizationUtil.selectedOdds(schedule, 702);
      let sfcScores = BonusOptimizationUtil.selectedOdds(schedule, 703);
      let dxfScores = BonusOptimizationUtil.selectedOdds(schedule, 704);
      if (dxfScores) {
        dxfScores.map(score => {
          let selectKeys = [];
          selectKeys.push(schedule.id + 'd' + score);
          selectKeys.push(schedule.id + 'v__');
          subScoreKeys.push(selectKeys);
        })
      }
      if (sfcScores) {
        sfcScores.map(score => {
          if (rfsfScores && rfsfScores.length > 0) {
            rfsfScores.map(rfsfScore => {
              let selectKeys = [];
              let home = parseInt(rfsfScore.substr(1, 2));
              let sf = 0;
              if (home === 0) {
                isWin = true;
                sf = 3;
              } else {
                isLose = true;
              }
              selectKeys.push(schedule.id + 'dv__');
              selectKeys.push(schedule.id + 'v' + sf);
              selectKeys.push(schedule.id + 's' + score);
              selectKeys.push(schedule.id + 'r' + rfsfScore);
              subScoreKeys.push(selectKeys);
            })
          } else {
            let selectKeys = [];
            let home = parseInt(score.substr(1, 2));
            let sf = 0;
            if (home === 0) {
              isWin = true;
              sf = 3;
            } else {
              isLose = true;
            }
            selectKeys.push(schedule.id + 'dv__');
            selectKeys.push(schedule.id + 'v' + sf);
            selectKeys.push(schedule.id + 's' + score);
            subScoreKeys.push(selectKeys);
          }
        })
      }
      if (rfsfScores) {
        rfsfScores.map(score => {
          let letPoint = schedule.letPoints;
          if (letPoint > 0) {
            if (score === 'v3') {
              let selectKeys = [];
              if (!isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              if (!isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              selectKeys.push(schedule.id + 'rv3');
              subScoreKeys.push(selectKeys);
            }
            if (score === 'v0') {
              let selectKeys = [];
              if (!isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              selectKeys.push(schedule.id + 'rv0');
              subScoreKeys.push(selectKeys);
            }
          }
          if (letPoint < 0) {
            if (score === 'v3') {
              let selectKeys = [];
              if (!isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              selectKeys.push(schedule.id + 'rv3');
              subScoreKeys.push(selectKeys);
            }
            if (score === 'v0') {
              let selectKeys = [];
              if (!isWin) {
                isWin = true;
                selectKeys.push(schedule.id + 'v3');
              }
              if (!isLose) {
                isLose = true;
                selectKeys.push(schedule.id + 'v0');
              }
              selectKeys.push(schedule.id + 'rv0');
              subScoreKeys.push(selectKeys);
            }
          }
        })
      }
      if (sfScores) {
        sfScores.map(score => {
          if (score === 'v3' && !isWin) {
            let selectKeys = [];
            selectKeys.push(schedule.id + 'dv__');
            selectKeys.push(schedule.id + 'v3');
            subScoreKeys.push(selectKeys);
          }
          if (score === 'v0' && !isLose) {
            let selectKeys = [];
            selectKeys.push(schedule.id + 'dv__');
            selectKeys.push(schedule.id + 'v0');
            subScoreKeys.push(selectKeys);
          }
        })
      }
      scoreKeys.push(subScoreKeys);
    })
    return scoreKeys;
  }
  static selectedOdds (schedule, lotteryId) {
    let id = parseInt(schedule.lotteryId);
    if (id === 606 && schedule.selected[lotteryId - 601].length > 0) {
      return schedule.selected[lotteryId - 601].map(v => v.key);
    }
    if (id === 705 && schedule.selected[lotteryId - 701].length > 0) {
      return schedule.selected[lotteryId - 701].map(v => v.key);
    }
    if (lotteryId === id) {
      return schedule.selected.map(v => v.key);
    }
  }
  static zjqToBf (zjqScores) {
    let bf = [
      ['00'],
      ['01', '10'],
      ['02', '20', '11'],
      ['03', '30', '12', '21'],
      ['04', '40', '13', '31', '22'],
      ['05', '50', '14', '41', '23', '32'],
      ['15', '51', '24', '42', '33'],
      ['25', '52', '34', '43', '99', '09', '90']
    ];
    let bfScores = [];
    zjqScores.map(score => {
      let index = parseInt(score.substr(1));
      let bfs = bf[index];
      bfs.map(b => bfScores.push('v' + b));
    })
    return bfScores;
  }
  static isMatchBetInfo (scoreKeys, ticket) {
    let isMatch = true;
    let allKeys = [];
    scoreKeys.map(keys => {
      allKeys = allKeys.concat(keys);
    });
    ticket.map(betInfo => {
      let key = betInfo.scheduleId + betInfo.betNum;
      if (betInfo.lotteryId === '604') {
        key = betInfo.scheduleId + 'vj' + betInfo.betNum.substr(1);
      }
      if (betInfo.lotteryId === '605') {
        let keyLength = key.length;
        key = key.substr(0, keyLength - 2) + key.substr(keyLength - 1, keyLength);
      }
      let isRQMatch = false;
      if (betInfo.lotteryId === '602') {
        key = betInfo.scheduleId + 'r' + betInfo.betNum.substr(1);
        let isContains = allKeys.includes(key);
        scoreKeys.map(keys => {
          let bfKey = keys[0];
          if (!bfKey.endsWith('v__')) {
            if (!bfKey[bfKey.length - 3] === 'v') {
              let length = bfKey.length;
              let scheduleId = parseInt(bfKey.substr(0, length - 3));
              let home = parseInt(bfKey.substr(length - 2, length - 1));
              let guest = parseInt(bfKey.substr(length - 1, length));
              let letPoint = betInfo.letPoint;
              home = home + letPoint;
              let vx;
              if (home > guest) vx = 'v3';
              else if (home === guest) vx = 'v1';
              else vx = 'v0';
              if (vx === betInfo.betNum && scheduleId === parseInt(betInfo.scheduleId)) {
                isRQMatch = true;
              }
            }
          } else if (isContains) {
            let rqspf = betInfo.betNum;
            let letPoint = betInfo.letPoint;
            if (letPoint > 0) {
              if (rqspf === 'v3') {
                let rqWinKey = betInfo.scheduleId + 'v3';
                let rqDrawKey = betInfo.scheduleId + 'v1';
                if (keys.includes(rqWinKey) || keys.includes(rqDrawKey)) {
                  isRQMatch = true;
                }
                if (letPoint > 1) {
                  let rqKey = betInfo.scheduleId + 'v0';
                  if (keys.includes(rqKey)) {
                    isRQMatch = true;
                  }
                }
              } else if (rqspf === 'v1') {
                let rqKey = betInfo.scheduleId + 'v0';
                if (keys.includes(rqKey)) {
                  isRQMatch = true;
                }
              } else if (rqspf === 'v0') {
                let rqKey = betInfo.scheduleId + 'v0';
                if (keys.includes(rqKey)) {
                  isRQMatch = true;
                }
              }
            }
            if (letPoint < 0) {
              if (rqspf === 'v3') {
                let rqKey = betInfo.scheduleId + 'v3';
                if (keys.includes(rqKey)) {
                  isRQMatch = true;
                }
              } else if (rqspf === 'v1') {
                let rqKey = betInfo.scheduleId + 'v3';
                if (keys.includes(rqKey)) {
                  isRQMatch = true;
                }
              } else if (rqspf === 'v0') {
                let rqDrawKey = betInfo.scheduleId + 'v1';
                let rqLoseKey = betInfo.scheduleId + 'v0';
                if (keys.includes(rqDrawKey) || keys.includes(rqLoseKey)) {
                  isRQMatch = true;
                }
                if (letPoint < -1) {
                  let rqKey = betInfo.scheduleId + 'v3';
                  if (keys.includes(rqKey)) {
                    isRQMatch = true;
                  }
                }
              }
            }
          }
        })
      }
      // 篮球部分
      if (betInfo.lotteryId === '702') {
        key = betInfo.scheduleId + 'r' + betInfo.betNum;
        let isContains = allKeys.includes(key);
        if (isContains) {
          let sfcPrefix = betInfo.scheduleId + 'sv';
          let sfcKey;
          for (let scoreKey of allKeys) {
            if (scoreKey.endsWith(sfcPrefix)) {
              sfcKey = scoreKey;
              break;
            }
          }
          let letPoint = betInfo.letPoint;
          let rqsf = betInfo.betNum;
          if (sfcKey) {
            let sfc = parseInt(sfcKey.substr(sfcKey.length - 2));
            let multiple = 0;
            if (letPoint > 0) {
              if (rqsf === 'v3') {
                multiple = parseInt((letPoint + 4) / 5);
                if (sfc <= multiple + 10) {
                  isRQMatch = true;
                }
              } else if (rqsf === 'v0') {
                multiple = parseInt(Math.ceil(letPoint + 4) / 5);
                if (sfc >= multiple + 10) {
                  isRQMatch = true;
                }
              }
            }
            if (letPoint < 0) {
              if (rqsf === 'v3') {
                multiple = parseInt(Math.ceil(-letPoint + 4) / 5);
                if (sfc >= multiple && sfc < 11) {
                  isRQMatch = true;
                } else if (rqsf === 'v0') {
                  multiple = parseInt((-letPoint + 4) / 5);
                  if (sfc <= multiple || sfc >= 11) {
                    isRQMatch = true;
                  }
                }
              }
            }
          }
        }
      }
      if (betInfo.lotteryId === '704') {
        console.log('704', parseFloat(betInfo.betNum.substr(1)))
        if (parseFloat(betInfo.betNum.substr(1)) > 1) {
          key = betInfo.scheduleId + 'dv1';
        } else {
          key = betInfo.scheduleId + 'dv2';
        }
      }
      if (betInfo.lotteryId === '703') {
        key = betInfo.scheduleId + 's' + betInfo.betNum;
      }
      if (!isRQMatch && !allKeys.includes(key)) {
        isMatch = false;
        return isMatch;
      }
    })
    return isMatch;
  }
}

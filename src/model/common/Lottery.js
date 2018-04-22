import { LOTTERYIDS } from '../../store/constants';
const SYXWBetting = 'SYXWBetting';
const SSQBetting = 'SSQBetting';
const FootballBetting = 'FootballBetting';
const BasketballBetting = 'BasketballBetting';
const K3Betting = 'K3Betting';
const SFCBetting = 'SFCBetting';
const FC3DBetting = 'FC3DBetting';

export default class Lottery {
  static getComponent (lotteryId) {
    const LotteryComponent = {
      [LOTTERYIDS.SYXW]: SYXWBetting,
      [LOTTERYIDS.SYXW8]: SYXWBetting,
      [LOTTERYIDS.SYXW18]: SYXWBetting,
      [LOTTERYIDS.SSQ]: SSQBetting,
      [LOTTERYIDS.DLT]: SSQBetting,
      [LOTTERYIDS.FOOTBALL]: FootballBetting,
      [LOTTERYIDS.BASKETBALL]: BasketballBetting,
      [LOTTERYIDS.K3]: K3Betting,
      [LOTTERYIDS.JXK3]: K3Betting,
      [LOTTERYIDS.JSK3]: K3Betting,
      [LOTTERYIDS.SFC]: SFCBetting,
      [LOTTERYIDS.RXJ]: SFCBetting,
      [LOTTERYIDS.FC3D]: FC3DBetting
    }
    return LotteryComponent[lotteryId];
  }
  static isSYXW (lotteryId) {
    return [LOTTERYIDS.SYXW, LOTTERYIDS.SYXW8, LOTTERYIDS.SYXW18].indexOf(parseInt(lotteryId)) !== -1;
  }
  static isSSQ (lotteryId) {
    return LOTTERYIDS.SSQ === parseInt(lotteryId);
  }
  static isDLT (lotteryId) {
    return LOTTERYIDS.DLT === parseInt(lotteryId);
  }
  static isK3 (lotteryId) {
    return [LOTTERYIDS.K3, LOTTERYIDS.JXK3, LOTTERYIDS.JSK3].includes(parseInt(lotteryId));
  }
  static isFC3D (lotteryId) {
    return [LOTTERYIDS.FC3D].includes(parseInt(lotteryId));
  }
  static isFootBall (lotteryId) {
    return [LOTTERYIDS.FOOTBALL_SPF, LOTTERYIDS.FOOTBALL_RQSPF, LOTTERYIDS.FOOTBALL_BF, LOTTERYIDS.FOOTBALL_ZJQ,
      LOTTERYIDS.FOOTBALL_BQC, LOTTERYIDS.FOOTBALL_HH].indexOf(parseInt(lotteryId)) !== -1;
  }
  static isBasketBall (lotteryId) {
    return [LOTTERYIDS.BASKETBALL_DXF, LOTTERYIDS.BASKETBALL_HH, LOTTERYIDS.BASKETBALL_SFC,
      LOTTERYIDS.BASKETBALL_RFSF, LOTTERYIDS.BASKETBALL_SF].indexOf(parseInt(lotteryId)) !== -1;
  }
  static isSFCOrRXJ (lotteryId) {
    return [LOTTERYIDS.SFC, LOTTERYIDS.RXJ].indexOf(parseInt(lotteryId)) !== -1;
  }
  static isDigital (id) {
    return Lottery.isDLT(id) || Lottery.isSSQ(id) || Lottery.isSYXW(id) || Lottery.isK3(id) || Lottery.isFC3D(id);
  }
  static isSFC (lotteryId) {
    return LOTTERYIDS.SFC === parseInt(lotteryId);
  }
  static isRXJ (lotteryId) {
    return LOTTERYIDS.RXJ === parseInt(lotteryId);
  }
  static getHelpUrl (lotteryId) {
    switch (parseInt(lotteryId)) {
      case LOTTERYIDS.SYXW:
      case LOTTERYIDS.SYXW8:
      case LOTTERYIDS.SYXW18:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/p5.html';
      case LOTTERYIDS.SSQ:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/ssq.html';
      case LOTTERYIDS.DLT:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/dlt.html';
      case LOTTERYIDS.K3:
      case LOTTERYIDS.JXK3:
      case LOTTERYIDS.JSK3:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/ks.html';
      case LOTTERYIDS.FOOTBALL:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/jczq.html';
      case LOTTERYIDS.BASKETBALL:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/jclq.html';
      case LOTTERYIDS.SFC:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/jcsfc.html';
      case LOTTERYIDS.RXJ:
        return 'https://phone-api.tigercai.com/index.php?s=/Content/help/jcrxj.html';
      case LOTTERYIDS.FC3D:
        return 'http://phone.api.tigercai.com/index.php?s=/Content/help/p3.html';
    }
  }
  static getPrizeBalls (prizeText) {
    const block = '#';
    const sep = ',';
    let result = [prizeText];
    if (prizeText.indexOf(block) !== -1) {
      result = prizeText.split(block);
    }
    return result.map(value => {
      return value.split(sep);
    })
  }
}

import RXX from './digital/syxw/RXX';
import RXXDT from './digital/syxw/RXXDT';
import Q2ZhiX from './digital/syxw/Q2ZhiX';
import Q2ZuX from './digital/syxw/Q2ZuX';
import Q2ZuXDT from './digital/syxw/Q2ZuXDT';
import Q3ZhiX from './digital/syxw/Q3ZhiX';
import Q3ZuX from './digital/syxw/Q3ZuX';
import Q3ZuXDT from './digital/syxw/Q3ZuXDT';
import LX2 from './digital/syxw/LX2';
import LX3 from './digital/syxw/LX3';
import LX4 from './digital/syxw/LX4';
import LX5 from './digital/syxw/LX5';
import SSQNormal from './digital/ssq/Normal';
import SSQDT from './digital/ssq/DT';
import DLTNormal from './digital/dlt/Normal';
import DLTDT from './digital/dlt/DT';
import { LOTTERYIDS } from '../store/constants';
import Lottery from './common/Lottery';
import K3HZ from './digital/k3/HZ';
import K3STH from './digital/k3/STH';
import K3SBTH from './digital/k3/SBTH';
import K3ETH from './digital/k3/ETH';
import K3EBTH from './digital/k3/EBTH';
import K3SBTHDT from './digital/k3/SBTHDT';
import K3EBTHDT from './digital/k3/EBTHDT';
import FC3DZhiXuan from './digital/fc3d/ZhiXuan';
import FC3DZuLiu from './digital/fc3d/ZuLiu';
import FC3DZuSanDan from './digital/fc3d/ZuSanDan';
import FC3DZuSanFu from './digital/fc3d/ZuSanFu';

export default class BettingFactory {
  constructor (lotteryId, playType) {
    if (this.isSYXW(lotteryId) && playType.id === 22) {
      return playType.sure ? new RXXDT(lotteryId, playType, 2, 6) : new RXX(lotteryId, playType, 2, 6);
    }
    if (this.isSYXW(lotteryId) && playType.id === 23) {
      return playType.sure ? new RXXDT(lotteryId, playType, 3, 19) : new RXX(lotteryId, playType, 3, 19);
    }
    if (this.isSYXW(lotteryId) && playType.id === 24) {
      return playType.sure ? new RXXDT(lotteryId, playType, 4, 78) : new RXX(lotteryId, playType, 4, 78);
    }
    if (this.isSYXW(lotteryId) && playType.id === 25) {
      return playType.sure ? new RXXDT(lotteryId, playType, 5, 540) : new RXX(lotteryId, playType, 5, 540);
    }
    if (this.isSYXW(lotteryId) && playType.id === 26) {
      return playType.sure ? new RXXDT(lotteryId, playType, 6, 90) : new RXX(lotteryId, playType, 6, 90);
    }
    if (this.isSYXW(lotteryId) && playType.id === 27) {
      return playType.sure ? new RXXDT(lotteryId, playType, 7, 26) : new RXX(lotteryId, playType, 7, 26);
    }
    if (this.isSYXW(lotteryId) && playType.id === 28) {
      return playType.sure ? new RXXDT(lotteryId, playType, 8, 9) : new RXX(lotteryId, playType, 8, 9);
    }
    if (this.isSYXW(lotteryId) && playType.id === 30) {
      return new Q2ZhiX(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 31) {
      return playType.sure ? new Q2ZuXDT(lotteryId, playType) : new Q2ZuX(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 32) {
      return new Q3ZhiX(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 33) {
      return playType.sure ? new Q3ZuXDT(lotteryId, playType) : new Q3ZuX(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 34) {
      return new LX2(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 35) {
      return new LX3(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 36) {
      return new LX4(lotteryId, playType);
    }
    if (this.isSYXW(lotteryId) && playType.id === 37) {
      return new LX5(lotteryId, playType);
    }
    if (this.isSSQ(lotteryId)) {
      switch (playType.id) {
        case 1:
          return playType.sure ? new SSQDT(lotteryId, playType) : new SSQNormal(lotteryId, playType);
      }
    }
    if (this.isDLT(lotteryId)) {
      switch (playType.id) {
        case 1:
          return playType.sure ? new DLTDT(lotteryId, playType) : new DLTNormal(lotteryId, playType);
      }
    }
    if (Lottery.isK3(lotteryId)) {
      switch (playType.id) {
        case 41:
          return new K3HZ(lotteryId, playType);
        case 42:
          return new K3STH(lotteryId, playType);
        case 45:
          return playType.sure ? new K3SBTHDT(lotteryId, playType) : new K3SBTH(lotteryId, playType);
        case 46:
          return new K3ETH(lotteryId, playType);
        case 48:
          return playType.sure ? new K3EBTHDT(lotteryId, playType) : new K3EBTH(lotteryId, playType);
        default:
          return new K3HZ(lotteryId, playType);
      }
    }
    if (Lottery.isFC3D(lotteryId)) {
      switch (playType.id) {
        case 11:
          return new FC3DZhiXuan(lotteryId, playType);
        case 13:
          return new FC3DZuLiu(lotteryId, playType);
        case 14:
          return new FC3DZuSanDan(lotteryId, playType);
        case 15:
          return new FC3DZuSanFu(lotteryId, playType);
      }
    }
  }
  isSYXW (lotteryId) {
    const id = parseInt(lotteryId);
    const list = [LOTTERYIDS.SYXW, LOTTERYIDS.SYXW8, LOTTERYIDS.SYXW18];
    return list.indexOf(id) !== -1;
  }
  isSSQ (lotteryId) {
    return parseInt(lotteryId) === LOTTERYIDS.SSQ;
  }
  isDLT (lotteryId) {
    return parseInt(lotteryId) === LOTTERYIDS.DLT;
  }
}

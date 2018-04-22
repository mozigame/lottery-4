import { TicketStatus, SeriesType } from '../store/constants';
import DigitalLotteryTicket from './digital/DigitalLotteryTicket';
import SportsLotteryJcInfo from './sports/SportsLotteryJcInfo';

export default class OrderScheme {
  constructor (obj, prizeNum) {
    this.failure_amount = obj.failure_amount;
    this.success_amount = obj.success_amount;
    this.winnings_bonus = obj.winnings_bonus;
    this.prizeNum = prizeNum;
    this.tickets = obj.tickets;
    this.setBettingContent();
    this.setTicketsStatusText();
  }
  setTicketsStatusText () {
    this.tickets.map((value, index) => {
      this.tickets[index].statusText = TicketStatus[value.ticket_status];
      const winStatus = parseInt(value.ticket_winnings_status);
      this.tickets[index].prizeText = winStatus === -1 ? '未中奖' : winStatus === 0 ? '待开奖' : value.ticket_winnings;
    })
  }
  setBettingContent () {
    this.tickets = this.tickets.map(ticket => {
      let lotteryId = ticket.lottery_id;
      if (ticket.jc_info) {
        ticket.jc_info = ticket.jc_info.map(value => {
          return new SportsLotteryJcInfo(value, lotteryId);
        })
      } else if (ticket.bet_number) {
        ticket = new DigitalLotteryTicket(ticket, lotteryId, this.prizeNum);
      }
      if (ticket.series) {
        ticket.seriesText = SeriesType[ticket.series];
      }
      return ticket;
    })
  }
}

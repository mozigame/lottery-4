import { Indicator } from 'mint-ui';

const loading = Indicator;

export default {
  show () {
    loading.open({
      spinnerType: 'fading-circle'
    });
  },
  hide () {
    loading.close();
  }
}

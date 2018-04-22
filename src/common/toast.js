/**
 * Created by admin on 2017/4/1.
 */
import { Toast } from 'mint-ui';

let toast = null;

export default function (message, position, duration) {
  if (!toast) {
    toast = Toast({
      message: message,
      position: position || 'middle'
    });
    setTimeout(() => {
      toast.close();
      toast = null;
    }, duration || 2000)
  }
}

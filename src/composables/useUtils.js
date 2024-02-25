import numeral from "numeral";
import "numeral/locales/es-es";
numeral.locale("es-es");

import moment from "moment";
import "moment/locale/en-gb";

const useUtils = () => {
    moment.locale("en-gb");
    const customFormat = (val) =>
    val?.toString()?.indexOf(".") > -1 ? "0,0.00" : "0,0";
    const number = (val) => numeral(val).format(customFormat(val));
    const eurFormat = (val) => `${number(val)}€`;

    const DATE_FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss';
    const DATE_FORMAT_STR = 'DD/MM/YYYY HH:mm:ss';

    const dateFormatStr = (date) => {
      return moment(date, DATE_FORMAT_DEFAULT).format(DATE_FORMAT_STR);
    };
    const dateFormatDefault = () => {
      return moment().format(DATE_FORMAT_DEFAULT);
    };

    const STATUS_ORDER = {
      PENDING: 'Pendiente',
      ANULLED: 'Anulado',
      CHARGED: 'Cobrado'
    };

    return {
        eurFormat,
        dateFormatStr,
        dateFormatDefault,
        STATUS_ORDER
    }
}

export default useUtils
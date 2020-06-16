import I18n from 'i18n-js';

const friendlyDate = date => {
  var now = new Date();
  var timeStamp = fromRailsStringToJavascriptDate(date);

  var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  
  if (secondsPast < 60) {
    return I18n.t('javascript.helpers.friendly_date.just_now');
  } else if (secondsPast < 3600) {
    let minutesPast = parseInt(secondsPast / 60);
    return minutesPast + ' ' + (minutesPast === 1 ? I18n.t('javascript.helpers.friendly_date.minute') : I18n.t('javascript.helpers.friendly_date.minutes')) + I18n.t('javascript.helpers.friendly_date.ago');
  } else if (secondsPast <= 86400) {
    let hoursPast = parseInt(secondsPast / 3600);
    return hoursPast + ' ' + (hoursPast === 1 ? I18n.t('javascript.helpers.friendly_date.hour') : I18n.t('javascript.helpers.friendly_date.hours')) + I18n.t('javascript.helpers.friendly_date.ago');
  } else {
    let daysPast = parseInt(secondsPast / 86400);
    return daysPast + ' ' + (daysPast === 1 ? I18n.t('javascript.helpers.friendly_date.day') : I18n.t('javascript.helpers.friendly_date.days')) + I18n.t('javascript.helpers.friendly_date.ago');
  }
}

export default friendlyDate;

/*
  Converts the default Rails datetime string
  format to a JavaScript Date object.
*/
const fromRailsStringToJavascriptDate = date => {
  let dateOnly = date.slice(0, 10);
  let timeOnly = date.slice(11, 19);
  
  return new Date(`${dateOnly}T${timeOnly}Z`);
}
export default (text: string) => {
  switch (text) {
    case '1':
      return '1 day';
    case '7':
      return '1 week';
    case '14':
      return '14 days';
    case '28':
      return '28 days';
    case '30':
    case '31':
      return '1 month';
    case '91':
      return '13 weeks';
    case '115':
    case '122':
      return '1 term';
    case '244':
      return '2 terms';
    case '344':
    case '365':
      return '52 weeks';
    default:
      return text;
  }
};

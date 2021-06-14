// START OF HELPER FUNC
const checkOperatorName = (name: string) => {
  let operatorName;
  switch (name) {
    case 'Arriva Midlands':
      operatorName = 'Arriva';
      break;
    case "Johnson's Excelbus":
      operatorName = 'Johnsons of Henley';
      break;
    case 'LandFlight':
      operatorName = 'Landflight (Silverline)';
      break;
    case 'RKT':
      operatorName = 'RK Travel';
      break;
    case 'Stagecoach Midlands':
      operatorName = 'Stagecoach';
      break;
    default:
      operatorName = name;
  }
  return operatorName;
};

export default checkOperatorName;

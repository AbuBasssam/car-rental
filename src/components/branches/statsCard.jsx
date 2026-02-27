import { branchesPageStyles as s } from "../../utils/styles";

const statsCard = ({ children }) => {
  return <div className={s.stats.card}>{children}</div>;
};
export default statsCard;

import { whyChooseUsStyles } from "../../utils/styles";

const FeatureCard = ({ fcInfo }) => (
  <div className={whyChooseUsStyles.card.container + " choose__card group"}>
    <span className={whyChooseUsStyles.card.iconWrapper}>
      <fcInfo.icon />
    </span>
    <div className={whyChooseUsStyles.card.textWrapper}>
      <h4 className={whyChooseUsStyles.card.title}>{fcInfo.title}</h4>
      <p className={whyChooseUsStyles.card.description}>{fcInfo.desc}</p>
    </div>
  </div>
);
export default FeatureCard;

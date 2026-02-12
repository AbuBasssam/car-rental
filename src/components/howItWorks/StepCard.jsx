import { howItWorksStyles } from "../../utils/styles";

const StepCard = ({ stepInfo }) => {
  const Icon = stepInfo.icon;

  return (
    <div className={howItWorksStyles.stepCard.container}>
      {/* Step number in corner */}
      <div className={howItWorksStyles.stepCard.stepNumber}>0{stepInfo.id}</div>

      {/* Icon container */}
      <div className={howItWorksStyles.stepCard.iconContainer}>
        <Icon />
      </div>

      <h3 className={howItWorksStyles.stepCard.title}>{stepInfo.title}</h3>
      <p className={howItWorksStyles.stepCard.description}>{stepInfo.desc}</p>
    </div>
  );
};

export default StepCard;

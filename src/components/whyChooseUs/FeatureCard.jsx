const FeatureCard = ({ fcInfo }) => (
  <div className="choose__card group">
    <span className="text-3xl flex items-center justify-center group-hover:bg-premium-orange group-hover:text-white transition-colors duration-300">
      <fcInfo.icon />
    </span>
    <div className="text-left">
      <h4 className="font-heading font-bold text-eerie-black dark:text-authentic-white text-lg leading-tight">
        {fcInfo.title}
      </h4>
      <p className="font-body text-sm text-deep-gray dark:text-dark-text-muted mt-1">
        {fcInfo.desc}
      </p>
    </div>
  </div>
);
export default FeatureCard;

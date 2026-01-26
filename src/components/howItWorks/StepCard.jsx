const StepCard = ({ stepInfo }) => {
  const Icon = stepInfo.icon;

  return (
    <div className="step__card group relative flex flex-col items-center text-center p-8 bg-white dark:bg-big-stone rounded-4xl transition-all duration-500 hover:-translate-y-2 border border-soft-gray dark:border-dark-border shadow-sm hover:shadow-orange dark:hover:shadow-dark-soft">
      {/* Step number in corner */}
      <div className="absolute top-4 right-6 text-4xl font-black opacity-5 text-eerie-black dark:text-white group-hover:opacity-10 transition-opacity">
        0{stepInfo.id}
      </div>

      {/* Icon container */}
      <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-2xl bg-seashell dark:bg-pickled-bluewood text-premium-orange text-5xl transition-all duration-300 group-hover:bg-premium-orange group-hover:text-white group-hover:rotate-6">
        <Icon />
      </div>

      <h3 className="font-heading font-bold text-xl text-eerie-black dark:text-authentic-white mb-3">
        {stepInfo.title}
      </h3>
      <p className="font-body text-sm text-deep-gray dark:text-dark-text-muted leading-relaxed">
        {stepInfo.desc}
      </p>
    </div>
  );
};

export default StepCard;

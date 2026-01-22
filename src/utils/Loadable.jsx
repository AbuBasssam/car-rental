import { Suspense } from "react";

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name})`;

  return LoadableComponent;
};

export default Loadable;

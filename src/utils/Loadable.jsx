import React, { Suspense } from "react";
import LoadingIndicator from "../utils/LoadingIndicator";

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<LoadingIndicator />}>
      <Component {...props} />
    </Suspense>
  );

  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name})`;

  return LoadableComponent;
};

export default Loadable;

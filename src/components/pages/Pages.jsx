import { Routes, Route } from "react-router-dom";

function Pages({ routes }) {
  return (
    <Routes>
      {routes.map(({ routeName, ...restProps }) => (
        <Route key={routeName} {...restProps} />
      ))}
    </Routes>
  );
}

export { Pages };

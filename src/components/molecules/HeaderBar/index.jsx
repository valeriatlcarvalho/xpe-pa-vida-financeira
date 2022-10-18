import { Breadcrumbs } from "../Breadcrumbs";

function HeaderBar({ breadcrumbs, children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Breadcrumbs items={breadcrumbs} />
      <div>{children}</div>
    </div>
  );
}

export { HeaderBar };

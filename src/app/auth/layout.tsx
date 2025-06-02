import { Fragment } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("auth layout");
  return (
    <Fragment>
      <div>Auth Layout</div>
      <main>{children}</main>
    </Fragment>
  );
}

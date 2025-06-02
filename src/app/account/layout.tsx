import { Fragment } from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("account layout");
  return (
    <Fragment>
      <main>
        <div>Account layout</div>
        {children}
      </main>
    </Fragment>
  );
}

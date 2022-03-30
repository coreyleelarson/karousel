import { PropsWithChildren } from "react"

export const ErrorBlock = (props: PropsWithChildren<unknown>) => {
  const { children } = props;

  return (
    <p className="error-block">{children}</p>
  );
}
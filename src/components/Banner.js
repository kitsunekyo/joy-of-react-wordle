export function Banner({ children, variant }) {
  return <div className={["banner", variant].join(" ")}>{children}</div>;
}

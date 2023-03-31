import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: string;
  activeClassName: string;
}

export function ActiveLink({ activeClassName, children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : "";

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  );
}

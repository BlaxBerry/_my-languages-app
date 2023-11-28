import { memo, type ReactNode } from "react";
import ClientLayoutHeader from "./header";
import ClientLayoutMain from "./main/ClientLayoutMain";
import ClientLayoutFooter from "./footer/ClientLayoutFooter";

function ClientLayout(props: { children: ReactNode }) {
  return (
    <>
      {/* root header */}
      <ClientLayoutHeader />

      {/* root main */}
      <ClientLayoutMain>{props.children}</ClientLayoutMain>

      {/* root footer */}
      <ClientLayoutFooter />
    </>
  );
}

const ClientLayoutMemo = memo(ClientLayout);
export default ClientLayoutMemo;

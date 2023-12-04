import { memo, type ReactNode } from "react";
import RootLayoutHeader from "./header";
import RootLayoutMain from "./main/RootLayoutMain";
import RootLayoutFooter from "./footer/RootLayoutFooter";

function RootLayout(props: { children: ReactNode }) {
  return (
    <>
      {/* root header */}
      <RootLayoutHeader />

      {/* root main */}
      <RootLayoutMain>{props.children}</RootLayoutMain>

      {/* root footer */}
      <RootLayoutFooter />
    </>
  );
}

const RootLayoutMemo = memo(RootLayout);
export default RootLayoutMemo;

import { Outlet } from "react-router-dom";
import ClientLayout from "@/components/layouts/ClientLayout.tsx";

export default function HomeIndex() {
  return (
    <ClientLayout>
      <Outlet />
    </ClientLayout>
  );
}

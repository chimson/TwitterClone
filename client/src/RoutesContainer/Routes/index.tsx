import * as React from "react";
import { useLocation } from "react-router-dom";
import { useModalContext } from "../../components/context/ModalContext";
import { Modals } from "../../components/context/ModalContext/ModalRoot";
import { LoadingPage } from "../../pages/LoadingPage";
import { useQuery } from "@apollo/client";
import { AuthUserDocument, AuthUserQuery } from "../../generated/graphql";
import { authUserId } from "../../cache";
const HomePage = React.lazy(() => import("../../pages/HomePage"));
const NonAuthenticatedRoutes = React.lazy(
  () => import("./NonAuthenticatedRoutes")
);

export const Routes = () => {
  const location = useLocation();

  const { openModal } = useModalContext();

  const { data, loading } = useQuery<AuthUserQuery>(AuthUserDocument, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-only",
  });

  const isModalAtLocation = !!Modals[location.pathname];

  React.useEffect(() => {
    if (!loading && data && isModalAtLocation) {
      openModal();
    }
  }, [location, loading, data, isModalAtLocation, openModal]);
  React.useEffect(() => {
    authUserId(data?.authUser.id);
  }, [data]);
  if (loading) return <LoadingPage />;

  return (
    <React.Suspense fallback={<LoadingPage />}>
      {data?.authUser.name ? (
        <HomePage user={data!.authUser!} />
      ) : (
        <NonAuthenticatedRoutes />
      )}
    </React.Suspense>
  );
};

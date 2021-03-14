import * as React from "react";
import { CreatePostModal } from "../../Modals/CreatePostModal";
import { EditProfileModal } from "../../Modals/EditProfileModal";
import { useLocation } from "react-router-dom";
import { CustomizeViewModal } from "../../Modals/CustomizeViewModal";
import { useModalContext } from "./";
import { DeletePostModal } from "../../Modals/DeletePostModal";
import { UnfollowUserModal } from "../../Modals/UnfollowUserModal";
import { LoginModal } from "../../Modals/LoginModal";

interface Props {
  _key: string;
  props: any;
}

export const Modals: {
  [type: string]: React.FunctionComponent<any>;
} = {
  "/posts/compose": CreatePostModal,
  "/settings/profile": EditProfileModal,
  "/i/display": CustomizeViewModal,
};

export const AlertModals: {
  [type: string]: React.FunctionComponent<any>;
} = {
  deletePostAlert: DeletePostModal,
  unfollowUserAlert: UnfollowUserModal,
  loginAlert: LoginModal,
};

export const ModalRoot: React.FC<Props> = React.memo(({ _key, props }) => {
  let location = useLocation();
  const { open } = useModalContext();
  const AnyModal = Modals[location.pathname] || AlertModals[_key];

  if (AnyModal && open) {
    return <AnyModal {...props} />;
  }

  return null;
});

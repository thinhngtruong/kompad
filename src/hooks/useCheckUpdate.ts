import { getVersion } from "@tauri-apps/api/app";
import { emit, listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { showUpdateModal } from "../store/modal";

export const useCheckUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [version, setVersion] = useState("");

  const openUpdateModal = () => {
    if (updateAvailable) {
      showUpdateModal();
    }
  };

  useEffect(() => {
    getVersion().then((version) => {
      setVersion(version);
    });

    listen("tauri://update-available", function (res) {
      console.log("tauri://update-available", res);
      setUpdateAvailable(true);
    });

    emit("tauri://update");
  }, []);

  return {
    updateAvailable,
    version,
    openUpdateModal,
  };
};

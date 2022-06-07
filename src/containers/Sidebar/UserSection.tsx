import { useCheckUpdate } from "../../hooks/useCheckUpdate";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Settings from "../Settings";

function UserSection() {
  const { openUpdateModal, updateAvailable, version } = useCheckUpdate();
  const { info } = useCurrentUser();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-y border-t-gray-200 border-b-gray-400 dark:border-t-gray-900 dark:border-b-gray-900 flex items-center justify-between">
      <div className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={info?.photoURL}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium text-gray-700 dark:text-gray-300`}
            >
              {info?.fullname}
            </p>
            <div
              onClick={openUpdateModal}
              className={`text-xs font-medium text-gray-500 flex items-center gap-1 ${
                updateAvailable ? "cursor-pointer" : ""
              }`}
            >
              <span
                title={`${updateAvailable ? "A new version available" : ""}`}
                className="hover:text-gray-400"
              >
                v{version}
              </span>

              {updateAvailable ? (
                <div className="relative w-2" title="A new version available">
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Settings />
    </div>
  );
}

export default UserSection;

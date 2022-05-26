import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getPadsByUid, IPad } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePadStore } from "../../store";

dayjs.extend(relativeTime);

function PadList() {
  const { user } = useAuth();
  const { id } = useParams();
  const newPadAdded = usePadStore((state) => state.newPadAdded);
  const [pads, setPads] = useState<IPad[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getPadsByUid(user.uid).then((pads) => {
        if (!pads) {
          return;
        }

        setPads(pads);
      });
    }
  }, [user?.uid, newPadAdded]);

  return (
    <ul className="pad-list divide-y divide-gray-200">
      {pads.map((pad) => {
        const d = dayjs(pad.updatedAt.toDate());
        return (
          <li
            key={pad.id}
            className={`${
              id === pad.id ? "bg-gray-100" : ""
            } relative cursor-pointer bg-white py-2 px-4 hover:bg-gray-50`}
          >
            <Link to={`/app/pad/${pad.id}`}>
              <div className="flex flex-col justify-between">
                <div className="min-w-0 flex-1">
                  <span className="block focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <time className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500">
                      <i>{d.fromNow()}</i>
                    </time>
                    <h2 className="text-base font-medium text-gray-900 truncate">
                      {pad.title}
                    </h2>
                    <p className="text-sm text-gray-500 truncate">
                      {/* {pad.content} */}
                    </p>
                  </span>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Badge
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  Badge
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Badge
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PadList;

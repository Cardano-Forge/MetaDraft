import { useRxCollection, useRxData } from "rxdb-hooks";
import type { Status } from "~/lib/types";
import type { MetadataStatus, Project } from "../db/types";
import { getStatsFromStatus } from "../get-stats";

/**
 * A custom hook that provides functionality for retrieving and updating the asset state.
 * It uses RxDB collections for `status` and `project` to fetch and manipulate data.
 *
 * @returns {Object} - An object containing:
 *   - `isFetching`: {boolean} A flag indicating whether the status or project data is currently being fetched.
 *   - `getState`: {Function} A function that retrieves the status for a given asset name.
 *   - `updateState`: {Function} A function that updates the state of specified assets and updates related stats.
 */
export default function useAssetState() {
  const statusCollection = useRxCollection<MetadataStatus>("status");
  const { result: statusResults, isFetching: isFetchingStatus } =
    useRxData<MetadataStatus>("status", (collection) =>
      collection.findByIds(["assetStatus"]),
    );
  const projectCollection = useRxCollection<Project>("project");
  const { result: projectResults, isFetching: isFetchingProject } =
    useRxData<Project>("project", (collection) =>
      collection.findByIds(["project"]),
    );

  const status = statusResults[0]?.status;
  const project = projectResults[0]?._data;

  const getState = (assetName: string): Status => {
    if (!status) return "error";
    return status[assetName]!;
  };

  const updateState = async (assetNames: string[], state: Status) => {
    try {
      if (!status || !project) throw new Error("No status found.");
      let newStatus = { ...status };

      assetNames.forEach((assetName) => {
        newStatus = { ...newStatus, [assetName]: state };
      });

      // Update status in RXDB
      await statusCollection?.upsert({
        id: "assetStatus",
        status: newStatus,
      });

      // Update stats in RXDB
      const stats = getStatsFromStatus(newStatus);
      await projectCollection?.upsert({ ...project, ...stats });
    } catch (error) {
      console.error(error);
    }
  };

  const isFetching = isFetchingStatus || isFetchingProject;

  return { status, isFetching, getState, updateState };
}

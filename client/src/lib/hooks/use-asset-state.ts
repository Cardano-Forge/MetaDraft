import { useRxCollection, useRxData } from "rxdb-hooks";
import type { Status } from "~/lib/types";
import type { MetadataStatus, Project } from "../db/types";
import { getStatsFromStatus } from "../get-stats";

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

  const updateState = async (assetName: string, state: Status) => {
    try {
      if (!status || !project) throw new Error("No status found.");
      const newStatus = { ...status, [assetName]: state };
      // Update status in RXDB
      await statusCollection?.upsert({
        id: "assetStatus",
        status: newStatus,
      });

      const stats = getStatsFromStatus(newStatus);

      // Update stats in RXDB
      await projectCollection?.upsert({ ...project, ...stats });
    } catch (error) {
      console.error(error);
    }
  };

  const isFetching = isFetchingStatus && isFetchingProject;

  return { isFetching, getState, updateState };
}

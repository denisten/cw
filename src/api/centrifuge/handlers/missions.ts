import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import { setMarker } from '../../../effector/towers-marker/events';
import { MarkerTypes } from '../../../components/markers';
import { initChatSession } from '../../../effector/chat/events';
import { saveMission } from '../../../effector/missions-store/events';
import { timerLoopUpdater } from '../../../utils/timer-closure';

export const missionsHandler = (missions: ITask[]) => {
  const wantedTaskStatusesSet = new Set([
    TaskStatuses.ACTIVE,
    TaskStatuses.REJECTED,
  ]);
  missions.map(mission => {
    mission.userSubTasks.map(subtask => {
      if (subtask.status === TaskStatuses.PROGRESS_COMMITTED) {
        subtask.status = TaskStatuses.REWARDED;
      }
      if (wantedTaskStatusesSet.has(subtask.status)) {
        setMarker({
          towerTitle: subtask.productSlug,
          type: MarkerTypes.ACTIVE_TASK,
        });
        initChatSession({
          towerTitle: subtask.productSlug,
          taskId: subtask.id,
        });
      }

      if (subtask.expireInSeconds) {
        subtask.localExpireInSeconds = timerLoopUpdater(
          subtask.expireInSeconds
        );
      }
    });
  });
  saveMission(missions);
};

import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const getTaskResultRequest = async (id: number) => {
  const response = await get<{ data: IGetTaskResultRequest }>(
    `${apiRoutes.GET_TASKS}/${id}/chat/result`
  );
  return response.data.data;
};

export interface IGetTaskResultRequest {
  chatSessionFinished: boolean;
  quizResult: {
    correct: number;
    success: boolean;
    incorrect: number;
    notAnswered: number;
    percentage: number;
  };
}

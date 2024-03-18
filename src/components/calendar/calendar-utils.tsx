import { Dayjs } from "dayjs";

import { PostPutExerciseType } from "../../constants/api/api-types";
import { TrainingListKeys, colorStatusBadge } from "../../constants/calendar/calendar-text";

export const getListData = (value: Dayjs, userExercises: PostPutExerciseType[]) => {
  const filteredVal = userExercises.filter((elem) => {
      const newDate = new Date(elem.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
      });
      return newDate === value.format('MM/DD/YYYY');
  });

  const listData = filteredVal.map((elem: PostPutExerciseType) => {
      return { trainingId: elem._id, badge: colorStatusBadge[elem.name as TrainingListKeys]}
  });

  return listData || [];
};

export const monthCellRender = (value: Dayjs) => {
  const num = getMonthData(value);
  return num ? (
      <div className='notes-month'>
          <section>{num}</section>
          <span>Backlog number</span>
      </div>
  ) : null;
};
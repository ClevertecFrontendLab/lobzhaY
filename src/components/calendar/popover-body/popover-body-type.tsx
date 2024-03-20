import { LiteralUnion } from "antd/es/_util/type";

import { TrainingListText } from "../../../constants/calendar/calendar-text";
import { PostPutExerciseType } from "../../../constants/api/api-types";

export type PopoverBodyComponentType = {
  listData: {
      trainingId: string | undefined;
      badge: {
          color:
              | LiteralUnion<
                    | 'blue'
                    | 'purple'
                    | 'cyan'
                    | 'green'
                    | 'magenta'
                    | 'pink'
                    | 'red'
                    | 'orange'
                    | 'yellow'
                    | 'volcano'
                    | 'geekblue'
                    | 'lime'
                    | 'gold'
                >
              | undefined;
          content: string;
      };
  }[];
  createTrainingBtn: boolean;
  changeCreateTraining: (isCreate: boolean) => void;
  trainingListUser: PostPutExerciseType[] | undefined;
  activeSelect: TrainingListText | undefined;
  closeModal: (isOpen: boolean) => void;
  isFuture: boolean;
  changeActiveSelect: (activeSelect: TrainingListText) => void;
  addTraining: boolean;
  changeAddTraining: (addTraining: boolean) => void;
};
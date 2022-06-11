import {instance} from "../../../sc1-main/m3-dal/instance";

export type UpgradeGradeDataType = {
  card_id: string
  grade: number
};

export const learnAPI = {
  gradeCard(data: UpgradeGradeDataType) {
    return instance.put("cards/grade", data)
      .then(response => response.data);
  },
};
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import { calendarTestId } from "../../../constants/data-test/data-test-id";

const { confirm } = Modal;

export  const showDeleteConfirm = (handleCloseModal: () => void) => {
  confirm({
      title: (
          <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
              При сохранении данных произошла ошибка
          </h6>
      ),
      centered: true,
      icon: (
          <CloseCircleOutlined
              data-test-id={calendarTestId.modalErrorUserTraining.buttonClose}
          />
      ),
      content: (
          <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
              Придётся попробовать ещё раз
          </p>
      ),
      cancelText: 'Закрыть',
      closable: false,
      okButtonProps: { style: { display: 'none' } },
      cancelButtonProps: { 'data-test-id': calendarTestId.modalErrorUserTraining.button },
      wrapClassName: 'confirm-modal-err',
      onCancel() {
          handleCloseModal();
      },
  });
};
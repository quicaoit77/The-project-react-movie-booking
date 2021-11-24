import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import "./ModalStyle.scss";

export default function ModalComponent(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    titleModal,
    textOk,
    textShowModal,
    functionOk,
    Component,
    classModal,
    ...restProps
  } = props;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    functionOk();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {textShowModal}
      </Button>
      <Modal
        className={classModal}
        title={titleModal}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={textOk}
        destroyOnClose={true}
      >
        <Component {...restProps} />
      </Modal>
    </>
  );
}

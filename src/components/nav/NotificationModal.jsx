"use client";

import { Modal, Button } from "@mantine/core";

const NotificationModal = ({ opened, close }) => {
  const handleConnectLine = async () => {};
  return (
    <Modal.Root
      opened={opened}
      onClose={() => {
        close();
      }}
      centered
    >
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header className="bg-primary text-white">
          <Modal.Title>Connect Line Notify</Modal.Title>
          <Modal.CloseButton className="text-white hover:text-primary" />
        </Modal.Header>
        <Modal.Body className="pt-5 pb-5">
          <Button centered color="green">Connect to Line</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default NotificationModal;

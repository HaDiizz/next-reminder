"use client";

import { Box, Button, rem, Group, Menu, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import TimeCountDown from "./TimeCountDown";
import moment from "moment";

const ReminderCardItem = ({ item }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="col-span-4 rounded overflow-hidden shadow-lg border border-secondary hover:border-primary p-5 hover:shadow-[0px_0px_20px_3px_#f6ad55]">
      <div className="flex justify-between h-10">
        <TimeCountDown targetDate={new Date(item.remindAt)} />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <DotsVerticalIcon className="hover:cursor-pointer" />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => alert("HELLO")}
              color="red"
              leftSection={
                <TrashIcon style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="flex flex-col gap-y-5 pt-6">
        <span>{item.title}</span>
        <span>{moment(item.remindAt).format("LLLL")}</span>
        <Box maw={400}>
          <Group mb={5}>
            <Button variant="light" color="orange" onClick={open}>
              Description
            </Button>
          </Group>

          <Modal.Root centered opened={opened} onClose={close}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
              <Modal.Header className="bg-primary text-white">
                <Modal.Title>Description</Modal.Title>
                <Modal.CloseButton className="text-white hover:text-primary" />
              </Modal.Header>
              <Modal.Body className="pt-5 pb-5">
                <Text size="sm">{item.description}</Text>
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        </Box>
      </div>
    </div>
  );
};

export default ReminderCardItem;

"use client";

import { createReminder } from "@/lib/actions/reminders";
import { reminderFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateReminder = () => {
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      title: "",
      description: "",
      remindAt: new Date(),
    },
  });
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (opened) {
      setValue("remindAt", new Date(new Date().getTime() + 1 * 60000));
    }
  }, [opened]);

  const handleCreateReminder = async (data) => {
    const response = await createReminder(data);
    if (response.error) {
      notifications.show({
        title: "Oops! Something went wrong! 👻",
        message: response.message,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Hey yo! 🎉",
        message: response.message,
        color: "green",
      });
      await close();
      await reset();
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className="bg-primary"
        variant="filled"
        color="orange"
        size="md"
        radius="md"
      >
        Create Reminder
      </Button>
      <Modal.Root
        opened={opened}
        onClose={() => {
          reset();
          close();
        }}
        centered
      >
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Header className="bg-primary text-white">
            <Modal.Title>Create Reminder</Modal.Title>
            <Modal.CloseButton className="text-white hover:text-primary" />
          </Modal.Header>
          <Modal.Body className="pt-5 pb-5">
            <form
              onSubmit={handleSubmit(handleCreateReminder)}
              className="space-y-6"
            >
              <TextInput
                {...register("title")}
                variant="filled"
                size="md"
                radius="md"
                label="Title"
                placeholder="Title"
                error={errors?.title?.message}
              />
              <TextInput
                {...register("description")}
                variant="filled"
                size="md"
                radius="md"
                label="Description"
                placeholder="Description"
                error={errors?.description?.message}
              />
              <DateTimePicker
                {...register("remindAt")}
                minDate={new Date()}
                variant="filled"
                size="md"
                radius="md"
                defaultValue={new Date(new Date().getTime() + 1 * 60000)}
                valueFormat="DD MMM YYYY hh:mm A"
                label="Reminder Time"
                placeholder="Reminder Time"
                error={errors?.remindAt?.message}
                onChange={(e) => setValue("remindAt", e)}
              />
              <div className="flex justify-end">
                <Button
                  loading={isSubmitting}
                  type="submit"
                  variant="outline"
                  color="orange"
                  size="sm"
                  radius="md"
                >
                  Create 🚀
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default CreateReminder;

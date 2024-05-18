import { forwardRef } from "react";
import { ChevronDownIcon, ExitIcon } from "@radix-ui/react-icons";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";
import { signOut } from "next-auth/react";
import { logOutAction } from "@/lib/actions/auth";

const UserButton = forwardRef(
  ({ image, username, email, icon, ...others }, ref) => (
    <UnstyledButton ref={ref} {...others}>
      <Group>
        <Avatar size="2rem" src={image} radius="md" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {username}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <ChevronDownIcon className="w-5 h-5 text-primary" />}
      </Group>
    </UnstyledButton>
  )
);

export default function ProfileMenu({ session }) {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image={`https://api.dicebear.com/8.x/thumbs/svg?shapeColor=f88c49&backgroundColor=ffd5dc&seed=${session.user.username}`}
          username={session.user.username}
          email={session.user.email}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={async () => {
            await signOut({ callbackUrl: "/login" });
            await logOutAction();
          }}
          color="red"
          leftSection={<ExitIcon className="w-4 h-4" />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

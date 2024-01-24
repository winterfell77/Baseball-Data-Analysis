'use client';

import {
  Box,
  Center,
  Group,
  MantineColorScheme,
  SegmentedControl,
  useMantineColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Debug from 'debug';
import { IconMoon, IconSun } from '@tabler/icons-react';

const debug = Debug(`Nationals:src:components:ToggleTheme.jsx`);

export default function ToggleTheme() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const handleOnClick = (value: string) => {
    setColorScheme(value as MantineColorScheme);
    if (value === 'light') {
      notifications.show({
        title: 'Notification',
        autoClose: 3000,
        withBorder: true,
        color: 'red',
        radius: 'lg',
        message: `The light has been turned on! 🔦💡☀️`,
      });
    } else {
      notifications.show({
        title: 'Notification',
        autoClose: 3000,
        withBorder: true,
        radius: 'lg',
        color: 'red',
        message: `The light has been turned off! 🌑️🌚🌙`,
      });
    }
  };

  return (
    <Group align="center">
      <SegmentedControl
        value={colorScheme}
        onChange={(value) => handleOnClick(value)}
        radius={20}
        color="gray"
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <IconSun size="1rem" stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <IconMoon size="1rem" stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}

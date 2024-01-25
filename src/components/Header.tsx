'use client';

import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Image,
  rem,
  useMantineTheme,
} from '@mantine/core';
import NextImage from 'next/image';
import Logo from '../../public/Logo.png';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import ToggleTheme from '@/src/components/ToggleTheme';

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box pb={60}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Image component={NextImage} src={Logo} alt="Logo" h={60} ml={15} priority={true} />
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/players" className={classes.link}>
              Players
            </a>
            <a href="/about" className={classes.link}>
              About
            </a>
          </Group>

          <Group visibleFrom="sm">
            <ToggleTheme />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/players" className={classes.link}>
            Players
          </a>
          <a href="/about" className={classes.link}>
            About
          </a>

          <Divider my="sm" />

          <Group justify="center">
            <ToggleTheme />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

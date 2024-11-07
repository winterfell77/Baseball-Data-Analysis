import { Container, Group, ActionIcon, rem, Image, Text, Divider, Box } from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import classes from './Footer.module.css';
import NextImage from 'next/image';
import Logo from '@/public/Logo.png';

export default function Footer() {
  return (
    <Box className={classes.footer} pt={20}>
      <Container className={classes.inner}>
        <Image
          component={NextImage}
          src={Logo}
          alt="Logo"
          h={60}
          ml={15}
          priority
          style={{ maxWidth: '15%', height: '70' }}
        />
        <Text ml={32}>An Allen Shen Production</Text>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <Text size="sm">My Social Media</Text>
          <Divider orientation="vertical" ml="20" size="sm" mr={10} />
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://twitter.com/allenlishen?lang=en"
          >
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.linkedin.com/in/allenshen7/"
          >
            <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.instagram.com/allen.l_s/?hl=en"
          >
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
}

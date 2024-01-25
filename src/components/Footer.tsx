import { Container, Group, ActionIcon, rem, Image, Text, Divider } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';
import NextImage from 'next/image';
import Logo from '@/public/Logo.png';

export default function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image
          component={NextImage}
          src={Logo}
          alt="Logo"
          h={60}
          ml={15}
          priority={true}
          style={{ maxWidth: '15%', height: '70' }}
        />
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <Text size="sm">National's Social Media</Text>
          <Divider orientation="vertical" ml="10" size="sm" />
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://twitter.com/nationals?lang=en"
          >
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.youtube.com/channel/UCUnB3WNX238eraj5IK3fFEw"
          >
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.instagram.com/nationals/?hl=en"
          >
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

import { Container, Button, Group, Text, Space, Center } from '@mantine/core';
import Header from '../components/Header';
import Footer from '../components/Footer';
import classes from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={classes.appcontainer}>
      <Header />
      <div className={classes.wrapper}>
        <Container className={classes.inner}>
          <Center className={classes.title}>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'red', to: 'blue' }}
              inherit
            >
              2023 Major League Baseball
            </Text>{' '}
          </Center>
          <Center className={classes.title}>Pitching Data Analysis</Center>
          <Group className={classes.controls} justify="center">
            <Button
              size="xl"
              className={classes.control}
              component="a"
              href="/players"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              Players
            </Button>
            <Space w="xl" />
            <Button
              component="a"
              href="/about"
              size="xl"
              variant="gradient"
              className={classes.control}
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              About
            </Button>
          </Group>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

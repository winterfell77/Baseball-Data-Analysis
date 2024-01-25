import Header from '../components/Header';
import Footer from '../components/Footer';
import classes from './HomePage.module.css';
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Space,
} from '@mantine/core';
export default function HomePage() {
  return (
    <div className={classes.appcontainer}>
      <Header />
      <div className={classes.wrapper}>
        <Container className={classes.inner}>
          <h1 className={classes.title}>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'red', to: 'blue' }}
              inherit
            >
              Washington Nationals
            </Text>{' '}
          </h1>
          <h1 className={classes.title}>Software Engineering Internship</h1>
          <h1 className={classes.title}>Web Development Programming Assignment</h1>

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

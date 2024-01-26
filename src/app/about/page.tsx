'use client';

import { Text, Title, Image, Box, Paper, Space, List, Anchor, Code } from '@mantine/core';
import NextImage from 'next/image';
import Header from '../../components/Header';
import Footer from '@/src/components/Footer';
import classes from '@/src/app/HomePage.module.css';
import allenPic from '../../../public/allen_picture.png';

export default function About() {
  return (
    <div className={classes.appcontainer}>
      <Header />
      <Box mb={40}>
        <Title ml={20}>About Me</Title>
        <Space h="md" />
        <Paper shadow="md" p="md" withBorder radius="xl">
          <Image
            radius="md"
            h={300}
            component={NextImage}
            fit="contain"
            src={allenPic}
            alt="My image"
            mb="30"
          />
          <Text size="lg">
            I am currently a senior at Johns Hopkins University in Baltimore, Maryland. I will be
            graduating in May 2024 with a B.S. in Computer Science and starting my M.S. in Computer
            Science in Fall 2024 and will graduate in May 2025. I am a very big fan of sports. I
            Love to watch and play a variety of sports such as Basketball, Baseball, Football, Golf,
            and Soccer. I played Soccer, Golf, and Track for my highschool. In my spare time, I love
            to watch movies and shows and make cool websites for fun. I am well versed in
            programming languages such as Python, C++, C, Java, Javascript, and Typescript. I have
            made a{' '}
            <Anchor href="https://allenlishen.com" target="_blank">
              personal website
            </Anchor>
            (allenlishen.com) that you can learn more about me.
          </Text>
          <Text mt={30} size="lg">
            Here are some of my favorite players to watch currently:
          </Text>
          <List size="lg" mt={10} withPadding>
            <List.Item>NBA Player: Paul George</List.Item>
            <List.Item>NHL Player: Connor Bedard</List.Item>
            <List.Item>Soccer Player: Bruno Fernandes</List.Item>
            <List.Item>NFL Player: Justin Jefferson</List.Item>
            <List.Item>MLB Player: Shohei Ohtani</List.Item>
            <List.Item>Golfer: Rory Mcilroy</List.Item>
          </List>
        </Paper>
      </Box>
      <Box mb={40}>
        <Title ml={20}>About This Site</Title>
        <Space h="md" />
        <Paper shadow="md" p="md" withBorder radius="xl">
          <List size="lg" mt={10} withPadding>
            <List.Item>Website Frameworks</List.Item>
            <Text ml={25} size="lg">
              This website was developed using{' '}
              <Anchor href="https://nextjs.org/" target="_blank">
                Next.js
              </Anchor>
              , a powerful React framework that enables server-side rendering. The backend was built
              with{' '}
              <Anchor href="https://flask.palletsprojects.com/en/3.0.x/" target="_blank">
                Flask
              </Anchor>
              , a python web framework that allows creations of python-based APIs for web requests.
              The Website's Frontend was built with{' '}
              <Anchor href="https://mantine.dev/" target="_blank">
                Mantine UI
              </Anchor>
              , a fully featured React Components Library.
            </Text>
          </List>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="xl" mt={20}>
          <List size="lg" mt={10} withPadding>
            <List.Item>Website Development</List.Item>
            <List size="lg" mt={10} withPadding>
              <List.Item>Postman for API testing</List.Item>
              <List.Item>ESLint style Checking</List.Item>
              <List.Item>Git for version control</List.Item>
              <List.Item>Prettier for formatting</List.Item>
              <List.Item>Debug for logging</List.Item>
              <List.Item>Postcss for styling</List.Item>
            </List>
          </List>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="xl" mt={20}>
          <List size="lg" mt={10} withPadding>
            <List.Item>Backend API</List.Item>
            <Text size="lg" mt={10}>
              Backend Built using{' '}
              <Anchor href="https://flask.palletsprojects.com/en/3.0.x/" target="_blank">
                Flask
              </Anchor>
              .
            </Text>
            <Text size="lg" mt={10}>
              Routes
            </Text>
            <List size="lg" withPadding>
              <List.Item>
                <Code>/</Code> : default
              </List.Item>
              <List.Item>
                <Code>/api/players/player_id</Code> : Get one player information from player's table
                based off of player_id
              </List.Item>
              <List.Item>
                <Code>/api/pitches/pitcher_id</Code> : Get required Pitcher information from
                database sorted by pitch type based off a pitcher_id
              </List.Item>
            </List>
          </List>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="xl" mt={20}>
          <List size="lg" mt={10} withPadding>
            <List.Item>Website Features</List.Item>
            <List withPadding>
              <List.Item>Accessible tabs for different pages in the header</List.Item>
              <List.Item>Toggleable light and dark Mode</List.Item>
              <List.Item>Website is completely mobile friendly with simple navigation burger</List.Item>
              <List.Item>Easy visit to Nationals Social Media Sites in the Footer</List.Item>
              <List.Item>Home Page for landing page</List.Item>
              <List.Item>Players page for pitcher table</List.Item>
              <List.Item>About page for about me and site information</List.Item>
            </List>
          </List>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="xl" mt={20}>
          <List size="lg" mt={10} withPadding>
            <List.Item>Players Page</List.Item>
            <Text size="lg" mt={10}>
              The Pitcher table was built using{' '}
              <Anchor href="https://icflorescu.github.io/mantine-datatable/" target="_blank">
                Mantine-Datatable
              </Anchor>
              , a datatable built on top of MantineUI.
            </Text>
            <Text size="lg" mt={10}>
              Features
            </Text>
            <List withPadding>
              <List.Item>Choose player by ID or Name(both searchable)</List.Item>
              <List.Item>Sortable columns by ascending or descending values</List.Item>
              <List.Item>
                Pinned first column(Pitch Type) for viewing easability when scrolling through the
                columns
              </List.Item>
              <List.Item>
                Adjust the order of columns to one's liking and the ability to reset column order
              </List.Item>
              <List.Item>Empty Data View</List.Item>
              <List.Item>Loading data view for asynchronous api calls</List.Item>
            </List>
          </List>
        </Paper>
      </Box>
      <Footer />
    </div>
  );
}

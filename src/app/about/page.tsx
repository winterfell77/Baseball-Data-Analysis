import { Text } from '@mantine/core';
import Header from '../../components/Header';
import Footer from '@/src/components/Footer';
import classes from '@/src/app/HomePage.module.css';

export default function About() {
  return (
    <div className={classes.appcontainer}>
      <Header />

      <Footer />
    </div>
  );
}

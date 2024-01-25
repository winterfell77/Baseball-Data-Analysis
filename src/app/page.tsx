import Header from '../components/Header';
import Footer from '../components/Footer';
import classes from './HomePage.module.css';
export default function HomePage() {
  return (
    <div className={classes.appcontainer}>
      <Header />
      <Footer />
    </div>
  );
}

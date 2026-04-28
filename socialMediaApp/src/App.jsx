import Container from "./components/Container";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Posts from "./components/Posts";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <Container header={<Header />} sidebar={<Sidebar />}>
      <Posts />
    </Container>
  );
}
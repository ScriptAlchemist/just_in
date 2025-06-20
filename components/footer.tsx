import Container from "./container";
// import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--muted))] border-t border-[hsl(var(--border))]">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center text-[hsl(var(--foreground))]"></div>
      </Container>
    </footer>
  );
};

export default Footer;

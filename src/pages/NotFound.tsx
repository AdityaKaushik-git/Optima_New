import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Optima Star" description="The page you were looking for does not exist." noindex />
      <PageHero kicker="404" title="This page is not on the drawings" intro="The link may be out of date. Try the services, the project register or get in touch.">
        <div className="flex flex-wrap gap-3">
          <Button to="/" size="lg" arrow>Go to home</Button>
          <Button to="/projects" size="lg" variant="outline-light">Project register</Button>
        </div>
      </PageHero>
    </>
  );
}

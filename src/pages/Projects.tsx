import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ProjectTable from '../components/ProjectTable';
import CtaBand from '../components/CtaBand';
import { projects } from '../data/projects';

export default function Projects() {
  const reg = projects.filter((p) => p.recordType === 'register');
  const completed = reg.filter((p) => p.status === 'Completed').length;
  const ongoing = reg.filter((p) => p.status === 'Ongoing').length;
  return (
    <>
      <Seo
        title="Recent Waterproofing Projects Dubai | Project Register | Optima Star"
        description="Project register of substructure, wet area, superstructure and roof waterproofing by Optima Star across Dubai: Wadi Al Safa 5, JVC, Dubai Sports City, Jebel Ali, Dubai Islands and more."
        breadcrumbs={[{ name: 'Projects', path: '/projects' }]}
      />
      <PageHero
        kicker="Recent projects"
        title="A record of waterproofing works and technical execution"
        intro="Taken from our project list and the consultant submittals behind it. Where a detail is not in our records, the register says so."
        crumbs={[{ label: 'Projects' }]}
      >
        <dl className="flex flex-wrap gap-x-12 gap-y-4">
          {[
            ['Projects on register', reg.length],
            ['Completed', completed],
            ['Ongoing', ongoing],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-sm text-white/55">{k}</dt>
              <dd className="font-display text-4xl font-semibold text-white tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>
      <section className="section-y">
        <div className="container-x">
          <ProjectTable />
          <p className="mt-8 max-w-3xl text-sm text-steel">
            Year: not recorded on the project list, available on request. “Project document” rows are projects evidenced by pre-qualification or inspection submittals that are not on the project list.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

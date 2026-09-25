import { drawingInfo, drawingMaterials } from '../data/systems';
import { cx } from '../lib/asset';

export default function MaterialsTable({ dark }: { dark?: boolean }) {
  return (
    <div>
      <div className={cx('overflow-x-auto rounded-[var(--radius-card)] border', dark ? 'border-white/12' : 'border-line bg-white')}>
        <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
          <caption className="sr-only">Materials named on drawing {drawingInfo.number}</caption>
          <thead>
            <tr className={cx('anno', dark ? 'text-white/50' : 'text-steel')}>
              <th scope="col" className="px-5 py-4 font-semibold">Material</th>
              <th scope="col" className="px-5 py-4 font-semibold">Role</th>
              <th scope="col" className="px-5 py-4 font-semibold">As drawn</th>
              <th scope="col" className="px-5 py-4 font-semibold">Where</th>
            </tr>
          </thead>
          <tbody>
            {drawingMaterials.map((m) => (
              <tr key={m.name} className={cx('border-t transition-colors', dark ? 'border-white/10 hover:bg-white/[0.03]' : 'border-line hover:bg-paper')}>
                <th scope="row" className={cx('px-5 py-4 font-display font-semibold', dark ? 'text-white' : 'text-navy')}>{m.name}</th>
                <td className={cx('px-5 py-4', dark ? 'text-white/75' : '')}>{m.role}</td>
                <td className={cx('px-5 py-4 tabular-nums', dark ? 'text-white/75' : '')}>{m.spec}</td>
                <td className={cx('px-5 py-4', dark ? 'text-white/60' : 'text-steel')}>{m.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={cx('mt-3 text-xs', dark ? 'text-white/45' : 'text-steel')}>
        Source: drawing {drawingInfo.number} rev {drawingInfo.revision}, {drawingInfo.issued.toLowerCase()}. Materials on other projects follow their own approved submittals.
      </p>
    </div>
  );
}

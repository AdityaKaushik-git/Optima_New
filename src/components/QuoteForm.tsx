import { useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, FileUp, Loader2, Mail, Trash2 } from 'lucide-react';
import { quoteServiceOptions } from '../data/services';
import { company } from '../data/company';
import { siteConfig, uploadRules, warranty } from '../config/site';
import { Button } from './ui';
import { cx, pad2 } from '../lib/asset';

const projectTypes = ['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Other'];
const locations = ['Dubai', 'Other UAE location'];
const stagesList = ['Planning', 'Design', 'Tender', 'Under construction', 'Existing structure', 'Renovation'];

interface FormState {
  services: string[];
  projectType: string;
  location: string;
  locationDetail: string;
  stage: string;
  area: string;
  areaUnit: 'm²' | 'ft²';
  areaUnknown: boolean;
  projectName: string;
  details: string;
  files: File[];
  name: string;
  company: string;
  phone: string;
  email: string;
  consent: boolean;
  website: string; // honeypot
}

const steps = ['Service', 'Project type', 'Location', 'Project stage', 'Approximate area', 'Project details', 'Drawings and photos', 'Contact details'];

const fmtBytes = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);
const ext = (f: File) => f.name.split('.').pop()?.toLowerCase() ?? '';

function Choice({ label, selected, onClick, multi }: { label: string; selected: boolean; onClick: () => void; multi?: boolean }) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onClick}
      className={cx(
        'flex min-h-12 w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[0.97rem] font-medium transition',
        selected ? 'border-navy bg-navy text-white' : 'border-line bg-white text-graphite hover:border-navy/60',
      )}
    >
      <span className={cx('grid h-5 w-5 shrink-0 place-items-center border transition', multi ? 'rounded' : 'rounded-full', selected ? 'border-aqua bg-aqua text-ink' : 'border-line')}>
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
      </span>
      {label}
    </button>
  );
}

function Field({ id, label, error, hint, children, optional }: { id: string; label: string; error?: string; hint?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label} {optional && <span className="font-normal text-steel">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-steel">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger"><AlertCircle className="h-4 w-4" aria-hidden />{error}</p>}
    </div>
  );
}

export default function QuoteForm() {
  const [params] = useSearchParams();
  const preset = params.get('service');
  const presetMatch = preset ? quoteServiceOptions.find((o) => o.toLowerCase().startsWith(preset.toLowerCase().split(' ')[0])) : undefined;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [f, setF] = useState<FormState>({
    services: presetMatch ? [presetMatch] : [],
    projectType: '', location: '', locationDetail: '', stage: '',
    area: '', areaUnit: 'm²', areaUnknown: false,
    projectName: '', details: '', files: [],
    name: '', company: '', phone: '', email: '', consent: false, website: '',
  });
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); };

  const totalBytes = useMemo(() => f.files.reduce((s, x) => s + x.size, 0), [f.files]);

  const validate = (i: number) => {
    const e: Record<string, string> = {};
    if (i === 0 && !f.services.length) e.services = 'Select at least one waterproofing service.';
    if (i === 1 && !f.projectType) e.projectType = 'Select the project type.';
    if (i === 2 && !f.location) e.location = 'Select where the project is.';
    if (i === 2 && f.location === 'Other UAE location' && !f.locationDetail.trim()) e.locationDetail = 'Enter the emirate or area.';
    if (i === 3 && !f.stage) e.stage = 'Select the project stage.';
    if (i === 4 && !f.areaUnknown && (!f.area || Number(f.area) <= 0)) e.area = 'Enter an approximate area, or tick “Not sure yet”.';
    if (i === 5 && f.details.trim().length < 10) e.details = 'Describe the scope in a sentence or two (at least 10 characters).';
    if (i === 7) {
      if (!f.name.trim()) e.name = 'Enter your name.';
      if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = 'Enter a phone number, including the country code if outside the UAE.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
      if (!f.consent) e.consent = 'Confirm we may contact you about this request.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goTo = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  const next = () => { if (validate(step)) goTo(step + 1); };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const problems: string[] = [];
    const ok: File[] = [];
    let total = totalBytes;
    for (const file of incoming) {
      if (!uploadRules.extensions.includes(ext(file))) { problems.push(`${file.name}: only PDF, JPG, PNG and DWG files are accepted.`); continue; }
      if (file.size > uploadRules.maxFileBytes) { problems.push(`${file.name}: larger than ${fmtBytes(uploadRules.maxFileBytes)}.`); continue; }
      if (f.files.length + ok.length >= uploadRules.maxFiles) { problems.push(`Up to ${uploadRules.maxFiles} files can be attached.`); break; }
      if (total + file.size > uploadRules.maxTotalBytes) { problems.push(`Total upload is limited to ${fmtBytes(uploadRules.maxTotalBytes)}.`); break; }
      total += file.size;
      ok.push(file);
    }
    setF((p) => ({ ...p, files: [...p.files, ...ok] }));
    setErrors((e) => ({ ...e, files: problems.join(' ') }));
    if (fileInput.current) fileInput.current.value = '';
  };

  const summary = () =>
    [
      `Services: ${f.services.join(', ')}`,
      `Project type: ${f.projectType}`,
      `Location: ${f.location}${f.locationDetail ? ` (${f.locationDetail})` : ''}`,
      `Project stage: ${f.stage}`,
      `Approximate area: ${f.areaUnknown ? 'Not sure yet' : `${f.area} ${f.areaUnit}`}`,
      f.projectName && `Project: ${f.projectName}`,
      `Details: ${f.details}`,
      `Name: ${f.name}`,
      f.company && `Company: ${f.company}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
    ].filter(Boolean).join('\n');

  const submit = async () => {
    if (!validate(7)) return;
    if (f.website) { setStatus('sent'); return; } // honeypot: silently drop bots
    if (!siteConfig.apiBaseUrl) {
      const body = `${summary()}\n\n${f.files.length ? `I will attach ${f.files.length} file(s) to this email: ${f.files.map((x) => x.name).join(', ')}` : ''}`;
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Quotation request: ${f.services[0] ?? 'Waterproofing'}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }
    setStatus('sending');
    setServerError('');
    const data = new FormData();
    data.append('services', f.services.join(', '));
    (['projectType', 'location', 'locationDetail', 'stage', 'projectName', 'details', 'name', 'company', 'phone', 'email'] as const).forEach((k) => data.append(k, f[k]));
    data.append('area', f.areaUnknown ? 'Not sure yet' : `${f.area} ${f.areaUnit}`);
    data.append('summary', summary());
    f.files.forEach((file) => data.append('files', file, file.name));
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 60000);
      const res = await fetch(`${siteConfig.apiBaseUrl}${siteConfig.quotePath}`, { method: 'POST', body: data, signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`The server responded with status ${res.status}.`);
      setStatus('sent');
    } catch (err) {
      setServerError(err instanceof Error && err.name !== 'AbortError' ? err.message : 'The request timed out.');
      setStatus('error');
    }
  };

  if (status === 'sent' || status === 'mailto') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-line bg-white p-8 text-center sm:p-12" role="status">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-aqua/15 text-aqua">
          {status === 'sent' ? <CheckCircle2 className="h-9 w-9" aria-hidden /> : <Mail className="h-8 w-8" aria-hidden />}
        </motion.div>
        <h2 className="mt-6 text-3xl font-semibold">{status === 'sent' ? 'Request sent' : 'Finish in your email app'}</h2>
        <p className="mx-auto mt-4 max-w-md text-steel">
          {status === 'sent'
            ? 'Thank you. Our team will review the details and contact you by phone or email.'
            : `Your email app should have opened with the details filled in. Attach your drawings or photos and send it to ${company.email}.`}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="secondary">Back to home</Button>
          <Button to="/projects" variant="ghost" arrow>See our projects</Button>
        </div>
      </motion.div>
    );
  }

  const pct = ((step + 1) / steps.length) * 100;

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); step === steps.length - 1 ? submit() : next(); }} className="rounded-2xl border border-line bg-white shadow-[0_30px_80px_-50px_rgb(19_45_76/0.5)]">
      <div className="border-b border-line p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-sm font-semibold tabular-nums text-blue" aria-live="polite">
            Step {pad2(step + 1)} / {pad2(steps.length)}
          </p>
          <p className="text-sm text-steel">{steps[step]}</p>
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Form progress">
          <motion.div className="h-full rounded-full bg-aqua" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      </div>

      <div className="relative min-h-[26rem] overflow-hidden p-6 sm:p-8">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.fieldset
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <legend className="sr-only">{steps[step]}</legend>
            {step === 0 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">Which waterproofing service do you need?</h2>
                <p className="mt-2 text-sm text-steel">Select all that apply.</p>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2" role="group" aria-label="Waterproofing services" aria-describedby={errors.services ? 'services-err' : undefined}>
                  {quoteServiceOptions.map((o) => (
                    <Choice key={o} multi label={o} selected={f.services.includes(o)} onClick={() => set('services', f.services.includes(o) ? f.services.filter((x) => x !== o) : [...f.services, o])} />
                  ))}
                </div>
                {errors.services && <p id="services-err" className="mt-4 flex items-center gap-1.5 text-sm text-danger"><AlertCircle className="h-4 w-4" aria-hidden />{errors.services}</p>}
              </>
            )}
            {step === 1 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">What type of project is it?</h2>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Project type">
                  {projectTypes.map((o) => <Choice key={o} label={o} selected={f.projectType === o} onClick={() => set('projectType', o)} />)}
                </div>
                {errors.projectType && <p className="mt-4 text-sm text-danger">{errors.projectType}</p>}
              </>
            )}
            {step === 2 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">Where is the project?</h2>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Project location">
                  {locations.map((o) => <Choice key={o} label={o} selected={f.location === o} onClick={() => set('location', o)} />)}
                </div>
                {errors.location && <p className="mt-4 text-sm text-danger">{errors.location}</p>}
                <div className="mt-6">
                  <Field id="locationDetail" label={f.location === 'Other UAE location' ? 'Emirate and area' : 'Area or community'} optional={f.location !== 'Other UAE location'} error={errors.locationDetail}>
                    <input id="locationDetail" className="field" value={f.locationDetail} onChange={(e) => set('locationDetail', e.target.value)} placeholder="e.g. Jumeirah Village Circle" aria-invalid={!!errors.locationDetail} />
                  </Field>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">What stage is the project at?</h2>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Project stage">
                  {stagesList.map((o) => <Choice key={o} label={o} selected={f.stage === o} onClick={() => set('stage', o)} />)}
                </div>
                {errors.stage && <p className="mt-4 text-sm text-danger">{errors.stage}</p>}
              </>
            )}
            {step === 4 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">Roughly how large is the area?</h2>
                <p className="mt-2 text-sm text-steel">An estimate is fine. We confirm quantities from the drawings.</p>
                <div className="mt-6 grid max-w-md grid-cols-[1fr_auto] gap-3">
                  <Field id="area" label="Approximate area" error={errors.area}>
                    <input id="area" className="field" type="number" inputMode="decimal" min="0" value={f.area} disabled={f.areaUnknown} onChange={(e) => set('area', e.target.value)} aria-invalid={!!errors.area} />
                  </Field>
                  <div className="self-start pt-7">
                    <div className="flex h-12 rounded-lg border border-line p-1" role="radiogroup" aria-label="Unit">
                      {(['m²', 'ft²'] as const).map((u) => (
                        <button key={u} type="button" role="radio" aria-checked={f.areaUnit === u} onClick={() => set('areaUnit', u)} className={cx('min-w-12 rounded-md px-3 text-sm font-semibold', f.areaUnit === u ? 'bg-navy text-white' : 'text-steel')}>{u}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-[0.97rem]">
                  <input type="checkbox" className="h-5 w-5 accent-[var(--color-navy)]" checked={f.areaUnknown} onChange={(e) => set('areaUnknown', e.target.checked)} />
                  Not sure yet
                </label>
              </>
            )}
            {step === 5 && (
              <div className="space-y-5">
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">Tell us about the scope</h2>
                <Field id="projectName" label="Project name or plot number" optional>
                  <input id="projectName" className="field" value={f.projectName} onChange={(e) => set('projectName', e.target.value)} />
                </Field>
                <Field id="details" label="Project details" error={errors.details} hint="Structure, areas to be waterproofed, specified system or manufacturer, programme, and any known leaks or site conditions.">
                  <textarea id="details" rows={6} className="field resize-y" value={f.details} onChange={(e) => set('details', e.target.value)} aria-invalid={!!errors.details} aria-describedby={errors.details ? 'details-err' : 'details-hint'} />
                </Field>
              </div>
            )}
            {step === 6 && (
              <>
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">Attach drawings, specifications or site photos</h2>
                <p className="mt-2 text-sm text-steel">Optional. PDF, JPG, PNG or DWG, up to {fmtBytes(uploadRules.maxFileBytes)} per file and {uploadRules.maxFiles} files.</p>
                <label
                  htmlFor="files"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                  className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-line bg-paper px-6 py-10 text-center transition hover:border-aqua"
                >
                  <FileUp className="h-8 w-8 text-blue" aria-hidden />
                  <span className="font-semibold text-navy">Choose files or drag them here</span>
                  <input id="files" ref={fileInput} type="file" multiple accept={uploadRules.extensions.map((x) => `.${x}`).join(',')} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
                </label>
                {errors.files && <p className="mt-3 text-sm text-danger" role="alert">{errors.files}</p>}
                {f.files.length > 0 && (
                  <ul className="mt-5 divide-y divide-line rounded-lg border border-line">
                    {f.files.map((file, i) => (
                      <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                        <span className="min-w-0 truncate">{file.name} <span className="text-steel">({fmtBytes(file.size)})</span></span>
                        <button type="button" onClick={() => set('files', f.files.filter((_, j) => j !== i))} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-steel hover:bg-mist hover:text-danger" aria-label={`Remove ${file.name}`}>
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {!siteConfig.apiBaseUrl && f.files.length > 0 && (
                  <p className="mt-4 rounded-lg bg-mist px-4 py-3 text-sm text-navy">When you send the request, your email app will open. Attach these files to that email.</p>
                )}
              </>
            )}
            {step === 7 && (
              <div className="space-y-5">
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">How can we reach you?</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    <input id="name" className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
                  </Field>
                  <Field id="company" label="Company" optional>
                    <input id="company" className="field" autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} />
                  </Field>
                  <Field id="phone" label="Phone" error={errors.phone}>
                    <input id="phone" className="field" type="tel" autoComplete="tel" inputMode="tel" placeholder="+971" value={f.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <input id="email" className="field" type="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
                  </Field>
                </div>
                <div aria-hidden className="absolute -left-[9999px]">
                  <label htmlFor="website">Website</label>
                  <input id="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} />
                </div>
                <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-navy)]" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} />
                  <span>Optima Star may contact me about this request. See the <Link to="/privacy" className="font-semibold text-navy underline">privacy policy</Link>.</span>
                </label>
                {errors.consent && <p className="text-sm text-danger">{errors.consent}</p>}
                {warranty.enabled && <p className="text-xs text-steel">SBS membrane warranty terms are confirmed in the quotation for your specific project. {warranty.footnote}</p>}
                {status === 'error' && (
                  <div role="alert" className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                    The request could not be sent. {serverError} Try again, or email {company.email}.
                  </div>
                )}
              </div>
            )}
          </motion.fieldset>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line p-6 sm:p-8">
        <button type="button" onClick={() => goTo(step - 1)} disabled={step === 0} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-semibold text-steel transition hover:text-navy disabled:invisible">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
        </button>
        {step < steps.length - 1 ? (
          <Button type="submit" variant="secondary" arrow>Continue</Button>
        ) : (
          <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-aqua px-5 py-3 font-display font-semibold text-ink transition hover:bg-navy hover:text-white disabled:opacity-60">
            {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending request</> : 'Send request'}
          </button>
        )}
      </div>
    </form>
  );
}

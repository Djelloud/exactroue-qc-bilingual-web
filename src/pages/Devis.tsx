import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, X, CheckCircle2, Loader2 } from 'lucide-react';
import { z } from 'zod';

const MAX_PHOTOS = 10;
const MAX_PHOTO_MB = 8;

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  vehicle: z.string().trim().max(120).optional().or(z.literal('')),
  wheel_size: z.string().trim().max(40).optional().or(z.literal('')),
  service_type: z.string().trim().max(80).optional().or(z.literal('')),
  description: z.string().trim().min(10).max(4000),
});

const Devis = () => {
  const { t, language } = useLanguage();
  const fileInput = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    wheel_size: '',
    service_type: '',
    description: '',
  });

  const onField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    const valid: File[] = [];
    for (const f of incoming) {
      if (!f.type.startsWith('image/')) {
        toast.error(t('devis.err.type'));
        continue;
      }
      if (f.size > MAX_PHOTO_MB * 1024 * 1024) {
        toast.error(t('devis.err.size').replace('{mb}', String(MAX_PHOTO_MB)));
        continue;
      }
      valid.push(f);
    }
    const merged = [...photos, ...valid].slice(0, MAX_PHOTOS);
    if (photos.length + valid.length > MAX_PHOTOS) {
      toast.error(t('devis.err.max').replace('{n}', String(MAX_PHOTOS)));
    }
    setPhotos(merged);
    if (fileInput.current) fileInput.current.value = '';
  };

  const removePhoto = (i: number) => setPhotos(photos.filter((_, idx) => idx !== i));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(t('devis.err.validation'));
      return;
    }
    setSubmitting(true);
    try {
      const requestId = crypto.randomUUID();
      const photoUrls: string[] = [];

      for (let i = 0; i < photos.length; i++) {
        const f = photos[i];
        const ext = (f.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
        const path = `${requestId}/${i}-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('quote-photos')
          .upload(path, f, { contentType: f.type, upsert: false });
        if (upErr) throw upErr;
        photoUrls.push(path);
      }

      const { error } = await supabase.from('quote_requests').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        vehicle: form.vehicle.trim() || null,
        wheel_size: form.wheel_size.trim() || null,
        service_type: form.service_type.trim() || null,
        description: form.description.trim(),
        photo_urls: photoUrls,
        language,
      });
      if (error) throw error;

      setDone(true);
      toast.success(t('devis.success'));
    } catch (err) {
      console.error(err);
      toast.error(t('devis.err.generic'));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <CheckCircle2 className="h-16 w-16 text-gold mx-auto mb-6" />
          <h1 className="font-display uppercase text-4xl md:text-5xl mb-4">{t('devis.done.title')}</h1>
          <p className="text-muted-foreground text-lg mb-8">{t('devis.done.sub')}</p>
          <a
            href="/"
            className="inline-block bg-gold text-primary-foreground font-display uppercase tracking-wider px-8 py-3 hover:bg-gold-bright transition-colors"
          >
            {t('devis.done.back')}
          </a>
        </div>
      </section>
    );
  }

  const inputCls =
    'w-full bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold transition-colors';
  const labelCls = 'block font-display uppercase tracking-wider text-xs text-muted-foreground mb-2';

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <span className="font-display uppercase tracking-[0.3em] text-xs text-gold">{t('devis.eyebrow')}</span>
          <h1 className="font-display uppercase text-4xl md:text-6xl mt-3 mb-4">{t('devis.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t('devis.sub')}</p>
        </div>

        <form onSubmit={submit} className="space-y-6 bg-card/40 border border-border p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>{t('devis.f.name')} *</label>
              <input className={inputCls} required value={form.name} onChange={onField('name')} maxLength={120} />
            </div>
            <div>
              <label className={labelCls}>{t('devis.f.email')} *</label>
              <input type="email" className={inputCls} required value={form.email} onChange={onField('email')} maxLength={255} />
            </div>
            <div>
              <label className={labelCls}>{t('devis.f.phone')}</label>
              <input className={inputCls} value={form.phone} onChange={onField('phone')} maxLength={40} />
            </div>
            <div>
              <label className={labelCls}>{t('devis.f.vehicle')}</label>
              <input className={inputCls} placeholder={t('devis.f.vehicle.ph')} value={form.vehicle} onChange={onField('vehicle')} maxLength={120} />
            </div>
            <div>
              <label className={labelCls}>{t('devis.f.size')}</label>
              <input className={inputCls} placeholder={t('devis.f.size.ph')} value={form.wheel_size} onChange={onField('wheel_size')} maxLength={40} />
            </div>
            <div>
              <label className={labelCls}>{t('devis.f.service')}</label>
              <select className={inputCls} value={form.service_type} onChange={onField('service_type')}>
                <option value="">{t('devis.f.service.ph')}</option>
                <option value="repair">{t('services.s1.t')}</option>
                <option value="straightening">{t('services.s2.t')}</option>
                <option value="powdercoat">{t('services.s4.t')}</option>
                <option value="paint">{t('services.s5.t')}</option>
                <option value="cnc">{t('services.s6.t')}</option>
                <option value="other">{t('devis.f.service.other')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>{t('devis.f.description')} *</label>
            <textarea
              className={`${inputCls} min-h-[140px] resize-y`}
              required
              value={form.description}
              onChange={onField('description')}
              maxLength={4000}
              placeholder={t('devis.f.description.ph')}
            />
          </div>

          <div>
            <label className={labelCls}>
              {t('devis.f.photos')} ({photos.length}/{MAX_PHOTOS})
            </label>
            <div
              onClick={() => fileInput.current?.click()}
              className="border-2 border-dashed border-border hover:border-gold transition-colors cursor-pointer p-8 text-center"
            >
              <Upload className="h-8 w-8 text-gold mx-auto mb-3" />
              <p className="font-display uppercase tracking-wider text-sm">{t('devis.f.photos.cta')}</p>
              <p className="text-xs text-muted-foreground mt-2">{t('devis.f.photos.hint').replace('{mb}', String(MAX_PHOTO_MB))}</p>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                onChange={onPick}
                className="hidden"
              />
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                {photos.map((f, i) => (
                  <div key={i} className="relative group aspect-square bg-muted overflow-hidden">
                    <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-background/80 hover:bg-destructive hover:text-destructive-foreground p-1 transition-colors"
                      aria-label="Remove"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-primary-foreground font-display uppercase tracking-wider font-semibold py-4 hover:bg-gold-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? t('devis.submitting') : t('devis.submit')}
          </button>

          <p className="text-xs text-muted-foreground text-center">{t('devis.legal')}</p>
        </form>
      </div>
    </section>
  );
};

export default Devis;

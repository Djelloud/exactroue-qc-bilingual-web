import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Upload, X } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setImages(prev => [...prev, ...newFiles].slice(0, 10)); // Max 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setImages(prev => [...prev, ...newFiles].slice(0, 10));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('color', color);
      formData.append('size', size);
      formData.append('message', message);

      // Add images to form data
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch('https://getform.io/f/allqdxya', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setName('');
          setPhone('');
          setEmail('');
          setColor('');
          setSize('');
          setMessage('');
          setImages([]);
          setFormSubmitted(false);
          setSubmitting(false);
        }, 3000);
      } else {
        setSubmitting(false);
        console.log('Form submission failed');
      }
    } catch (error) {
      setSubmitting(false);
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{t('contact.info')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.phone')}</p>
                    <a href="tel:+15146836999" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      (514) 683-6999
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.email')}</p>
                    <a href="mailto:info@exactroue.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      info@exactroue.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.address')}</p>
                    <p className="text-sm text-muted-foreground">
                      1420 Boul Hymus, Dorval, QC H9P 1J6
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.hours')}</p>
                    {language === 'fr' ? (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>dimanche: Fermé</p>
                        <p>lundi: 8h00–18h00</p>
                        <p>mardi: 8h00–18h00</p>
                        <p>mercredi: 8h00–18h00</p>
                        <p>jeudi: 8h00–18h00</p>
                        <p>vendredi: 8h00–14h00</p>
                        <p>samedi: Fermé</p>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Sunday: Closed</p>
                        <p>Monday: 8:00AM–6:00PM</p>
                        <p>Tuesday: 8:00AM–6:00PM</p>
                        <p>Wednesday: 8:00AM–6:00PM</p>
                        <p>Thursday: 8:00AM–6:00PM</p>
                        <p>Friday: 8:00AM–2:00PM</p>
                        <p>Saturday: Closed</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact / Quote Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{t('contact.form.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <p className="text-green-600">{t('contact.form.success')}</p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.form.name')}</Label>
                        <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                        <Input id="phone" type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.form.email')}</Label>
                        <Input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">{t('contact.form.color')}</Label>
                        <Input id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="size">{t('contact.form.size')}</Label>
                        <Input id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">{t('contact.form.description')}</Label>
                      <Textarea id="description" name="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-3">
                      <Label>{language === 'fr' ? 'Télécharger des images (optionnel)' : 'Upload Images (Optional)'}</Label>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                      >
                        <input
                          type="file"
                          id="images"
                          name="images"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {language === 'fr' 
                              ? 'Glisser-déposer des images ou cliquer pour sélectionner' 
                              : 'Drag & drop images or click to select'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {language === 'fr' ? `${images.length}/10 images` : `${images.length}/10 images`}
                          </span>
                        </label>
                      </div>

                      {/* Image Preview */}
                      {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`preview ${index}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              <p className="text-xs text-muted-foreground mt-1 truncate">{image.name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                      {submitting ? (language === 'fr' ? 'Envoi…' : 'Sending…') : t('contact.form.submit')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Card className="border-border overflow-hidden">
            <div className="aspect-video">
              <iframe
                title="Google Map - 1420 Boul Hymus, Dorval"
                src="https://www.google.com/maps?q=1420%20Boul%20Hymus%2C%20Dorval%2C%20QC%20H9P%201J6&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
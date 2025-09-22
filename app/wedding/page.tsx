"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import styles from '../../styles/wedding.module.css';

const Wedding: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [guestForm, setGuestForm] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setGuestForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage (MongoDB integration for future)
    localStorage.setItem('weddingGuestResponse', JSON.stringify(guestForm));
    alert('Дякуємо за підтвердження! Ваша відповідь збережена.');
  };

  return (
    <div className={styles.weddingContainer}>
      <div className={styles.ukrainianBg}></div>
      
      {/* Hero Section */}
      <section 
        id="hero" 
        data-animate
        className={`${styles.heroSection} ${visibleSections.has('hero') ? styles.visible : ''}`}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.coupleTitle}>Олександр & Марія</h1>
          <p className={styles.weddingDate}>25 травня 2024</p>
          <div className={styles.ornamentLarge}>🌻 💙 💛 🌻</div>
        </div>
      </section>

      {/* Couple Info */}
      <section 
        id="couple" 
        data-animate
        className={`${styles.section} ${visibleSections.has('couple') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>Наша історія</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.coupleInfo}>
              <div className={styles.brideGroom}>
                <h3>Олександр</h3>
                <p>Син Івана та Ольги Петренків</p>
                <p>Народився в Києві, любить подорожі та фотографію</p>
              </div>
              <div className={styles.heart}>💕</div>
              <div className={styles.brideGroom}>
                <h3>Марія</h3>
                <p>Донька Петра та Наталії Іваненків</p>
                <p>Народилася в Львові, захоплюється музикою та живописом</p>
              </div>
            </div>
            <p className={styles.loveStory}>
              Ми зустрілися 3 роки тому на фестивалі української культури. 
              Наша любов розквітла як весняні квіти, і тепер ми готові почати 
              нове життя разом як одна родина.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Wedding Details */}
      <section 
        id="details" 
        data-animate
        className={`${styles.section} ${visibleSections.has('details') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>Деталі весілля</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.weddingDetails}>
              <div className={styles.detailItem}>
                <h4>📅 Дата</h4>
                <p>Субота, 25 травня 2024 року</p>
              </div>
              <div className={styles.detailItem}>
                <h4>⏰ Час</h4>
                <p>Церемонія: 14:00<br />Банкет: 16:00</p>
              </div>
              <div className={styles.detailItem}>
                <h4>🏛️ Місце церемонії</h4>
                <p>Свято-Михайлівський собор<br />вул. Михайлівська, 7, Київ</p>
              </div>
              <div className={styles.detailItem}>
                <h4>🎉 Місце банкету</h4>
                <p>Ресторан "Українська садиба"<br />вул. Хрещатик, 15, Київ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Guest Form */}
      <section 
        id="rsvp" 
        data-animate
        className={`${styles.section} ${visibleSections.has('rsvp') ? styles.visible : ''}`}
      >
        <Card className={styles.formCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>Підтвердження присутності</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className={styles.guestForm}>
              <div className={styles.formGroup}>
                <Label htmlFor="name">Повне ім'я *</Label>
                <Input
                  id="name"
                  value={guestForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={guestForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label>Чи будете присутні? *</Label>
                <RadioGroup
                  value={guestForm.attendance}
                  onValueChange={(value) => handleInputChange('attendance', value)}
                >
                  <div className={styles.radioItem}>
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Так, обов'язково будемо!</Label>
                  </div>
                  <div className={styles.radioItem}>
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">На жаль, не зможемо прийти</Label>
                  </div>
                </RadioGroup>
              </div>

              {guestForm.attendance === 'yes' && (
                <>
                  <div className={styles.formGroup}>
                    <Label htmlFor="guests">Кількість гостей</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="5"
                      value={guestForm.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <Label htmlFor="dietary">Особливості харчування</Label>
                    <Input
                      id="dietary"
                      placeholder="Вегетаріанство, алергії тощо"
                      value={guestForm.dietary}
                      onChange={(e) => handleInputChange('dietary', e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className={styles.formGroup}>
                <Label htmlFor="message">Побажання молодятам</Label>
                <Textarea
                  id="message"
                  placeholder="Ваші теплі побажання..."
                  value={guestForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <Button type="submit" className={styles.submitButton}>
                Підтвердити присутність
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>З любов'ю, Олександр і Марія 💕</p>
        <div className={styles.ornament}>🌻 💙 💛 🌻</div>
      </footer>
    </div>
  );
};

export default Wedding;
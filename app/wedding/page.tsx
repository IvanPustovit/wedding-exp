"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import styles from '../../styles/wedding.module.css';
import Countdown from '@/components/Countdown';
import LocationMap from '@/components/LocationMap';
import Calendar from '@/components/Calendar';

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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id;
          setVisibleSections(prev => new Set(prev).add(id));
        }
      });
    }, { threshold: 0.15 });

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((s) => observer.observe(s));

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
    <div className={styles.weddingContainerLiner}></div>
      <div className={styles.ukrainianBg}></div>
      
      {/* Hero Section */}
      {/* <section 
        id="hero" 
        data-animate
        className={`${styles.heroSection} ${visibleSections.has('hero') ? styles.visible : ''}`}
      >
        <div className={styles.heroContent}>
          <div className={styles.sectionContent}>
            <h1 className={styles.coupleTitle}>Микола </h1>
            <p className={styles.weddingDate}>------та------</p>
            <h1 className={styles.coupleTitle}> Ольга</h1>
           
            <div className={styles.ornamentLarge}>🌻 💙 💛 🌻</div>
            
          </div>
        </div>
      </section> */}

      {/* Couple Info */}
      <section 
        id="couple" 
        data-animate
        className={`${styles.section} ${visibleSections.has('couple') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>Дорогі наші!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.sectionContent}>            
              
              <p className={styles.loveStory}>
                У житті трапляються моменти, які хочеться розділити з тими хто по справжньому важливий. Для нас таким моментом стане день коли ми станемо чоловіком та дружиною, запрошуємо Вас стати частиною початку нашої сімейної історії.
              </p>
            </div>
          </CardContent>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
              <Calendar year={2025} month={11} highlightedDay={1} />
            </div>
            <div>
      <p className={styles.weddingDate}>До весілля залишилося</p>
            <Countdown targetDate={'2025-11-01T00:00:00'} />
      </div>
        </Card>
      </section>

      <section 
        id="couple" 
        data-animate
        className={`${styles.section} ${visibleSections.has('couple') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}> 🏛️ Місце проведення</CardTitle>
            <div className={styles.detailItem}>
                  <h4>Готельно-ресторанний комплекс "VinoGrad</h4>
                  <p>Місто Гайсин<br />проспект Житній, 1</p>
                </div>
          </CardHeader>
          <div >
          <img src="/vinograd.jpg" alt="Місце проведення весілля" className={styles.venueImage} /></div>
          <CardContent>
            <div className={styles.sectionContent}>            
              <LocationMap address={`48.80427465487786, 29.41383327459868`} label={`Місце святкування: м.Гайсин`} />
            </div>
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
            <CardTitle className={styles.sectionTitle}>Програма дня</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.sectionContent}>
              <div className={styles.weddingDetails}>
              <div>
              <img src="/zbir.jpg" alt="Збір гостей" className={styles.weddingDetailsImg} />
                <div className={styles.detailItem}>
                  <h4>13:00</h4>
                  <p>Збір гостей</p>
                </div></div>
                <div>
              <img src="/zbir.jpg" alt="Збір гостей" className={styles.weddingDetailsImg} />
                <div className={styles.detailItem}>
                  <h4>14:00</h4>
                  <p>Церемонія</p>
                </div></div>
                <div>
              <img src="/zbir.jpg" alt="Збір гостей" className={styles.weddingDetailsImg} />
                <div className={styles.detailItem}>
                  <h4>15:00</h4>
                  <p>Банкет</p>
                </div></div>
                {/* <div className={styles.detailItem}>
                  <h4>🎉 Місце банкету</h4>
                  <p>Ресторан "Українська садиба"<br />вул. Хрещатик, 15, Київ</p>
                </div> */}
              </div>
              
            </div>
          </CardContent>
        </Card>
      </section>

      <section 
        id="details" 
        data-animate
        className={`${styles.section} ${visibleSections.has('details') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>Дрескод</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.sectionContent}>
              <div className={styles.weddingDetails}>
                <div className={styles.detailItem}>                  
                  <p>Нам буде приємно, якщо Ви підтримаєте етнічну атмосферу нашого свята та одягнете вишите вбрання. <br/> Збережемо наші традиції разом! </p>
                </div>
                <div className={styles.detailItem}>
                  <h4>Побажання</h4>
                  <p>Просимо Вас не дарувати нам квіти, адже ми не встигнемо насолодитися їхньою красою, але ви можете доповнити пляшечкою міцного алкоголю, нашу домашньої колекції!</p>
                  <p>Ми дуже цінуємо вашу турботу та увагу, щоб наші руки були вільні для обіймів, <br/>будемо раді легким подарункам у конвертах</p>
                </div>
                
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
            <CardTitle className={styles.sectionTitle}>Будь ласка, підтвердіть вашу присутність до 15.10.2025р</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.sectionContent}>
              <form onSubmit={handleSubmit} className={styles.guestForm}>
                <div className={styles.formGroup}>
                  <Label htmlFor="name">Прізвище та ім'я *</Label>
                  <Input
                    id="name"
                    value={guestForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>            

                <div className={styles.formGroup}>
                  <Label>Чи можете ви бути присутні? *</Label>
                  <RadioGroup
                    value={guestForm.attendance}
                    onValueChange={(value) => handleInputChange('attendance', value)}
                  >
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">я буду присутній</Label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">я не зможемо бути присутнім</Label>
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
                  <Label>З чиєї ви сторони?</Label>
                  <RadioGroup
                    value={guestForm.attendance}
                    onValueChange={(value) => handleInputChange('attendance', value)}
                  >
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">сторона нареченого</Label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">сторона нареченої</Label>
                    </div>
                  </RadioGroup>
                </div>
                  </>
                )}

                {/* <div className={styles.formGroup}>
                  <p >* Прохання не пересилати посилання друзям та знайомим, це лише індивідуально для Вас.</p>
                  <Textarea
                    id="message"
                    placeholder="Ваші теплі побажання..."
                    value={guestForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div> */}

                <Button type="submit" className={styles.submitButton}>
                  Підтвердити присутність
                </Button>
              </form>
            </div>
            <div className={styles.formGroup}>
                  <p >* Прохання не пересилати посилання друзям та знайомим, це лише індивідуально для Вас.</p>
                  {/* <Textarea
                    id="message"
                    placeholder="Ваші теплі побажання..."
                    value={guestForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  /> */}
                </div>
          </CardContent>
        <div className={styles.detailItem}>
          <p>З нетерпінням чекаємо Вас! <br/> Ваші Оля та Коля 💕</p>
          <div className={styles.ornament}>🌻 💙 💛 🌻</div>
        </div>
        </Card>
      </section>

      {/* Footer */}
      {/* <footer className={styles.footer}>
  <div className={styles.sectionContent}>
          <p>З нетерпінням чекаємо Вас! <br/> Ваші Оля та Коля 💕</p>
          <div className={styles.ornament}>🌻 💙 💛 🌻</div>
        </div>
      </footer> */}
    </div>
  );
};

export default Wedding;
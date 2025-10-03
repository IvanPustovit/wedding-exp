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
import Image from 'next/image';

const Wedding: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [guestForm, setGuestForm] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',    
    guests: '',
    dietary: '',
    message: '',
    whoIs: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(id));
        } else {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }
      });
    }, { threshold: 0.05 });

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setGuestForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guestForm),
    });
    if (res.ok) alert('Дякуємо за підтвердження!');
  };

  const renderAnimatedText = (text: string, delay: number = 50) => {
    const parts = text.split('<br/>');
    let wordCount = 0;

    return parts.map((part, partIndex) => (
      <React.Fragment key={partIndex}>
        {part.match(/(\S+)|(\s+)/g)?.map((chunk, index) => {
          if (chunk.trim() === '') {
            return <React.Fragment key={index}>{chunk}</React.Fragment>;
          } else {
            const currentWordIndex = wordCount;
            wordCount++;
            return (
              <span key={index} style={{ transitionDelay: `${currentWordIndex * delay}ms` }}>
                {chunk}
              </span>
            );
          }
        })}
        {partIndex < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.weddingContainer}>
    <div className={styles.weddingContainerLiner}></div>
      <div className={styles.ukrainianBg}></div>

      {/* Couple Info */}
      <section 
        id="couple-info" 
        data-animate
        className={`${styles.section} ${visibleSections.has('couple-info') ? styles.visible : ''}`}
      >
        <Card className={`${styles.infoCard} ` }>
        <div className={styles.coupleInfoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>{renderAnimatedText("Дорогі наші!")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.sectionContent}>            
             <img src="/loveStory.jpeg" alt="Love Story" className={styles.loveStoryImg} />
              <p className={styles.loveStory}>
                {renderAnimatedText("У житті трапляються моменти, які хочеться розділити з тими, хто по-справжньому важливий. Для нас таким моментом стане день, коли ми станемо чоловіком і дружиною. Запрошуємо вас стати частиною початку нашої сімейної історії!")}
              </p>
            </div>
          </CardContent>
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
              <Calendar year={2025} month={11} highlightedDay={1} isVisible={visibleSections.has('couple-info')} />
            </div>
            <div>
      <p className={styles.weddingDate}>{renderAnimatedText("До весілля залишилося")}</p>
            <Countdown targetDate={'2025-11-01T00:00:00'} />
      </div>
        </Card>
      </section>

      <section 
        id="place" 
        data-animate
        className={`${styles.section} ${styles.place} ${visibleSections.has('place') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <div className={styles.sectionContent}>
              <CardTitle className={`${styles.sectionTitle} ${styles.placeTitle}`}>{renderAnimatedText("Місце проведення")}</CardTitle>
              <img src="/place1.jpeg" alt="Місце святкування" className={styles.locationImg} />
              <div className={`${styles.detailItem} ${styles.locationDetails}`}>
                    <h4>{renderAnimatedText("Готельно-ресторанний комплекс \"VinoGrad\"")}</h4>
                    <p>{renderAnimatedText("Місто Гайсин, проспект Житній, 1")}</p>
                  </div>
          
            <div className={`${styles.sectionContent} ${styles.mapSection}`}>            
              <LocationMap address={`48.80427465487786, 29.41383327459868`} label={`Місце святкування: м.Гайсин`} />
            </div>
                
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Wedding Details */}
      <section 
        id="schedule" 
        data-animate
        className={`${styles.section} ${visibleSections.has('schedule') ? styles.visible : ''}`}
      >
        <Card className={styles.infoCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>{renderAnimatedText("Програма дня")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${styles.sectionContent} ${styles.weddingDetails}`}>
            <img src="/program.jpeg" alt="Програма дня" className={styles.programDetailItem} />
                              
                <div className={styles.programDetailItemZbir}>
                  <h4>{renderAnimatedText("13:00")}</h4>
                  <p>{renderAnimatedText("Збір гостей")}</p>
                </div>
               
                <div className={styles.programDetailItemProcesia}>
                  <h4>{renderAnimatedText("14:00")}</h4>
                  <p>{renderAnimatedText("Церемонія")}</p>
                </div>
              
             
                <div className={styles.programDetailItemBanket}>
                  <h4>{renderAnimatedText("15:00")}</h4>
                  <p>{renderAnimatedText("Банкет")}</p>
                </div>

                <div className={styles.programDetailItemEnd}>
                  <h4>{renderAnimatedText("22:00")}</h4>
                  <p>{renderAnimatedText("Завершення свята")}</p>
                </div>
              
            </div>
          </CardContent>
        </Card>
      </section>

      <section 
        id="dresscode" 
        data-animate
        className={`${styles.section} ${styles.dresscode} ${visibleSections.has('dresscode') ? styles.visible : ''}`}
      >
        <Card className={`${styles.infoCard} `}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>{renderAnimatedText("Дрескод")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.sectionContent}>
                 <img src="/drescode.jpg" alt="Dresscode" className={styles.dresscodeImg} />              
                  <p className={styles.dresscodeText}>
                    {renderAnimatedText("Нам буде приємно, якщо ви підтримаєте етнічну атмосферу нашого свята та одягнете вишите вбрання. Збережімо наші традиції разом! ")}
                  </p>
              
             
            </div>
          </CardContent>
        </Card>
      </section>

      <section  id="desire" 
        data-animate
        className={`${styles.section} ${styles.desire} ${visibleSections.has('desire') ? styles.visible : ''}`}>
                <CardContent>
                <div className={`${styles.detailItem} ${styles.desireDetails}` }>
                  <h4>{renderAnimatedText("Побажання")}</h4>
                  <p>
                    {renderAnimatedText("Просимо не дарувати нам квіти, адже ми не встигнемо насолодитися їхньою красою. Але ви можете поповнити нашу домашню колекцію пляшечкою міцного алкоголю. ")}
                  </p>
                  <p>
                    {renderAnimatedText("Ми дуже цінуємо вашу турботу й увагу. Щоб наші руки були вільні для обіймів, будемо раді легким подарункам у конвертах :)")}
                  </p>
                </div></CardContent></section>

      {/* Guest Form */}
      <section 
        id="rsvp" 
        data-animate
        className={`${styles.section} ${visibleSections.has('rsvp') ? styles.visible : ''}`}
      >
        <Card className={styles.formCard}>
          <CardHeader>
            <CardTitle className={styles.sectionTitle}>{renderAnimatedText("Будь ласка, підтвердіть вашу присутність до 15.10.2025р")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${styles.sectionContent} ${styles.guestFormSection}`}>
              <form onSubmit={handleSubmit} className={styles.guestForm}>
                <div className={styles.formGroup}>
                  <Label htmlFor="name">{renderAnimatedText("Прізвище та ім'я *")}</Label>
                  <Input
                    id="name"
                    value={guestForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>            

                <div className={styles.formGroup}>
                  <Label>{renderAnimatedText("Чи можете ви бути присутні? *")}</Label>
                  <RadioGroup
                    value={guestForm.attendance}
                    onValueChange={(value) => handleInputChange('attendance', value)}
                  >
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">{renderAnimatedText("Так буду!")}</Label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="yes+" id="yes+" />
                      <Label htmlFor="yes+">{renderAnimatedText("Так буду+1")}</Label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">{renderAnimatedText("Не зможу")}</Label>
                    </div>
                  </RadioGroup>
                
                </div>

                {guestForm.attendance === 'yes+' && (
                  
                    <div className={styles.formGroup}>
                      <Label htmlFor="guests">{renderAnimatedText("З ким ви будете? (ім’я супутника/дітей)")}</Label>
                      <Input
                        id="guests"                        
                        value={guestForm.guests}
                        onChange={(e) => handleInputChange('guests', e.target.value)}
                      />
                    </div>)
                    }

                  { guestForm.attendance === 'yes' && (
                  <>
               <div className={styles.formGroup}>
                  <Label>{renderAnimatedText("З чиєї ви сторони?")}</Label>
                  <RadioGroup
                    value={guestForm.whoIs}
                    onValueChange={(value) => handleInputChange('whoIs', value)}
                  >
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="man" id="man" />
                      <Label htmlFor="man">{renderAnimatedText("сторона нареченого")}</Label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">{renderAnimatedText("сторона нареченої")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                  </>
                )}

                { guestForm.attendance === 'yes+' && (
                  <>
               <div className={styles.formGroup}>
                  <Label>{renderAnimatedText("З чиєї ви сторони?")}</Label>
                  <RadioGroup
                    value={guestForm.whoIs}
                    onValueChange={(value) => handleInputChange('whoIs', value)}
                  >
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="man" id="man" />
                      <Label htmlFor="man">{renderAnimatedText("сторона нареченого")}</Label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">{renderAnimatedText("сторона нареченої")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                  </>
                )}

                <Button type="submit" className={styles.submitButton}>
                  {renderAnimatedText("Підтвердити присутність")}
                </Button>
              </form>
            </div>
            <div className={styles.formGroup}>
                  <p >{renderAnimatedText("* Прохання не пересилати посилання друзям та знайомим, це лише індивідуально для Вас.")}</p>
                </div>
          </CardContent>
        <div className={`{styles.detailItem} ${styles.finalText}` }>
          <p>{renderAnimatedText("З нетерпінням чекаємо Вас! <br/> Ваші Оля та Коля ")}</p>
          {/* <div className={styles.ornament}>🌻 💙 💛 🌻</div> */}
        </div>
        </Card>
      </section>

    </div>
  );
};

export default Wedding;

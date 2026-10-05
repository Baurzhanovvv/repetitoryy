/** Фиксированные тексты интерфейса на трёх языках. Контент секций — в content/*.json. */

export type Locale = 'ru' | 'kk' | 'en';

export const LOCALES: Locale[] = ['ru', 'kk', 'en'];
export const LOCALE_LABEL: Record<Locale, string> = { ru: 'RU', kk: 'ҚАЗ', en: 'EN' };

export interface UiStrings {
  metaTitle: string;
  metaDescription: string;
  brandSub: string;
  nav: { about: string; teachers: string; results: string; pricing: string; reviews: string; signUp: string; signUpFree: string; home: string; menu: string };
  contact: {
    whatsapp: string;
    call: string;
    or: string;
    parentsOnly: string;
    cardTitle: string;
    cardSubtitle: string;
    lastStep: string;
    orWriteUs: string;
    waText: { english: string; kazakh: string; general: string };
  };
  sections: { faq: string; reviews: string; step: string; parentReview: string; prevStory: string; nextStory: string; mostPopular: string; startLearning: string; viewProgram: string; ctaBanner: string };
  footer: { navigation: string; contacts: string; rights: string; privacy: string; offer: string };
  lang: { label: string };
}

export const UI: Record<Locale, UiStrings> = {
  ru: {
    metaTitle: 'Репетитор Рядом — онлайн-школа английского и казахского',
    metaDescription: 'Индивидуальные онлайн-занятия английским и казахским для детей 10–17 лет. Запись на пробный урок — через родителей, в WhatsApp.',
    brandSub: 'Онлайн школа',
    nav: { about: 'О школе', teachers: 'Преподаватели', results: 'Результаты', pricing: 'Цены', reviews: 'Отзывы', signUp: 'Записаться', signUpFree: 'Записаться на пробный урок', home: 'На главную', menu: 'Меню' },
    contact: {
      whatsapp: 'Написать в WhatsApp',
      call: 'Позвонить',
      or: 'или',
      parentsOnly: 'Запись на пробный урок — только через родителей. Заявки от детей мы не принимаем.',
      cardTitle: 'Запишите ребёнка на пробный урок',
      cardSubtitle: 'Родитель, напишите нам в WhatsApp или позвоните — ответим в течение 15 минут и подберём время.',
      lastStep: 'Последний шаг',
      orWriteUs: 'Или позвоните:',
      waText: {
        english: 'Здравствуйте! Я родитель, хочу записать ребёнка на пробный урок английского.',
        kazakh: 'Здравствуйте! Я родитель, хочу записать ребёнка на пробный урок казахского.',
        general: 'Здравствуйте! Я родитель, хочу записать ребёнка на пробный урок.',
      },
    },
    sections: { faq: 'Вопросы', reviews: 'Отзывы', step: 'ШАГ', parentReview: '— отзыв родителя', prevStory: 'Предыдущая история', nextStory: 'Следующая история', mostPopular: 'ЧАЩЕ ВСЕГО БЕРУТ', startLearning: 'Начать обучение', viewProgram: 'Смотреть программу →', ctaBanner: 'Мы регулярно справляемся с этими проблемами и знаем, как их решать' },
    footer: { navigation: 'Навигация', contacts: 'Контакты', rights: 'Все права защищены.', privacy: 'Политика конфиденциальности', offer: 'Договор оферты' },
    lang: { label: 'Язык сайта' },
  },
  kk: {
    metaTitle: 'Репетитор Рядом — ағылшын және қазақ тілінің онлайн-мектебі',
    metaDescription: '10–17 жастағы балаларға ағылшын және қазақ тілінен жеке онлайн-сабақтар. Алғашқы тегін сабаққа тек ата-аналар арқылы, WhatsApp-та жазылуға болады.',
    brandSub: 'Онлайн мектеп',
    nav: { about: 'Мектеп туралы', teachers: 'Мұғалімдер', results: 'Нәтижелер', pricing: 'Бағалар', reviews: 'Пікірлер', signUp: 'Жазылу', signUpFree: 'Алғашқы тегін сабаққа жазылу', home: 'Басты бет', menu: 'Мәзір' },
    contact: {
      whatsapp: 'WhatsApp-қа жазу',
      call: 'Қоңырау шалу',
      or: 'немесе',
      parentsOnly: 'Алғашқы тегін сабаққа тек ата-аналар арқылы жазылу керек. Балаларды тікелей қабылдамаймыз.',
      cardTitle: 'Балаңызды алғашқы тегін сабаққа жазыңыз',
      cardSubtitle: 'Ата-ана, бізге WhatsApp-қа жазыңыз немесе қоңырау шалыңыз — 15 минут ішінде жауап беріп, ыңғайлы уақытты келісеміз.',
      lastStep: 'Соңғы қадам',
      orWriteUs: 'Немесе қоңырау шалыңыз:',
      waText: {
        english: 'Сәлеметсіз бе! Мен ата-анамын, баламды ағылшын тілінің алғашқы тегін сабағына жазғым келеді.',
        kazakh: 'Сәлеметсіз бе! Мен ата-анамын, баламды қазақ тілінің алғашқы тегін сабағына жазғым келеді.',
        general: 'Сәлеметсіз бе! Мен ата-анамын, баламды алғашқы тегін сабаққа жазғым келеді.',
      },
    },
    sections: { faq: 'Сұрақтар', reviews: 'Пікірлер', step: 'ҚАДАМ', parentReview: '— ата-ананың пікірі', prevStory: 'Алдыңғы оқиға', nextStory: 'Келесі оқиға', mostPopular: 'ЕҢ КӨП ТАҢДАЙДЫ', startLearning: 'Оқуды бастау', viewProgram: 'Бағдарламаны көру →', ctaBanner: 'Біз осы мәселелерді үнемі шешеміз және қалай шешуді білеміз' },
    footer: { navigation: 'Навигация', contacts: 'Байланыс', rights: 'Барлық құқықтар қорғалған.', privacy: 'Құпиялылық саясаты', offer: 'Оферта шарты' },
    lang: { label: 'Сайт тілі' },
  },
  en: {
    metaTitle: 'Repetitor Ryadom — online school of English and Kazakh',
    metaDescription: 'One-to-one online English and Kazakh lessons for kids aged 10–17. Trial lessons are booked by parents via WhatsApp.',
    brandSub: 'Online school',
    nav: { about: 'About', teachers: 'Teachers', results: 'Results', pricing: 'Pricing', reviews: 'Reviews', signUp: 'Book a lesson', signUpFree: 'Book a trial lesson', home: 'Home', menu: 'Menu' },
    contact: {
      whatsapp: 'Message on WhatsApp',
      call: 'Call us',
      or: 'or',
      parentsOnly: 'Trial lessons are booked by parents only. We do not accept requests from children.',
      cardTitle: 'Book a trial lesson for your child',
      cardSubtitle: 'Parents, message us on WhatsApp or call — we reply within 15 minutes and find a convenient time.',
      lastStep: 'Last step',
      orWriteUs: 'Or call us:',
      waText: {
        english: 'Hello! I am a parent and would like to book a trial English lesson for my child.',
        kazakh: 'Hello! I am a parent and would like to book a trial Kazakh lesson for my child.',
        general: 'Hello! I am a parent and would like to book a trial lesson for my child.',
      },
    },
    sections: { faq: 'Questions', reviews: 'Reviews', step: 'STEP', parentReview: "— parent's review", prevStory: 'Previous story', nextStory: 'Next story', mostPopular: 'MOST POPULAR', startLearning: 'Start learning', viewProgram: 'View the programme →', ctaBanner: 'We solve these problems regularly and know how to deal with them' },
    footer: { navigation: 'Navigation', contacts: 'Contacts', rights: 'All rights reserved.', privacy: 'Privacy policy', offer: 'Public offer' },
    lang: { label: 'Site language' },
  },
};

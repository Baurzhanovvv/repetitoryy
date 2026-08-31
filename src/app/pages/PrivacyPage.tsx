import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

export function PrivacyPage() {
  const updated = "31 августа 2026 года";

  useEffect(() => {
    const previous = document.title;
    document.title = "Политика конфиденциальности — Репетитор Рядом";
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Шапка */}
      <header className="border-b border-[#DCE1ED]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <Link
            to="/"
            className="text-[#1E45B8] text-[15px] font-semibold hover:underline"
            style={{ fontFamily: 'Onest, sans-serif' }}
          >
            На главную
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[68ch]">
          <h1
            className="text-[#101A2E] text-[30px] md:text-[40px] font-extrabold tracking-[-0.02em] leading-tight text-balance"
            style={{ fontFamily: 'Onest, sans-serif' }}
          >
            Политика конфиденциальности
          </h1>
          <p className="text-[#5A6480] text-[15px] mt-3">Обновлено: {updated}</p>

          <div className="mt-8 space-y-8 text-[#3E4A66] text-[16.5px] leading-relaxed">
            <section>
              <p>
                Эта политика объясняет, какие данные собирает сайт repetitoryadom.kz, зачем они нужны
                и что вы можете с ними сделать. Оставляя заявку, вы соглашаетесь с описанным ниже.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Кто обрабатывает данные
              </h2>
              <p>
                Онлайн-школа «Репетитор Рядом», Алматы, Казахстан. Связаться можно по телефону{' '}
                <a href="tel:+77475252582" className="text-[#1E45B8] hover:underline">+7 (747) 525-25-82</a>{' '}
                или в{' '}
                <a href="https://wa.me/77475252582" target="_blank" rel="noopener noreferrer" className="text-[#1E45B8] hover:underline">WhatsApp</a>.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Какие данные мы собираем
              </h2>
              <p className="mb-3">Через форму записи на пробный урок:</p>
              <ul className="space-y-2 mb-4">
                {[
                  'имя ребёнка',
                  'возраст ребёнка',
                  'номер телефона родителя',
                  'удобное время для звонка — если вы его указали'
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-[#B8C1D6]">—</span>{item}
                  </li>
                ))}
              </ul>
              <p>
                Мы не запрашиваем адрес проживания, документы, данные банковских карт и не собираем
                никаких данных о ребёнке помимо перечисленных.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Зачем они нужны
              </h2>
              <p>
                Только чтобы связаться с вами, согласовать время бесплатного пробного урока и подобрать
                преподавателя. Мы не продаём и не передаём эти данные третьим лицам в рекламных целях.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Куда попадает заявка
              </h2>
              <p>
                Отправленная форма приходит в наш внутренний рабочий чат в мессенджере Telegram, доступ
                к которому есть только у сотрудников школы. Telegram при этом выступает каналом передачи
                сообщения и обрабатывает его на своих серверах в соответствии со своими правилами.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Файлы cookie и статистика
              </h2>
              <p>
                На сайте установлен Google Tag Manager, через который работают сервисы аналитики и рекламы
                Google. Они используют файлы cookie и собирают обезличенные данные о посещении: страницы,
                время визита, источник перехода, тип устройства. Эти данные не позволяют установить вашу
                личность. Отключить cookie можно в настройках браузера — на работу форм это не повлияет.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Сколько мы храним данные
              </h2>
              <p>
                Заявки хранятся, пока они нужны для работы с вами, и до тех пор, пока вы не попросите их
                удалить. По вашему обращению мы удаляем данные и прекращаем обработку.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Ваши права
              </h2>
              <p className="mb-3">Вы в любой момент можете:</p>
              <ul className="space-y-2 mb-4">
                {[
                  'узнать, какие ваши данные у нас есть',
                  'попросить исправить неточные данные',
                  'отозвать согласие и потребовать удалить данные'
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-[#B8C1D6]">—</span>{item}
                  </li>
                ))}
              </ul>
              <p>
                Для этого достаточно написать нам в{' '}
                <a href="https://wa.me/77475252582" target="_blank" rel="noopener noreferrer" className="text-[#1E45B8] hover:underline">WhatsApp</a>{' '}
                или позвонить по{' '}
                <a href="tel:+77475252582" className="text-[#1E45B8] hover:underline">+7 (747) 525-25-82</a>.
                Мы отвечаем на такие обращения в течение трёх рабочих дней.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Данные детей
              </h2>
              <p>
                Форму заполняет родитель или законный представитель ребёнка — именно он даёт согласие на
                обработку указанных в заявке данных. Мы не собираем данные детей напрямую и не предлагаем
                детям заполнять формы самостоятельно.
              </p>
            </section>

            <section>
              <h2 className="text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3" style={{ fontFamily: 'Onest, sans-serif' }}>
                Изменения
              </h2>
              <p>
                Если политика изменится, мы обновим её на этой странице и поменяем дату вверху.
                Обработка персональных данных ведётся в соответствии с законодательством Республики
                Казахстан, включая закон «О персональных данных и их защите».
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#DCE1ED]">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#1E45B8] font-semibold hover:underline"
              style={{ fontFamily: 'Onest, sans-serif' }}
            >
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

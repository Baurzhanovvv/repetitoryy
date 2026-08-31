import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

export function OfferPage() {
  const updated = "31 августа 2026 года";

  useEffect(() => {
    const previous = document.title;
    document.title = "Договор оферты — Репетитор Рядом";
    return () => { document.title = previous; };
  }, []);

  const h2 = "text-[#101A2E] text-[22px] font-bold tracking-[-0.01em] mb-3";
  const font = { fontFamily: 'Onest, sans-serif' };

  const plans = [
    { name: "Старт", lessons: "8 занятий", price: "52 000 ₸", term: "1 месяц" },
    { name: "Оптимум", lessons: "24 занятия", price: "138 000 ₸", term: "3 месяца" },
    { name: "Максимум", lessons: "48 занятий", price: "240 000 ₸", term: "6 месяцев" }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <header className="border-b border-[#DCE1ED]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <Link to="/" className="text-[#1E45B8] text-[15px] font-semibold hover:underline" style={font}>
            На главную
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[68ch]">
          <h1
            className="text-[#101A2E] text-[30px] md:text-[40px] font-extrabold tracking-[-0.02em] leading-tight text-balance"
            style={font}
          >
            Публичная оферта на оказание образовательных услуг
          </h1>
          <p className="text-[#5A6480] text-[15px] mt-3">Обновлено: {updated}</p>

          <div className="mt-8 space-y-8 text-[#3E4A66] text-[16.5px] leading-relaxed">
            <section>
              <p>
                Этот документ — официальное предложение онлайн-школы «Репетитор Рядом» заключить договор
                на оказание образовательных услуг. Оплачивая абонемент, вы принимаете условия, изложенные
                ниже, полностью и без оговорок.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>1. Стороны</h2>
              <p>
                <strong className="text-[#101A2E]">Исполнитель</strong> — онлайн-школа «Репетитор Рядом»,
                Алматы, Республика Казахстан. Телефон и WhatsApp:{' '}
                <a href="tel:+77475252582" className="text-[#1E45B8] hover:underline">+7 (747) 525-25-82</a>.
              </p>
              <p className="mt-3">
                <strong className="text-[#101A2E]">Заказчик</strong> — родитель или законный представитель
                ребёнка, оставивший заявку и оплативший абонемент.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>2. Предмет договора</h2>
              <p>
                Исполнитель проводит индивидуальные онлайн-занятия английским или казахским языком для детей
                10–17 лет. Занятия проходят один на один с преподавателем в сервисе Google Meet.
                Продолжительность занятия — от 45 до 60 минут.
              </p>
              <p className="mt-3">В стоимость любого абонемента входит:</p>
              <ul className="space-y-2 mt-3">
                {[
                  'индивидуальные занятия 45–60 минут',
                  'персональная программа обучения',
                  'домашние задания и их проверка',
                  'ежемесячный отчёт о прогрессе для родителя',
                  'возможность заморозки до 2 недель'
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-[#B8C1D6]">—</span>{item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={h2} style={font}>3. Как начинается обучение</h2>
              <p>
                Заказчик оставляет заявку на сайте или пишет в WhatsApp. Исполнитель связывается,
                проводит <strong className="text-[#101A2E]">бесплатный пробный урок</strong>, знакомится с
                ребёнком, определяет уровень и подбирает преподавателя. Пробный урок ни к чему не обязывает:
                если после него заниматься не захотелось, Заказчик ничего не платит.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>4. Стоимость и оплата</h2>
              <p className="mb-4">Обучение продаётся абонементами:</p>
              <div className="overflow-x-auto -mx-4 px-4">
                <table className="w-full text-[15.5px] border-collapse">
                  <thead>
                    <tr className="text-left text-[#101A2E]" style={font}>
                      <th className="border-b border-[#DCE1ED] pb-2 pr-4 font-semibold">Абонемент</th>
                      <th className="border-b border-[#DCE1ED] pb-2 pr-4 font-semibold">Занятий</th>
                      <th className="border-b border-[#DCE1ED] pb-2 pr-4 font-semibold">Стоимость</th>
                      <th className="border-b border-[#DCE1ED] pb-2 font-semibold">Срок</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((p) => (
                      <tr key={p.name}>
                        <td className="border-b border-[#DCE1ED] py-2.5 pr-4">{p.name}</td>
                        <td className="border-b border-[#DCE1ED] py-2.5 pr-4">{p.lessons}</td>
                        <td className="border-b border-[#DCE1ED] py-2.5 pr-4 tabular-nums">{p.price}</td>
                        <td className="border-b border-[#DCE1ED] py-2.5">{p.term}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Абонемент оплачивается целиком до начала занятий. Принимаются карты Visa и Mastercard,
                Kaspi и банковский перевод. Актуальные цены и действующие акции публикуются на сайте;
                для уже оплаченного абонемента стоимость не меняется.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>5. Расписание, переносы и пропуски</h2>
              <p>
                Время занятий стороны согласовывают заранее. Если занятие нужно перенести, Заказчик
                предупреждает <strong className="text-[#101A2E]">не позднее чем за 24 часа</strong> — тогда
                занятие переносится без потери. Если предупреждения не было, занятие считается проведённым
                и списывается с абонемента.
              </p>
              <p className="mt-3">
                Если занятие не состоялось по вине Исполнителя, оно переносится на удобное Заказчику время
                и с абонемента не списывается.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>6. Заморозка абонемента</h2>
              <p>
                Абонемент можно заморозить на срок <strong className="text-[#101A2E]">до 2 недель</strong> за
                период его действия — на время болезни, отпуска или отъезда. О заморозке нужно предупредить
                за 2 дня. На время заморозки срок действия абонемента продлевается.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>7. Замена преподавателя</h2>
              <p>
                Если преподаватель не подошёл, Заказчик может попросить замену в любой момент. Исполнитель
                подбирает другого педагога бесплатно, оплаченные занятия при этом сохраняются.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>8. Что нужно от Заказчика</h2>
              <p>
                Для занятий нужен компьютер, ноутбук или планшет с камерой и микрофоном и стабильный
                интернет. Google Meet помогаем установить на пробном уроке. Заказчик обеспечивает ребёнку
                возможность заниматься в спокойной обстановке и вовремя выходить на связь.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>9. О результате обучения</h2>
              <p>
                Исполнитель обязуется качественно проводить занятия, вести персональную программу и
                отчитываться о прогрессе. При этом результат обучения зависит и от самого ученика — от
                регулярности занятий и выполнения домашних заданий, поэтому Исполнитель не гарантирует
                достижения конкретного уровня языка или конкретного балла на экзамене к определённой дате.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>10. Прекращение занятий</h2>
              <p>
                Заказчик вправе прекратить обучение в любой момент, сообщив об этом Исполнителю по телефону
                или в WhatsApp. Порядок расчётов по неиспользованным занятиям стороны согласовывают
                индивидуально при обращении.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>11. Персональные данные</h2>
              <p>
                Данные, оставленные в заявке, обрабатываются в соответствии с{' '}
                <Link to="/privacy" className="text-[#1E45B8] hover:underline">политикой конфиденциальности</Link>.
                Оставляя заявку, Заказчик подтверждает согласие на обработку указанных в ней данных.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>12. Изменение условий</h2>
              <p>
                Исполнитель может изменить условия оферты, опубликовав новую редакцию на этой странице
                с указанием даты обновления. К уже оплаченным абонементам применяются условия, действовавшие
                на момент оплаты. Отношения сторон регулируются законодательством Республики Казахстан.
              </p>
            </section>

            <section>
              <h2 className={h2} style={font}>13. Контакты</h2>
              <p>
                Телефон и WhatsApp:{' '}
                <a href="tel:+77475252582" className="text-[#1E45B8] hover:underline">+7 (747) 525-25-82</a>.
                Написать в{' '}
                <a href="https://wa.me/77475252582" target="_blank" rel="noopener noreferrer" className="text-[#1E45B8] hover:underline">WhatsApp</a>.
                Алматы, Республика Казахстан.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#DCE1ED]">
            <Link to="/" className="inline-flex items-center gap-2 text-[#1E45B8] font-semibold hover:underline" style={font}>
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

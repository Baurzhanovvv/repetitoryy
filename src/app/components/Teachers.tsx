import { useContent } from "../content/ContentProvider";

export function Teachers() {
  const content = useContent().teachers;
  const teachers = content.items;

  return (
    <section className="py-14 md:py-20 bg-white border-t border-[#DCE1ED]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[34em] mb-10 md:mb-12">
          <div className="text-[#1E45B8] text-xs font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.eyebrow}
          </div>
          <h2 className="text-[#101A2E] text-[27px] md:text-[36px] font-bold tracking-[-0.02em] mt-2.5 mb-3 text-balance" style={{ fontFamily: 'Onest, sans-serif' }}>
            {content.title}
          </h2>
          <p className="text-[#5A6480] text-[17px] md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <ul className="max-w-[880px] border-t border-[#DCE1ED]">
          {teachers.map((teacher, index) => (
            <li
              key={index}
              className="grid grid-cols-[52px_1fr] md:grid-cols-[64px_1fr] gap-4 md:gap-6 py-6 md:py-7 border-b border-[#DCE1ED] group"
            >
              {/* Аватар с инициалом — без фотографий */}
              <div
                className="w-[52px] h-[52px] md:w-16 md:h-16 rounded-2xl bg-[#E8EDFB] text-[#1E45B8] flex items-center justify-center text-[22px] md:text-[26px] font-extrabold select-none transition-colors duration-200 group-hover:bg-[#1E45B8] group-hover:text-white"
                style={{ fontFamily: 'Onest, sans-serif' }}
                aria-hidden="true"
              >
                {teacher.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[#101A2E] text-xl md:text-[22px] font-bold tracking-[-0.01em]" style={{ fontFamily: 'Onest, sans-serif' }}>
                    {teacher.name}
                  </span>
                  <span className="text-[#5A6480] text-[15px]">{teacher.role}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2.5">
                  {teacher.facts.map((fact, i) => (
                    <span
                      key={i}
                      className="text-[#3E4A66] text-[13.5px] bg-[#EFF1F7] border border-[#DCE1ED] rounded-lg px-2.5 py-1"
                    >
                      {fact}
                    </span>
                  ))}
                </div>

                <p className="text-[#5A6480] text-[15.5px] leading-relaxed mt-3 max-w-[62ch]">
                  {teacher.about}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

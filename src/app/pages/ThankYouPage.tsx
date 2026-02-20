import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
  // eslint-disable-next-line no-var
  var dataLayer: any[] | undefined;
  // eslint-disable-next-line no-var
  var gtag: ((...args: any[]) => void) | undefined;
}

export function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Отслеживание конверсии через GTM dataLayer
    // Это событие будет перехвачено триггером в GTM для страницы /thank-you
    if (globalThis.dataLayer) {
      globalThis.dataLayer.push({
        event: 'conversion',
        conversion_label: 'form_submission', // Этот label нужно будет настроить в Google Ads
        conversion_id: '17844260471',
        page_path: '/thank-you'
      });
    }

    // Также отправляем событие для Google Ads через gtag, если он доступен
    if (globalThis.gtag) {
      globalThis.gtag('event', 'conversion', {
        'send_to': 'AW-17844260471',
        'value': 1,
        'currency': 'KZT'
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navigation language="english" />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Спасибо за заявку!
            </h1>

            {/* Message */}
            <p className="text-lg md:text-xl text-[#475569] mb-8 leading-relaxed">
              Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>

            {/* Contact Info */}
            <div className="bg-[#EFF6FF] rounded-2xl p-6 mb-8">
              <p className="text-[#1E293B] font-medium mb-2">
                Есть вопросы?
              </p>
              <p className="text-[#475569] text-sm md:text-base">
                Напишите нам в WhatsApp:{" "}
                <a 
                  href="https://wa.me/77475252582" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#2563EB] font-semibold hover:underline"
                >
                  +7 (747) 525-25-82
                </a>
              </p>
            </div>

            {/* Back to Home Button */}
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="w-full md:w-auto px-8 py-6 text-base md:text-lg rounded-xl shadow-lg"
              style={{ 
                backgroundColor: '#F97316',
                color: 'white'
              }}
            >
              <Home className="w-5 h-5 mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

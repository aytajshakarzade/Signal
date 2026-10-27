(() => {
  'use strict';
  const entries = [["İmkanlar","Features","Возможности"],["Necə işləyir?","How it works","Как это работает?"],["Qaranlıq rejim","Dark mode","Тёмная тема"],["İşıqlı rejim","Light mode","Светлая тема"],["Daxil ol","Log in","Войти"],["Pulsuz başla","Get started free","Начать бесплатно"],["KONTENT ANALİTİKASI","CONTENT INTELLIGENCE","АНАЛИТИКА КОНТЕНТА"],["IDEYADAN ANALITIKAYA · 01 / 03","FROM IDEA TO INSIGHT · 01 / 03","ОТ ИДЕИ К АНАЛИТИКЕ · 01 / 03"],["Sadəcə paylaşma.","Don't just post.","Не просто публикуй."],["İz burax.","Make an impact.","Оставляй след."],["Bir ideyanın hara gedə biləcəyini kəşf et. Trend siqnallarını araşdır, kontentini təkmilləşdir və komandanla daha ağıllı qərarlar ver.","Discover where an idea can go. Explore trend signals, sharpen your content, and make smarter decisions with your team.","Узнай, куда может привести идея. Изучай сигналы трендов, улучшай контент и принимай более взвешенные решения вместе с командой."],["Öz hekayəni başlat","Start your story","Начни свою историю"],["Canlı demo","Explore the demo","Открыть демо"],["Başlamaq pulsuzdur","Free to get started","Начать можно бесплатно"],["✳ Kontent üçün vahid məkan","✳ One workspace for content","✳ Единое пространство для контента"],["◈ Komanda üçün hazır","◈ Built for teams","◈ Для команд"],["Kontentini","Know your content","Понимай свой контент"],["data ilə tanı ✳","with data ✳","с помощью данных ✳"],["Kontent performansı","Content performance","Эффективность контента"],["MAKET · DEMO","MOCKUP · DEMO","МАКЕТ · ДЕМО"],["Engagement indeksi","Engagement score","Индекс вовлечённости"],["↗ Nümunə","↗ Sample","↗ Пример"],["Kontent keyfiyyəti","Content quality","Качество контента"],["Trend uyğunluğu","Trend alignment","Соответствие трендам"],["Carousel ideyası","Carousel concept","Идея карусели"],["Maarifləndirici","Educational","Обучающий"],["Qısa video","Short-form video","Короткое видео"],["Storytelling","Storytelling","Сторителлинг"],["İnterfeys nümunəsi","Interface preview","Пример интерфейса"],["Real hesab statistikası deyil","Not real account data","Не статистика реального аккаунта"],["Bir ideya. Daha ağıllı qərarlar.","One idea. Smarter decisions.","Одна идея. Более умные решения."],["İdeyanı sına","Test your idea","Проверь идею"],["Paylaşımını yoxla.","Test your post.","Проверь публикацию."],["Potensialını kəşf et.","Unlock its potential.","Раскрой её потенциал."],["Kontentini daxil et, platformanı və məqsədini seç. Demo qiymətləndirmə sənə giriş, oxunaqlılıq və qarşılıqlı əlaqə barədə ilkin siqnallar göstərəcək.","Add your content, choose a platform and goal. The demo review provides initial signals about the hook, readability, and engagement.","Добавь контент, выбери платформу и цель. Демо-анализ покажет предварительные сигналы о зацепке, читабельности и вовлечённости."],["Paylaşım mətnin","Post copy","Текст публикации"],["Daha yaxşı kontent yaratmaq üçün daha çox paylaşmağa yox, auditoriyanı daha yaxşı anlamağa ehtiyacın var. Sən kontentini necə planlayırsan?","Better content starts with understanding your audience—not simply posting more. How do you plan your content?","Для качественного контента важно лучше понимать аудиторию, а не просто чаще публиковать. Как ты планируешь контент?"],["İlk cümləni diqqətçəkən et.","Make the first line stand out.","Сделай первую строку заметной."],["Platforma","Platform","Платформа"],["Əsas məqsədin","Primary goal","Основная цель"],["Engagement — qarşılıqlı əlaqə","Engagement — interactions","Вовлечённость — реакции"],["Reach — geniş auditoriya","Reach — broader audience","Охват — более широкая аудитория"],["Clicks — kliklər və keçidlər","Clicks — clicks and visits","Клики — переходы и посещения"],["Awareness — tanınma","Awareness — brand awareness","Узнаваемость бренда"],["Mətni analiz et","Analyze text","Анализировать текст"],["Demo rejim · Mətn yalnız brauzerdə təhlil olunur.","Demo mode · Text is analyzed in your browser only.","Демо-режим · Текст анализируется только в браузере."],["NÜMUNƏVİ QİYMƏTLƏNDİRMƏ","SAMPLE ASSESSMENT","ПРИМЕР ОЦЕНКИ"],["Kontent siqnalın","Your content signal","Сигнал твоего контента"],["Başlamaq üçün mətni analiz et.","Analyze your text to begin.","Проанализируй текст, чтобы начать."],["Demo balı","Demo score","Демо-оценка"],["Yaxşı başlanğıc","A good start","Хорошее начало"],["Mətn əsasında ilkin siqnal","Initial signal based on text","Предварительный сигнал по тексту"],["Diqqətçəkən giriş","Opening hook","Начальная зацепка"],["Oxunaqlılıq siqnalı","Readability signal","Сигнал читабельности"],["Qarşılıqlı əlaqə siqnalı","Engagement signal","Сигнал вовлечённости"],["İpucu:","Tip:","Совет:"],["Auditoriyanı cavab yazmağa dəvət edən konkret sual paylaşımına əlavə dəyər qata bilər.","A specific question that invites your audience to reply can add value to a post.","Конкретный вопрос, побуждающий аудиторию ответить, может усилить публикацию."],["Bu, mətn xüsusiyyətlərinə əsaslanan demo heuristikasıdır. Real AI proqnozu və ya gələcək engagement zəmanəti deyil.","This is a demo heuristic based on text features, not a real AI forecast or a guarantee of future engagement.","Это демонстрационная эвристическая оценка по тексту, а не настоящий прогноз ИИ и не гарантия будущей вовлечённости."],["İş prosesinin hər addımı","Every step of the workflow","Каждый этап рабочего процесса"],["daha məqsədyönlü.","with more intent.","с большей осмысленностью."],["İdeyadan analitikaya qədər kontent iş axınını bir sistemdə birləşdir.","Bring the content workflow—from idea to analytics—into one system.","Объедини весь процесс работы с контентом — от идеи до аналитики — в одной системе."],["Kontent ideyalarını sistemləşdir, mətnini qiymətləndir və paylaşımını məqsədinə uyğunlaşdır.","Organize content ideas, review copy, and align posts with your goals.","Систематизируй идеи, оценивай тексты и согласовывай публикации с целями."],["Trend araşdırması","Trend Explorer","Обзор трендов"],["Mövzu ideyalarını bir yerə topla. Növbəti paylaşımını planlamaq üçün yeni istiqamətlər tap.","Bring topic ideas together and find new angles for your next post.","Собирай идеи тем и находи новые направления для следующих публикаций."],["Komanda məkanı","Team Workspace","Командное пространство"],["Kontent planlarını və ideyaları komanda ilə bir yerdə idarə et.","Manage content plans and ideas together with your team.","Управляй контент-планами и идеями вместе с командой."],["Video analitikası","Video Intelligence","Аналитика видео"],["MP4/MOV videonun hook, kadr dəyişimi, ekrandakı mətn və səsini AI ilə analiz et.","Use AI to review the hook, scene changes, on-screen text, and audio in MP4/MOV videos.","Анализируй с помощью ИИ зацепку, смену кадров, экранный текст и звук в видео MP4/MOV."],["İdeyadan hərəkətə.","From idea to action.","От идеи к действию."],["Üç addımda.","In three steps.","За три шага."],["İdeyanı daxil et","Add your idea","Добавь идею"],["Paylaşım mətnini yaz, platformanı və məqsədini seç.","Write your post, then choose its platform and goal.","Напиши текст публикации, затем выбери платформу и цель."],["Siqnalları anla","Understand the signals","Пойми сигналы"],["Mətnin diqqət, aydınlıq və qarşılıqlı əlaqə göstəricilərini nəzərdən keçir.","Review signals for attention, clarity, and engagement.","Изучи показатели внимания, ясности и вовлечённости."],["İdeyanı saxla","Save your idea","Сохрани идею"],["Hesabını təsdiqlədikdən sonra ideyalarını şəxsi kontent kitabxananda topla.","After verifying your account, keep your ideas in your personal content library.","После подтверждения аккаунта сохраняй идеи в личной библиотеке контента."],["SƏNİN NÖVBƏTİ ADDIMIN","YOUR NEXT STEP","ТВОЙ СЛЕДУЮЩИЙ ШАГ"],["Gözəl ideyalar təsadüfə qalmamalıdır.","Great ideas shouldn't be left to chance.","Хорошие идеи не должны зависеть от случая."],["Kontent işini daha məqsədyönlü planlamağa başla.","Start planning your content with more intention.","Начни планировать контент более осознанно."],["İş məkanını yarat ↗","Create your workspace ↗","Создать рабочее пространство ↗"],["ANALİTİKA","ANALYTICS","АНАЛИТИКА"],["İcmal","Overview","Обзор"],["Proqnoz laboratoriyası","Predictor Lab","Лаборатория прогнозирования"],["Video Lab","Video Lab","Видеолаборатория"],["Platforma bağlantıları","Platform connections","Подключения платформ"],["Hesabatlar","Reports","Отчёты"],["Kontent kitabxanası","Content library","Библиотека контента"],["ƏMƏKDAŞLIQ","COLLABORATION","СОТРУДНИЧЕСТВО"],["Komanda və biznes","Team & business","Команда и бизнес"],["Dəvətlər və mükafat","Referrals & rewards","Приглашения и награды"],["Tənzimləmələr","Settings","Настройки"],["ŞƏXSİ İŞ MƏKANI","PERSONAL WORKSPACE","ЛИЧНОЕ ПРОСТРАНСТВО"],["Yaradıcı","Creator","Автор контента"],["İstifadəçi","User","Пользователь"],["Hesabdan çıxış","Log out","Выйти из аккаунта"],["İŞ MƏKANI /","WORKSPACE /","РАБОЧЕЕ ПРОСТРАНСТВО /"],["Məlumatlarını analiz et.","Analyze your data.","Анализируй свои данные."],["Pulsuz iş məkanı","Free workspace","Бесплатное рабочее пространство"],["Məlumat vəziyyəti.","Data status.","Состояние данных."],["Hesabatların şəxsi hesabına uyğun olması üçün sosial media statistikalarını CSV formatında əlavə et və ya hesab inteqrasiyasını konfiqurasiya et. Nümunə metriklər göstərilmir.","To personalize reports, import your social metrics as a CSV or configure an account integration. No sample metrics are shown.","Чтобы отчёты отражали твой аккаунт, импортируй статистику соцсетей в CSV или настрой интеграцию. Примерные метрики не подставляются."],["Analiz edilmiş postlar","Analyzed posts","Проанализированные публикации"],["Yüklənmiş real məlumatlar","Imported real data","Загруженные реальные данные"],["Orta engagement","Average engagement","Средняя вовлечённость"],["Views / interactions məlumatına əsasən","Based on views / interactions","По данным просмотров и взаимодействий"],["Top platforma","Top platform","Лучшая платформа"],["Ən çox nəticə göstərən platforma","Platform with the strongest results","Платформа с лучшими результатами"],["Saxlanmış ideyalar","Saved ideas","Сохранённые идеи"],["Şəxsi kontent kitabxanan","Your personal content library","Твоя личная библиотека контента"],["İşə başlamaq üçün","Getting started","С чего начать"],["Real analitika üçün bu addımları tamamla","Complete these steps for real analytics","Выполни эти шаги для реальной аналитики"],["Post tarixçəni əlavə et","Import your post history","Импортируй историю публикаций"],["CSV faylından baxış, bəyənmə, şərh, paylaşım və saxlanma metriklərini daxil et.","Import views, likes, comments, shares, and saves from a CSV file.","Импортируй из CSV просмотры, лайки, комментарии, репосты и сохранения."],["Məlumat əlavə et","Add data","Добавить данные"],["Kontentini analiz et","Analyze your content","Анализируй контент"],["Auditoriyanı, platformanı və məqsədini seç; AI açarı qoşulubsa mətn analizi və tövsiyə al.","Choose your audience, platform, and goal. Text analysis and recommendations are available when an AI key is connected.","Выбери аудиторию, платформу и цель. Анализ текста и рекомендации доступны при подключённом ключе ИИ."],["Predictor-u aç","Open Predictor","Открыть прогнозирование"],["Trend və əməkdaşlıq","Trends & collaboration","Тренды и сотрудничество"],["Aktual trend mənbələrini yoxla və agentliklər/şəxsi bizneslərlə əməkdaşlığa başla.","Explore current trend sources and collaborate with agencies or independent businesses.","Изучай актуальные тренды и сотрудничай с агентствами или независимыми компаниями."],["Trendlərə bax","Explore trends","Изучить тренды"],["Son kontent ideyaları","Recent content ideas","Последние идеи контента"],["Sənin kitabxananda saxlanılanlar","Saved in your library","Сохранено в твоей библиотеке"],["Hamısına bax ↗","View all ↗","Посмотреть все ↗"],["Real göstəricilər","Real metrics","Реальные метрики"],["Hələ məlumat yüklənməyib","No data imported yet","Данные ещё не загружены"],["Burada yalnız sənin əlavə etdiyin sosial media məlumatları əsasında qrafiklər görünəcək.","Charts here use only the social media data you import.","Здесь графики строятся только по загруженным тобой данным соцсетей."],["CSV ilə başla ↗","Start with CSV ↗","Начать с CSV ↗"],["Ödənişsiz istifadə","Free to use","Бесплатное использование"],["Bütün istifadəçilər üçün əsas funksiyalar pulsuzdur. Dəvətlərlə mükafat xalları qazan, agentliklər və bizneslərlə əməkdaşlıq et.","Core features are free for everyone. Earn reward points through referrals and collaborate with agencies and businesses.","Основные функции бесплатны для всех. Получай баллы за приглашения и сотрудничай с агентствами и компаниями."],["Dəvət sisteminə bax ↗","View referral program ↗","Открыть программу приглашений ↗"],["Kontentini təhlil et","Review your content","Анализируй контент"],["Mətni, platformanı, nişi və məqsədi daxil et. Hesaba aid real tarixçə varsa nəticə həmin baza ilə müqayisə ediləcək.","Enter the text, platform, niche, and goal. If account history is available, results are compared against it.","Укажи текст, платформу, нишу и цель. При наличии истории аккаунта результаты будут сопоставлены с ней."],["Kontent mətni / video ssenarisi","Content copy / video script","Текст публикации / сценарий видео"],["Şəxsi məlumatları əlavə etmə.","Don't include personal information.","Не добавляй личные данные."],["Sahə / niş","Industry / niche","Отрасль / ниша"],["Hədəf auditoriya","Target audience","Целевая аудитория"],["Əsas məqsəd","Primary goal","Основная цель"],["Qarşılıqlı əlaqə","Engagement","Вовлечённость"],["Əhatə dairəsi","Reach","Охват"],["Lead / müraciət","Lead / conversion","Лид / обращение"],["Klik və keçid","Clicks and visits","Клики и переходы"],["Brend tanınması","Brand awareness","Узнаваемость бренда"],["Müştəri sadiqliyi","Customer retention","Удержание клиентов"],["Video analizi · MP4 / MOV","Video analysis · MP4 / MOV","Анализ видео · MP4 / MOV"],["İlk saniyələr, vizual quruluş, ekrandakı yazılar, səs və danışıq mətni. Maksimum fayl: 500 MB.","Opening seconds, visual structure, on-screen text, sound, and speech. Maximum file: 500 MB.","Первые секунды, визуальная структура, экранный текст, звук и речь. Максимальный размер файла: 500 МБ."],["Videonu analiz et ↗","Analyze video ↗","Анализировать видео ↗"],["Video seçilməyib.","No video selected.","Видео не выбрано."],["Mətni analiz et ↗","Analyze text ↗","Анализировать текст ↗"],["AI provayderi qurulmayıbsa, sistem yalnız şəffaf qayda əsaslı yoxlama aparacaq. Bu, viral olma zəmanəti deyil.","Without an AI provider, the system performs a transparent rule-based review only. This does not guarantee virality.","Без подключения ИИ система выполняет только прозрачную проверку по правилам. Это не гарантирует вирусный охват."],["ANALİZ NƏTİCƏSİ","ANALYSIS RESULT","РЕЗУЛЬТАТ АНАЛИЗА"],["Analiz üçün hazırdır","Ready to analyze","Готово к анализу"],["Kontent mətni daxil etdikdən sonra nəticə burada görünəcək.","Your result will appear here after you enter content.","Результат появится здесь после ввода контента."],["Hələ analiz yoxdur","No analysis yet","Анализа пока нет"],["Etibarlılıq: hesablanmayıb","Confidence: not calculated","Достоверность: не рассчитана"],["İdeyanı kitabxanada saxla +","Save idea to library +","Сохранить идею в библиотеку +"],["Həqiqi performans proqnozu üçün keçmiş postların kifayət qədər statistikası və kalibrasiya edilmiş model lazımdır.","Reliable performance forecasts require sufficient historical post data and a calibrated model.","Для надёжного прогноза эффективности нужны достаточные исторические данные и откалиброванная модель."],["Aktual mövzuları araşdır","Explore current topics","Изучай актуальные темы"],["Canlı trend mənbəyi cavab verərsə vaxtı göstərilən nəticələr; AI tövsiyəsi ayrıca işarələnir.","Results are timestamped when the live trend source responds; AI recommendations are labelled separately.","Если источник трендов доступен, результаты будут отмечены временем; рекомендации ИИ помечаются отдельно."],["Mənbə gözlənilir","Waiting for source","Ожидание источника"],["Axtarış sözü (istəyə görə)","Search term (optional)","Поисковый запрос (необязательно)"],["Sahə","Industry","Отрасль"],["Bütün sahələr","All industries","Все отрасли"],["Healthcare","Healthcare","Здравоохранение"],["Marketing","Marketing","Маркетинг"],["Technology / AI","Technology / AI","Технологии / ИИ"],["Education","Education","Образование"],["Finance","Finance","Финансы"],["Real estate","Real estate","Недвижимость"],["Personal branding","Personal branding","Личный бренд"],["E-commerce","E-commerce","Электронная коммерция"],["Region","Region","Регион"],["Azərbaycan","Azerbaijan","Азербайджан"],["ABŞ","United States","США"],["Böyük Britaniya","United Kingdom","Великобритания"],["Türkiyə","Türkiye","Турция"],["Almaniya","Germany","Германия"],["Qlobal — mövcud olduqda","Global — where available","Весь мир — если доступно"],["Aktual trendləri yoxla ↗","Check current trends ↗","Проверить актуальные тренды ↗"],["Trendlər hələ sorğulanmayıb.","Trends haven't been requested yet.","Тренды ещё не запрашивались."],["Canlı məlumat üçün sorğu göndər","Request live data","Запросить актуальные данные"],["Trend mənbəyi işləməsə, sistem bunu deyəcək; uydurma nəticələrlə doldurmayacaq.","If the trend source is unavailable, the system will say so instead of inventing results.","Если источник трендов недоступен, система сообщит об этом, а не выдумает результаты."],["Trendləri nişimə uyğunlaşdır (AI) ✳","Adapt trends to my niche (AI) ✳","Адаптировать тренды под мою нишу (ИИ) ✳"],["OpenAI API açarı tələb olunur; nəticələr canlı trend siyahısından yaradılır.","An OpenAI API key is required; recommendations are generated from the live trend list.","Нужен ключ OpenAI API; рекомендации формируются на основе актуального списка трендов."],["Vacib:","Important:","Важно:"],["axtarış trendləri sosial platformadakı baxış və paylaşım sayları ilə eyni deyil. Platforma daxili siqnallar üçün rəsmi API icazələri tələb olunur.","Search trends are not the same as views or shares on social platforms. Official API permissions are required for platform-specific signals.","Поисковые тренды — не то же самое, что просмотры и репосты в соцсетях. Для внутренних сигналов платформ нужны официальные разрешения API."],["Platformaları kəşf et. Məlumatı bir məkanda topla.","Explore platforms. Bring data together.","Изучай платформы. Собирай данные в одном месте."],["LIVE","LIVE","В ЭФИРЕ"],["DATA","DATA","ДАННЫЕ"],["IN / OUT","IN / OUT","ВХОД / ВЫХОД"],["Instagram-ı aç ↗","Open Instagram ↗","Открыть Instagram ↗"],["Apify ilə","Powered by Apify","Через Apify"],["Facebook-u aç ↗","Open Facebook ↗","Открыть Facebook ↗"],["Public pages","Public pages","Открытые страницы"],["TikTok-u aç ↗","Open TikTok ↗","Открыть TikTok ↗"],["YouTube Studio-nu aç ↗","Open YouTube Studio ↗","Открыть YouTube Studio ↗"],["Shorts data","Shorts data","Данные Shorts"],["LinkedIn-i aç ↗","Open LinkedIn ↗","Открыть LinkedIn ↗"],["Public search","Public search","Публичный поиск"],["Public kontent məlumatını gətir","Fetch public content data","Получить данные открытого контента"],["Bağlantı yoxlanılır","Checking connection","Проверка подключения"],["Instagram Reels / profil","Instagram Reels / profile","Instagram Reels / профиль"],["Facebook public Page","Facebook public Page","Публичная страница Facebook"],["TikTok profil / videolar","TikTok profile / videos","Профиль TikTok / видео"],["YouTube Shorts / kanal","YouTube Shorts / channel","YouTube Shorts / канал"],["LinkedIn public post axtarışı","LinkedIn public post search","Поиск публичных публикаций LinkedIn"],["Nəticə sayı","Number of results","Количество результатов"],["5 nəticə","5 results","5 результатов"],["10 nəticə","10 results","10 результатов"],["25 nəticə","25 results","25 результатов"],["50 nəticə","50 results","50 результатов"],["Məlumatları gətir","Fetch data","Получить данные"],["Sorğu göndərilməyib.","No request sent yet.","Запрос ещё не отправлен."],["Hələ nəticə yoxdur","No results yet","Пока нет результатов"],["JSON ixracı ↓","Export JSON ↓","Экспорт JSON ↓"],["CSV ixracı ↓","Export CSV ↓","Экспорт CSV ↓"],["Hesabatda aç ↗","Open in reports ↗","Открыть в отчётах ↗"],["Öz hesabının şəxsi statistikası lazımdır?","Need private analytics for your own account?","Нужна личная аналитика своего аккаунта?"],["Meta / Instagram API sənədləri ↗","Meta / Instagram API docs ↗","Документация Meta / Instagram API ↗"],["YouTube Analytics API ↗","YouTube Analytics API ↗","YouTube Analytics API ↗"],["LinkedIn OAuth ↗","LinkedIn OAuth ↗","LinkedIn OAuth ↗"],["Həftəlik, aylıq və illik hesabat","Weekly, monthly, and yearly reports","Недельные, месячные и годовые отчёты"],["CSV importundan və ya bağlı API mənbəyindən alınmış statistikaya əsaslanır.","Based on metrics imported from CSV or connected APIs.","Основано на метриках из CSV или подключённых API."],["PDF / çap ↗","PDF / print ↗","PDF / печать ↗"],["Həftəlik · 7 gün","Weekly · 7 days","За неделю · 7 дней"],["Aylıq · 30 gün","Monthly · 30 days","За месяц · 30 дней"],["İllik · 365 gün","Yearly · 365 days","За год · 365 дней"],["CSV yüklə","Upload CSV","Загрузить CSV"],["CSV sütunları:","CSV columns:","Столбцы CSV:"],["Hələ məlumat import edilməyib.","No data imported yet.","Данные ещё не импортированы."],["Post sayı","Post count","Количество публикаций"],["Seçilmiş dövr","Selected period","Выбранный период"],["Ümumi baxış","Total views","Всего просмотров"],["CSV/API statistikası","CSV/API metrics","Метрики CSV/API"],["Orta engagement rate","Average engagement rate","Средний уровень вовлечённости"],["Ən yaxşı post","Best-performing post","Лучшая публикация"],["Engagement rate-ə görə","By engagement rate","По уровню вовлечённости"],["Dövr üzrə tendensiya","Trend over time","Динамика за период"],["Qrafik üçün kifayət qədər məlumat yoxdur","Not enough data for a chart","Недостаточно данных для графика"],["CSV import et; qrafik faktiki tarix və metriklər əsasında qurulacaq.","Import a CSV; the chart will use actual dates and metrics.","Импортируй CSV: график будет построен по реальным датам и метрикам."],["Nəticələr və müşahidələr","Results and insights","Результаты и наблюдения"],["Hesabat yaranması üçün əvvəlcə real post statistikası daxil et.","Import real post metrics to generate a report.","Импортируй реальные метрики публикаций, чтобы сформировать отчёт."],["Tarix","Date","Дата"],["Post","Post","Публикация"],["Baxış","Views","Просмотры"],["Əlaqə","Interactions","Взаимодействия"],["Hesabat datası yoxdur.","No report data.","Нет данных для отчёта."],["Analiz və ideyalarını öz hesabında saxla.","Keep your analyses and ideas in your account.","Храни анализы и идеи в своём аккаунте."],["+ Yeni ideya","+ New idea","+ Новая идея"],["İdeya","Idea","Идея"],["Format","Format","Формат"],["Yaradılma tarixi","Created on","Дата создания"],["Əməliyyat","Action","Действие"],["İdeyalar bu hesaba bağlı saxlanılır.","Ideas are saved to this account.","Идеи сохраняются в этом аккаунте."],["Əməkdaşlıq profilin","Your collaboration profile","Твой профиль для сотрудничества"],["Agentliklər, özəl şirkətlər, şəxsi brendlər və fərdi yaradıcılar üçün ortaq iş məkanı.","A shared workspace for agencies, companies, personal brands, and independent creators.","Общее пространство для агентств, компаний, личных брендов и независимых авторов."],["Şirkət / brend adı","Company / brand name","Название компании / бренда"],["Profil tipi","Profile type","Тип профиля"],["Özəl şirkət","Company","Компания"],["Marketinq agentliyi","Marketing agency","Маркетинговое агентство"],["Şəxsi brend","Personal brand","Личный бренд"],["Kontent yaradıcısı","Content creator","Автор контента"],["Freelancer / mütəxəssis","Freelancer / specialist","Фрилансер / специалист"],["Nə üzrə əməkdaşlıq axtarırsan?","What kind of collaboration are you looking for?","Какое сотрудничество ты ищешь?"],["Profilimi digər Signal Studio istifadəçilərinə göstər","Show my profile to other Signal Studio users","Показывать профиль другим пользователям Signal Studio"],["Profili saxla ↗","Save profile ↗","Сохранить профиль ↗"],["Əməkdaşlıq şəbəkəsi","Collaboration network","Сеть сотрудничества"],["Öz profilini açıq edən istifadəçilər","Users who made their profiles public","Пользователи с открытыми профилями"],["Yenilə ↻","Refresh ↻","Обновить ↻"],["İlk əməkdaşlıq profilini yarat","Create the first collaboration profile","Создай первый профиль для сотрудничества"],["İcmanı böyüt, mükafat xalı qazan.","Grow the community and earn reward points.","Развивай сообщество и зарабатывай баллы."],["Balansın","Your balance","Твой баланс"],["bal","points","баллов"],["Başlanğıc","Starter","Начальный уровень"],["Şəxsi dəvət linkin","Your referral link","Твоя ссылка-приглашение"],["Linki köçür","Copy link","Скопировать ссылку"],["Dəvət statistikası","Referral statistics","Статистика приглашений"],["Link açılışları","Link visits","Переходы по ссылке"],["Təsdiqlənmiş dəvətlər","Verified referrals","Подтверждённые приглашения"],["Qazanılan xallar","Points earned","Заработанные баллы"],["Ad və soyad","Full name","Имя и фамилия"],["E-poçt","Email address","Электронная почта"],["Email statusu","Email status","Статус email"],["İstifadəçi tipi","User type","Тип пользователя"],["Hesabın, analitika mənbələri və inteqrasiya statusu.","Your account, analytics sources, and integration status.","Аккаунт, источники аналитики и статус интеграций."],["SƏNİN YARADICI MƏKANIN","YOUR CREATIVE SPACE","ТВОЁ ТВОРЧЕСКОЕ ПРОСТРАНСТВО"],["Hesabını yarat.","Create your account.","Создай аккаунт."],["Kontent işinə daha ağıllı yanaşmaq üçün başla.","Get started with a smarter way to work on content.","Начни работать с контентом более осознанно."],["Bütün əsas funksiyalara pulsuz başla.","Get started with all core features for free.","Начни пользоваться основными функциями бесплатно."],["Sən bu platformada kimsən?","How will you use the platform?","Как ты планируешь использовать платформу?"],["Şifrə","Password","Пароль"],["Göstər","Show","Показать"],["Gizlət","Hide","Скрыть"],["Şifrə təsdiqi","Confirm password","Подтверди пароль"],["Qeydiyyatdan keç ↗","Create account ↗","Создать аккаунт ↗"],["Pulsuz hesab yarat ↗","Create free account ↗","Создать бесплатный аккаунт ↗"],["Təsdiq məktubunu yenidən göndər","Resend confirmation email","Отправить письмо подтверждения повторно"],["Şifrən təhlükəsiz hash şəklində saxlanılır. E-poçt təsdiqi hesabını aktivləşdirmək üçün tələb olunur.","Your password is stored as a secure hash. Email verification is required to activate your account.","Пароль хранится в виде защищённого хеша. Для активации аккаунта нужно подтвердить email."],["Artıq hesabın var?","Already have an account?","Уже есть аккаунт?"],["Hələ hesabın yoxdur?","Don't have an account yet?","Ещё нет аккаунта?"],["Yenidən xoş gəldin.","Welcome back.","С возвращением."],["İş məkanına keçmək üçün məlumatlarını daxil et.","Enter your details to access your workspace.","Введи данные, чтобы открыть рабочее пространство."],["Xoş gəldin","Welcome","Добро пожаловать"],["Yoxlanılır…","Checking…","Проверка…"],["Analiz üçün mətn daxil et.","Enter text to analyze.","Введи текст для анализа."],["Analizi tamamlamaq olmadı","Couldn't complete the analysis","Не удалось завершить анализ"],["Analiz tamamlandı.","Analysis completed.","Анализ завершён."],["AI və məlumat analizi tamamlandı.","AI and data analysis completed.","Анализ ИИ и данных завершён."],["Qayda əsaslı ilkin təhlil tamamlandı.","Rule-based preliminary review completed.","Предварительный анализ по правилам завершён."],["İdeya kitabxanada saxlanıldı.","Idea saved to your library.","Идея сохранена в библиотеке."],["İdeyanı saxlamaq mümkün olmadı.","Couldn't save the idea.","Не удалось сохранить идею."],["İdeya silindi.","Idea deleted.","Идея удалена."],["İdeya Predictor Lab-ə köçürüldü.","Idea copied to Predictor Lab.","Идея перенесена в лабораторию прогнозирования."],["Əvvəlcə e-poçt ünvanını daxil et.","Enter your email address first.","Сначала введи адрес электронной почты."],["Düzgün e-poçt ünvanı daxil et.","Enter a valid email address.","Введи корректный адрес электронной почты."],["Ad ən azı 2 simvol olmalıdır.","Name must be at least 2 characters.","Имя должно содержать минимум 2 символа."],["Şifrə ən azı 8 simvoldan ibarət olmalıdır.","Password must be at least 8 characters.","Пароль должен содержать не менее 8 символов."],["Şifrələr eyni deyil. Yenidən yoxla.","Passwords do not match. Try again.","Пароли не совпадают. Попробуй ещё раз."],["Şifrəni daxil et.","Enter your password.","Введи пароль."],["Xəta baş verdi.","An error occurred.","Произошла ошибка."],["Serverlə əlaqə qurulmadı. CMD pəncərəsində npm start işlədiyini yoxla.","Couldn't connect to the server. Check that npm start is running in CMD.","Не удалось подключиться к серверу. Проверь, запущена ли команда npm start в CMD."],["Sorğunu tamamlamaq mümkün olmadı.","Couldn't complete the request.","Не удалось выполнить запрос."],["Təsdiq məktubu göndərildi.","Confirmation email sent.","Письмо с подтверждением отправлено."],["Lokal test rejimi: real email göndərilmədi. CMD/server pəncərəsində [DEV EMAIL MODE] sətrinin altındakı təsdiq linkini aç.","Local test mode: no real email was sent. Open the verification link printed under [DEV EMAIL MODE] in the CMD/server window.","Локальный тестовый режим: реальное письмо не отправлено. Открой ссылку подтверждения под строкой [DEV EMAIL MODE] в окне CMD/сервера."],["Email provayderi məktubu qəbul etmədi. EMAIL_FROM ünvanını, domen təsdiqini və provayder statusunu yoxlayın.","The email provider rejected the message. Check EMAIL_FROM, domain verification, and provider status.","Почтовый провайдер отклонил письмо. Проверь EMAIL_FROM, подтверждение домена и статус провайдера."],["Resend test rejimində yalnız icazəli alıcıya göndərməyə icazə verə bilər. Öz domenini Resend-də təsdiqlə və EMAIL_FROM-u həmin domenin ünvanına dəyiş. Lokal testdə isə təsdiq linki CMD-yə yazılacaq.","Resend's test mode may only allow approved recipients. Verify your domain in Resend and use a sender address on that domain. In local test mode, the verification link will be printed in CMD.","В тестовом режиме Resend может разрешать отправку только одобренным получателям. Подтверди домен в Resend и укажи отправителя с этого домена. В локальном режиме ссылка подтверждения появится в CMD."],["Resend API açarı qəbul edilmədi. RESEND_API_KEY dəyərini Resend panelindən yoxla.","Resend rejected the API key. Check RESEND_API_KEY in the Resend dashboard.","Resend отклонил API-ключ. Проверь RESEND_API_KEY в панели Resend."],["EMAIL_FROM ünvanı Resend tərəfindən qəbul edilmədi. Təsdiqlənmiş domenə aid göndərən ünvanı yaz.","Resend rejected EMAIL_FROM. Use a sender address belonging to a verified domain.","Resend отклонил EMAIL_FROM. Укажи адрес отправителя, относящийся к подтверждённому домену."],["Resend göndəriş limitinə çatılıb. Bir az sonra yenidən cəhd et.","Resend's sending limit was reached. Try again later.","Достигнут лимит отправки Resend. Попробуй позже."],["Email göndərilməsi qurulmayıb: RESEND_API_KEY təyin edilməyib.","Email delivery isn't configured: RESEND_API_KEY is missing.","Отправка email не настроена: не задан RESEND_API_KEY."],["Email göndərən ünvanı düzgün deyil. EMAIL_FROM dəyərini yoxlayın.","The sender address is invalid. Check EMAIL_FROM.","Адрес отправителя указан неверно. Проверь EMAIL_FROM."],["Supabase endpoint tapılmadı. SUPABASE_URL dəyərinin layihənin tam Project URL-i olduğunu yoxla.","Supabase endpoint not found. Check that SUPABASE_URL is the full Project URL.","Эндпоинт Supabase не найден. Проверь, что SUPABASE_URL содержит полный Project URL проекта."],["Supabase Auth server açarını qəbul etmədi.","Supabase Auth rejected the server key.","Supabase Auth отклонил серверный ключ."],["Video analizində xəta baş verdi.","Video analysis failed.","При анализе видео произошла ошибка."],["Apify sorğusu alınmadı.","Apify request failed.","Запрос Apify не выполнен."],["Əvvəlcə Apify nəticəsi gətir.","Fetch Apify results first.","Сначала получи результаты Apify."],["Sorğu qəbul edildi.","Request accepted.","Запрос принят."],["Profil saxlanıldı.","Profile saved.","Профиль сохранён."],["Əməkdaşlıq profilin yeniləndi.","Your collaboration profile was updated.","Профиль сотрудничества обновлён."],["Dəvət linki köçürüldü.","Referral link copied.","Ссылка-приглашение скопирована."],["Dəvət linki seçildi.","Referral link selected.","Ссылка-приглашение выделена."],["Hesabdan çıxış edildi.","You have logged out.","Вы вышли из аккаунта."],["E-poçt təsdiqləndi.","Email verified.","Email подтверждён."],["E-poçt ünvanın təsdiqləndi. İş məkanına xoş gəldin.","Your email is verified. Welcome to your workspace.","Твой email подтверждён. Добро пожаловать в рабочее пространство."],["Təsdiq linkindən istifadə etmək mümkün olmadı.","This verification link couldn't be used.","Не удалось использовать эту ссылку подтверждения."],["Təsdiq linkinin vaxtı bitib və ya artıq istifadə olunub. Hesaba daxil ol; alınmasa, yeni təsdiq məktubu istə.","This verification link has expired or was already used. Sign in or request a new confirmation email.","Срок действия ссылки истёк или она уже использована. Войди в аккаунт или запроси новое письмо."],["Davam etmək üçün hesabına daxil ol.","Log in to continue.","Войди в аккаунт, чтобы продолжить."],["Sosial hesablar","Social accounts","Социальные аккаунты"],["Trend mənbəyi","Trend source","Источник трендов"],["Post tarixçəsi","Post history","История публикаций"],["AI analizi","AI analysis","Анализ ИИ"],["Video analizi","Video analysis","Анализ видео"],["Apify social data","Apify social data","Данные соцсетей через Apify"],["AI API konfiqurasiya edilib","AI API is configured","API ИИ настроен"],["API açarı qurulmayıb","API key not configured","API-ключ не настроен"],["GROQ_API_KEY və FFmpeg tələb olunur","GROQ_API_KEY and FFmpeg are required","Требуются GROQ_API_KEY и FFmpeg"],["APIFY_API_TOKEN əlavə edilməlidir","APIFY_API_TOKEN must be added","Нужно добавить APIFY_API_TOKEN"],["Sorğu zamanı yoxlanılır","Checked when requested","Проверяется при запросе"],["Public data Actor-ları hazırdır; private Insights üçün rəsmi OAuth ayrıca qurulmalıdır","Public-data Actors are ready; official OAuth is required for private Insights","Акторы для открытых данных готовы; для личной аналитики нужен отдельный официальный OAuth"],["Dəvət linkinlə qeydiyyatdan keçən təsdiqlənmiş yeni hesab üçün.","For each new verified account registered through your referral link.","За каждый новый подтверждённый аккаунт, зарегистрированный по твоей ссылке."],["Sənin dəvətinlə gələn hesab təsdiqləndikdə dəvət edənə.","Awarded to the inviter when the referred account is verified.","Начисляется пригласившему после подтверждения аккаунта."],["İcma səviyyəsi açılır. Xalın pul dəyəri və ya real hədiyyə yalnız ayrıca elan edilərsə olur.","Unlocks the community tier. Points have no cash value and do not guarantee a gift unless separately announced.","Открывает уровень сообщества. Баллы не имеют денежной ценности и не гарантируют подарок, если это отдельно не объявлено."],["Saxtakarlığın qarşısını almaq üçün yalnız təsdiqlənmiş hesablar hesablanır.","Only verified accounts count, to reduce abuse.","Для снижения злоупотреблений учитываются только подтверждённые аккаунты."],["Hələ tamamlanmış dəvət yoxdur.","No completed referrals yet.","Завершённых приглашений пока нет."],["Linkini komanda və partnyorlarla paylaş.","Share your link with teammates and partners.","Поделись ссылкой с командой и партнёрами."],["IDEA → SIGNAL","IDEA → SIGNAL","ИДЕЯ → СИГНАЛ"],["→ STORY","→ STORY","→ ИСТОРИЯ"],["SIGNAL / OVERVIEW","SIGNAL / OVERVIEW","СИГНАЛ / ОБЗОР"],["01 — PREDICTOR LAB","01 — PREDICTOR LAB","01 — ЛАБОРАТОРИЯ ПРОГНОЗИРОВАНИЯ"],["02 — BİR MƏKAN, DAHA ÇOX İMKAN","02 — ONE SPACE, MORE POSSIBILITIES","02 — ОДНО ПРОСТРАНСТВО, БОЛЬШЕ ВОЗМОЖНОСТЕЙ"],["Content Intelligence","Content Intelligence","Аналитика контента"],["01 / ANALİZ","01 / ANALYZE","01 / АНАЛИЗ"],["02 / KƏŞF ET","02 / DISCOVER","02 / ПОИСК"],["03 / ƏMƏKDAŞLIQ","03 / COLLABORATE","03 / СОТРУДНИЧЕСТВО"],["04 / İZLƏ VƏ ÖYRƏN","04 / WATCH & LEARN","04 / СМОТРИ И ИЗУЧАЙ"],["03 — SADƏ İŞ AXINI","03 — A SIMPLE WORKFLOW","03 — ПРОСТОЙ РАБОЧИЙ ПРОЦЕСС"],["İCMAL","OVERVIEW","ОБЗОР"],["QURAŞDIRMA","SETUP","НАСТРОЙКА"],["MƏLUMATLARA ƏSASLANAN","DATA-BASED","НА ОСНОВЕ ДАННЫХ"],["PULSUZ","FREE","БЕСПЛАТНО"],["PROQNOZ LABORATORİYASI / KONTENT ANALİZİ","PREDICTOR LAB / CONTENT REVIEW","ЛАБОРАТОРИЯ / АНАЛИЗ КОНТЕНТА"],["TREND ANALİTİKASI","TREND INTELLIGENCE","АНАЛИТИКА ТРЕНДОВ"],["SIGNAL / SOCIAL DATA STUDIO","SIGNAL / SOCIAL DATA STUDIO","SIGNAL / ЛАБОРАТОРИЯ СОЦДАННЫХ"],["Instagram Reels, Facebook-un açıq səhifələri, YouTube Shorts və LinkedIn-də açıq post siqnallarını Apify vasitəsilə araşdır. Nəticələr real mənbədən gəlir və hesabatlara əlavə oluna bilər.","Explore public post signals from Instagram Reels, Facebook Pages, YouTube Shorts, and LinkedIn through Apify. Results come from real sources and can be added to reports.","Изучай открытые сигналы публикаций Instagram Reels, страниц Facebook, YouTube Shorts и LinkedIn через Apify. Данные поступают из реальных источников и могут быть добавлены в отчёты."],["Reels, caption, views/plays, likes, comments, hashtag, transcript (Actor seçimi ilə)","Reels, captions, views/plays, likes, comments, hashtags, transcript (depending on Actor)","Reels, подписи, просмотры, лайки, комментарии, хэштеги, расшифровка (в зависимости от Actor)"],["Yalnız açıq Page postları; şəxsi profillərin private dataları deyil.","Public Page posts only—not private profile data.","Только публикации открытых страниц, не личные данные закрытых профилей."],["Public video postları, baxış, bəyənmə, şərh, paylaşım və tarix.","Public video posts, views, likes, comments, shares, and dates.","Открытые видеопубликации, просмотры, лайки, комментарии, репосты и даты."],["Channel üzrə public Shorts: title, views, likes, comments, upload date.","Public Shorts by channel: title, views, likes, comments, and upload date.","Открытые Shorts по каналу: название, просмотры, лайки, комментарии и дата загрузки."],["Açar söz üzrə public post axtarışı; şəxsi hesabın private analitikası deyil.","Search for public posts by keyword; this is not private account analytics.","Поиск открытых публикаций по ключевым словам; это не личная аналитика аккаунта."],["Apify token serverdə saxlanır. Hər sorğu Apify hesabının limiti/kreditindən istifadə edə bilər.","The Apify token stays on the server. Each request may use your Apify account quota or credits.","Токен Apify хранится на сервере. Каждый запрос может расходовать лимит или кредиты аккаунта Apify."],["Instagram username, profil və ya Reel URL-i","Instagram username, profile, or Reel URL","Имя пользователя Instagram, профиль или URL Reel"],["Public hesab/URL. Private hesablara giriş və ya onların bütün məlumatları vəd edilmir.","Public account/URL only. Access to private accounts or all their data is not promised.","Только открытый аккаунт/URL. Доступ к закрытым аккаунтам и всем их данным не гарантируется."],["Başa düşürəm ki, Apify sorğusu mənim Apify hesabımdan istifadə/kredit sərf edə bilər.","I understand that an Apify request may use my Apify account quota/credits.","Я понимаю, что запрос Apify может расходовать лимит или кредиты моего аккаунта Apify."],["Video transcript-i də çıxarmağa çalış (dəstəklənən Actor-larda; əlavə xərc yarana bilər).","Also attempt video transcription (supported Actors only; extra costs may apply).","Также попробовать расшифровать видео (только в поддерживаемых Actor; возможны дополнительные расходы)."],["Demo və uydurma statistika yoxdur. Token qoşulmayıbsa, əvvəlcə .env faylında APIFY_API_TOKEN doldur.","No demo or fabricated metrics. If the token isn't configured, add APIFY_API_TOKEN to the .env file first.","Нет демонстрационных или выдуманных метрик. Если токен не настроен, сначала добавь APIFY_API_TOKEN в файл .env."],["Public profil/Page/channel və ya LinkedIn axtarış ifadəsi yaz, sonra məlumatları gətir.","Enter a public profile/Page/channel or a LinkedIn search phrase, then fetch data.","Укажи открытый профиль/страницу/канал или поисковую фразу LinkedIn, затем получи данные."],["ÖZ HESABININ ANALİTİKASI","OWNER-ACCOUNT ANALYTICS","АНАЛИТИКА СОБСТВЕННОГО АККАУНТА"],["Apify scraper əsasən açıq məzmunu oxuyur. Şəxsi audience demographics, reach/impressions, saves, retention və account-level Insights üçün platformanın rəsmi OAuth tətbiqi, icazələri və təsdiqlənmiş API inteqrasiyası lazımdır.","The Apify scraper mainly reads public content. Private audience demographics, reach/impressions, saves, retention, and account-level Insights require an official OAuth app, permissions, and approved API integration.","Скрапер Apify в основном читает открытый контент. Для личных демографических данных аудитории, охвата/показов, сохранений, удержания и Insights аккаунта нужны официальное OAuth-приложение, разрешения и одобренная интеграция API."],["PERFORMANS HESABATLARI","PERFORMANCE REPORTS","ОТЧЁТЫ ОБ ЭФФЕКТИВНОСТИ"],["Tarix formatı YYYY-MM-DD ola bilər. Ən azı date, platform, views, likes sütunlarını daxil et. Fayl 2 MB-dan kiçik olmalıdır. Importdan əvvəl şəxsi məlumatları sil.","Dates can use YYYY-MM-DD. Include at least date, platform, views, and likes columns. The file must be under 2 MB. Remove personal information before importing.","Дата может быть в формате YYYY-MM-DD. Нужны как минимум столбцы date, platform, views и likes. Размер файла должен быть меньше 2 МБ. Перед импортом удали личные данные."],["0 ideya","0 ideas","0 идей"],["Şirkət və mütəxəssislər burada yalnız özləri görünməyə razı olduqda siyahılanacaq.","Companies and specialists appear here only if they consent to being listed.","Компании и специалисты появятся здесь, только если согласятся отображаться в списке."],["Dəvət linkini əməkdaşlara və biznes partnyorlarına göndər. Xallar yalnız yeni istifadəçi e-poçtunu təsdiqlədikdən sonra verilir.","Share your referral link with teammates and business partners. Points are awarded only after the new user verifies their email.","Отправь ссылку-приглашение коллегам и деловым партнёрам. Баллы начисляются только после подтверждения email новым пользователем."],["25 bal","25 points","25 баллов"],["100 bal","100 points","100 баллов"],["500 bal","500 points","500 баллов"],["HESAB VƏ İNTEQRASİYALAR","ACCOUNT & INTEGRATIONS","АККАУНТ И ИНТЕГРАЦИИ"],["AI analizi üçün serverdə GROQ_API_KEY; real sosial hesabları bağlamaq üçün isə müvafiq platformanın rəsmi API tətbiqi və istifadəçi icazəsi qurulmalıdır. Açarlar brauzerə yazılmamalıdır.","AI analysis requires GROQ_API_KEY on the server. Connecting real social accounts requires an official API app and user authorization for each platform. Never put keys in browser code.","Для анализа ИИ нужен GROQ_API_KEY на сервере. Для подключения реальных соцаккаунтов требуются официальное API-приложение и разрешение пользователя. Не размещай ключи в коде браузера."],["Signal Studio — AI Social Content Predictor","Signal Studio — AI Social Content Predictor","Signal Studio — ИИ-анализ контента"],["Görünüşü dəyiş","Toggle appearance","Изменить оформление"],["Menyunu aç","Open menu","Открыть меню"],["Menyunu bağla","Close menu","Закрыть меню"],["İlk cümlədə konkret sual, ziddiyyət və ya faydanı göstərən hook istifadə et.","Use a clear question, contrast, or benefit-led hook in the opening line.","Начни с конкретного вопроса, контраста или обещания пользы."],["İlk cümləni qısalt: əsas faydanı ilk 1–2 sətirdə de.","Shorten the opening line: state the main benefit in the first one or two lines.","Сократи первую фразу: обозначь главную пользу в первых одной-двух строках."],["Məqsədə uyğun çağırış əlavə et: şərh yaz, saxla, linkə keç və ya müraciət et.","Add a goal-aligned call to action: comment, save, visit a link, or enquire.","Добавь призыв к действию, соответствующий цели: комментарий, сохранение, переход по ссылке или обращение."],["Dəyər təklifini daha aydın izah edən bir konkret nümunə və ya səbəb əlavə et.","Add a specific example or reason that explains the value more clearly.","Добавь конкретный пример или причину, яснее объясняющую ценность."],["Hashtag-ləri mövzu ilə birbaşa əlaqəli, az sayda etiketlə məhdudlaşdır.","Keep hashtags few and directly relevant to the topic.","Используй немного хэштегов, напрямую связанных с темой."],["Struktur aydındır. Növbəti mərhələdə bunu öz hesabının keçmiş nəticələri ilə müqayisə et.","The structure is clear. Next, compare it with your account's historical results.","Структура понятна. Далее сравни результат с историей своего аккаунта."],["İdeyanı kitabxanada saxla +","Save idea to library +","Сохранить идею в библиотеку +"]];
  entries.push(["Giriş, mesaj və ilk kadrı bir yerdə yoxla.", "Review the hook, message, and opening frame in one place.", "Проверь начало, смысл и первый кадр в одном месте."], ["Hesabını aktivləşdirmək üçün e-poçtunu təsdiqlə.", "Verify your email to activate your account.", "Подтверди email, чтобы активировать аккаунт." ]);
  entries.push(["Instagram Reels, Facebook-un açıq səhifələri, YouTube Shorts və LinkedIn-də açıq post siqnallarını Apify vasitəsilə araşdır. Nəticələr real mənbədən gəlir və hesabatlara əlavə olunur.","Explore public post signals from Instagram Reels, Facebook Pages, YouTube Shorts, and LinkedIn through Apify. Results come from real sources and can be added to reports.","Изучай открытые сигналы публикаций Instagram Reels, страниц Facebook, YouTube Shorts и LinkedIn через Apify. Данные поступают из реальных источников и могут быть добавлены в отчёты."], ["Apify scraper əsasən açıq məzmunu oxuyur. Şəxsi audience demographics, reach/impressions, saves, retention və account-level Insights üçün platformanın rəsmi OAuth tətbiqi, icazələr və bəzi hallarda app review lazımdır. Bəzi platformalarda tətbiq təsdiqi tələb oluna bilər.","The Apify scraper mainly reads public content. Private audience demographics, reach/impressions, saves, retention, and account-level Insights require an official OAuth app, permissions, and sometimes app review.","Скрапер Apify в основном читает открытый контент. Для личных демографических данных аудитории, охвата/показов, сохранений, удержания и Insights аккаунта нужны официальное OAuth-приложение, разрешения, а иногда и проверка приложения."], ["PARTNYOR İŞ MƏKANI","PARTNER WORKSPACE","ПРОСТРАНСТВО ПАРТНЁРОВ"], ["İCMA MÜKAFATLARI","COMMUNITY REWARDS","НАГРАДЫ СООБЩЕСТВА"], ["AI Social Content Predictor ·","AI Social Content Predictor ·","ИИ-анализ контента ·"]);
  entries.push(["Auditoriyana demək istədiyin fikri buraya yaz...","Write the idea you want to share with your audience here...","Напиши здесь мысль, которой хочешь поделиться с аудиторией..."], ["Hook, əsas mesaj, CTA və ya video ssenarisini yaz...","Write a hook, key message, CTA, or video script...","Напиши зацепку, основную мысль, призыв к действию или сценарий видео..."], ["Məs. healthcare, daşınmaz əmlak, şəxsi brend","E.g. healthcare, real estate, personal brand","Напр. здравоохранение, недвижимость, личный бренд"], ["Məs. 25–40 yaş, Bakı, sahibkarlar","E.g. ages 25–40, Baku, business owners","Напр. 25–40 лет, Баку, предприниматели"], ["Məs. AI, healthcare, personal branding","E.g. AI, healthcare, personal branding","Напр. ИИ, здравоохранение, личный бренд"], ["@username və ya https://www.instagram.com/username/","@username or https://www.instagram.com/username/","@username или https://www.instagram.com/username/"], ["İdeya axtar...","Search ideas...","Поиск идей..."], ["Şirkətin və ya şəxsi brendin adı","Company or personal brand name","Название компании или личного бренда"], ["Məs. səhiyyə, marketinq, təhsil","E.g. healthcare, marketing, education","Напр. здравоохранение, маркетинг, образование"], ["Xidmətin, təcrübən və əməkdaşlıq ehtiyacın...","Your services, experience, and collaboration needs...","Твои услуги, опыт и потребности в сотрудничестве..."], ["Məs. Aysel Məmmədova","E.g. Alex Morgan","Напр. Анна Иванова"], ["Ən azı 8 simvol","At least 8 characters","Не менее 8 символов"], ["Şifrəni yenidən yaz","Re-enter your password","Повтори пароль"], ["Pəncərəni bağla","Close dialog","Закрыть окно"]);
  entries.push(["İş məkanım ↗","My workspace ↗","Моё пространство ↗"], ["Hesabım","My account","Мой аккаунт"], ["Təsdiqlənib","Verified","Подтверждён"], ["Təsdiq gözlənilir","Awaiting verification","Ожидает подтверждения"], ["Kontentini təhlil et.","Analyze your content.","Анализируй свой контент."], ["Növbəti mövzunu məlumatla seç.","Choose your next topic with data.","Выбирай следующую тему на основе данных."], ["Nəticələrini dövrlər üzrə müqayisə et.","Compare results across time periods.","Сравни результаты за разные периоды."], ["KONTENT KİTABXANASI","CONTENT LIBRARY","БИБЛИОТЕКА КОНТЕНТА"], ["İdeyaların bir yerdə.","Your ideas, all in one place.","Все твои идеи в одном месте."], ["SOSİAL DATA LAB","SOCIAL DATA LAB","ЛАБОРАТОРИЯ СОЦДАННЫХ"], ["Platformalardan real açıq məlumat gətir.","Fetch real public data from platforms.","Получай реальные открытые данные с платформ."], ["Biznesləri və mütəxəssisləri birləşdir.","Connect businesses and specialists.","Объединяй компании и специалистов."], ["DƏVƏTLƏR VƏ MÜKAFAT","REFERRALS & REWARDS","ПРИГЛАШЕНИЯ И НАГРАДЫ"], ["İcmanı böyüt, xal qazan.","Grow your community and earn points.","Развивай сообщество и зарабатывай баллы."], ["TƏNZİMLƏMƏLƏR","SETTINGS","НАСТРОЙКИ"], ["İş məkanını qur.","Configure your workspace.","Настрой рабочее пространство."], ["Qeydiyyatdan keç","Sign up","Зарегистрироваться"], ["İxrac üçün real məlumat yoxdur.","No real data available to export.","Нет реальных данных для экспорта."], ["Trend mənbəyinə sorğu göndərilir…","Requesting the trend source…","Запрос источника трендов…"], ["Yüklənir","Loading","Загрузка"], ["Canlı mənbə","Live source","Актуальный источник"], ["nəticə alındı.","results received.","результатов получено."], ["Məlumat yenilənməsi:","Data refreshed:","Данные обновлены:"], ["Mənbə əlçatan deyil","Source unavailable","Источник недоступен"], ["Bu filtr üzrə nəticə tapılmadı","No results for these filters","По этим фильтрам ничего не найдено"], ["Canlı trend məlumatı hazırda yoxdur","No live trend data available right now","Сейчас нет актуальных данных о трендах"], ["Başqa açar söz və ya region seç.","Try another keyword or region.","Попробуй другое ключевое слово или регион."], ["Sayt canlı məlumatı uydurmur. Şəbəkə bağlantısını yoxla və ya daha sonra yenidən cəhd et. Google Trends axtarış marağı sosial media engagement-i əvəz etmir.","The site does not invent live data. Check your connection or try again later. Google Trends search interest is not the same as social media engagement.","Сайт не выдумывает актуальные данные. Проверь подключение или попробуй позже. Поисковый интерес Google Trends не равен вовлечённости в соцсетях."], ["Trend başlığı mənbədən götürülüb; əlavə şərh üçün kontekst yoxlanmalıdır.","The trend title comes from the source; check context before interpreting it.","Заголовок тренда взят из источника; перед интерпретацией проверь контекст."], ["Mənbəni aç ↗","Open source ↗","Открыть источник ↗"], ["İdeya kimi saxla +","Save as idea +","Сохранить как идею +"], ["Əvvəlcə MP4 və ya MOV video seç.","Select an MP4 or MOV video first.","Сначала выбери видео MP4 или MOV."], ["Video 500 MB limitini keçir.","Video exceeds the 500 MB limit.","Видео превышает лимит 500 МБ."], ["Yalnız MP4 və MOV faylları dəstəklənir.","Only MP4 and MOV files are supported.","Поддерживаются только файлы MP4 и MOV."], ["Hazırlanır…","Preparing…","Подготовка…"], ["Video analiz mühiti yoxlanılır…","Checking the video analysis environment…","Проверка среды анализа видео…"], ["Video analizi üçün .env faylında GROQ_API_KEY qurulmalıdır.","Set GROQ_API_KEY in .env to analyze videos.","Для анализа видео укажи GROQ_API_KEY в файле .env."], ["FFmpeg tapılmadı. FFmpeg-i quraşdır, PATH-ə əlavə et və CMD-ni yenidən aç.","FFmpeg was not found. Install it, add it to PATH, and reopen CMD.","FFmpeg не найден. Установи его, добавь в PATH и заново открой CMD."], ["serverə göndərilir və emal edilir. Bu pəncərəni bağlama.","is uploading and processing on the server. Keep this window open.","загружается и обрабатывается на сервере. Не закрывай это окно."], ["Server cavabını oxumaq olmadı.","Couldn't read the server response.","Не удалось прочитать ответ сервера."], ["Video analizi alınmadı.","Video analysis failed.","Не удалось проанализировать видео."], ["Video analizi tamamlandı","Video analysis complete","Анализ видео завершён"], ["Video keyfiyyət balı","Video quality score","Оценка качества видео"], ["Kreativ struktur qiymətləndirildi","Creative structure reviewed","Креативная структура оценена"], ["Gələcək performans proqnozu deyil","Not a forecast of future performance","Не является прогнозом будущей эффективности"], ["Vizual aydınlıq","Visual clarity","Визуальная ясность"], ["Ekran mətni","On-screen text","Текст на экране"], ["Videodan tanınan danışıq mətni","Speech recognized from video","Распознанная речь из видео"], ["Tamamlandı:","Complete:","Завершено:"], ["kadr analiz olundu","frames analyzed","кадров проанализировано"], ["və audio transkripsiyası alındı","and audio was transcribed","и аудио расшифровано"], ["AI tövsiyə hazırlayır…","AI is preparing recommendations…","ИИ готовит рекомендации…"], ["AI konkret tövsiyə qaytarmadı. Yenidən cəhd et.","AI returned no specific recommendations. Try again.","ИИ не дал конкретных рекомендаций. Попробуй ещё раз."], ["Trend əsası:","Trend basis:","Основа тренда:"], ["Kontent bucağı","Content angle","Ракурс контента"], ["Əməkdaşlıq profilləri yüklənir…","Loading collaboration profiles…","Загрузка профилей для сотрудничества…"], ["Hazırda açıq profil yoxdur","No public profiles yet","Пока нет открытых профилей"], ["Öz profilini açıq et; digər istifadəçilər razılıq verdikdə burada görünəcəklər.","Make your profile public; other users appear here only with their consent.","Открой свой профиль; другие пользователи появятся здесь только с их согласия."], ["Əməkdaşlıq üçün açıq profil.","Open to collaboration.","Открыт к сотрудничеству."], ["İcma üzvü","Community member","Участник сообщества"], ["Aktiv dəvətçi","Active referrer","Активный приглашающий"], ["Təsdiqlənmiş dəvət","Verified referral","Подтверждённое приглашение"], ["Public Reels/profil məlumatları. Private hesabın şəxsi Insights datası deyil.","Public Reels/profile data only—not private account Insights.","Только открытые данные Reels/профиля, не личная аналитика закрытого аккаунта."], ["Yalnız açıq Facebook Pages. Şəxsi profilə və bağlı qruplara giriş deyil.","Public Facebook Pages only—not personal profiles or closed groups.","Только открытые страницы Facebook, не личные профили и закрытые группы."], ["TikTok username və ya profil URL-i","TikTok username or profile URL","Имя пользователя TikTok или URL профиля"], ["@username və ya https://www.tiktok.com/@username","@username or https://www.tiktok.com/@username","@username или https://www.tiktok.com/@username"], ["Public video postları. Private hesab məlumatları və şəxsi analitika deyil.","Public video posts only—not private account data or analytics.","Только открытые видеопубликации, не данные закрытого аккаунта или личная аналитика."], ["YouTube kanal adı, @handle və ya URL","YouTube channel name, @handle, or URL","Название канала YouTube, @handle или URL"], ["@nasa və ya https://www.youtube.com/@nasa","@nasa or https://www.youtube.com/@nasa","@nasa или https://www.youtube.com/@nasa"], ["Kanalın public Shorts məlumatları: title, views, likes, comments və tarix.","Public Shorts data for the channel: title, views, likes, comments, and date.","Данные открытых Shorts канала: название, просмотры, лайки, комментарии и дата."], ["LinkedIn mövzu/açar söz axtarışı","LinkedIn topic/keyword search","Поиск по теме/ключевому слову LinkedIn"], ["Public post axtarışı. LinkedIn şəxsi hesabının daxili analitikası deyil.","Public post search—not private LinkedIn account analytics.","Поиск открытых публикаций, не личная аналитика аккаунта LinkedIn."], ["Apify bağlantısı hazır","Apify connection ready","Подключение Apify готово"], ["Apify token lazımdır","Apify token required","Требуется токен Apify"], ["Actor mövcuddur","Actor available","Actor доступен"], ["Token gözlənilir","Waiting for token","Ожидание токена"], ["Apify tokeni əlavə edilməyib. Apify Console → Settings → API & Integrations bölməsindən tokenini köçür, layihənin .env faylında APIFY_API_TOKEN= sətrinə yapışdır və serveri yenidən başlat.","Apify token is missing. Copy it from Apify Console → Settings → API & Integrations, paste it into APIFY_API_TOKEN= in the project's .env file, and restart the server.","Токен Apify не добавлен. Скопируй его в Apify Console → Settings → API & Integrations, вставь в APIFY_API_TOKEN= в файле .env и перезапусти сервер."], ["Apify hazırdır. Public profil/kanal və ya axtarış sorğusu daxil et.","Apify is ready. Enter a public profile/channel or search query.","Apify готов. Укажи открытый профиль/канал или поисковый запрос."], ["Bağlantı yoxlanmadı","Connection not checked","Подключение не проверено"], ["Mənbə nəticə qaytarmadı","The source returned no results","Источник не вернул результатов"], ["Profilin public olduğuna, URL/açar sözün düzgünlüyünə və Apify Actor girişinin işlədiyinə əmin ol.","Check that the profile is public, the URL/keyword is correct, and the Apify Actor is accessible.","Проверь, что профиль открыт, URL/ключевое слово указаны верно и Apify Actor доступен."], ["Bəyənmə","Like","Лайк"], ["Paylaşım","Share","Репост"], ["Transkriptə bax","View transcript","Посмотреть расшифровку"], ["Actor-dan gələn əlavə məlumatlara bax","View extra Actor data","Посмотреть дополнительные данные Actor"], ["Mənbə JSON-u ölçüyə nəzarət üçün dərinlik, element və mətn limitləri ilə saxlanılır. Tam normallaşdırılmış nəticəni JSON kimi endir.","Source JSON is limited by depth, item, and text size. Download the normalized result as JSON for the full output.","Исходный JSON ограничен по глубине, числу элементов и размеру текста. Скачай нормализованный результат в JSON для полного вывода."], ["Qaytarılan kontent","Returned content","Полученный контент"], ["Ümumi əlaqə","Total interactions","Всего взаимодействий"], ["Davam etmək üçün Apify istifadəsinin hesabından kredit sərf edə biləcəyini təsdiqlə.","Confirm that using Apify may consume credits from your account to continue.","Подтверди, что использование Apify может расходовать кредиты аккаунта."], ["Profil/kanal və ya axtarış sözünü daxil et.","Enter a profile/channel or search term.","Укажи профиль/канал или поисковый запрос."], ["Məlumatlar gətirilir…","Fetching data…","Получение данных…"], ["Apify Actor başladılır. Bu, seçilən nəticə sayından asılı olaraq bir neçə dəqiqə çəkə bilər.","Starting the Apify Actor. This can take a few minutes depending on the result limit.","Запуск Apify Actor. В зависимости от количества результатов это может занять несколько минут."], ["nəticə gətirildi.","results fetched.","результатов получено."], ["Groq AI qoşulub; FFmpeg ayrıca yoxlanılır","Groq AI is connected; FFmpeg is checked separately","Groq AI подключён; FFmpeg проверяется отдельно"], ["API token qoşulub","API token connected","API-токен подключён"], ["metrik sətri yüklənib","metric rows loaded","строк метрик загружено"], ["Yeni kontent ideyasının adını yaz:","Name your new content idea:","Назови новую идею контента:"], ["E-poçt ünvanın təsdiqləndi. İndi hesabına daxil ol.","Your email is verified. You can now log in.","Твой email подтверждён. Теперь можно войти в аккаунт."]);
  entries.push(["Qaranlıq rejimə keç","Switch to dark mode","Переключить тёмную тему"], ["İşıqlı rejimə keç","Switch to light mode","Переключить светлую тему"], ["Apify scraper əsasən açıq məzmunu oxuyur. Şəxsi audience demographics, reach/impressions, saves, retention və account-level Insights üçün platformanın rəsmi OAuth tətbiqi, icazələri və təsdiqlənmiş API inteqrasiyası lazımdır. Bu layihə həmin private metrics-i icazəsiz açıq kimi göstərmir.","The Apify scraper mainly reads public content. Private audience demographics, reach/impressions, saves, retention, and account-level Insights require an official OAuth app, permissions, and an approved API integration. This project does not present those private metrics as publicly accessible without authorization.","Скрапер Apify в основном читает открытый контент. Для личных демографических данных аудитории, охвата/показов, сохранений, удержания и Insights аккаунта нужны официальное OAuth-приложение, разрешения и одобренная интеграция API. Проект не выдаёт эти закрытые метрики за общедоступные без разрешения."]);
  entries.push(
    ["Lokal test rejimi: real email göndərilmədi. CMD/server pəncərəsində [DEV EMAIL MODE] sətrinin altındakı təsdiq linkini aç.","Local test mode: no real email was sent. Open the verification link beneath the [DEV EMAIL MODE] line in the CMD/server window.","Локальный режим тестирования: настоящее письмо не отправлено. Открой ссылку подтверждения под строкой [DEV EMAIL MODE] в окне CMD/сервера."],
    ["Lokal test rejimi: real email göndərilmədi. Yeni təsdiq linki CMD/server pəncərəsinə yazıldı.","Local test mode: no real email was sent. A new verification link was written to the CMD/server window.","Локальный режим тестирования: настоящее письмо не отправлено. Новая ссылка подтверждения выведена в окно CMD/сервера."],
    ["Təsdiq məktubu göndərildi. E-poçt qutusunu və spam qovluğunu yoxla.","Verification email sent. Check your inbox and spam folder.","Письмо с подтверждением отправлено. Проверь входящие и папку спама."],
    ["Təsdiq məktubu yenidən göndərildi.","Verification email resent.","Письмо с подтверждением отправлено повторно."],
    ["Email göndərilməsi qurulmayıb: RESEND_API_KEY təyin edilməyib.","Email delivery is not configured: RESEND_API_KEY is missing.","Отправка email не настроена: отсутствует RESEND_API_KEY."],
    ["Email göndərən ünvanı düzgün deyil. EMAIL_FROM dəyərini yoxlayın.","The sender address is invalid. Check EMAIL_FROM.","Адрес отправителя указан неверно. Проверь EMAIL_FROM."],
    ["Resend məktubu qəbul etmədi. EMAIL_FROM, domenin təsdiqi və Resend layihəsinin göndəriş limitlərini yoxla.","Resend rejected the email. Check EMAIL_FROM, domain verification, and your Resend project sending limits.","Resend отклонил письмо. Проверь EMAIL_FROM, подтверждение домена и лимиты отправки в проекте Resend."],
    ["Resend API açarı qəbul edilmədi. RESEND_API_KEY dəyərini Resend panelindən yoxla.","The Resend API key was rejected. Check RESEND_API_KEY in the Resend dashboard.","Ключ API Resend отклонён. Проверь RESEND_API_KEY в панели Resend."],
    ["Resend test rejimində yalnız icazəli alıcıya göndərməyə icazə verə bilər. Öz domenini Resend-də təsdiqlə və EMAIL_FROM-u həmin domenin ünvanına dəyiş. Lokal testdə isə təsdiq linki CMD-yə yazılacaq.","In test mode, Resend may only allow approved recipients. Verify your domain in Resend and change EMAIL_FROM to an address on that domain. In local testing, the verification link will be written to CMD.","В тестовом режиме Resend может разрешать отправку только одобренным получателям. Подтверди домен в Resend и укажи EMAIL_FROM на этом домене. При локальном тестировании ссылка подтверждения выводится в CMD."],
    ["EMAIL_FROM ünvanı Resend tərəfindən qəbul edilmədi. Təsdiqlənmiş domenə aid göndərən ünvanı yaz.","Resend rejected EMAIL_FROM. Use a sender address on a verified domain.","Resend отклонил EMAIL_FROM. Используй адрес отправителя на подтверждённом домене."],
    ["Resend göndəriş limitinə çatılıb. Bir az sonra yenidən cəhd et.","The Resend sending limit has been reached. Try again shortly.","Достигнут лимит отправки Resend. Попробуй ещё раз позже."],
    ["Email servisinə qoşulmaq mümkün olmadı. Şəbəkəni və Resend statusunu yoxlayıb yenidən cəhd edin.","Could not connect to the email service. Check the network and Resend status, then try again.","Не удалось подключиться к почтовому сервису. Проверь сеть и статус Resend, затем повтори попытку."]
  );
  entries.push(
    ["Platformanı", "the platform", "платформу"],
    ["Platformanın", "the platform's", "платформы"],
    ["Platformada", "on the platform", "на платформе"],
    ["Platformaları", "platforms", "платформы"],
    ["Platformalar", "platforms", "платформы"],
    ["Platformalara", "to platforms", "на платформы"],
    ["Platformalarla", "with platforms", "с платформами"],
    ["Platforması", "its platform", "его платформу"],
    ["Kontent yaradıcısı", "Content creator", "Создатель контента"],
    ["Özəl şirkət", "Private company", "Частная компания"],
    ["Marketinq agentliyi", "Marketing agency", "Маркетинговое агентство"],
    ["Şəxsi brend", "Personal brand", "Личный бренд"],
    ["Kontent", "Content", "Контент"],
    ["Qarşılıqlı əlaqə", "Engagement", "Вовлечённость"],
    ["Əhatə dairəsi", "Reach", "Охват"],
    ["Bizim fərqimiz", "Our edge", "Наше отличие"],
    ["RƏQABƏT XƏRİTƏSİ", "COMPETITIVE LANDSCAPE", "КАРТА КОНКУРЕНТОВ"],
    ["YC profilləri · 19.10.2026", "YC profiles · checked 19 Oct 2026", "Профили YC · проверено 19.10.2026"],
    ["Biz sadəcə ideyanı seçmirik.", "We do more than choose an idea.", "Мы не просто выбираем идею."],
    ["Hazır videonu da sınaqdan keçiririk.", "We also preflight the finished video.", "Мы также проверяем готовое видео перед публикацией."],
    ["Bazarda oxşar alətlər kontent ideyasını seçməkdən tutmuş yaradılma və yayım prosesinə qədər fərqli problemləri həll edir. Signal Studio-nun fokus nöqtəsi — paylaşılmağa hazır videoda nəyi düzəltmək lazım olduğunu əvvəlcədən göstərməkdir.", "Similar tools address different stages, from idea selection to creation and distribution. Signal Studio focuses on showing what to improve in a finished video before it goes live.", "Похожие инструменты решают разные задачи: от выбора идеи до создания и распространения контента. Signal Studio показывает, что стоит исправить в готовом видео до публикации."],
    ["YC W23 · INACTIVE", "YC W23 · INACTIVE", "YC W23 · НЕАКТИВЕН"],
    ["YC S26 · AKTİV", "YC S26 · ACTIVE", "YC S26 · АКТИВЕН"],
    ["YC F26 · AKTİV", "YC F26 · ACTIVE", "YC F26 · АКТИВЕН"],
    ["YOUTUBE PAKETLƏMƏSİ", "YOUTUBE PACKAGING", "УПАКОВКА YOUTUBE"],
    ["YARADICI ÜÇÜN CONTENT ENGINE", "CREATOR CONTENT ENGINE", "КОНТЕНТ-МАШИНА ДЛЯ АВТОРОВ"],
    ["MARKETİNQ İDEYASININ SEÇİMİ", "MARKETING IDEA SELECTION", "ВЫБОР МАРКЕТИНГОВЫХ ИДЕЙ"],
    ["YouTube videosu yüklənməmişdən əvvəl mövzu, başlıq və thumbnail seçimlərinin baxış potensialını qiymətləndirməyə fokuslanır.", "Focuses on estimating a YouTube video's view potential from its topic, title, and thumbnail before upload.", "Помогает оценить потенциал просмотров видео на YouTube по теме, заголовку и обложке до загрузки."],
    ["Video anlayışı və platforma analitikasından istifadə edərək yaradıcıya uyğun kontenti fərdiləşdirməyə və yaymağa fokuslanır.", "Uses video understanding and platform analytics to personalize and distribute content for each creator.", "Использует анализ видео и платформенную аналитику, чтобы персонализировать и распространять контент для каждого автора."],
    ["Norn modeli brend, əvvəlki sosial nəticələr, trendlər və geribildirim əsasında hansı marketinq ideyalarının sınanmağa dəyər olduğunu sıralayır; platforma yaratma və yayımı da əhatə edir.", "Its Norn model ranks marketing ideas using brand context, past social results, trends, and feedback; the platform also supports creation and publishing.", "Модель Norn ранжирует маркетинговые идеи на основе бренда, прошлых результатов, трендов и обратной связи; платформа также поддерживает создание и публикацию контента."],
    ["Signal Studio", "Signal Studio", "Signal Studio"],
    ["SIGNAL STUDIO · FOKUS", "SIGNAL STUDIO · FOCUS", "SIGNAL STUDIO · ФОКУС"],
    ["PUBLISH-READY VIDEO REVIEW", "PUBLISH-READY VIDEO REVIEW", "ПРОВЕРКА ВИДЕО ПЕРЕД ПУБЛИКАЦИЕЙ"],
    ["Yayımdan əvvəl videoya bax: ilk saniyələrin aydınlığı, kadr ritmi, vizual kompozisiya, ekrandakı mətn və audio/transkript üçün konkret düzəliş tövsiyələri al.", "Review the video before publishing: get actionable notes on the opening seconds, pacing, composition, on-screen text, and audio/transcript.", "Проверь видео до публикации и получи конкретные рекомендации по первым секундам, темпу, композиции, экранному тексту и аудио/транскрипту."],
    ["Bizim yanaşmamız", "Our approach", "Наш подход"],
    ["Bizim fərqimiz", "Our difference", "Наше отличие"],
    ["Hazır MP4/MOV videonun ilk saniyələri, montaj ritmi, ekrandakı yazı və səs kimi hissələrini də nəzərdən keçirmək.", "Review the opening seconds, editing pace, on-screen text, and audio of a finished MP4/MOV video.", "Проверять первые секунды, темп монтажа, экранный текст и звук готового видео MP4/MOV."],
    ["Kontent əməliyyatlarını bütövlükdə idarə etmək əvəzinə, yayımdan əvvəlki konkret videonun keyfiyyət yoxlamasına fokuslanmaq.", "Focus on reviewing a specific video before publishing, rather than running the entire content operation.", "Сосредоточиться на проверке конкретного видео перед публикацией, а не на управлении всем контент-процессом."],
    ["İdeyadan sonra yaranan faktiki video faylını vizual, audio və montaj baxımından yayıma hazırlamaq.", "Prepare the actual video file for publishing by reviewing visuals, audio, and editing after the idea stage.", "Подготовить готовый видеофайл к публикации, проверив визуальную часть, звук и монтаж после этапа идеи."],
    ["Video auditi + istifadəçinin öz əvvəlki post tarixçəsi (CSV ilə) + izah edilən tövsiyələr — bir iş axınında.", "Video review + the user's own past post history (via CSV) + explainable recommendations in one workflow.", "Проверка видео + собственная история публикаций пользователя (через CSV) + понятные рекомендации в одном процессе."],
    ["Video Lab-ı sına ↗", "Try Video Lab ↗", "Открыть Video Lab ↗"],
    ["MƏHSUL STRATEGİYASI", "PRODUCT STRATEGY", "ПРОДУКТОВАЯ СТРАТЕГИЯ"],
    ["Viral olacağına söz vermə. Nəyi yaxşılaşdırmaq lazım olduğunu göstər.", "Don't promise virality. Show what can be improved.", "Не обещай вирусность. Покажи, что можно улучшить."],
    ["İlk saniyələrdən səsə qədər yoxlama apar, düzəliş et və imkan olduqda öz keçmiş nəticələrinlə müqayisə et. Real gələcək performans proqnozu üçün isə kifayət qədər keyfiyyətli tarixçə və kalibrasiya edilmiş model tələb olunur.", "Review everything from the opening seconds to audio, make edits, and compare with your own history where available. A reliable future-performance forecast requires sufficient historical data and a calibrated model.", "Проверь всё — от первых секунд до звука, внеси правки и при наличии данных сравни с собственной историей. Для надёжного прогноза будущих результатов нужны достаточная история и откалиброванная модель."],
    ["İlk 3 saniyə", "First 3 seconds", "Первые 3 секунды"],
    ["Montaj ritmi", "Editing pace", "Темп монтажа"],
    ["Ekran mətni", "On-screen text", "Текст на экране"],
    ["Səs / transkript", "Audio / transcript", "Аудио / транскрипт"],
    ["CSV tarixçəsi", "CSV history", "История в CSV"],
    ["Müqayisə açıq Y Combinator profillərində təsvir olunan məhsul fokusuna əsaslanır. Şirkət statusları mənbələrdə göstərildiyi kimidir; şirkətlərin öz nəticə iddiaları müstəqil audit olunmayıb. Signal Studio-nun nəticələri də real view/viral proqnozu kimi təqdim edilmir.", "This comparison is based on product descriptions in public Y Combinator profiles. Company statuses reflect those profiles; company-reported results have not been independently audited. Signal Studio outputs are not presented as actual view or virality forecasts.", "Сравнение основано на описаниях продуктов в открытых профилях Y Combinator. Статусы соответствуют этим профилям; заявленные компаниями результаты не проходили независимый аудит. Результаты Signal Studio также не выдаются за реальный прогноз просмотров или вирусности."],
    ["MƏHSUL STRATEGİYASI / RƏQABƏT XƏRİTƏSİ", "PRODUCT STRATEGY / COMPETITIVE LANDSCAPE", "ПРОДУКТОВАЯ СТРАТЕГИЯ / КАРТА КОНКУРЕНТОВ"],
    ["Yoxlanılıb · 19.10.2026", "Checked · 19 Oct 2026", "Проверено · 19.10.2026"],
    ["OUR PRODUCT WEDGE", "OUR PRODUCT WEDGE", "НАША ПРОДУКТОВАЯ НИША"],
    ["Yayımdan əvvəl videonun zəif nöqtəsini tap.", "Find the weak spots before the video goes live.", "Найди слабые места видео до публикации."],
    ["Biz ideya generatoru və ya bütün kontent əməliyyatlarını idarə edən platforma olmağa çalışmırıq. Fokusumuz — hazır videonun keyfiyyətini təhlil edib növbəti addımı konkretləşdirməkdir.", "We're not trying to be an idea generator or run the whole content operation. We focus on evaluating a finished video and making the next edit clear.", "Мы не стремимся быть генератором идей или управлять всем контент-процессом. Наша цель — оценить готовое видео и определить следующий шаг."],
    ["Mövzu, başlıq və thumbnail seçimləri ilə yükləmədən əvvəl nəticələri qiymətləndirməyə fokuslanır.", "Focuses on estimating outcomes before upload through topic, title, and thumbnail choices.", "Оценивает возможный результат до загрузки на основе темы, заголовка и обложки."],
    ["Yaradıcıya uyğun kontentin anlayışı, fərdiləşdirilməsi və paylanmasına fokuslanır.", "Focuses on understanding, personalizing, and distributing creator-specific content.", "Сосредоточен на анализе, персонализации и распространении контента для автора."],
    ["Hansı marketinq ideyasının auditoriyaya uyğun ola biləcəyini təxmin edir, yaratma və yayım prosesini də birləşdirir.", "Estimates which marketing ideas may fit an audience and also brings creation and publishing into the workflow.", "Оценивает, какие маркетинговые идеи могут подойти аудитории, и объединяет создание с публикацией."],
    ["İlk saniyələr, vizual aydınlıq, ekrandakı mətn, montaj tempi, audio/transkript və növbəti düzəlişlər.", "Opening seconds, visual clarity, on-screen text, editing pace, audio/transcript, and the next improvements.", "Первые секунды, визуальная ясность, текст на экране, темп монтажа, аудио/транскрипт и следующие правки."],
    ["HAZIR VİDEO ÜÇÜN YOXLAMA", "REVIEW FOR FINISHED VIDEOS", "ПРОВЕРКА ГОТОВОГО ВИДЕО"],
    ["İş axını", "Workflow", "Рабочий процесс"],
    ["Video review + öz CSV post tarixçən + konkret tövsiyələr.", "Video review + your own CSV post history + actionable recommendations.", "Проверка видео + собственная история постов в CSV + конкретные рекомендации."],
    ["Mənbəni aç ↗", "Open source ↗", "Открыть источник ↗"],
    ["Etibarlılıq prinsipi", "Trust principle", "Принцип достоверности"],
    ["Keyfiyyət balı gələcək baxış sayı deyil. Güclü performans proqnozu üçün öz tarixçəndən kifayət qədər məlumat və model kalibrasiyası lazımdır. Mənbələrdəki rəqib statusları Y Combinator profillərindən götürülüb.", "A quality score is not a forecast of future views. Strong performance forecasting requires sufficient data from your own history and model calibration. Competitor statuses are taken from Y Combinator profiles.", "Оценка качества — не прогноз будущих просмотров. Для качественного прогноза нужны достаточные данные из собственной истории и калибровка модели. Статусы конкурентов взяты из профилей Y Combinator."],
    ["RƏQABƏT XƏRİTƏSİ", "COMPETITIVE LANDSCAPE", "КАРТА КОНКУРЕНТОВ"],
    ["YC W23 · QEYRİ-AKTİV", "YC W23 · INACTIVE", "YC W23 · НЕАКТИВЕН"],
    ["YARADICI KONTENT İŞ AXINI", "CREATOR CONTENT WORKFLOW", "КОНТЕНТ-ПРОЦЕСС АВТОРА"],
    ["VİDEONUN YAYIMDAN ƏVVƏL YOXLAMASI", "PRE-PUBLISH VIDEO REVIEW", "ПРОВЕРКА ВИДЕО ДО ПУБЛИКАЦИИ"],
    ["MƏHSULUN STRATEJİ FOKUSU", "OUR PRODUCT FOCUS", "НАШ ПРОДУКТОВЫЙ ФОКУС"],
    ["YOUTUBE BAŞLIQ / ÜZLÜK", "YOUTUBE TITLE / THUMBNAIL", "ЗАГОЛОВОК / ОБЛОЖКА YOUTUBE"],
    ["MARKETİNQ İDEYASI / NORN", "MARKETING IDEA / NORN", "МАРКЕТИНГОВАЯ ИДЕЯ / NORN"],
    ["Yoxlanılıb · 19.10.2026", "Checked · 19 Oct 2026", "Проверено · 19.10.2026"],
    ["GİRİŞ", "HOOK", "ЗАЦЕПКА"],
    ["RİTM", "PACE", "ТЕМП"],
    ["SƏS", "AUDIO", "АУДИО"],
    ["MƏTN", "TEXT", "ТЕКСТ"],
    ["Bizim məhsul fərqimiz.", "Our product edge.", "Наше продуктовое отличие."],
    ["YC profilində şirkətin bildirdiyi", "Company-reported on its YC profile", "По данным компании в профиле YC"],
    ["2B baxış · 4M izləyici artımı · son 2 ay", "2B views · 4M follower gains · last 2 months", "2 млрд просмотров · +4 млн подписчиков · за последние 2 месяца"],
    ["Təsisçilərin YC launch açıqlamasına görə", "According to the founders' YC launch post", "По словам основателей в публикации YC"],
    ["2,000+ biznes · $2M ARR · ilk 6 ay", "2,000+ businesses · $2M ARR · first 6 months", "Более 2 000 компаний · $2 млн ARR · за первые 6 месяцев"],
    ["Y Combinator profili ↗", "Y Combinator profile ↗", "Профиль Y Combinator ↗"],
    ["Video Lab-ı sına ↗", "Try Video Lab ↗", "Попробовать Video Lab ↗"],
    ["Video Lab-a keç ↗", "Open Video Lab ↗", "Перейти в видеолабораторию ↗"],
    ["Clicks", "Clicks", "Клики"],
    ["Awareness", "Brand awareness", "Узнаваемость бренда"],
    ["Storytelling", "Storytelling", "Сторителлинг"],
    ["Freelancer / mütəxəssis", "Freelancer / specialist", "Фрилансер / специалист"],
    ["və ya", "or", "или"],
    ["və", "and", "и"],
    ["üçün", "for", "для"],
    ["ilə", "with", "с"],
    ["amma", "but", "но"]
  );
  // Hide retired competitive-comparison copy from the translation table.
  const retiredPositioningCopy = /^(CreatorML|Grocalo|Native|Y Combinator profili ↗|RƏQABƏT XƏRİTƏSİ|YC W23 · QEYRİ-AKTİV|YC S26 · AKTİV|YC F26 · AKTİV|MÜQAYİSƏ AÇIQ|Biz sadəcə ideyanı seçmirik\.)/i;
  for (let i = entries.length - 1; i >= 0; i--) if (retiredPositioningCopy.test(entries[i][0] || '')) entries.splice(i, 1);
  entries.push(
    ["YAYIMDAN ƏVVƏL YOXLAMA", "PRE-PUBLISH REVIEW", "ПРОВЕРКА ПЕРЕД ПУБЛИКАЦИЕЙ"],
    ["Sadəcə bal yox.", "More than a score.", "Больше, чем оценка."],
    ["Nəyi düzəltməli olduğunu gör.", "See what to improve.", "Узнай, что улучшить."],
    ["Videonu paylaşmazdan əvvəl əsas zəif nöqtələri tap, konkret tövsiyə al və imkan olduqda nəticələrini öz post tarixçənlə kontekstdə qiymətləndir.", "Find key weaknesses before publishing, get practical recommendations, and put results in context with your own post history when available.", "Найди слабые места до публикации, получи практические рекомендации и сопоставь результаты со своей историей публикаций, если она есть."],
    ["Video auditi", "Video review", "Анализ видео"],
    ["İlk kadr, vizual aydınlıq və seçilmiş kadrlar əsasında montaj ritmi barədə rəy.", "Feedback on the opening frame, visual clarity, and editing pace from sampled frames.", "Оценка первого кадра, визуальной ясности и темпа монтажа по выбранным кадрам."],
    ["Yazı və danışıq", "Text and speech", "Текст и речь"],
    ["Ekrandakı yazıların görünüşü və mövcud audio transkriptinə əsasən mesajın aydınlığı.", "On-screen text readability and message clarity based on the available audio transcript.", "Читаемость экранного текста и ясность сообщения по доступной аудиорасшифровке."],
    ["Öz məlumatların", "Your own data", "Твои данные"],
    ["CSV ilə post tarixçəni əlavə et; hesabatlarda öz real nəticələrini və platforma fərqlərini gör.", "Import your post history from CSV and see your actual results and platform differences in reports.", "Импортируй историю публикаций из CSV и смотри реальные результаты и различия между платформами в отчётах."],
    ["Vacib:", "Important:", "Важно:"],
    ["keyfiyyət balı gələcək baxış və ya viral olma proqnozu deyil. Tövsiyələr videoda görünən materiala və mövcud mətnə əsaslanır.", "the quality score is not a forecast of future views or virality. Recommendations are based on visible video content and available text.", "оценка качества не предсказывает будущие просмотры или вирусность. Рекомендации основаны на видимом содержимом видео и доступном тексте."],
    ["Bu gün nə yaratmaq istəyirsən?", "What would you like to create today?", "Что хочешь создать сегодня?"],
    ["Mətni və ya videonu yoxla, tövsiyələri al, sonra nəticəni saxla.", "Review your text or video, get recommendations, and save the result.", "Проверь текст или видео, получи рекомендации и сохрани результат."],
    ["Videonu yoxla", "Review a video", "Проверить видео"],
    ["Mətn analizi", "Text review", "Анализ текста"],
    ["Hook, oxunaqlılıq və çağırışı yoxla.", "Check the hook, readability, and call to action.", "Проверь зацепку, читаемость и призыв к действию."],
    ["Video analizi", "Video review", "Анализ видео"],
    ["Kadrları, ekrandakı yazını və danışığı yoxla.", "Review frames, on-screen text, and speech.", "Проверь кадры, текст на экране и речь."],
    ["Nəticələri əlavə et", "Import results", "Добавить результаты"],
    ["CSV yüklə və öz statistikana bax.", "Import a CSV to review your own metrics.", "Загрузи CSV и посмотри свою статистику."],
    ["Sənin nəticələrin", "Your results", "Твои результаты"],
    ["Yalnız əlavə etdiyin real məlumatlar göstərilir.", "Only real data you have added is shown.", "Показываются только добавленные тобой реальные данные."],
    ["Hələ statistika əlavə edilməyib", "No metrics added yet", "Пока нет добавленных метрик"],
    ["CSV faylını yükləyərək postlarının göstəricilərini izləməyə başla.", "Upload a CSV to start tracking your post metrics.", "Загрузи CSV, чтобы начать отслеживать метрики публикаций."],
    ["Son ideyaların", "Recent ideas", "Последние идеи"],
    ["Saxladığın kontent və analizlər.", "Content and analyses you have saved.", "Сохранённые материалы и анализы."],
    ["Groq API açarı qurulmayıb", "Groq API key is not configured", "API-ключ Groq не настроен"],
    ["Groq AI qoşulub", "Groq AI is connected", "Groq AI подключён"],
    ["Groq Vision hazırdır; FFmpeg ayrıca yoxlanılır", "Groq Vision is configured; FFmpeg is checked separately", "Groq Vision настроен; FFmpeg проверяется отдельно"],
    ["GROQ_API_KEY və FFmpeg tələb olunur", "GROQ_API_KEY and FFmpeg are required", "Требуются GROQ_API_KEY и FFmpeg"],
    ["Video analizi üçün .env faylında GROQ_API_KEY qurulmalıdır.", "Set GROQ_API_KEY in .env to analyze videos.", "Укажи GROQ_API_KEY в .env для анализа видео."],
    ["AI analizi üçün serverdə GROQ_API_KEY;", "GROQ_API_KEY must be set on the server for AI analysis;", "Для анализа ИИ на сервере нужен GROQ_API_KEY;"],
    ["Groq API açarı tələb olunur;", "A Groq API key is required;", "Требуется API-ключ Groq;"],
    ["Groq Vision", "Groq Vision", "Groq Vision"]
  );
  entries.push(
    ["AI köməkçi", "AI assistant", "ИИ-помощник"],
    ["Plan və ödəniş", "Plans & billing", "Тарифы и оплата"],
    ["Gecə rejimi", "Night mode", "Ночной режим"],
    ["Videonu kadr-kadr təhlil et.", "Analyze your video frame by frame.", "Анализируй видео покадрово."],
    ["Sosial platformalar", "Social platforms", "Социальные платформы"],
    ["Kontent mənbələrini seç, paylaşımları topla və nəticələri vahid hesabatda izlə.", "Choose content sources, collect posts, and track results in one report.", "Выбирай источники контента, собирай публикации и отслеживай результаты в одном отчёте."],
    ["Kontent idxalı", "Content import", "Импорт контента"],
    ["Seçilən platformadan paylaşımları gətir və analitikaya əlavə et.", "Import posts from a selected platform and add them to analytics.", "Импортируй публикации с выбранной платформы и добавляй их в аналитику."],
    ["AI köməkçi", "AI assistant", "ИИ-помощник"],
    ["Kontent ideyaları, ssenarilər, hook-lar, CTA və kampaniya planları barədə sual ver.", "Ask about content ideas, scripts, hooks, CTAs, and campaign plans.", "Задавай вопросы об идеях контента, сценариях, зацепках, CTA и планах кампаний."],
    ["Hook-u gücləndir", "Improve the hook", "Усиль зацепку"],
    ["Kontent planı", "Content plan", "Контент-план"],
    ["CTA ideyaları", "CTA ideas", "Идеи CTA"],
    ["Salam! Hansı ideya, post və ya kampaniya üzərində işləyirik?", "Hi! Which idea, post, or campaign are we working on?", "Привет! Над какой идеей, публикацией или кампанией работаем?"],
    ["Sualını yaz və ya kontent mətnini əlavə et...", "Ask a question or paste your content...", "Задай вопрос или вставь текст контента..."],
    ["Göndər ↗", "Send ↗", "Отправить ↗"],
    ["İşinə uyğun plan seç", "Choose a plan for your workflow", "Выбери тариф для своей работы"],
    ["AI köməkçi limitləri və iş axınını ehtiyacına uyğun genişləndir.", "Choose the AI assistant capacity that fits your workflow.", "Выбери объём возможностей ИИ-помощника под свои задачи."],
    ["BAŞLANĞIC", "STARTER", "СТАРТОВЫЙ"],
    ["GÜNDƏLİK İŞ AXINI", "EVERYDAY WORKFLOW", "ЕЖЕДНЕВНАЯ РАБОТА"],
    ["PEŞƏKAR İŞ", "PROFESSIONAL WORK", "ПРОФЕССИОНАЛЬНАЯ РАБОТА"],
    ["İdeyalarını sınamaq və gündəlik kontent işləri üçün.", "For exploring ideas and everyday content tasks.", "Для проверки идей и повседневных задач с контентом."],
    ["Daha çox ideya və davamlı kontent istehsalı üçün.", "For more ideas and a steady content workflow.", "Для большего количества идей и постоянного производства контента."],
    ["Yüksək həcmli iş, mütəxəssislər və agentliklər üçün.", "For high-volume work, specialists, and agencies.", "Для больших объёмов работы, специалистов и агентств."],
    ["Gündə 10 AI köməkçi mesajı", "10 AI assistant messages per day", "10 сообщений ИИ-помощнику в день"],
    ["Gündə 100 AI köməkçi mesajı", "100 AI assistant messages per day", "100 сообщений ИИ-помощнику в день"],
    ["Gündə 400 AI köməkçi mesajı", "400 AI assistant messages per day", "400 сообщений ИИ-помощнику в день"],
    ["Abunəliyin idarəsi", "Manage subscription", "Управление подпиской"],
    ["Planını və ödəniş məlumatlarını təhlükəsiz ödəniş səhifəsində idarə et.", "Manage your plan and payment details on the secure billing page.", "Управляй тарифом и платёжными данными на защищённой странице оплаты."],
    ["Ödənişləri idarə et ↗", "Manage billing ↗", "Управлять оплатой ↗"],
    ["Ödəniş sistemi aktivdir.", "Billing is active.", "Оплата активна."],
    ["Planlar görünür; ödəniş mərhələsi hazırda əlçatan deyil.", "Plans are available; checkout is not configured yet.", "Тарифы доступны; оплата пока не настроена."],
    ["Cari plan", "Current plan", "Текущий тариф"],
    ["AI köməkçi hazırda cavab verə bilmir. Bir az sonra yenidən cəhd et.", "The AI assistant is temporarily unavailable. Please try again shortly.", "ИИ-помощник временно недоступен. Попробуй чуть позже."],
    ["Plan və ödəniş", "Plans & billing", "Тарифы и оплата"]
  );
  entries.push(
    ["Kontentdən qərara", "From content to decisions", "От контента к решениям"],
    ["Bir ideyanı inkişaf etdir.", "Develop one idea.", "Развивай одну идею."],
    ["Analiz et. Yaxşılaşdır. Planlaşdır.", "Analyze. Improve. Plan.", "Анализируй. Улучшай. Планируй."],
    ["Analizdən növbəti addıma", "From analysis to the next step", "От анализа к следующему шагу"],
    ["Vahid kontent iş axını", "One connected content workflow", "Единый процесс работы с контентом"],
    ["Kontent analizini sına", "Try content analysis", "Попробуй анализ контента"],
    ["Keyfiyyət göstəricisi", "Quality indicator", "Показатель качества"],
    ["Təhlil gözlənilir", "Waiting for analysis", "Ожидается анализ"],
    ["Mətn strukturu üzrə göstərici", "Text-structure indicator", "Показатель структуры текста"],
    ["Kontent analizi üçün geniş gündəlik limit", "Higher daily limit for content analysis", "Повышенный дневной лимит анализа контента"],
    ["Video Lab analizi və kontent idxalı", "Video Lab analysis and content import", "Анализ Video Lab и импорт контента"],
    ["Hesabat və CSV/JSON ixracı", "Reports and CSV/JSON exports", "Отчёты и экспорт CSV/JSON"],
    ["Yüksək həcmli kontent analizi", "High-volume content analysis", "Анализ контента в большом объёме"],
    ["Hesabat və məlumat ixracı", "Reports and data export", "Отчёты и экспорт данных"],
    ["Komanda və əməkdaşlıq iş sahəsi", "Team and collaboration workspace", "Рабочее пространство команды и совместной работы"],
    ["E-poçt göndərişi bu lokal mühitdə aktiv deyil. Təsdiq keçidi server jurnalında göstərilib.", "Email delivery is disabled in this local environment. The verification link is shown in the server log.", "Отправка писем в этой локальной среде отключена. Ссылка подтверждения показана в журнале сервера."],
    ["E-poçt göndərişi bu lokal mühitdə aktiv deyil. Yeni təsdiq keçidi server jurnalında göstərilib.", "Email delivery is disabled in this local environment. A new verification link is shown in the server log.", "Отправка писем в этой локальной среде отключена. Новая ссылка подтверждения показана в журнале сервера."],
    ["Təsdiq məktubunu göndərmək mümkün olmadı. Bir az sonra yenidən cəhd et.", "The confirmation email could not be sent. Please try again shortly.", "Не удалось отправить письмо для подтверждения. Попробуй ещё раз позже."],
    ["Təsdiq məktubu hazırda göndərilə bilmir. Bir az sonra yenidən cəhd et.", "The confirmation email is currently unavailable. Please try again shortly.", "Сейчас письмо для подтверждения недоступно. Попробуй ещё раз позже."],
    ["Təsdiq məktubu üçün göndərici məlumatı təsdiqlənməyib. Bir az sonra yenidən cəhd et.", "The sender for the confirmation email has not been verified. Please try again shortly.", "Отправитель письма подтверждения не проверен. Попробуй ещё раз позже."],
    ["Təsdiq məktubu göndərilə bilmədi. Bir az sonra yenidən cəhd et.", "The confirmation email could not be sent. Please try again shortly.", "Не удалось отправить письмо для подтверждения. Попробуй ещё раз позже."],
    ["E-poçt xidməti hazırda təsdiq sorğusunu qəbul etmir. Bir az sonra yenidən cəhd et.", "The email service cannot accept the confirmation request right now. Please try again shortly.", "Почтовый сервис сейчас не принимает запрос подтверждения. Попробуй ещё раз позже."],
    ["Təsdiq məktubu üçün göndərici ünvanı təsdiqlənməyib. Bir az sonra yenidən cəhd et.", "The sender address for the confirmation email has not been verified. Please try again shortly.", "Адрес отправителя письма подтверждения не проверен. Попробуй ещё раз позже."],
    ["Bu şəbəkədən yeni hesab yaratmaq hazırda mümkün olmadı. Bir az sonra yenidən cəhd et və ya dəstəklə əlaqə saxla.", "A new account could not be created from this network right now. Please try again later or contact support.", "Сейчас не удалось создать новый аккаунт из этой сети. Попробуй позже или свяжись с поддержкой."],
    ["Qeydiyyat xidmətində texniki sazlama problemi var. Bir az sonra yenidən cəhd et; problem davam edərsə dəstəklə əlaqə saxla.", "There is a configuration issue with registration. Please try again later; contact support if it continues.", "В настройке регистрации возникла техническая проблема. Попробуй позже; если проблема сохранится, обратись в поддержку."],
    ["Qeydiyyat xidməti hazırda əlçatan deyil. Bir az sonra yenidən cəhd et; problem davam edərsə dəstəklə əlaqə saxla.", "Registration is currently unavailable. Please try again later; contact support if it continues.", "Регистрация сейчас недоступна. Попробуй позже; если проблема сохранится, обратись в поддержку."],
    ["Qeydiyyat xidmətinə qoşulmaq mümkün olmadı. Bir az sonra yenidən cəhd et; problem davam edərsə dəstəklə əlaqə saxla.", "Could not connect to registration. Please try again later; contact support if it continues.", "Не удалось подключиться к регистрации. Попробуй позже; если проблема сохранится, обратись в поддержку."],
    ["Qeydiyyat xidmətinin ünvanı təsdiqlənmədi. Bir az sonra yenidən cəhd et; problem davam edərsə dəstəklə əlaqə saxla.", "The registration service address could not be verified. Please try again later; contact support if it continues.", "Не удалось подтвердить адрес сервиса регистрации. Попробуй позже; если проблема сохранится, обратись в поддержку."]
  );
  entries.push(
    ["Proqnoz laboratoriyası", "Prediction Lab", "Лаборатория прогнозирования"],
    ["Video laboratoriyası", "Video Lab", "Видеолаборатория"],
    ["Trend araşdırması", "Trend Explorer", "Исследование трендов"],
    ["Məzmun analitikası", "Content analytics", "Аналитика контента"],
    ["Məzmun kitabxanası", "Content library", "Библиотека контента"],
    ["Məzmun", "Content", "Контент"],
    ["Paylaşım", "Post", "Публикация"],
    ["Paylaşımlar", "Posts", "Публикации"],
    ["Paylaşım tarixçəsi", "Post history", "История публикаций"],
    ["Qarşılıqlı əlaqə", "Engagement", "Вовлечённость"],
    ["Qarşılıqlı əlaqə indeksi", "Engagement score", "Индекс вовлечённости"],
    ["Qarşılıqlı əlaqə faizi", "Engagement rate", "Уровень вовлечённости"],
    ["Auditoriya əhatəsi", "Reach", "Охват аудитории"],
    ["Keçidlərə kliklər", "Clicks", "Клики по ссылкам"],
    ["Brendin tanınması", "Brand awareness", "Узнаваемость бренда"],
    ["Diqqətçəkən giriş", "Opening hook", "Цепляющее начало"],
    ["Giriş cümləsi", "Opening line", "Начальная фраза"],
    ["Hərəkətə çağırış", "Call to action", "Призыв к действию"],
    ["Giriş · Mesaj · Çağırış", "Hook · Message · Call to action", "Зацепка · Сообщение · Призыв"],
    ["Süni intellekt", "Artificial intelligence", "Искусственный интеллект"],
    ["Süni intellekt köməkçisi", "AI assistant", "ИИ-помощник"],
    ["Signal köməkçisi", "Signal assistant", "Помощник Signal"],
    ["İdeyanı birlikdə böyüdək", "Let's grow your idea together", "Давайте вместе развивать вашу идею"],
    ["Hazırdır · Azərbaycan dilində danış", "Ready · Chat in Azerbaijani", "Готов · Общайтесь на азербайджанском"],
    ["Salam! ✨ Mətnini yaxşılaşdırmaq, video ssenarisi qurmaq və ya kontent planı hazırlamaq üçün mənə yaz.", "Hi! ✨ Ask me to improve your copy, shape a video script, or build a content plan.", "Привет! ✨ Попроси меня улучшить текст, подготовить сценарий видео или составить контент-план."],
    ["Sualını buraya yaz...", "Write your question here...", "Напиши свой вопрос здесь..."],
    ["Mesajın", "Your message", "Твоё сообщение"],
    ["Mesajı göndər", "Send message", "Отправить сообщение"],
    ["Şəxsi məlumatlarını yazmamağa çalış.", "Avoid including personal information.", "Старайся не указывать личные данные."],
    ["Giriş fikirləri", "Hook ideas", "Идеи для начала"],
    ["Həftəlik plan", "Weekly plan", "План на неделю"],
    ["Sual vermək üçün hesabına daxil ol", "Sign in to ask a question", "Войди, чтобы задать вопрос"],
    ["Xoş gəldin! ✨", "Welcome! ✨", "Добро пожаловать! ✨"],
    ["Gəl iş məkanını birlikdə tanıyaq. Bu qısa tur səni əsas səhifələrdən keçirəcək; istənilən vaxt keçə və ya əvvəlki addıma qayıda bilərsən.", "Let's explore your workspace together. This quick tour covers the main pages; you can skip it or go back at any time.", "Давай вместе изучим рабочее пространство. Этот тур познакомит с основными разделами; его можно пропустить или вернуться назад."],
    ["1. İcmal paneli", "1. Overview dashboard", "1. Панель обзора"],
    ["Burada əsas göstəricilərini, saxladığın ideyaları və tez-tez istifadə olunan alətləri görəcəksən. Real məlumatların əlavə edilməyənə qədər rəqəmlər nümunə kimi göstərilmir.", "See your key metrics, saved ideas, and common tools here. No sample metrics are shown until you add real data.", "Здесь собраны ключевые показатели, сохранённые идеи и основные инструменты. Примерные показатели не отображаются, пока ты не добавишь реальные данные."],
    ["2. Mətn təhlili", "2. Text analysis", "2. Анализ текста"],
    ["Paylaşım mətnini, platformanı və məqsədi seç. Sistem mətnin başlanğıcını, aydınlığını və çağırışını qiymətləndirir; bu bal viral olma zəmanəti deyil.", "Choose your post text, platform, and goal. The system reviews the opening, clarity, and call to action; this score does not guarantee virality.", "Выбери текст публикации, платформу и цель. Система оценит начало, ясность и призыв к действию; эта оценка не гарантирует вирусный охват."],
    ["3. Video təhlili", "3. Video analysis", "3. Анализ видео"],
    ["Videonu əlavə edərək ilk kadrları, yazıları və dəstəklənən audio məlumatlarını yoxla. Bu imkan hesab planından asılı ola bilər.", "Upload a video to review its opening frames, on-screen text, and supported audio information. Availability depends on your plan.", "Загрузи видео, чтобы проверить первые кадры, текст на экране и поддерживаемые аудиоданные. Доступность зависит от тарифа."],
    ["4. Trend araşdırması", "4. Trend research", "4. Исследование трендов"],
    ["Mövzu, sahə və region seçərək aktual siqnalları araşdır. Mənbədən gələn faktiki nəticələrlə süni intellekt tövsiyələri bir-birindən ayrılır.", "Choose a topic, industry, and region to explore current signals. Source results are kept distinct from AI suggestions.", "Выбери тему, отрасль и регион, чтобы изучить актуальные сигналы. Данные источников отделяются от рекомендаций ИИ."],
    ["5. Platforma məlumatları", "5. Platform data", "5. Данные платформ"],
    ["Dəstəklənən platformalarda açıq paylaşımları axtar, uyğun məlumatları gətir və nəticələrini hesabatlarda istifadə et. Bəzi mənbələr əlavə hesab və xərc tələb edə bilər.", "Search public posts on supported platforms, import relevant data, and use it in reports. Some sources may require an additional account or incur costs.", "Ищи открытые публикации на поддерживаемых платформах, загружай данные и используй их в отчётах. Для некоторых источников может понадобиться отдельный аккаунт или оплата."],
    ["6. Hesabatlar", "6. Reports", "6. Отчёты"],
    ["Həftəlik, aylıq və illik dövrləri seç. Öz statistikalarını CSV faylı ilə yüklə, qrafikləri və nəticələri nəzərdən keçir.", "Choose weekly, monthly, or yearly periods. Upload your metrics in a CSV file and review charts and findings.", "Выбирай недельный, месячный или годовой период. Загружай статистику в CSV и изучай графики и выводы."],
    ["7. Məzmun kitabxanası", "7. Content library", "7. Библиотека контента"],
    ["Təhlil etdiyin və sonradan istifadə etmək istədiyin ideyaları saxla, axtar və yenidən işə qaytar.", "Save ideas you have analyzed, search them later, and bring them back into your workflow.", "Сохраняй проанализированные идеи, находи их позже и возвращай в рабочий процесс."],
    ["8. Komanda və biznes", "8. Team and business", "8. Команда и бизнес"],
    ["Şirkət, agentlik və yaradıcı profilləri ilə əməkdaşlıq məkanı qur. Bu bölmənin bəzi imkanları Pro planı tələb edir.", "Create a collaboration space for companies, agencies, and creators. Some features in this section require the Pro plan.", "Создай пространство для компаний, агентств и авторов. Для некоторых функций этого раздела нужен тариф Pro."],
    ["9. Dəvətlər və mükafatlar", "9. Referrals and rewards", "9. Приглашения и награды"],
    ["Şəxsi dəvət keçidini paylaş, təsdiqlənmiş dəvətlərini izlə və qaydalara uyğun xallar topla.", "Share your referral link, track verified invitations, and collect points according to the rules.", "Делись реферальной ссылкой, отслеживай подтверждённые приглашения и получай баллы по правилам."],
    ["10. Hesab tənzimləmələri", "10. Account settings", "10. Настройки аккаунта"],
    ["Hesab məlumatlarına və bağlantıların vəziyyətinə bax. Məxfi giriş açarları iş məkanında göstərilmir.", "Review your account details and connection status. Secret access keys are not shown in the workspace.", "Проверяй данные аккаунта и состояние подключений. Секретные ключи доступа не отображаются в рабочем пространстве."],
    ["11. Plan və ödəniş", "11. Plans and billing", "11. Тарифы и оплата"],
    ["Pulsuz, Go və Pro planlarının fərqini müqayisə et. Ödənişi yalnız Stripe-ın təhlükəsiz səhifəsində test rejimindən başlayaraq yoxla.", "Compare Free, Go, and Pro plans. Test checkout first and only on Stripe's secure payment page.", "Сравни тарифы Free, Go и Pro. Сначала проверяй оплату в тестовом режиме и только на защищённой странице Stripe."],
    ["12. Köməkçi həmişə yanındadır", "12. Your assistant is always nearby", "12. Помощник всегда рядом"],
    ["Sağ aşağı küncdəki düymə ilə süni intellekt köməkçisini istənilən səhifədən aça bilərsən. Mətn, video ssenarisi, ideya və planlar barədə sual ver.", "Open the AI assistant from any page using the button in the bottom-right corner. Ask about copy, video scripts, ideas, and plans.", "Открывай ИИ-помощника на любой странице с помощью кнопки в правом нижнем углу. Спрашивай о текстах, сценариях, идеях и планах."],
    ["Hazırsan! 🎉", "You're all set! 🎉", "Всё готово! 🎉"],
    ["Tur tamamlandı. İstənilən bölməyə soldakı menyudan keçə bilərsən. Bu tur həmin hesab üçün bir dəfə göstəriləcək.", "Tour complete. Use the left menu to visit any section. This tour will only appear once for this account.", "Тур завершён. Переходи к разделам через меню слева. Для этого аккаунта тур появится только один раз."],
    ["Növbəti ↗", "Next ↗", "Далее ↗"],
    ["Geri", "Back", "Назад"],
    ["Turu keç", "Skip tour", "Пропустить тур"],
    ["Tamamla ✓", "Finish ✓", "Завершить ✓"],
    ["Təhlillər", "Analytics", "Аналитика"],
    ["Saxlanmış ideyalar", "Saved ideas", "Сохранённые идеи"],
    ["Mövzu ideyalarını bir yerə topla.", "Gather topic ideas in one place.", "Собирай идеи тем в одном месте."],
    ["Məzmun üçün vahid iş məkanı", "One workspace for content", "Единое рабочее пространство для контента"],
    ["Təhlil tamamlandı", "Analysis complete", "Анализ завершён"],
    ["İş məkanı", "Workspace", "Рабочее пространство"],
    ["İcmal paneli", "Overview dashboard", "Панель обзора"],
    ["Mətn analizi", "Text analysis", "Анализ текста"],
    ["Video analizi", "Video analysis", "Анализ видео"],
    ["Platforma məlumatları", "Platform data", "Данные платформ"],
    ["Məlumatların gətirilməsi", "Data import", "Загрузка данных"],
    ["Əməkdaşlıq iş məkanı", "Collaboration workspace", "Пространство для совместной работы"],
    ["Hesab və bağlantılar", "Account and connections", "Аккаунт и подключения"],
    ["İcma mükafatları", "Community rewards", "Награды сообщества"],
    ["Nəticə hesabatları", "Performance reports", "Отчёты о результатах"],
    ["Sosial məlumat laboratoriyası", "Social data lab", "Лаборатория социальных данных"],
    ["Sərbəst mütəxəssis", "Freelancer / specialist", "Фрилансер / специалист"],
    ["Pulsuz plan", "Free plan", "Бесплатный тариф"],
    ["İxrac", "Export", "Экспорт"],
    ["Yüklə", "Import", "Загрузить"],
    ["Açıq paylaşım", "Public post", "Публичная публикация"],
    ["Açıq səhifə", "Public Page", "Публичная страница"]
  );
  entries.push(
    ["Bir ideyanın hara gedə biləcəyini kəşf et. Mövzu siqnallarını araşdır, məzmununu təkmilləşdir və komandanla daha ağıllı qərarlar ver.", "Discover where an idea can go. Explore topic signals, improve your content, and make smarter decisions with your team.", "Узнай, куда может привести идея. Изучай сигналы тем, улучшай контент и принимай более взвешенные решения вместе с командой."],
    ["Məzmun təhlilini sına", "Try content analysis", "Попробуй анализ контента"],
    ["Məzmun işini daha ağıllı qurmağa başla.", "Start building a smarter content workflow.", "Начни выстраивать более разумный процесс работы с контентом."],
    ["Saxladığın məzmun və təhlillər.", "Your saved content and analyses.", "Сохранённый контент и анализы."],
    ["Məzmun mənbələrini seç, paylaşımları topla və nəticələri vahid hesabatda izlə.", "Choose content sources, collect posts, and track results in one report.", "Выбирай источники контента, собирай публикации и отслеживай результаты в одном отчёте."],
    ["Məzmunun yüklənməsi", "Content import", "Загрузка контента"],
    ["Məzmun müəllifi", "Content creator", "Автор контента"],
    ["Məzmununu təhlil et", "Analyze your content", "Анализируй свой контент"],
    ["Məzmununu daxil et", "Add your content", "Добавь свой контент"],
    ["Məzmununu təkmilləşdir", "Improve your content", "Улучшай свой контент"],
    ["məzmununu təkmilləşdir", "improve your content", "улучшай свой контент"],
    ["Məzmun iş axını", "Content workflow", "Процесс работы с контентом"],
    ["Məzmun ideyaları", "Content ideas", "Идеи контента"],
    ["Məzmun planları", "Content plans", "Контент-планы"],
    ["Məzmun planı", "Content plan", "Контент-план"],
    ["Məzmun ideyası", "Content idea", "Идея контента"],
    ["Yeni məzmun ideyası", "New content idea", "Новая идея контента"],
    ["Məzmun təhlili hazırdır", "Content analysis is ready", "Анализ контента готов"],
    ["Məzmunu təhlil etmək mümkün olmadı.", "Could not analyze the content.", "Не удалось проанализировать контент."],
    ["Təhlil üçün məzmun daxil et.", "Enter content to analyze.", "Добавь контент для анализа."],
    ["TƏHLİL NƏTİCƏSİ", "ANALYSIS RESULT", "РЕЗУЛЬТАТ АНАЛИЗА"],
    ["Təhlilə hazırdır", "Ready to analyze", "Готово к анализу"],
    ["Analiz üçün hazırdır", "Ready to analyze", "Готово к анализу"],
    ["Hələ məlumat yüklənməyib.", "No data has been imported yet.", "Данные пока не загружены."],
    ["Süni intellekt təhlili", "AI analysis", "Анализ ИИ"],
    ["Süni intellekt və məlumat təhlili tamamlandı.", "AI and data analysis completed.", "Анализ ИИ и данных завершён."],
    ["Orta qarşılıqlı əlaqə", "Average engagement", "Средняя вовлечённость"],
    ["Orta qarşılıqlı əlaqə faizi", "Average engagement rate", "Средний уровень вовлечённости"],
    ["Müştəri müraciətləri", "Leads", "Обращения клиентов"],
    ["Digər", "Other", "Другое"],
    ["Mövzu siqnalları", "Topic signals", "Сигналы тем"],
    ["Mövzu araşdırması", "Topic research", "Исследование тем"],
    ["Məzmun analitikası", "Content analytics", "Аналитика контента"],
    ["Video təhlili", "Video analysis", "Анализ видео"],
    ["Mövzu araşdırması", "Trend research", "Исследование трендов"],
    ["Videonun danışıq mətnini də çıxarmağa çalış (dəstəklənən alətlərdə; əlavə xərc yarana bilər).", "Try to extract the spoken transcript too (where supported; extra costs may apply).", "Попробуй также извлечь расшифровку речи (если поддерживается; возможны дополнительные расходы)."],
    ["Məzmun üçün vahid məkan", "One place for content", "Единое пространство для контента"],
    ["Mövzu ideyalarını bir yerə topla. Növbəti paylaşımını planlamaq üçün yeni istiqamətlər tap.", "Gather topic ideas and discover fresh angles for your next post.", "Собирай идеи тем и находи новые направления для следующей публикации."],
    ["Məzmun planlarını və ideyaları komanda ilə bir yerdə idarə et.", "Manage content plans and ideas together with your team.", "Управляй контент-планами и идеями вместе с командой."],
    ["Məzmun ideyalarını sistemləşdir, mətnini qiymətləndir və paylaşımını məqsədinə uyğunlaşdır.", "Organize content ideas, review copy, and align posts with your goals.", "Систематизируй идеи контента, оценивай тексты и согласовывай публикации с целями."],
    ["Signal köməkçisi", "Signal assistant", "Помощник Signal"],
    ["Hazırdır · 3 dildə danışır", "Ready · available in 3 languages", "Готов · доступен на 3 языках"],
    ["Salam! ✨ Mətnini yaxşılaşdırmaq, video ssenarisi qurmaq və ya məzmun planı hazırlamaq üçün mənə yaz.", "Hi! ✨ Ask me to improve your copy, shape a video script, or build a content plan.", "Привет! ✨ Попроси меня улучшить текст, подготовить сценарий видео или составить контент-план."],
    ["Məzmun üçün məsləhətçi", "Content guide", "Помощник по контенту"],
    ["Məzmun təhlili", "Content analysis", "Анализ контента"],
    ["Paylaşım", "Post", "Публикация"],
    ["Süni intellekt köməkçisi", "AI assistant", "ИИ-помощник"]
  );
  entries.push(
    ["Aktual mövzular", "Current topics", "Актуальные темы"],
    ["AKTUAL MÖVZULAR", "CURRENT TOPICS", "АКТУАЛЬНЫЕ ТЕМЫ"],
    ["Aktual mövzuların canlı mənbəyi", "Live source for current topics", "Источник актуальных тем в реальном времени"],
    ["Aktual mövzular hələ axtarılmayıb.", "Current topics have not been searched yet.", "Актуальные темы ещё не искали."],
    ["Aktual mövzuları yoxla", "Check current topics", "Проверить актуальные темы"],
    ["Mövzuları sahəmə uyğunlaşdır", "Tailor topics to my field", "Подобрать темы для моей сферы"],
    ["Dəqiq nəticə proqnozlaşdırmaq mümkün deyil; əsaslı müqayisə üçün əvvəlki paylaşımlarına aid kifayət qədər statistika lazımdır.", "An accurate outcome forecast is not possible; meaningful comparisons require enough data from your previous posts.", "Точный прогноз результата невозможен; для содержательного сравнения нужно достаточно статистики по предыдущим публикациям."],
    ["Məzmun keyfiyyəti", "Content quality", "Качество контента"],
    ["Məzmun nəticələri", "Content results", "Результаты контента"],
    ["Məzmun göstəricilərin", "Your content signals", "Показатели контента"],
    ["Məzmun təhlili", "Content analysis", "Анализ контента"],
    ["Məzmun yaradıcısı", "Content creator", "Автор контента"],
    ["Məzmun müəllifi", "Content creator", "Автор контента"],
    ["Məzmun planlarını və ideyaları komanda ilə bir yerdə idarə et.", "Manage content plans and ideas together with your team.", "Управляй контент-планами и идеями вместе с командой."],
    ["Məzmun təhlilini sına", "Try content analysis", "Попробуй анализ контента"],
    ["Məzmununu daxil et, platformanı və məqsədini seç.", "Add your content, choose a platform and goal.", "Добавь свой контент, выбери платформу и цель."],
    ["Bir ideyanın hara gedə biləcəyini kəşf et. Mövzu siqnallarını araşdır, məzmununu təkmilləşdir və komandanla daha ağıllı qərarlar ver.", "Discover where an idea can go. Explore topic signals, improve your content, and make smarter decisions with your team.", "Узнай, куда может привести идея. Изучай сигналы тем, улучшай контент и принимай более взвешенные решения вместе с командой."],
    ["Aktual mövzuları nişinə uyğunlaşdır", "Tailor current topics to your niche", "Подстрой актуальные темы под свою нишу"],
    ["axtarışda mövzuya maraq sosial platformalardakı baxış və paylaşım sayı ilə eyni deyil.", "Search interest in a topic is not the same as views and shares on social platforms.", "Интерес к теме в поиске — не то же самое, что просмотры и репосты в соцсетях."],
    ["Süni intellekt və məlumat təhlili tamamlandı.", "AI and data analysis completed.", "Анализ ИИ и данных завершён."],
    ["Süni intellekt konkret tövsiyə vermədi. Yenidən cəhd et.", "AI did not return a specific recommendation. Try again.", "ИИ не дал конкретной рекомендации. Попробуй ещё раз."],
    ["Süni intellekt tövsiyə hazırlayır…", "AI is preparing recommendations…", "ИИ готовит рекомендации…"],
    ["Təhlil üçün məzmun daxil et.", "Enter content to analyze.", "Добавь контент для анализа."],
    ["Məzmunu təhlil etmək mümkün olmadı.", "Could not analyze the content.", "Не удалось проанализировать контент."],
    ["Əvvəlcə məlumat gətir", "Fetch data first", "Сначала загрузи данные"],
    ["Məlumatlar yüklənir…", "Loading data…", "Загрузка данных…"]
  );
  entries.push(
    ["MƏZMUN TƏHLİLİ", "CONTENT ANALYSIS", "АНАЛИЗ КОНТЕНТА"],
    ["VİDEO TƏHLİLİ", "VIDEO ANALYSIS", "АНАЛИЗ ВИДЕО"],
    ["İDEYADAN TƏHLİLƏ · 01 / 03", "FROM IDEA TO ANALYSIS · 01 / 03", "ОТ ИДЕИ К АНАЛИЗУ · 01 / 03"],
    ["Mətnini daxil et, platformanı və məqsədini seç. Mətnin girişini, oxunaqlılığını və mesajının aydınlığını nəzərdən keçir.", "Add your text, choose a platform and goal. Review the opening, readability, and clarity of your message.", "Добавь текст, выбери платформу и цель. Оцени начало, читаемость и ясность сообщения."],
    ["Süni intellekt xidməti qurulmayıbsa, sistem aydın qaydalar əsasında yoxlama aparacaq. Bu, viral olma zəmanəti deyil.", "If no AI service is configured, the system will provide a rule-based review. This does not guarantee virality.", "Если сервис ИИ не настроен, система выполнит проверку по правилам. Это не гарантирует вирусный охват."],
    ["Dəqiq nəticə proqnozlaşdırmaq mümkün deyil; əsaslı müqayisə üçün əvvəlki paylaşımlarına aid kifayət qədər statistika lazımdır.", "An accurate outcome forecast is not possible; meaningful comparisons require enough data from your previous posts.", "Точный прогноз результата невозможен; для содержательного сравнения нужна достаточная статистика предыдущих публикаций."],
    ["Məzmun keyfiyyəti", "Content quality", "Качество контента"],
    ["Məzmun nəticələri", "Content results", "Результаты контента"],
    ["Məzmun göstəricilərin", "Your content signals", "Показатели контента"],
    ["Mövzu siqnallarını araşdır", "Explore topic signals", "Изучай сигналы тем"],
    ["Kontent siqnalın", "Your content signal", "Сигнал твоего контента"]
  );
  entries.push(["Proqnoz · Video · Aktual mövzular · Hesabatlar", "Prediction · Video · Current topics · Reports", "Прогноз · Видео · Актуальные темы · Отчёты"]);
  // Exact full-sentence mappings take priority over word-level translations and prevent mixed-language billing/chat copy.
  entries.push(
    ["Süni intellekt köməkçisi limitləri və iş axınını ehtiyacına uyğun genişləndir.", "Choose the AI assistant plan that fits your workflow.", "Выбери тариф ИИ-помощника под свой рабочий процесс."],
    ["İdeyalarını sınamaq və gündəlik məzmun işləri üçün.", "For exploring ideas and everyday content tasks.", "Для проверки идей и повседневных задач с контентом."],
    ["Daha çox ideya və davamlı məzmun istehsalı üçün.", "For more ideas and a steady content workflow.", "Для большего количества идей и постоянного производства контента."],
    ["Yüksək həcmli iş, mütəxəssislər və agentliklər üçün.", "For high-volume work, specialists, and agencies.", "Для больших объёмов работы, специалистов и агентств."],
    ["Gündə 10 Süni intellekt köməkçisi mesajı", "10 AI assistant messages per day", "10 сообщений ИИ-помощнику в день"],
    ["Gündə 100 Süni intellekt köməkçisi mesajı", "100 AI assistant messages per day", "100 сообщений ИИ-помощнику в день"],
    ["Gündə 400 Süni intellekt köməkçisi mesajı", "400 AI assistant messages per day", "400 сообщений ИИ-помощнику в день"],
    ["Proqnoz laboratoriyası və məzmun kitabxanası", "Prediction Lab and content library", "Лаборатория прогнозирования и библиотека контента"],
    ["Go planının bütün imkanları", "Everything included in the Go plan", "Все возможности тарифа Go"],
    ["Planını və ödəniş məlumatlarını təhlükəsiz ödəniş səhifəsində idarə et.", "Manage your plan and payment details on the secure billing page.", "Управляй тарифом и платёжными данными на защищённой странице оплаты."],
    ["Plan və ödəniş", "Plans and billing", "Тарифы и оплата"],
    ["Abunəliyin idarəsi", "Manage your subscription", "Управление подпиской"],
    ["Ödənişləri idarə et ↗", "Manage billing ↗", "Управлять оплатой ↗"],
    ["Sualını buraya yaz...", "Write your question here...", "Напиши свой вопрос здесь..."],
    ["Şəxsi məlumatlarını yazmamağa çalış.", "Avoid including personal information.", "Не указывай личные данные."],
    ["Signal köməkçisi", "Signal assistant", "Помощник Signal"],
    ["İdeyanı birlikdə böyüdək", "Let's grow your idea together", "Давайте вместе развивать вашу идею"],
    ["Hazırdır · Azərbaycan dilində danış", "Ready · Chat in Azerbaijani", "Готов · Общение на азербайджанском"],
    ["Salam! ✨ Mətnini yaxşılaşdırmaq, video ssenarisi qurmaq və ya kontent planı hazırlamaq üçün mənə yaz.", "Hi! ✨ Ask me to improve your copy, shape a video script, or build a content plan.", "Привет! ✨ Попроси меня улучшить текст, подготовить сценарий видео или составить контент-план."],
    ["Daxil ol", "Log in", "Войти"],
    ["İşıqlı rejimə keç", "Switch to light mode", "Переключить светлую тему"],
    ["Qaranlıq rejimə keç", "Switch to dark mode", "Переключить тёмную тему"]
  );
  // Brand-new cartoon companion and accessibility copy.
  entries.push(
    ["Köməkçini öz zövqünə uyğunlaşdır", "Make your helper your own", "Настрой помощника под себя"],
    ["SƏNİN KİÇİK KÖMƏKÇİN", "YOUR LITTLE HELPER", "ТВОЙ МАЛЕНЬКИЙ ПОМОЩНИК"],
    ["Köməkçinin adı", "Helper name", "Имя помощника"],
    ["Avatarını seç", "Choose an avatar", "Выбери аватар"],
    ["Köməkçi avatarı", "Helper avatar", "Аватар помощника"],
    ["Görünüşü saxla ✨", "Save appearance ✨", "Сохранить оформление ✨"],
    ["Mimo yeni görünüşünü gözləyir.", "Mimo is ready for a new look.", "Мимо ждёт новый образ."],
    ["Bu avatar xoşuna gəldi? Görünüşü saxlamağı unutma.", "Like this avatar? Remember to save your look.", "Нравится этот аватар? Не забудь сохранить образ."],
    ["Köməkçinin görünüşü saxlanıldı.", "Helper appearance saved.", "Внешний вид помощника сохранён."],
    ["İdeya dostun · birlikdə yaradaq", "Your idea buddy · let's create together", "Твой друг идей · давай создавать вместе"],
    ["Köməkçinin görünüşü saxlanıldı.", "Helper appearance saved.", "Внешний вид помощника сохранён."],
    ["Mimo yeni görünüşünü bəyəndi! ✨", "Mimo loves the new look! ✨", "Мимо нравится новый образ! ✨"],
    ["Sosial platformalar", "Social platforms", "Социальные платформы"],
    ["Məzmun mənbələrini seç, paylaşımları topla və nəticələri vahid hesabatda izlə.", "Choose content sources, collect posts, and track results in one report.", "Выбирай источники контента, собирай публикации и отслеживай результаты в одном отчёте."],
    ["TƏHLİLLƏR İŞ MƏKANI", "ANALYTICS WORKSPACE", "ПРОСТРАНСТВО АНАЛИТИКИ"],
    ["Məsələn: Mimo", "For example: Mimo", "Например: Мимо"],
    ["Gecə rejimi", "Dark mode", "Тёмная тема"],
    ["İşıqlı rejim", "Light mode", "Светлая тема"]
  );
  entries.push(
    ["Köməkçinin adını və görünüşünü seç. Seçimlərin bu brauzerdə, hesabın üçün yadda saxlanacaq.", "Choose your helper's name and appearance. Your preferences are saved in this browser for your account.", "Выбери имя и внешний вид помощника. Настройки сохраняются в этом браузере для твоего аккаунта."],
    ["Tülkü avatarı", "Fox avatar", "Аватар-лиса"], ["Pişik avatarı", "Cat avatar", "Аватар-кот"], ["Panda avatarı", "Panda avatar", "Аватар-панда"],
    ["Qurbağa avatarı", "Frog avatar", "Аватар-лягушка"], ["Təkbuynuzlu avatarı", "Unicorn avatar", "Аватар-единорог"],
    ["Ahtapot avatarı", "Octopus avatar", "Аватар-осьминог"], ["Ayı avatarı", "Bear avatar", "Аватар-медведь"], ["Robot avatarı", "Robot avatar", "Аватар-робот"],
    ["Bu avatar xoşuna gəldi? Görünüşü saxlamağı unutma.", "Like this avatar? Remember to save your look.", "Нравится этот аватар? Не забудь сохранить образ."],
    ["Mimo yeni görünüşünü gözləyir.", "Mimo is ready for a new look.", "Мимо ждёт новый образ."],
    ["Bu avatar xoşuna gəldi? Görünüşü saxlamağı unutma.", "Like this avatar? Remember to save your look.", "Нравится этот аватар? Не забудь сохранить образ."]
  );
  // v14 editorial copy: specific product language rather than generic launch slogans.
  entries.push(
    ["SOSİAL KONTENT ANALİTİKASI", "SOCIAL CONTENT ANALYTICS", "АНАЛИТИКА СОЦИАЛЬНОГО КОНТЕНТА"],
    ["MƏTN · VİDEO · HESABAT", "COPY · VIDEO · REPORTS", "ТЕКСТ · ВИДЕО · ОТЧЁТЫ"],
    ["Yayımdan əvvəl", "Before publishing", "Перед публикацией"],
    ["yoxla.", "review it.", "проверь."],
    ["Mətninin girişini, videonun ilk kadrlarını və çağırışını yoxla. Öz hesab statistikanı əlavə et; real nəticələri demo göstəricilərdən ayrı gör.", "Review your opening line, the first frames of a video, and its call to action. Add your own account metrics and keep real results separate from demo figures.", "Проверь начало текста, первые кадры видео и призыв к действию. Добавь статистику своего аккаунта и отличай реальные результаты от демо-показателей."],
    ["Kontenti təhlil et", "Review content", "Проверить контент"],
    ["Hesab yarat", "Create an account", "Создать аккаунт"],
    ["Mətn və video yoxlaması", "Copy and video review", "Проверка текста и видео"],
    ["CSV ilə öz statistikan", "Your metrics via CSV", "Твоя статистика через CSV"],
    ["Demo göstəricilər qeyd olunur", "Demo figures are labelled", "Демо-показатели помечены"],
    ["SIGNAL STUDIO ", "SIGNAL STUDIO ", "SIGNAL STUDIO "],
    ["MƏTN YOXLAMASI", "COPY REVIEW", "ПРОВЕРКА ТЕКСТА"],
    ["NÜMUNƏ", "SAMPLE", "ПРИМЕР"],
    ["SON YOXLANIŞ", "LATEST REVIEW", "ПОСЛЕДНЯЯ ПРОВЕРКА"],
    ["Paylaşım auditi", "Post audit", "Аудит публикации"],
    ["Demo məlumat", "Demo data", "Демо-данные"],
    ["MƏTN QURULUŞU", "COPY STRUCTURE", "СТРУКТУРА ТЕКСТА"],
    ["İlk cümlə aydındır.", "The opening line is clear.", "Начальная фраза ясна."],
    ["Göstərici", "Indicator", "Показатель"],
    ["PAYLAŞIMLAR", "POSTS", "ПУБЛИКАЦИИ"],
    ["Həftəlik dinamika", "Weekly activity", "Активность за неделю"],
    ["İLLÜSTRASİYA", "ILLUSTRATION", "ИЛЛЮСТРАЦИЯ"],
    ["Giriş cümləsi", "Opening line", "Начальная фраза"],
    ["Mesaj aydındır", "Message is clear", "Сообщение понятно"],
    ["Yaxşı", "Good", "Хорошо"],
    ["Çağırış (CTA)", "Call to action (CTA)", "Призыв к действию (CTA)"],
    ["Daha konkret ola bilər", "Could be more specific", "Можно сформулировать конкретнее"],
    ["Yenilə", "Revise", "Измени"],
    ["Oxunaqlılıq", "Readability", "Читабельность"],
    ["Cümlə uzunluqları", "Sentence length", "Длина предложений"],
    ["Mimo-dan qeyd", "A note from Mimo", "Заметка от Мимо"],
    ["Bu ekran nümunədir. Real analiz üçün mətni daxil et.", "This is a sample screen. Enter your copy for an actual review.", "Это пример экрана. Введи текст для анализа."],
    ["Dəstəklənən kanallar", "Supported channels", "Поддерживаемые платформы"],
    ["İdeyanı sına", "Test an idea", "Проверь идею"],
    ["01 — MƏTN YOXLANIŞI", "01 — COPY REVIEW", "01 — ПРОВЕРКА ТЕКСТА"],
    ["Yayımdan əvvəl", "Before publishing", "Перед публикацией"],
    ["zəif yerləri tap.", "find the weak spots.", "найди слабые места."],
    ["Paylaşım mətnini daxil et. Giriş cümləsi, oxunaqlılıq və çağırış barədə rəy al.", "Enter your post copy to get feedback on the opening line, readability, and call to action.", "Введи текст публикации, чтобы получить отзыв о начале, читабельности и призыве к действию."],
    ["Paylaşım mətnini bura əlavə et...", "Add your post copy here...", "Добавь текст публикации сюда..."],
    ["Şəxsi məlumat və parol əlavə etmə.", "Do not include personal information or passwords.", "Не указывай личные данные и пароли."],
    ["Bu bal mətn quruluşunu qiymətləndirir; viral olacağına zəmanət vermir.", "This score reviews text structure; it does not promise virality.", "Оценка анализирует структуру текста, но не гарантирует вирусный охват."],
    ["02 — ALƏTLƏR", "02 — TOOLS", "02 — ИНСТРУМЕНТЫ"],
    ["Kontent üçün lazım olanlar.", "The tools content work needs.", "Инструменты для работы с контентом."],
    ["Bir iş panelində.", "In one workspace.", "В одном рабочем пространстве."],
    ["Hər alət konkret bir işi görür — yazını yoxla, mövzu tap, videonu araşdır və nəticələri müqayisə et.", "Each tool has a clear job: review copy, find topics, inspect video, and compare results.", "У каждого инструмента своя задача: проверить текст, найти темы, изучить видео и сравнить результаты."],
    ["İlk cümlə, oxunaqlılıq və çağırış üçün yoxlama və düzəliş təklifləri al.", "Get feedback and revision suggestions for the opening line, readability, and call to action.", "Получи замечания и предложения по началу, читабельности и призыву к действию."],
    ["Sahə üzrə axtarış et və mənbə ilə tarix göstərilən mövzu siqnallarına bax.", "Search by industry and inspect topic signals with a source and date.", "Ищи по отрасли и изучай сигналы тем с источником и датой."],
    ["Şirkət, agentlik və yaradıcı profilini idarə et; əməkdaşlıq üçün görünən profil yarat.", "Manage a company, agency, or creator profile; publish a profile for collaboration.", "Управляй профилем компании, агентства или автора и открой его для сотрудничества."],
    ["MP4/MOV faylından kadrları, ekrandakı yazını və dəstəklənən audio transkripsiyasını yoxla.", "Review frames, on-screen text, and supported audio transcription from an MP4/MOV file.", "Проверь кадры, экранный текст и поддерживаемую аудиорасшифровку из MP4/MOV."],
    ["03 — VİDEO AUDİTİ", "03 — VIDEO AUDIT", "03 — АУДИТ ВИДЕО"],
    ["İlk saniyələrə", "The opening seconds", "Первые секунды"],
    ["diqqət et.", "deserve attention.", "требуют внимания."],
    ["Video faylını yüklə və əlçatan kadr, yazı, səs məlumatlarına əsaslanan yoxlama al. Hesabatda öz statistikanı ayrıca saxla.", "Upload a video for a review based on available frames, on-screen text, and audio. Keep your own metrics separate in reports.", "Загрузи видео для анализа доступных кадров, экранного текста и звука. В отчётах храни свою статистику отдельно."],
    ["İlk kadrların ardıcıllığını və vizual aydınlığı yoxla.", "Review the opening frames and visual clarity.", "Проверь первые кадры и визуальную ясность."],
    ["Ekrandakı yazını, oxunaqlılığı və transkript mövcuddursa danışığın mesajını yoxla.", "Review on-screen text, readability, and the spoken message when a transcript is available.", "Проверь экранный текст, читабельность и смысл речи, если доступна расшифровка."],
    ["CSV faylından baxış, bəyənmə və şərh rəqəmlərini yüklə; dövrləri müqayisə et.", "Import views, likes, and comments from CSV and compare time periods.", "Импортируй просмотры, лайки и комментарии из CSV и сравни периоды."],
    ["04 — NECƏ İŞLƏYİR", "04 — HOW IT WORKS", "04 — КАК ЭТО РАБОТАЕТ"],
    ["Üç addımda", "In three steps", "В три шага"],
    ["yayıma hazırlaş.", "prepare to publish.", "подготовься к публикации."],
    ["Sadə axın — əvvəl yoxla, sonra müqayisə et, nəticəni saxla.", "A simple flow: review, compare, save the result.", "Простой процесс: проверь, сравни, сохрани результат."],
    ["Rəyi nəzərdən keçir", "Review the feedback", "Изучи рекомендации"],
    ["Giriş, oxunaqlılıq və çağırış üçün verilən düzəlişləri yoxla.", "Review edits suggested for the opening, readability, and call to action.", "Проверь предложенные правки для начала, читабельности и призыва."],
    ["Nəticəni saxla", "Save the result", "Сохрани результат"],
    ["İdeyanı kitabxanaya əlavə et və sonrakı versiya ilə müqayisə et.", "Save the idea to your library and compare it with a later version.", "Сохрани идею в библиотеке и сравни с последующей версией."],
    ["NÖVBƏTİ PAYLAŞIM", "NEXT POST", "СЛЕДУЮЩАЯ ПУБЛИКАЦИЯ"],
    ["Yayımlamadan əvvəl bir dəfə yoxla.", "Give it one review before publishing.", "Проверь перед публикацией."],
    ["Mətnini aç, platformanı seç və təhlilə başla.", "Add your copy, choose a platform, and start the review.", "Добавь текст, выбери платформу и начни анализ."],
    ["Mətn · Video · Hesabat · ", "Copy · Video · Reports · ", "Текст · Видео · Отчёты · "],
    ["Köməkçinin görünüşü", "Assistant appearance", "Внешний вид помощника"],
    ["Adını və avatarını seç. Seçim bu brauzerdə saxlanılır.", "Choose a name and avatar. Your choice is saved in this browser.", "Выбери имя и аватар. Выбор сохраняется в этом браузере."],
    ["Seçimi saxla", "Save selection", "Сохранить выбор"],
    ["Avatar görünüşünü seç.", "Choose an avatar style.", "Выбери стиль аватара."],
    ["Kontent köməkçisi", "Content assistant", "Помощник по контенту"],
    ["Onlayn · kontent üzrə köməkçi", "Online · content assistant", "В сети · помощник по контенту"],
    ["Mətn, video ssenarisi, yoxsa paylaşım planı üzərində işləyək?", "Are we working on copy, a video script, or a posting plan?", "Работаем над текстом, сценарием видео или планом публикаций?"],
    ["Mətn, video ssenarisi və ya kontent planı barədə sualını yaz.", "Ask about copy, a video script, or a content plan.", "Задай вопрос о тексте, сценарии видео или контент-плане."],
    ["Şəxsi və məxfi məlumat göndərmə.", "Do not send personal or confidential information.", "Не отправляй личные или конфиденциальные данные."],
    ["Giriş cümlələri", "Opening lines", "Начальные фразы"],
    ["Mətn, video ssenarisi qur və ya həftəlik paylaşım planı hazırla.", "Refine copy, draft a video script, or make a weekly posting plan.", "Улучши текст, составь сценарий видео или недельный план публикаций."],
    ["Signal Studio — Mətn və video auditi", "Signal Studio — Copy and video review", "Signal Studio — Проверка текста и видео"]
  );
  entries.push(
    ["Bir ideya.", "One idea.", "Одна идея."],
    ["Bir siqnal.", "One signal.", "Один сигнал."],
    ["SƏNİN YARADICI MƏKANIN", "YOUR CREATIVE SPACE", "ТВОЁ ТВОРЧЕСКОЕ ПРОСТРАНСТВО"],
    ["Mətni yoxla. Videonu araşdır. Nəticəni öz məlumatlarınla müqayisə et.", "Review copy. Explore video. Compare with your own data.", "Проверь текст. Изучи видео. Сравни со своими данными."],
    ["Yeni analiz", "New analysis", "Новый анализ"],
    ["Sənin ideyaların. Sənin datan.", "Your ideas. Your data.", "Твои идеи. Твои данные."],
    ["Analiz etdiklərin", "Analyzed by you", "Проанализировано тобой"],
    ["Orta göstərici", "Average metric", "Средний показатель"],
    ["Ən yaxşı kanal", "Top channel", "Лучший канал"],
    ["Öz nəticələrinə görə", "Based on your results", "По твоим результатам"],
    ["İdeyalar", "Ideas", "Идеи"],
    ["Kitabxananda saxlanıb", "Saved in your library", "Сохранено в библиотеке"],
    ["Mətni yoxla", "Review copy", "Проверь текст"],
    ["Giriş · aydınlıq · çağırış", "Hook · clarity · CTA", "Зацепка · ясность · CTA"],
    ["Videonu aç", "Explore video", "Изучи видео"],
    ["Kadrlar · mətn · səs", "Frames · text · audio", "Кадры · текст · звук"],
    ["Siqnalları gör", "See the signals", "Смотри сигналы"],
    ["Öz rəqəmlərin · müqayisə", "Your numbers · compare", "Твои цифры · сравнение"],
    ["Real rəqəmlər yalnız sənin məlumatlarından gəlir.", "Real figures come from your data.", "Реальные цифры основаны на твоих данных."],
    ["Demo göstəricilər ayrıca qeyd olunur.", "Demo figures are clearly marked.", "Демо-показатели отмечены отдельно."],
    ["Menyunu yığ", "Collapse menu", "Свернуть меню"],
    ["Menyunu genişləndir", "Expand menu", "Развернуть меню"],
    ["Mətnini, videonu və nəticələrini yayımdan əvvəl yoxla.", "Review copy, video, and results before publishing.", "Проверь текст, видео и результаты до публикации."],
    ["Giriş, aydınlıq, çağırış — bir baxışda.", "Hook, clarity, CTA — at a glance.", "Зацепка, ясность, призыв — одним взглядом."],
    ["Mətn. Video. Trend.", "Copy. Video. Trends.", "Текст. Видео. Тренды."],
    ["Bir iş masası.", "One workspace.", "Одно рабочее пространство."],
    ["Lazım olan alətlər bir yerdə.", "The tools you need, in one place.", "Нужные инструменты в одном месте."],
    ["İlk cümləni, oxunaqlılığı və çağırışı yoxla.", "Review the opening, readability, and CTA.", "Проверь начало, читаемость и призыв."],
    ["Mövzu siqnallarını mənbə ilə araşdır.", "Explore topic signals with sources.", "Изучай сигналы тем с источниками."],
    ["Ortaq profil yarat, əməkdaşlığı idarə et.", "Build a profile and manage collaboration.", "Создай профиль и управляй сотрудничеством."],
    ["Kadrı, ekran yazısını və səsi yoxla.", "Review frames, on-screen text, and audio.", "Проверь кадры, экранный текст и звук."],
    ["Kadr, yazı və səsə bax. Öz statistikanı ayrıca saxla.", "Review frames, text, and audio. Keep your metrics separate.", "Проверь кадры, текст и звук. Храни свою статистику отдельно."],
    ["İlk kadrların ritmi və vizual aydınlıq.", "Opening rhythm and visual clarity.", "Ритм первых кадров и визуальная ясность."],
    ["Oxunan yazı və mövcud transkript.", "Readable text and available transcript.", "Читаемый текст и доступная расшифровка."],
    ["CSV rəqəmlərini yüklə, dövrləri müqayisə et.", "Import CSV metrics and compare periods.", "Импортируй метрики CSV и сравни периоды."],
    ["Üç addım.", "Three steps.", "Три шага."],
    ["Yayıma hazır.", "Ready to publish.", "Готово к публикации."],
    ["Yoxla. Müqayisə et. Saxla.", "Review. Compare. Save.", "Проверь. Сравни. Сохрани."],
    ["Platformanı və məqsədi seç.", "Choose a platform and goal.", "Выбери платформу и цель."],
    ["Girişə, aydınlığa və çağırışa bax.", "Review the hook, clarity, and CTA.", "Проверь зацепку, ясность и призыв."],
    ["İdeyanı saxla, yenidən istifadə et.", "Save the idea and reuse it.", "Сохрани идею и используй снова."],
    ["Paylaşmazdan əvvəl yoxla.", "Review before you publish.", "Проверь перед публикацией."],
    ["Bir mətnlə başla.", "Start with one post.", "Начни с одного текста."],
    ["Mətni, platformanı və məqsədi seç. Real tarixçən varsa, nəticə onunla müqayisə olunur.", "Choose copy, platform, and goal. If available, results are compared with your history.", "Выбери текст, платформу и цель. При наличии истории результаты сравниваются с ней."]
  );

  entries.push(
    ["KONTENT ÜÇÜN REDAKTOR MASASI", "A WORKING DESK FOR CONTENT", "РАБОЧИЙ СТОЛ ДЛЯ КОНТЕНТА"],
    ["Mətni, ilk kadrı və çağırışı yayımdan əvvəl yoxla. Öz statistikanla müqayisə et.", "Review the copy, opening frame, and call to action before publishing. Compare them with your own metrics.", "Проверь текст, первый кадр и призыв к действию до публикации. Сравни с собственной статистикой."],
    ["Nümunə ballar ayrıca qeyd olunur", "Sample scores are clearly labelled", "Демо-оценки отмечены отдельно"],
    ["Qısa qeyd", "A note", "Примечание"],
    ["Bu, nümunə hesabatdır. Öz mətnini daxil et ki, nəticələr onun əsasında yaransın.", "This is a sample report. Add your own copy to generate results from it.", "Это пример отчёта. Добавь свой текст, чтобы получить результаты на его основе."],
    ["İşlədiyin platformalar", "Platforms you use", "Платформы, которыми ты пользуешься"],
    ["Yazını yoxla.", "Review your copy.", "Проверь текст."],
    ["Videoya bax.", "Review your video.", "Проверь видео."],
    ["Mətndən videoya qədər əsas yoxlamalar eyni yerdədir.", "The essential checks for copy and video live in one place.", "Основные проверки текста и видео собраны в одном месте."],
    ["Nəticəni gör.", "See what needs work.", "Узнай, что улучшить."],
    ["Düzəlişi et.", "Make the edit.", "Внеси правки."],
    ["Yoxla, düzəlt, sonra öz tarixçənlə müqayisə et.", "Review it, make your edits, then compare with your own history.", "Проверь, внеси правки и сравни со своей историей."],
    ["Mətn auditi", "Copy review", "Проверка текста"]
  );
  entries.push(
    ["Paket limitlərini və mövcud alətləri müqayisə et.", "Compare plan limits and available tools.", "Сравни лимиты тарифов и доступные инструменты."],
    ["Videonu yayından əvvəl yoxla.", "Review your video before publishing.", "Проверь видео перед публикацией."],
    ["Video Lab Go və Pro planlarında açılır. İlk kadrları, ekrandakı yazıları və mövcud səs mətnini təhlil edib konkret düzəlişlər al.", "Video Lab is available on Go and Pro. Review opening frames, on-screen text, and available speech transcription to get actionable edits.", "Video Lab доступен на тарифах Go и Pro. Анализируй первые кадры, экранный текст и доступную расшифровку речи, чтобы получить конкретные рекомендации."],
    ["Go planını seç · $9/ay ↗", "Choose Go · $9/month ↗", "Выбрать Go · $9/мес. ↗"],
    ["Pro planı da Video Lab imkanlarını əhatə edir.", "The Pro plan also includes Video Lab.", "Тариф Pro также включает Video Lab."],
    ["Komandanı bir məkanda birləşdir.", "Bring your team together in one workspace.", "Объедини команду в одном рабочем пространстве."],
    ["Komanda və Biznes bölməsi Pro planında açılır. Şirkət və ya şəxsi brend profilini yarat, əməkdaşlıq şəbəkəsini araşdır.", "Team & Business unlocks on Pro. Create a company or personal-brand profile and explore the collaboration network.", "Раздел «Команда и бизнес» доступен на Pro. Создай профиль компании или личного бренда и изучи сеть для сотрудничества."],
    ["Pro planını seç · $19/ay ↗", "Choose Pro · $19/month ↗", "Выбрать Pro · $19/мес. ↗"],
    ["Plan seçildikdən və abunə təsdiqləndikdən sonra bölmə açılacaq.", "This section unlocks after the plan is selected and the subscription is confirmed.", "Раздел откроется после выбора тарифа и подтверждения подписки."],
    ["Kadrların təhlili", "Frame analysis", "Анализ кадров"],
    ["Ekran yazısı və ritm", "On-screen text and pacing", "Экранный текст и темп"],
    ["Fərdiləşdirilmiş tövsiyələr", "Personalized recommendations", "Персональные рекомендации"],
    ["Biznes profili", "Business profile", "Профиль компании"],
    ["Açıq əməkdaşlıq şəbəkəsi", "Open collaboration network", "Открытая сеть для сотрудничества"],
    ["Komanda iş axını", "Team workflow", "Командный рабочий процесс"],
    ["VİDEO TƏHLİLİNİN NƏTİCƏSİ", "VIDEO ANALYSIS RESULTS", "РЕЗУЛЬТАТЫ АНАЛИЗА ВИДЕО"],
    ["Nəticə hazırdır", "Your results are ready", "Результаты готовы"],
    ["Video təhlil edildikdən sonra nəticə burada görünəcək.", "Your results will appear here after the video is analyzed.", "После анализа видео здесь появятся результаты."],
    ["Video keyfiyyəti", "Video quality", "Качество видео"],
    ["Nəticəni kitabxanada saxla +", "Save results to library +", "Сохранить результат в библиотеку +"],
    ["Video üçün süni intellekt xidməti qoşulmayıb. Serverin GROQ_API_KEY konfiqurasiyasını yoxla; Go/Pro planı təkbaşına AI açarını təmin etmir.", "The AI service for video is not configured. Check the server's GROQ_API_KEY setting; a Go/Pro subscription does not provide an AI API key.", "Сервис ИИ для видео не настроен. Проверь параметр GROQ_API_KEY на сервере: подписка Go/Pro сама по себе не предоставляет ключ API ИИ."],
    ["Video emalı üçün FFmpeg tapılmadı. START-SIGNAL-STUDIO.bat faylını yenidən işə sal və ya FFmpeg quraşdırmasını yoxla.", "FFmpeg was not found for video processing. Run START-SIGNAL-STUDIO.bat again or check the FFmpeg installation.", "FFmpeg не найден для обработки видео. Повторно запусти START-SIGNAL-STUDIO.bat или проверь установку FFmpeg."],
    ["Video analizi tamamlandı.", "Video analysis complete.", "Анализ видео завершён."],
    ["Video icmalı gələcək baxış və viral olma zəmanəti deyil.", "This review does not guarantee future views or virality.", "Этот анализ не гарантирует будущие просмотры или вирусный охват."],
    ["Məzmun analizi tamamlandı.", "Content analysis complete.", "Анализ контента завершён."],
    ["Analiz edilir…", "Analyzing…", "Выполняется анализ…"],
    ["Video laboratoriyası Go planından başlayaraq mövcuddur.", "Video Lab is available starting with the Go plan.", "Video Lab доступен начиная с тарифа Go."],
    ["Komanda və biznes alətləri Pro planında mövcuddur.", "Team and Business tools are available on Pro.", "Инструменты команды и бизнеса доступны на Pro."],
    ["Free planının gündəlik AI mesaj limiti tamamlanıb. Planını yeniləyərək limiti artıra bilərsən.", "The Free plan's daily AI message limit has been reached. Upgrade to increase the limit.", "Достигнут дневной лимит сообщений ИИ на Free. Перейди на другой тариф, чтобы увеличить лимит."],
    ["Go planının gündəlik AI mesaj limiti tamamlanıb. Planını yeniləyərək limiti artıra bilərsən.", "The Go plan's daily AI message limit has been reached. Upgrade to increase the limit.", "Достигнут дневной лимит сообщений ИИ на Go. Перейди на другой тариф, чтобы увеличить лимит."],
    ["Pro planının gündəlik AI mesaj limiti tamamlanıb. Planını yeniləyərək limiti artıra bilərsən.", "The Pro plan's daily AI message limit has been reached. Upgrade to increase the limit.", "Достигнут дневной лимит сообщений ИИ на Pro. Перейди на другой тариф, чтобы увеличить лимит."],
    ["Pulsuz plan", "Free plan", "Бесплатный тариф"],
    ["Gündə 10 Süni intellekt köməkçisi mesajı", "10 AI assistant messages per day", "10 сообщений ИИ-помощнику в день"],
    ["Gündə 100 Süni intellekt köməkçisi mesajı", "100 AI assistant messages per day", "100 сообщений ИИ-помощнику в день"],
    ["Gündə 400 Süni intellekt köməkçisi mesajı", "400 AI assistant messages per day", "400 сообщений ИИ-помощнику в день"],
    ["Əsas hesabatlar və CSV idxalı", "Basic reports and CSV import", "Основные отчёты и импорт CSV"],
    ["Video laboratoriyası analizi", "Video Lab analysis", "Анализ в Video Lab"],
    ["Platformalardan məzmun idxalı", "Import content from platforms", "Импорт контента с платформ"],
    ["CSV/JSON ixracı", "CSV/JSON export", "Экспорт CSV/JSON"],
    ["Go planının bütün imkanları", "Everything included in the Go plan", "Все возможности тарифа Go"],
    ["Komanda və biznes profilləri", "Team and business profiles", "Профили команды и бизнеса"],
    ["Əməkdaşlıq şəbəkəsinə giriş", "Access to the collaboration network", "Доступ к сети для сотрудничества"],
    ["Pulsuz plan artıq seçilib.", "The Free plan is already selected.", "Бесплатный тариф уже выбран."],
    ["Təhlükəsiz ödəniş səhifəsi açılır…", "Opening the secure checkout…", "Открывается защищённая страница оплаты…"],
    ["Ödəniş səhifəsi açıla bilmədi.", "The checkout page could not be opened.", "Не удалось открыть страницу оплаты."],
    ["Abunəliyin aktivləşdirildi. Xoş gəlmisən!", "Your subscription is active. Welcome!", "Подписка активирована. Добро пожаловать!"],
    ["Ödəniş tamamlanmadı; cari planın dəyişməyib.", "Payment wasn't completed; your current plan hasn't changed.", "Оплата не завершена; текущий тариф не изменился."],
    ["Hesabat datası yoxdur.", "No report data yet.", "Данных для отчёта пока нет."],
    ["Kitabxana boşdur. Analiz nəticəsini və ya öz ideyanı əlavə et.", "Your library is empty. Add an analysis result or your own idea.", "Библиотека пуста. Добавь результат анализа или свою идею."],
    ["İdeya silindi.", "Idea deleted.", "Идея удалена."],
    ["İdeya kitabxanada saxlanıldı.", "Idea saved to your library.", "Идея сохранена в библиотеке."],
    ["Profil saxlanıldı.", "Profile saved.", "Профиль сохранён."],
    ["Əməkdaşlıq profilin yeniləndi.", "Your collaboration profile has been updated.", "Профиль для сотрудничества обновлён."],
    ["Hazırda açıq profil yoxdur", "No public profiles yet", "Пока нет открытых профилей"],
    ["Axtarışa uyğun ideya tapılmadı.", "No ideas match your search.", "По запросу ничего не найдено."],
    ["Tarix", "Date", "Дата"], ["Platforma", "Platform", "Платформа"], ["Paylaşım", "Post", "Публикация"], ["Baxış", "Views", "Просмотры"], ["Əlaqə", "Interactions", "Взаимодействия"], ["Yaradılma tarixi", "Created on", "Дата создания"], ["Əməliyyat", "Action", "Действие"], ["İdeya", "Idea", "Идея"], ["Format", "Format", "Формат"],
    ["İdeyaların bir yerdə.", "Your ideas in one place.", "Все идеи в одном месте."],
    ["Məzmun analizi", "Content analysis", "Анализ контента"],
    ["Mətn strukturu təhlili", "Text structure review", "Анализ структуры текста"],
    ["Kadr-kadr", "Frame by frame", "Кадр за кадром"],
    ["Komanda və biznes", "Team & business", "Команда и бизнес"]
  );
  entries.push(
    ["VİDEO TƏHLİLİ", "VIDEO REVIEW", "АНАЛИЗ ВИДЕО"],
    ["Videonu kadr-kadr təhlil et", "Review your video frame by frame", "Разбери видео покадрово"],
    ["Video faylını əlavə et. Vizual struktur, ekrandakı mətn və dəstəklənən formatlarda nitq ayrıca nəzərdən keçiriləcək.", "Upload a video. Visual structure, on-screen text, and speech in supported formats will be reviewed separately.", "Загрузи видео. Визуальная структура, экранный текст и речь в поддерживаемых форматах будут изучены отдельно."],
    ["Video faylı", "Video file", "Видеофайл"],
    ["MP4 və MOV · 500 MB-dək", "MP4 and MOV · up to 500 MB", "MP4 и MOV · до 500 МБ"],
    ["Videonu analiz et ↗", "Analyze video ↗", "Анализировать видео ↗"],
    ["Fayl seçilməyib", "No file selected", "Файл не выбран"],
    ["Giriş və ritm", "Opening and pacing", "Начало и темп"],
    ["İlk saniyələr və səhnə dəyişiklikləri.", "Opening seconds and scene changes.", "Первые секунды и смена сцен."],
    ["Vizual mesaj", "Visual message", "Визуальное сообщение"],
    ["Kadrlardakı yazı və vizual ardıcıllıq.", "On-screen text and visual continuity.", "Текст в кадре и визуальная последовательность."],
    ["Növbəti addım", "Next step", "Следующий шаг"],
    ["Videoya uyğun təkmilləşdirmə təklifləri.", "Suggestions tailored to the video.", "Рекомендации по улучшению видео."],
    ["Diqqətçəkən giriş", "Opening hook", "Начальная зацепка"],
    ["Vizual aydınlıq", "Visual clarity", "Визуальная ясность"],
    ["Montaj / temp", "Editing / pacing", "Монтаж / темп"],
    ["Ekran mətni", "On-screen text", "Текст на экране"],
    ["Videodan tanınan danışıq mətni", "Speech transcript", "Расшифровка речи"],
    ["Kreativ struktur qiymətləndirildi", "Creative structure reviewed", "Креативная структура оценена"],
    ["Video faylını seç", "Choose a video file", "Выбери видеофайл"],
    ["Əvvəlcə MP4 və ya MOV video seç.", "Choose an MP4 or MOV video first.", "Сначала выбери видео MP4 или MOV."],
    ["Video 500 MB limitini keçir.", "The video exceeds the 500 MB limit.", "Размер видео превышает лимит 500 МБ."],
    ["Yalnız MP4 və MOV faylları dəstəklənir.", "Only MP4 and MOV files are supported.", "Поддерживаются только файлы MP4 и MOV."],
    ["Video analiz mühiti yoxlanılır…", "Checking the video analysis environment…", "Проверяем среду анализа видео…"],
    ["serverə göndərilir və emal edilir. Bu pəncərəni bağlama.", "is being uploaded and processed. Keep this window open.", "загружается и обрабатывается. Не закрывай это окно."],
    ["Video analizi tamamlandı.", "Video analysis complete.", "Анализ видео завершён."],
    ["kadr analiz olundu", "frames analyzed", "кадров проанализировано"],
    ["və audio transkripsiyası alındı", "and an audio transcript was created", "и получена расшифровка аудио"],
    ["Yüklənmiş video emaldan sonra silindi.", "The uploaded video was deleted after processing.", "Загруженное видео удалено после обработки."],
    ["Video analizi alınmadı.", "Video analysis failed.", "Не удалось проанализировать видео."],
    ["Şirkət / brend adı", "Company / brand name", "Название компании / бренда"],
    ["Profil tipi", "Profile type", "Тип профиля"],
    ["Şirkətin və ya şəxsi brendin adı", "Company or personal brand name", "Название компании или личного бренда"],
    ["Nə üzrə əməkdaşlıq axtarırsan?", "What kind of collaboration are you looking for?", "Какое сотрудничество ты ищешь?"],
    ["Xidmətin, təcrübən və əməkdaşlıq ehtiyacın...", "Your services, experience, and collaboration needs...", "Твои услуги, опыт и потребности в сотрудничестве..."],
    ["Profili saxla ↗", "Save profile ↗", "Сохранить профиль ↗"],
    ["Öz profilini açıq edən istifadəçilər", "Users who made their profiles public", "Пользователи, открывшие свои профили"],
    ["İlk əməkdaşlıq profilini yarat", "Create the first collaboration profile", "Создай первый профиль для сотрудничества"],
    ["CSV oxunur…", "Reading CSV…", "Читаем CSV…"],
    ["CSV faylında başlıq və ən azı bir məlumat sətri olmalıdır.", "The CSV must contain a header and at least one data row.", "CSV должен содержать заголовок и хотя бы одну строку данных."],
    ["CSV-də “likes” və ya “interactions” sütunu olmalıdır. Ümumi qarşılıqlı əlaqə göstəricisi olan CSV dəstəklənir.", "The CSV must include a “likes” or “interactions” column. Files with total interactions are supported.", "В CSV должен быть столбец “likes” или “interactions”. Поддерживаются файлы с общим числом взаимодействий."],
    ["CSV-də “date” sütunu tapılmadı.", "The CSV is missing a “date” column.", "В CSV нет столбца “date”."],
    ["CSV-də “platform” sütunu tapılmadı.", "The CSV is missing a “platform” column.", "В CSV нет столбца “platform”."],
    ["CSV-də “views” sütunu tapılmadı.", "The CSV is missing a “views” column.", "В CSV нет столбца “views”."],
    ["İdxal tamamlandı:", "Import complete:", "Импорт завершён:"],
    ["paylaşım.", "posts.", "публикаций."],
    ["sətir ötürüldü.", "rows skipped.", "строк пропущено."],
    ["Tarix YYYY-MM-DD formatında ola bilər. Date, Platform, Post, Views, Interactions, ER formatı və ya date, platform, title, views, likes, comments, shares, saves formatı dəstəklənir. Fayl 2 MB-dan kiçik olmalıdır. Yükləməzdən əvvəl şəxsi məlumatları sil.", "Dates may use YYYY-MM-DD. Both Date, Platform, Post, Views, Interactions, ER and date, platform, title, views, likes, comments, shares, saves formats are supported. Files must be under 2 MB. Remove personal information before importing.", "Дата может быть в формате YYYY-MM-DD. Поддерживаются форматы Date, Platform, Post, Views, Interactions, ER и date, platform, title, views, likes, comments, shares, saves. Размер файла должен быть меньше 2 МБ. Перед импортом удали личные данные."],
    ["Ümumi qarşılıqlı əlaqə", "Total interactions", "Всего взаимодействий"],
    ["Göstərilən ER faizi baxış sayına bölünmüş qarşılıqlı əlaqə sayına əsaslanır.", "The displayed engagement rate is calculated as interactions divided by views.", "Показатель ER рассчитывается как число взаимодействий, делённое на просмотры."]
  );
  const uniqueEntries = [...new Map(entries.map(entry => [entry[0], entry])).values()];
  const langCodes = ['az', 'en', 'ru'];
  const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wordChar = /[\p{L}\p{N}_]/u;
  function preparePhraseList(pairs) {
    // Translate the original source in one pass. Sequential replacements can
    // accidentally translate words inside the destination (e.g. a translated
    // “Video Lab” gets changed again), producing mixed-language sentences.
    const replacements = new Map();
    const alternatives = [];
    const sorted = pairs.filter(([source, destination]) => source && destination && source !== destination)
      .sort((a, b) => b[0].length - a[0].length);
    for (const [source, destination] of sorted) {
      const key = source.toLocaleLowerCase();
      if (replacements.has(key)) continue;
      replacements.set(key, destination);
      // Unicode boundaries prevent a shorter dictionary word changing another word's middle.
      const left = wordChar.test([...source][0] || '') ? '(?<![\\p{L}\\p{N}_])' : '';
      const lastChar = [...source].at(-1) || '';
      const right = wordChar.test(lastChar) ? '(?![\\p{L}\\p{N}_])' : '';
      alternatives.push(`${left}${escapeRegExp(source)}${right}`);
    }
    return { pattern: alternatives.length ? new RegExp(alternatives.join('|'), 'giu') : null, replacements };
  }
  const phraseLists = {
    en: preparePhraseList(uniqueEntries.map(([az, en]) => [az, en])),
    ru: preparePhraseList(uniqueEntries.map(([az, , ru]) => [az, ru]))
  };
  function translateText(value, target = currentLanguage) {
    if (typeof value !== 'string' || !value.trim() || target === 'az') return value;
    const list = phraseLists[target];
    if (!list?.pattern) return value;
    return value.replace(list.pattern, match => list.replacements.get(match.toLocaleLowerCase()) || match);
  }

  // A one-time storage version bump drops stale language/theme values from the
  // previous broken build without clearing unrelated browser storage.
  try {
    if (localStorage.getItem('signalStudioStorageVersion') !== 'v9') {
      localStorage.removeItem('signalStudioLanguage');
      localStorage.removeItem('signalStudioTheme');
      localStorage.setItem('signalStudioStorageVersion', 'v9');
    }
  } catch { /* browser privacy settings can disable localStorage */ }

  let currentLanguage = (() => {
    try { const value = localStorage.getItem('signalStudioLanguageV9'); return langCodes.includes(value) ? value : 'az'; }
    catch { return 'az'; }
  })();
  let translating = false;
  let observer = null;
  const baseText = new WeakMap();
  const lastTextOutput = new WeakMap();
  const baseAttributes = new WeakMap();
  const lastAttributeOutput = new WeakMap();
  const protectedSelector = 'input, textarea, code, pre, script, style, svg, [contenteditable="true"], [data-no-translate], .scrape-source-data, .scrape-transcript, .scrape-result-title, .scrape-result-caption, .source-caption';
  const protectedAttributeSelector = 'code, pre, script, style, svg, [contenteditable="true"], [data-no-translate], .scrape-source-data, .scrape-transcript, .scrape-result-title, .scrape-result-caption, .source-caption';

  function shouldSkip(node) {
    const parent = node.parentElement;
    return !parent || parent.closest(protectedSelector) || parent.closest('button')?.matches('[data-language]');
  }
  function applyText(node, target = currentLanguage) {
    if (!node || node.nodeType !== Node.TEXT_NODE || shouldSkip(node)) return;
    const current = node.nodeValue ?? '';
    const last = lastTextOutput.get(node);
    // If application code changed a text node since our last render, take that
    // fresh Azerbaijani value as the new source rather than translating a translation.
    if (!baseText.has(node) || (last !== undefined && current !== last)) baseText.set(node, current);
    const source = baseText.get(node) ?? current;
    const next = translateText(source, target);
    if (next !== current) node.nodeValue = next;
    lastTextOutput.set(node, next);
  }
  function translateAttributes(root = document, target = currentLanguage) {
    const attrs = ['placeholder', 'title', 'aria-label', 'alt'];
    const elements = [];
    if (root.nodeType === Node.ELEMENT_NODE && root.matches?.('[placeholder],[title],[aria-label],[alt]')) elements.push(root);
    if (root.querySelectorAll) elements.push(...root.querySelectorAll('[placeholder],[title],[aria-label],[alt]'));
    for (const element of elements) {
      if (element.matches(protectedAttributeSelector)) continue;
      for (const attr of attrs) {
        const value = element.getAttribute(attr);
        if (!value) continue;
        let records = baseAttributes.get(element);
        if (!records) { records = new Map(); baseAttributes.set(element, records); }
        let outputs = lastAttributeOutput.get(element);
        if (!outputs) { outputs = new Map(); lastAttributeOutput.set(element, outputs); }
        if (!records.has(attr) || (outputs.has(attr) && value !== outputs.get(attr))) records.set(attr, value);
        const next = translateText(records.get(attr), target);
        if (next !== value) element.setAttribute(attr, next);
        outputs.set(attr, next);
      }
    }
  }
  function applyDOM(target = currentLanguage) {
    if (translating) return;
    translating = true;
    observer?.disconnect();
    try {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => applyText(node, target));
      translateAttributes(document, target);
    } finally {
      translating = false;
      if (observer) {
        observer.takeRecords();
        observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] });
      }
    }
  }
  function setLanguage(lang) {
    if (!langCodes.includes(lang)) return;
    currentLanguage = lang;
    try { localStorage.setItem('signalStudioLanguageV9', lang); } catch { /* storage may be unavailable */ }
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    applyDOM(lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      const descriptions = { az: 'Signal Studio — sosial media məzmununu təhlil et, ideyalarını planlaşdır və nəticələrini inkişaf etdir.', en: 'Signal Studio — analyze social media content, plan ideas, and improve your results.', ru: 'Signal Studio — анализируй контент соцсетей, планируй идеи и улучшай результаты.' };
      meta.content = descriptions[lang];
    }
    const titles = { az: 'Signal Studio — sosial media məzmunu üçün süni intellekt', en: 'Signal Studio — AI Social Content Predictor', ru: 'Signal Studio — ИИ-анализ контента' };
    document.title = titles[lang];
    window.dispatchEvent(new CustomEvent('signal-language-change', { detail: { language: lang } }));
  }
  window.SignalI18n = {
    getLanguage: () => currentLanguage,
    setLanguage,
    t: value => translateText(String(value ?? ''), currentLanguage)
  };
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  observer = new MutationObserver(records => {
    if (translating) return;
    translating = true;
    observer.disconnect();
    try {
      for (const record of records) {
        if (record.type === 'characterData') {
          applyText(record.target, currentLanguage);
          continue;
        }
        if (record.type === 'attributes') {
          translateAttributes(record.target, currentLanguage);
          continue;
        }
        for (const node of record.addedNodes || []) {
          if (node.nodeType === Node.TEXT_NODE) {
            applyText(node, currentLanguage);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(textNode => applyText(textNode, currentLanguage));
            translateAttributes(node, currentLanguage);
          }
        }
      }
    } finally {
      translating = false;
      observer.takeRecords();
      observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] });
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] });
  setLanguage(currentLanguage);
})();

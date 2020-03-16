import { TowersTypes } from '../effector/towers-progress/store';

type BuildingsDescriptionType = Record<TowersTypes, string[]>;
export class BuildingsDescriptionService {
  readonly _description: BuildingsDescriptionType = {
    [TowersTypes.MAIN_TOWER]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],

    [TowersTypes.CYBER_ARENA]: [
      'Шестиэтажный комплекс МТС Live Arena планируется открыть в 2020 году. Он расположен рядом с инновационным центром Сколково. В МТС Live Arena будет проводиться не менее 130 мероприятий в год, посетить их смогут более 700 тысяч человек. Вместимость комплекса - 11 500 человек. Мы ждем! А Ты?',
    ],
    [TowersTypes.BANK]: [
      'МТС Банк – универсальный коммерческий банк, основанный в 1993 году. Входит в число 50 ведущих банков России по величине активов.',
      'По состоянию на декабрь 2019 года МТС Банк среди российских банков по данным Franck Research и Banki.ru занимает:',
      '37 место по величине капитала',
      '29 место по вкладам населения',
      '41 место по активам',
      '5 место по величине портфеля POS-кредитования',
      '13 место по величине портфеля кредитных карт',
      'МТС Банк делает ставку на быстрый рост розничного и малого бизнеса в сочетании удобства и функциональности цифровых каналов с физической доступностью по всей России. Банк активно развивает финансовые сервисы внутри экосистемы МТС и других внешних партнеров так, что основные продукты становятся интуитивно доступны клиентам «в 2 клика». Стратегия развития Банка – удобство, простота и понимание повседневных потребностей клиентов.',
    ],
    [TowersTypes.AIRPORT]: [
      'Роуминг – это, прежде всего, комфорт в путешествиях! Абонентам МТС не нужно задумываться о том, где и сколько стоят звонки и мобильный интернет. В поездках по России:',
      '∙ входящие звонки — бесплатно;',
      '∙ мобильный интернет — на домашних условиях;',
      '∙ исходящие звонки по региону пребывания — стоят как дома, вне зависимости от региона, где вы находитесь;',
      '∙ исходящие междугородние звонки — стоят одинаково.',
      'Роуминг заграницей – это про комфорт! У нас есть тарифы, которые подойдут каждому, есть из чего выбрать! Мы не боимся роуминга, и ты не бойся!',
    ],
    [TowersTypes.STADIUM]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.TV]: [
      'Цифровое ТВ - отличное решение! В базовый пакет телеканалов МТС ТВ входит более 135 различных каналов на любой вкус: детские, спортивные, каналы с фильмами и сериалами, новостные. Кроме того, ты можешь подключить дополнительные пакеты с тематическими подборками каналов.',
      'У нас бесперебойные технологии! Для подключения цифрового ТВ используется отдельный кабель, то есть при подключении домашнего интернета и цифрового ТВ сигналы будут идти по двум независимым кабелям, что предотвращает возможные перебои со связью.',
      'Для подключения к цифровому ТВ МТС требуется специальное оборудование: приставка или cam-модуль. Но мы об этом уже позаботились! Все необходимое оборудование можно взять в аренду или купить у нас.',
    ],
    [TowersTypes.THEATER]: [
      'МТС Афиша - комфортный и надежный в использовании сервис с билетами без комиссии.',
      'Театр, кино, концерты и другие развлечения с приятным бонусом - кэшбэк от 15 до 50%',
      'У нас много билетов! ',
      'А еще можем предложить программу привилегий:',
      '∙ дополнительные скидки;',
      '∙ проход без очереди;',
      '∙ эксклюзивные билеты.',
    ],
    [TowersTypes.TARIFF]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.OBSERVATORY]: [
      'Всем нужен дома быстрый wi-fi! Мы тебе с этим можем помочь.',
      'Гарантируем стабильно высокую скорость от 100 Мбит/с.',
      'Нет роутера?  Для нас это не проблема, да и для тебя тоже. Мы дадим роутер бесплатно! Выбери удобный тариф и наслаждайся скоростью.',
      'Настало время забыть о долгой загрузке и перебоях интернета.',
    ],
    [TowersTypes.LIBRARY]: [
      'Сейчас уже не нужно разыскивать книги в магазинах, посещать сомнительные сайты с аудиокнигами и ходить в киоск за журналами и газетами: всё это можно получить в одном приложении на твоем смартфоне — «МТС Библиотека». Мы – одно из самых больших онлайн-книгохранилищ:',
      '∙ 185 тысяч книг новинок и бестселлеров всех жанров;',
      '∙ 35 тысяч аудиокниг.',
      'У нас есть рекомендации и подборки на основе твоих предпочтений и синхронизация чтения с разных устройств. Ты можешь настроить режим чтения по вкусу, выбрав шрифт, фон и контрастность. Для удобства можно загружать произведения, чтобы читать офлайн.',
      'Заметь, примерно четверть всех книг в приложении — более 57 тысяч — доступна совершенно бесплатно!',
    ],
    [TowersTypes.ARENA]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.MUSIC]: [
      'В МТС Music мы собрали миллионы музыкальных треков. Сейчас в каталоге больше 50 миллионов композиций: на то, чтобы прослушать всё, не хватит и ста лет. Любой желающий, даже не будучи абонентом МТС, может воспользоваться сервисом! Слушай музыку онлайн, добавляй любимые треки в плейлисты и наслаждайся ими офлайн на своем смартфоне.',
      'А еще у нас первые 30 дней для новых пользователей в подарок и для абонентов МТС интернет-трафик на прослушивание музыки всегда бесплатный.',
    ],
    [TowersTypes.EGG]: [
      'Мой МТС — простой и удобный помощник абонентов МТС в России. В одном месте ты сможешь:',
      '∙ проверить расходы и пополнить баланс картой;',
      '∙ посмотреть, сколько осталось минут, SMS и интернета;',
      '∙ подключить услуги и подходящий тариф;',
      '∙ оптимизировать расходы в роуминге;',
      '∙ уточнить информацию у техподдержки в чате;',
      '∙ добавить номера близких и управлять ими, как своим;',
      '∙ проверить услуги Домашнего интернета и ТВ и пополнить счёт;',
      '∙ узнать о скидках и предложениях МТС и партнёров;',
      '∙ вернуть кэшбэк за покупки с МТС Cashback;',
      '∙ получить подарки в Автомате призов.',
      'Мой МТС – незаменимое приложение для абонента.',
    ],
    [TowersTypes.MOLL]: [
      'Что такое кэшбэк? Это возврат средств с покупки. В рамках сервиса МТС Cashback кэшбэк копится в личном кабинете. Потратить его можно на пополнение баланса номеров МТС, на покупку товаров в салонах-магазинах МТС, а также на сертификаты на скидку у наших партнеров! Возможности расходования кэшбэка постоянно расширяются!',
      'Как же копить его? - Легко! Заходи в интересующий тебя интернет-магазин или сервис с сайта программы или через приложение МТС Сashback. У нас уже больше 1200 партнеров и это не конец!',
      'Совершай покупки и оплачивай их любым способом. Ожидай кэшбэк: он будет начислен после подтверждения покупки интернет-магазином или сервисом.',
      'Оформляй карту МТС CASHBACK  и получай 5% кэшбэка за покупки в супермаркетах и на АЗС! Но это не всё: в мобильном приложении и на сайте программы есть еще множество способов получения кэшбэка!',
    ],
    [TowersTypes.SATELLITETV]: [
      'Спутниковое ТВ МТС — это 222 телеканала самых разных жанров. Уже в базовом пакете — 190 каналов.',
      'Фильмы и сериалы — художественные, документальные, детские. Новостные передачи. Передачи о спорте и ток-шоу. Музыка на любой вкус и телеканалы, посвящённые твоему хобби. Каналы, интересные тебе, и каналы, интересные любому члену твоей семьи.',
      'Выбор — это не только то, что ты смотришь, но и когда. Больше 40 спутниковых каналов МТС имеют версии для разных часовых поясов: смотри кино или футбол тогда, когда это удобно тебе. А с функцией интерактивной приставки можно включить отложенный просмотр и записать любимую передачу, чтобы в отличном качестве пересмотреть её тогда, когда на это есть время.',
    ],
    [TowersTypes.PARTNER_BLUE]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.PARTNER_YELLOW]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.SLOT_MACHINE]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.ROUTER]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.AUTO_FACTORY]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.RTK]: [
      'Розничная сеть МТС — крупнейшая сеть магазинов в России, насчитывающая более 5500 точек в 680 городах. В салонах МТС можно познакомиться с новинками мира технологий и сервисами экосистемы МТС. Покупатели могут проконсультироваться с экспертом, приобрести SIM-карту, получить абонентское обслуживание и многое другое.',
    ],
    [TowersTypes.PARTNER_BANK]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
  };

  getDescriptionForCurrentTower = (
    tower: TowersTypes = TowersTypes.MAIN_TOWER,
    id: number
  ) => {
    return this._description[tower][id];
  };

  getAllDescriptionForCurrentTower = (tower: TowersTypes) => {
    return this._description[tower];
  };
  getFirstDescriptionForCurrentTower = (tower: TowersTypes) => {
    return this._description[tower][0];
  };
}

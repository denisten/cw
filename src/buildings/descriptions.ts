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
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.BANK]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.MONEY_VAULT]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.AIRPORT]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.STADIUM]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.TV]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.THEATER]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.TARIFF]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.OBSERVATORY]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.LIBRARY]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.ARENA]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.MUSIC]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.EGG]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.MOLL]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
    ],
    [TowersTypes.SATELLITETV]: [
      'МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная компания, оказывающая услуги в России и странах СНГ под торговой маркой «МТС».',
      'Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в Интернет, мобильного телевидения, кабельного телевидения, спутникового телевидения, цифрового телевидения и сопутствующие услуги, в частности услуги по продаже контента.',
      'По состоянию на март 2019 года компания во всех странах своего присутствия обслуживала 104,7 млн абонентов.',
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

  getAllDescriptionForCurrentTower = (
    tower: TowersTypes = TowersTypes.MAIN_TOWER
  ) => {
    const secondAndOtherStringArray = this._description[tower].filter(
      (_, index) => index !== 0
    );
    return secondAndOtherStringArray.join();
  };
}

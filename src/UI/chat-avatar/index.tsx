import React from 'react';
import styled from 'styled-components';
import userDefault from './user-default.svg';
import botDefault from './bot-default.svg';
import { Sender } from '../../api/tasks-api/session';
import { TowersTypes } from '../../effector/towers-progress/store';

import myMTS from './icon_egg_building.svg';
import mainTower from './icon_main_building.svg';
import mobileNetwork from './icon_tarif_building.svg';
import music from './icon_music_building.svg';
import marvin from './icon_marvin_building.svg';
import fitness from './icon_stadium_building.svg';
import library from './icon_library_building.svg';
import igroteka from './icon_slotmachines_building.svg';
import wasdtv from './eSports_arena_building.svg';
import bank from './icon_money_vault_building.svg';
import cashback from './icon_moll_building.svg';
import smartMed from './icon_smartmed_building.svg';
import shop from './icon_rtk_building.svg';
import liveArena from './icon_mts_arena_building.svg';
import auto from './icon_auto_factory_building.svg';
import smartUniversity from './icon_university_vault_building.svg';
import theater from './icon_theater_building.svg';
import digitalTV from './icon_TVtower_building.svg';
import router from './icon_router_building.svg';
import sputnik from './icon_satellite_tv_building.svg';
import memory from './icon_cloud_building.svg';
import roaming from './icon_aeroport_building.svg';

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ChatAvatar: React.FC<IChatAvatar> = ({
  sender,
  userAvatar,
  towerTitle,
}) => {
  const setAvatar = () => {
    if (sender === Sender.BACKEND) {
      switch (towerTitle) {
        case TowersTypes.MY_MTS:
          return myMTS;
        case TowersTypes.MAIN_TOWER:
          return mainTower;
        case TowersTypes.MOBILE_NETWORK:
          return mobileNetwork;
        case TowersTypes.MUSIC:
          return music;
        case TowersTypes.MARVIN:
          return marvin;
        case TowersTypes.FITNESS:
          return fitness;
        case TowersTypes.LIBRARY:
          return library;
        case TowersTypes.IGROTEKA:
          return igroteka;
        case TowersTypes.WASD_TV:
          return wasdtv;
        case TowersTypes.BANK:
          return bank;
        case TowersTypes.CASHBACK:
          return cashback;
        case TowersTypes.SMARTMED:
          return smartMed;
        case TowersTypes.SHOP:
          return shop;
        case TowersTypes.LIVE_ARENA:
          return liveArena;
        case TowersTypes.AUTO:
          return auto;
        case TowersTypes.UNIVERSITY:
          return smartUniversity;
        case TowersTypes.THEATER:
          return theater;
        case TowersTypes.TV:
          return digitalTV;
        case TowersTypes.HOME_INTERNET:
          return router;
        case TowersTypes.SPUTNIK:
          return sputnik;
        case TowersTypes.CONNECT:
          return memory;
        case TowersTypes.ROAMING:
          return roaming;

        default:
          return botDefault;
      }
    } else {
      return userAvatar || userDefault;
    }
  };

  return <Avatar src={setAvatar()} />;
};

interface IChatAvatar {
  sender: Sender;
  userAvatar: string | undefined;
  towerTitle: TowersTypes;
}

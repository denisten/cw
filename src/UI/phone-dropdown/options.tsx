import React from 'react';
import styled from 'styled-components';
import settingIco from './setting-ico.svg';
import exitIco from './exit-ico.svg';
import { MTSSans } from '../../fonts';
import { windowOpen } from '../../utils/window-open';
import { logout } from '../../effector/user-data/events';
import { UserDataStore } from '../../effector/user-data/store';
import { useStore } from 'effector-react';
import OutsideClickHandler from 'react-outside-click-handler';
import { reactGAEvent } from '../../utils/ga-event';
import { receivedTasks } from '../../effector/app-condition/events';

const Img = styled.img`
  margin-right: 7px;
`;

const SettingIco = styled(Img).attrs({ src: settingIco })``;
const ExitIco = styled(Img).attrs({ src: exitIco })``;

const Wrapper = styled.div<IOptionsWrapper>`
  display: ${props => (props.showOptions ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  width: 244px;
  height: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  background: #fff;
  box-sizing: border-box;
  padding: 3px;
`;

const OptionElement = styled.div`
  width: 238px;
  height: 47px;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 16px;
  .black-font {
    font-family: ${MTSSans.BLACK};
  }
  span {
    color: #ce2500;
    font-family: ${MTSSans.REGULAR};
  }
  :hover {
    background: rgba(0, 20, 36, 0.05);
  }
`;

export const Options: React.FC<IOptions> = ({ showOptions, callback }) => {
  const { userSessionSocket } = useStore(UserDataStore);

  const handleExitButtonClick = async () => {
    await logout('');
    reactGAEvent({
      eventLabel: 'vyhod',
      eventCategory: 'avtorizaciya',
      eventAction: 'confirmed',
    });
    receivedTasks(false);
    userSessionSocket && userSessionSocket.disconnect();
  };

  const handleSettingClick = () => {
    windowOpen('http://profile.mts.ru');
    callback();
  };

  return (
    <Wrapper showOptions={showOptions}>
      <OutsideClickHandler onOutsideClick={() => callback()}>
        <OptionElement onClick={handleSettingClick}>
          <SettingIco />
          <div>
            Настроить <span className="black-font"> МТС </span>
            <span> Профиль </span>
          </div>
        </OptionElement>
        <OptionElement onClick={handleExitButtonClick}>
          <ExitIco />
          Выйти из мира
        </OptionElement>
      </OutsideClickHandler>
    </Wrapper>
  );
};

interface IOptions extends IOptionsWrapper {
  callback: Function;
}

interface IOptionsWrapper {
  showOptions: boolean;
}

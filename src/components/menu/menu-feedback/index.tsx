import React, { useState } from 'react';
import styled from 'styled-components';
import { UserDataStore } from '../../../effector/user-data/store';
import { Input } from '../../../UI/input';
import { Button, ButtonClassNames } from '../../../UI/button';
import { InputTitle } from '../menu-profile/authorized';
import { Dropdown } from '../../../UI/dropdown';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MultipleInput } from '../../../UI/muiltiple-input';
import { useStore } from 'effector-react';

const FeedbackWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 5px 12px rgba(26, 29, 34, 0.205638);
  padding: 94px 47px 49px 30px;
  box-sizing: border-box;
`;

const styleConfig = {
  question: { width: '626px' },
  themeDropdown: {
    marginRight: '16px',
  },
  rowWrapper: {
    question: {
      margin: '20px 3px 0 3px',
      justifyContent: 'flex-end',
    },
    theme: {
      margin: '20px 0 0 17px',
      alignItems: 'center',
      width: '625px',
    },
    nameAndEmail: {
      alignItems: 'center',
      marginLeft: '25px',
    },
    name: {
      alignItems: 'center',
      marginRight: '21px',
    },
    email: {
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '21px',
    },
  },
  inputTitle: {
    name: {
      marginRight: '21px',
    },
    email: {
      marginRight: '14px',
    },
    question: { marginRight: '14px' },
  },
};
enum FeedbackOptions {
  PERFORMANCE = 'Улучшению работы Мира клиента',
  ERROR = 'Ошибка приложения',
}

export const Feedback = () => {
  const { name } = useStore(UserDataStore);
  const [localName, setLocalName] = useState(name);
  const [email, setEmail] = useState('');
  const [feedbackTheme, setFeedbackTheme] = useState(
    FeedbackOptions.PERFORMANCE
  );
  const [question, setQuestion] = useState('');
  const submitHandler = () => {
    setLocalName('');
    setEmail('');
    setQuestion('');
    // const data = {
    //   name: localName,
    //   email,
    //   theme: feedbackTheme,
    //   text: question
    // }
    //send request
  };

  return (
    <FeedbackWrapper>
      <RowWrapper style={styleConfig.rowWrapper.nameAndEmail}>
        <RowWrapper style={styleConfig.rowWrapper.name}>
          <InputTitle content="Имя" style={styleConfig.inputTitle.name} />
          <Input
            value={localName}
            onChangeHandler={e => {
              setLocalName(e.target.value);
            }}
            onSubmitHandler={submitHandler}
          />
        </RowWrapper>
        <RowWrapper style={styleConfig.rowWrapper.email}>
          <InputTitle content="Почта" style={styleConfig.inputTitle.email} />
          <Input
            placeholder="mail@mail.ru"
            value={email}
            onChangeHandler={e => setEmail(e.target.value)}
            onSubmitHandler={submitHandler}
          />
        </RowWrapper>
      </RowWrapper>
      <RowWrapper style={styleConfig.rowWrapper.theme}>
        <InputTitle content="Тема" style={styleConfig.inputTitle.name} />
        <Dropdown
          options={Object.values(FeedbackOptions)}
          width={623}
          style={styleConfig.themeDropdown}
          value={feedbackTheme}
          onChangeCallback={el => {
            const correctElType = el as FeedbackOptions;
            setFeedbackTheme(correctElType);
          }}
        />
      </RowWrapper>

      <RowWrapper style={styleConfig.rowWrapper.question}>
        <InputTitle content="Вопрос" style={styleConfig.inputTitle.question} />
        <MultipleInput
          height={120}
          value={question}
          style={styleConfig.question}
          placeholder="Напишите вопрос..."
          onChangeHandler={e => setQuestion(e.target.value)}
        >
          {question}
        </MultipleInput>
      </RowWrapper>
      <RowWrapper style={styleConfig.rowWrapper.button}>
        <Button
          className={ButtonClassNames.NORMAL}
          content="Отправить"
          callback={submitHandler}
        />
      </RowWrapper>
    </FeedbackWrapper>
  );
};

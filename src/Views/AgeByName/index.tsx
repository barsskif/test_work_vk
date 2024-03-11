import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  View,
  Panel,
  PanelHeader,
  Group,
  Subhead,
  Button,
} from '@vkontakte/vkui';

import { useIsPrevFirstName } from '../../customHooks/useIsPrevFirstName';
import { useAgeByName } from '../../api/ageByNameApi';

import cl from './styles.module.css';
import { IAgeByName } from './types';

export const AgeByName = ({ id }: IAgeByName): JSX.Element => {
  const schema = useMemo(
    () =>
      yup.object({
        firstName: yup
          .string()
          .required('Имя обязательно для заполнения')
          .matches(/^\D*$/, 'Имя не должно содержать цифры')
          .matches(
            /^[A-Za-zА]+$/,
            'Имя должно содержать только латинские буквы'
          )
          .min(2, 'Минимальная длина имени должна быть не менее 2 символов'),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors: ValidationFormAgeError },
    getValues,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const { isPrevFirstName } = useIsPrevFirstName();
  const {
    error,
    data: dataAge,
    refetch: refetchAgeByName,
    fetchStatus,
  } = useAgeByName(getValues('firstName'));

  useEffect(() => {
    setValue('firstName', dataAge.name);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout as NodeJS.Timeout);
    };
  }, [typingTimeout]);

  /**
   * Функция обработки отправки формы.
   * Проверяет валидацию и отправляет запрос на получение возраста.
   */
  const onSubmit = async () => {
    clearTimeout(typingTimeout as NodeJS.Timeout);
    const isPrevName = isPrevFirstName(getValues('firstName'));
    if (ValidationFormAgeError.firstName || isPrevName) return;
    await refetchAgeByName();
  };

  /**
   * Обработчик изменения значения поля ввода.
   * @param {ChangeEvent<HTMLInputElement>} event - Событие изменения значения поля ввода.
   */
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue('firstName', event.target.value);
    clearTimeout(typingTimeout as NodeJS.Timeout);
    setTypingTimeout(
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 3000)
    );
    clearErrors('firstName');
  };

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader>Узнайте возраст по имени</PanelHeader>
        <Group style={{ height: '60vh' }}>
          <form onSubmit={handleSubmit(onSubmit)} className={cl.formGroup}>
            <input
              type="text"
              {...register('firstName')}
              className={`${cl.input} ${
                ValidationFormAgeError.firstName && cl.inputError
              }`}
              placeholder="Ваше имя"
              onChange={handleChange}
            />
            {(ValidationFormAgeError.firstName || error) && (
              <Subhead Component="h2" weight="1" className={cl.error}>
                {ValidationFormAgeError.firstName?.message || error?.message}
              </Subhead>
            )}
            {dataAge && (
              <Subhead Component="h2" weight="1" className={cl.error}>
                Ваш возраст:{' '}
                {(dataAge.age as string) || 'кажется ваш возраст 0'} лет
              </Subhead>
            )}
            <Button
              type="submit"
              disabled={!!ValidationFormAgeError.firstName}
              loading={fetchStatus === 'fetching'}
              style={{ width: '40%' }}
            >
              Удивитесь
            </Button>
          </form>
        </Group>
      </Panel>
    </View>
  );
};

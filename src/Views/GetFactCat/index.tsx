import { useEffect, useRef, useState } from 'react';

import {
  Alert,
  Button,
  FormItem,
  FormLayoutGroup,
  Group,
  Panel,
  PanelHeader,
  Textarea,
  View,
} from '@vkontakte/vkui';

import { useGetCatFact } from '../../api/catfactApi';

import { IGetFactCat } from './types';

export const GetFactCat = ({ id }: IGetFactCat) => {
  const [factByCat, setFactByCat] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    error,
    data,
    refetch: refetchGetCatFact,
    fetchStatus,
  } = useGetCatFact();

  const handleClick = async () => {
    await refetchGetCatFact();
  };

  useEffect(() => {
    if (!inputRef.current) return;

    setFactByCat(data?.fact || '');

    inputRef.current.value = data?.fact || '';
    inputRef.current.focus();

    const words = inputRef.current.value.split(' ');
    const firstWordLength = words[0].length;
    inputRef.current.setSelectionRange(firstWordLength, firstWordLength);
  }, [data?.fact]);

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader>факт о наших маленьких и пушистых</PanelHeader>
        <Group style={{ height: '60vh' }}>
          <form>
            <FormLayoutGroup>
              <FormItem top="факт о наших маленьких и пушистых">
                <Textarea
                  rows={7}
                  placeholder="факт о наших маленьких и пушистых"
                  style={{ width: `100%` }}
                  value={factByCat}
                  getRef={inputRef}
                  onChange={(e) => setFactByCat(e.target.value)}
                  disabled={fetchStatus === 'fetching'}
                />
              </FormItem>
              <FormItem>
                <Button
                  loading={fetchStatus === 'fetching'}
                  onClick={handleClick}
                  size="l"
                >
                  получить факт о наших маленьких и пушистых
                </Button>
              </FormItem>
            </FormLayoutGroup>

            {error && (
              <Alert
                actions={[
                  {
                    title: 'close',
                    mode: 'destructive',
                    action: () => {},
                  },
                ]}
                actionsLayout="horizontal"
                dismissButtonMode="inside"
                onClose={() => {}}
                header={error?.name}
                text={error?.message}
              />
            )}
          </form>
        </Group>
      </Panel>
    </View>
  );
};

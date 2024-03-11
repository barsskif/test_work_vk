import { MouseEvent, useState } from 'react';

import {
  Cell,
  Epic,
  Group,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  Subhead,
  Tabbar,
  TabbarItem,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';

import { GetFactCat } from './Views/GetFactCat';
import { AgeByName } from './Views/AgeByName';

import './App.css';

function App() {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();

  const [activeStory, setActiveStory] = useState('factByCat');

  /**
   * Обработчик изменения текущей истории (экрана).
   * @param {MouseEvent<HTMLElement>} event - Событие изменения текущей истории.
   */
  const onStoryChange = (event: MouseEvent<HTMLElement>) => {
    const story = event.currentTarget.dataset.story;

    if (story) {
      setActiveStory(story);
    }
  };

  const hasHeader = platform !== 'vkcom';

  return (
    <SplitLayout
      header={hasHeader && <PanelHeader delimiter="none" />}
      style={{ justifyContent: 'center' }}
    >
      {viewWidth.tabletPlus && (
        <SplitCol
          className={viewWidth.tabletPlus.className}
          fixed
          width={280}
          maxWidth={280}
        >
          <Panel>
            {hasHeader && <PanelHeader />}
            <Group>
              <Cell
                disabled={activeStory === 'factByCat'}
                className={
                  activeStory === 'factByCat' ? 'activeStoryStyles' : undefined
                }
                style={{ marginBottom: '10px' }}
                data-story="factByCat"
                onClick={onStoryChange}
              >
                <Subhead
                  Component="h2"
                  weight="1"
                  style={
                    activeStory === 'factByCat'
                      ? { color: 'var(--vkui--color_text_contrast_themed)' }
                      : undefined
                  }
                >
                  факт о наших маленьких и пушистых
                </Subhead>
              </Cell>
              <Cell
                disabled={activeStory === 'name'}
                className={
                  activeStory === 'name' ? 'activeStoryStyles' : undefined
                }
                data-story="name"
                onClick={onStoryChange}
              >
                <Subhead
                  Component="h2"
                  weight="1"
                  style={
                    activeStory === 'name'
                      ? { color: 'var(--vkui--color_text_contrast_themed)' }
                      : undefined
                  }
                >
                  Узнать возвраст по имени
                </Subhead>
              </Cell>
            </Group>
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'factByCat'}
                  data-story="factByCat"
                  text="факт о наших маленьких и пушистых"
                ></TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'name'}
                  data-story="name"
                  text="Узнать возвраст по имени"
                ></TabbarItem>
              </Tabbar>
            )
          }
        >
          <GetFactCat id="factByCat" />

          <AgeByName id="name" />
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
}

export default App;

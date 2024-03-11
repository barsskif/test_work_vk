import { useRef } from 'react';

/**
 * Пользовательский хук для проверки совпадения нового имени с предыдущим именем.
 * @returns Объект, содержащий функцию `isPrevFirstName` для проверки предыдущего имени.
 */
export const useIsPrevFirstName = () => {
  const ref = useRef<string | null>(null);

  const isPrevFirstName = (newName: string) => {
    const lowerCaseNewName = newName.toLowerCase();
    const isPrev = ref.current && ref.current === lowerCaseNewName;

    if (!isPrev) {
      ref.current = lowerCaseNewName;
    }

    return isPrev;
  };

  return { isPrevFirstName };
};

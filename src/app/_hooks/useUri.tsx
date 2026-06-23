import { usePathname } from 'next/navigation';

import { BASE_PATH } from '@/app/_data/constants';

const useUri = () => {
  const pathName = usePathname();

  return `${BASE_PATH}${pathName}`;
};

export default useUri;

import { lazy, Suspense } from 'react';
import type { ComponentPropsWithoutRef, ReactNode, FC, LazyExoticComponent } from 'react';
import type { CountryCode } from './types';

export interface FlagProps extends ComponentPropsWithoutRef<'svg'> {
  country: CountryCode;
  fallback?: ReactNode;
}

type FlagFC = FC<ComponentPropsWithoutRef<'svg'>>;
type LazyFlagFC = LazyExoticComponent<FlagFC>;

const NullFlag: FlagFC = () => null;

const cache = new Map<string, LazyFlagFC>();

function getFlag(country: string): LazyFlagFC {
  let flag = cache.get(country);
  if (!flag) {
    flag = lazy<FlagFC>(() =>
      (import(`./flags/${country}.tsx`) as Promise<{ default: FlagFC }>).catch(
        () => ({ default: NullFlag }),
      ),
    );
    cache.set(country, flag);
  }
  return flag;
}

export default function Flag({ country, fallback = null, ...props }: FlagProps) {
  const LazyFlag = getFlag(country);
  return (
    <Suspense fallback={fallback}>
      <LazyFlag {...props} />
    </Suspense>
  );
}

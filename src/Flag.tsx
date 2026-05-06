import { lazy, Suspense } from 'react';
import type { SVGProps, ReactNode, FC, LazyExoticComponent } from 'react';
import type { CountryCode } from './types';

export interface FlagProps extends SVGProps<SVGSVGElement> {
  country: CountryCode;
  fallback?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLazy = LazyExoticComponent<any>;

const NullFlag: FC = () => null;

const cache = new Map<string, AnyLazy>();

function getFlag(country: string): AnyLazy {
  if (!cache.has(country)) {
    cache.set(
      country,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lazy<FC>(() =>
        (import(`./flags/${country}.tsx`) as Promise<{ default: FC }>).catch(
          () => ({ default: NullFlag }),
        ),
      ),
    );
  }
  return cache.get(country)!;
}

export default function Flag({ country, fallback = null, ...props }: FlagProps) {
  const LazyFlag = getFlag(country);
  return (
    <Suspense fallback={fallback}>
      <LazyFlag {...props} />
    </Suspense>
  );
}

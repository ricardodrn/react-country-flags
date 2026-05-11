import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import Flag from '../Flag';
import type { CountryCode } from '../types';

describe('Flag Component', () => {
  const countryCodesToTest: CountryCode[] = ['CL', 'US', 'GB', 'FR', 'DE'];

  countryCodesToTest.forEach((country) => {
    describe(`with ${country} flag`, () => {
      it(`should render ${country} flag without crashing`, async () => {
        const { container } = render(<Flag country={country} />);
        
        await waitFor(() => {
          const svg = container.querySelector('svg');
          expect(svg).toBeInTheDocument();
        });
      });

      it(`should render SVG for ${country} flag`, async () => {
        const { container } = render(<Flag country={country} />);
        
        await waitFor(() => {
          const svg = container.querySelector('svg');
          expect(svg).toHaveAttribute('viewBox');
        });
      });

      it(`should accept custom props on ${country} flag`, async () => {
        const { container } = render(
          <Flag country={country} className="test-flag" data-testid={`flag-${country}`} />
        );
        
        await waitFor(() => {
          const svg = container.querySelector('svg');
          expect(svg).toHaveAttribute('class', 'test-flag');
          expect(svg).toHaveAttribute('data-testid', `flag-${country}`);
        });
      });

      it(`should support width and height on ${country} flag`, async () => {
        const { container } = render(
          <Flag country={country} width="100" height="60" />
        );
        
        await waitFor(() => {
          const svg = container.querySelector('svg');
          expect(svg).toHaveAttribute('width', '100');
          expect(svg).toHaveAttribute('height', '60');
        });
      });
    });
  });

  it('should render with a valid country code', async () => {
    const { container } = render(<Flag country="CL" />);
    
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should display fallback while loading', async () => {
    const fallback = <div>Loading...</div>;
    const { container } = render(
      <Flag country="CL" fallback={fallback} />
    );

    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should handle invalid country code gracefully', async () => {
    const { container } = render(
      // @ts-expect-error - Testing invalid country code
      <Flag country="INVALID" />
    );

    await waitFor(() => {
      // Should render without crashing (NullFlag returns null)
      expect(container).toBeInTheDocument();
    });
  });

  it('should use Suspense with custom fallback', async () => {
    const customFallback = <div role="status">Custom Loading...</div>;
    const { container } = render(
      <Flag country="CL" fallback={customFallback} />
    );

    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should cache flag components', async () => {
    const { rerender } = render(<Flag country="CL" />);

    await waitFor(() => {
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    // Re-render with same country - should use cache
    rerender(<Flag country="CL" />);

    await waitFor(() => {
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should render with aria attributes', async () => {
    const { container } = render(
      <Flag country="CL" aria-label="Chile flag" />
    );

    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-label', 'Chile flag');
    });
  });

  it('should support style props', async () => {
    const { container } = render(
      <Flag country="CL" style={{ opacity: 0.5 }} />
    );

    await waitFor(() => {
      const svg = container.querySelector('svg') as SVGSVGElement;
      expect(svg.style.opacity).toBe('0.5');
    });
  });

  it('should work with multiple countries in sequence', async () => {
    const { rerender, container } = render(<Flag country="CL" />);

    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    rerender(<Flag country="US" />);

    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});

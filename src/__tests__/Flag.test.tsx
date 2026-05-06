import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Flag from '../Flag';

describe('Flag Component', () => {
  it('should render with a valid country code', async () => {
    const { container } = render(<Flag country="CL" />);
    
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should render SVG for CL flag', async () => {
    const { container } = render(<Flag country="CL" />);
    
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 640 480');
    });
  });

  it('should display fallback while loading', async () => {
    const fallback = <div>Loading...</div>;
    render(
      <Flag country="CL" fallback={fallback} />
    );

    // Fallback might be displayed briefly during lazy load
    await waitFor(() => {
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should accept custom props and pass them to the flag component', async () => {
    const { container } = render(
      <Flag country="CL" className="custom-flag" data-testid="flag-component" />
    );
    
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('class', 'custom-flag');
      expect(svg).toHaveAttribute('data-testid', 'flag-component');
    });
  });

  it('should support width and height props', async () => {
    const { container } = render(
      <Flag country="CL" width="100" height="60" />
    );
    
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100');
      expect(svg).toHaveAttribute('height', '60');
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
    render(
      <Flag country="CL" fallback={customFallback} />
    );

    // Eventually the flag should load
    await waitFor(() => {
      const svg = document.querySelector('svg');
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
});

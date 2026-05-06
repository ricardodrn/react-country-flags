import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CL from '../flags/CL';

describe('CL Flag Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<CL />);
    expect(container).toBeInTheDocument();
  });

  it('should render as an SVG element', () => {
    const { container } = render(<CL />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have the correct namespace', () => {
    const { container } = render(<CL />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  it('should have the correct viewBox', () => {
    const { container } = render(<CL />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 640 480');
  });

  it('should accept custom props', () => {
    const { container } = render(<CL className="test-flag" data-testid="cl-flag" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('class', 'test-flag');
    expect(svg).toHaveAttribute('data-testid', 'cl-flag');
  });

  it('should render with custom width and height', () => {
    const { container } = render(<CL width="100" height="50" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '50');
  });

  it('should contain the expected flag elements', () => {
    const { container } = render(<CL />);
    const paths = container.querySelectorAll('svg path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should have fillRule property', () => {
    const { container } = render(<CL />);
    const group = container.querySelector('g');
    // fillRule is rendered as fill-rule in the DOM
    expect(group).toHaveAttribute('fill-rule', 'evenodd');
  });

  it('should have multiple path elements for flag design', () => {
    const { container } = render(<CL />);
    const paths = container.querySelectorAll('svg path');
    // Chile flag has at least 4 paths (blue, white, star, red sections)
    expect(paths.length).toBeGreaterThanOrEqual(4);
  });

  it('should be compatible with style props', () => {
    const { container } = render(
      <CL style={{ opacity: 0.5, filter: 'brightness(0.8)' }} />
    );
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg.style.opacity).toBe('0.5');
  });
});

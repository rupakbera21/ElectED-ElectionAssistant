import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }) => <div className={className} style={style} {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    main: ({ children, ...props }) => <main {...props}>{children}</main>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
  useTransform: () => ({}),
  useMotionValueEvent: vi.fn(),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  ArrowDown: () => <svg />,
  Zap: () => <svg />,
  Shield: () => <svg />,
  Users: () => <svg />,
  MessageCircle: () => <svg />,
  Send: () => <svg />,
  Sparkles: () => <svg />,
  X: () => <svg />,
}));

// Mock components that are lazy loaded or complex
vi.mock('../src/components/AnimatedBackground', () => ({
  default: () => <div data-testid="animated-bg" />
}));
vi.mock('../src/components/SmoothScroll', () => ({
  default: ({ children }) => <div data-testid="smooth-scroll">{children}</div>
}));

describe('Language Toggle', () => {
  it('should toggle between English and Hindi content', async () => {
    render(<App />);
    
    // Check initial English text
    expect(screen.getByText(/Indian Democracy/i)).toBeInTheDocument();
    
    // Find toggle button and click
    const toggleBtn = screen.getByLabelText(/Toggle Language to Hindi/i);
    fireEvent.click(toggleBtn);
    
    // Check if text changed to Hindi
    expect(screen.getByText(/भारतीय लोकतंत्र/i)).toBeInTheDocument();
    
    // Check if toggle button text updated
    expect(screen.getByText(/HI \/ EN/i)).toBeInTheDocument();
  });
});

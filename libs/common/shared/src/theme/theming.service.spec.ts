import { DOCUMENT } from '@angular/common';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WINDOW } from '../tokens';
import { ThemeService } from './theme.service';

const mockRenderer2 = {
  addClass: jest.fn(),
  removeClass: jest.fn(),
};
const mockRendererFactory2 = {
  createRenderer: jest.fn(() => mockRenderer2),
};
describe('ThemeService', () => {
  let service: ThemeService;
  let document: Document;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        {
          provide: RendererFactory2,
          useValue: { createRenderer: () => renderer },
        },
        {
          provide: WINDOW,
          useValue: { matchMedia: () => ({ matches: false }) },
        },
        { provide: RendererFactory2, useValue: mockRendererFactory2 },
      ],
    });
    service = TestBed.inject(ThemeService);
    document = TestBed.inject(DOCUMENT);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the system default theme', () => {
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should change theme to dark', () => {
    service.changeTheme('dark');
    expect(service.getCurrentTheme()).toBe('dark');
    expect(mockRenderer2.addClass).toHaveBeenCalledWith(
      document.documentElement,
      'dark',
    );
    expect(mockRenderer2.removeClass).toHaveBeenCalledWith(
      document.documentElement,
      'light',
    );
  });

  it('should toggle theme', () => {
    // Assuming starting with light theme
    service.changeTheme();
    expect(service.getCurrentTheme()).toBe('dark');
    service.changeTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

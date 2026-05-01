'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
    theme: Theme
    resolvedTheme: 'light' | 'dark'
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'theme'

function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(resolved: 'light' | 'dark') {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    root.style.colorScheme = resolved
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
    return ctx
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system')
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        let stored: Theme = 'system'
        try {
            stored = (localStorage.getItem(STORAGE_KEY) as Theme) || 'system'
        } catch {}
        const resolved = stored === 'system' ? getSystemTheme() : stored
        setThemeState(stored)
        setResolvedTheme(resolved)
        applyTheme(resolved)
        // Ensure cookie is in sync so next SSR renders the right class
        document.cookie = `theme=${resolved};path=/;max-age=31536000;SameSite=Lax`
    }, [])

    useEffect(() => {
        if (theme !== 'system') return
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => {
            const resolved = e.matches ? 'dark' : 'light'
            setResolvedTheme(resolved)
            applyTheme(resolved)
        }
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [theme])

    const setTheme = useCallback((newTheme: Theme) => {
        const resolved = newTheme === 'system' ? getSystemTheme() : newTheme
        setThemeState(newTheme)
        setResolvedTheme(resolved)
        applyTheme(resolved)
        try {
            localStorage.setItem(STORAGE_KEY, newTheme)
            // Cookie lets the server apply the class before hydration (no flash)
            document.cookie = `theme=${resolved};path=/;max-age=31536000;SameSite=Lax`
        } catch {}
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

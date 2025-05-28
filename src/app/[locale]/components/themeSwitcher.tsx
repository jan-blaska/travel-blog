'use client'

import { FiSun, FiMoon } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    if (resolvedTheme === 'dark') {
        return <FiSun className="cursor-pointer" onClick={() => setTheme('light')} />
    }

    if (resolvedTheme === 'light') {
        return <FiMoon className="cursor-pointer" onClick={() => setTheme('dark')} />
    }
}

export default ThemeSwitcher
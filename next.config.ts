import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX();
export default withMDX(withNextIntl(nextConfig));
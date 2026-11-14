import React from 'react';
import images from '../../config/images.json';

type Props = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height'
> & {
  image: keyof typeof images;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

// Static variants keep image optimization compatible with S3 (no image server needed).
export default function ResponsiveImage({
  image,
  alt,
  width,
  height,
  priority = false,
  sizes = `${width}px`,
  loading,
  ...props
}: Props) {
  const { widths } = images[image];
  const source = (size: number) => `/images/optimized/${image}-${size}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      decoding='async'
      height={height}
      loading={priority ? 'eager' : loading || 'lazy'}
      sizes={sizes}
      src={source(widths.find(size => size >= width) || widths[widths.length - 1])}
      srcSet={widths.map(size => `${source(size)} ${size}w`).join(', ')}
      width={width}
    />
  );
}

import React from "react";

interface CrownIconProps extends React.SVGProps<SVGSVGElement> {}

export default function CrownIcon({
  width = 42,
  height = 33,
  className,
  ...props
}: CrownIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="42" height="33" fill="url(#pattern0_1638_2475)" />
      <defs>
        <pattern
          id="pattern0_1638_2475"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1638_2475"
            transform="matrix(0.00873016 0 0 0.0111111 0.107143 0)"
          />
        </pattern>
        <image
          id="image0_1638_2475"
          width="90"
          height="90"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
export function BackgroundArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute -right-14 -top-12 opacity-[0.13]"
        width="230"
        height="230"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 33 C50 23 42 16 33 16 C22 16 15 25 15 34 C15 51 33 61 50 75 C67 61 85 51 85 34 C85 25 78 16 67 16 C58 16 50 23 50 33 Z"
          stroke="#e24b4a"
          strokeWidth="1.2"
        />
        <path
          d="M50 38 C50 31 44 26 38 26 C30 26 25 32 25 39 C25 51 38 59 50 69 C62 59 75 51 75 39 C75 32 70 26 62 26 C56 26 50 31 50 38 Z"
          stroke="#e24b4a"
          strokeWidth="0.8"
        />
      </svg>

      <svg
        className="absolute -left-8 top-1/3 opacity-[0.11]"
        width="150"
        height="360"
        viewBox="0 0 50 120"
        fill="none"
      >
        <path
          d="M38 0 C30 12 22 18 24 30 C26 42 38 46 36 58 C34 72 20 78 24 92 C27 103 36 108 34 120"
          stroke="#e24b4a"
          strokeWidth="1"
        />
        <path
          d="M46 4 C38 16 30 22 32 34 C34 46 46 50 44 62 C42 76 28 82 32 96 C35 107 44 112 42 124"
          stroke="#e24b4a"
          strokeWidth="0.7"
        />
      </svg>

      <svg
        className="absolute -bottom-10 -right-10 opacity-[0.12]"
        width="200"
        height="200"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M72 10 C60 22 42 24 34 38 C26 52 30 68 42 76 C54 84 70 80 78 68"
          stroke="#e24b4a"
          strokeWidth="1.1"
        />
        <circle cx="52" cy="57" r="4.5" stroke="#e24b4a" strokeWidth="1" />
        <circle cx="52" cy="57" r="1.4" fill="#e24b4a" fillOpacity="0.5" />
      </svg>

      <svg
        className="absolute bottom-1/4 left-1/2 opacity-[0.09]"
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 35 C50 27 44 22 37 22 C28 22 23 29 23 36 C23 49 37 57 50 68 C63 57 77 49 77 36 C77 29 72 22 63 22 C56 22 50 27 50 35 Z"
          stroke="#e24b4a"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

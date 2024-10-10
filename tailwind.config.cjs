/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //arco design
        "primary-1": "rgb(var(--primary-1))",
        "primary-2": "rgb(var(--primary-2))",
        "primary-3": "rgb(var(--primary-3))",
        "primary-4": "rgb(var(--primary-4))",
        "primary-5": "rgb(var(--primary-5))",
        "primary-6": "rgb(var(--primary-6))",
        "primary-7": "rgb(var(--primary-7))",
        //success
        "success-1": "rgb(var(--success-1))",
        "success-2": "rgb(var(--success-2))",
        "success-3": "rgb(var(--success-3))",
        "success-4": "rgb(var(--success-4))",
        "success-5": "rgb(var(--success-5))",
        "success-6": "rgb(var(--success-6))",
        "success-7": "rgb(var(--success-7))",
        //warning
        "warning-1": "rgb(var(--warning-1))",
        "warning-2": "rgb(var(--warning-2))",
        "warning-3": "rgb(var(--warning-3))",
        "warning-4": "rgb(var(--warning-4))",
        "warning-5": "rgb(var(--warning-5))",
        "warning-6": "rgb(var(--warning-6))",
        "warning-7": "rgb(var(--warning-7))",
        //danger
        "danger-1": "rgb(var(--danger-1))",
        "danger-2": "rgb(var(--danger-2))",
        "danger-3": "rgb(var(--danger-3))",
        "danger-4": "rgb(var(--danger-4))",
        "danger-5": "rgb(var(--danger-5))",
        "danger-6": "rgb(var(--danger-6))",
        "danger-7": "rgb(var(--danger-7))",
        //link
        "link-1": "rgb(var(--link-1))",
        "link-2": "rgb(var(--link-2))",
        "link-3": "rgb(var(--link-3))",
        "link-4": "rgb(var(--link-4))",
        "link-5": "rgb(var(--link-5))",
        "link-6": "rgb(var(--link-6))",
        "link-7": "rgb(var(--link-7))",
        //data
        "data-1": "rgb(var(--data-1))",
        "data-2": "rgb(var(--data-2))",
        "data-3": "rgb(var(--data-3))",
        "data-4": "rgb(var(--data-4))",
        "data-5": "rgb(var(--data-5))",
        "data-6": "rgb(var(--data-6))",
        //到20
        "data-7": "rgb(var(--data-7))",
        "data-8": "rgb(var(--data-8))",
        "data-9": "rgb(var(--data-9))",
        "data-10": "rgb(var(--data-10))",
        "data-11": "rgb(var(--data-11))",
        "data-12": "rgb(var(--data-12))",
        "data-13": "rgb(var(--data-13))",
        "data-14": "rgb(var(--data-14))",
        "data-15": "rgb(var(--data-15))",
        "data-16": "rgb(var(--data-16))",
        "data-17": "rgb(var(--data-17))",
        "data-18": "rgb(var(--data-18))",
        "data-19": "rgb(var(--data-19))",
        "data-20": "rgb(var(--data-20))",
        // border
        "bc-1": "var(--color-border-1)",
        "bc-2": "var(--color-border-2)",
        "bc-3": "var(--color-border-3)",
        "bc-4": "var(--color-border-4)",
        // fill
        "fill-1": "var(--color-fill-1)",
        "fill-2": "var(--color-fill-2)",
        "fill-3": "var(--color-fill-3)",
        "fill-4": "var(--color-fill-4)",
        // text
        "tc-1": "var(--color-text-1)",
        "tc-2": "var(--color-text-2)",
        "tc-3": "var(--color-text-3)",
        "tc-4": "var(--color-text-4)",
        // 背景色
        "surface-1": "var(--color-bg-1)",
        "surface-2": "var(--color-bg-2)",
        "surface-3": "var(--color-bg-3)",
        "surface-4": "var(--color-bg-4)",
        "surface-5": "var(--color-bg-5)",
      },
    },
  },
  plugins: [],
};

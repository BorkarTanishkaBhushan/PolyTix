## PolyTix

The challenge is to create a user-friendly dApp that allows users to create, transfer and buy NFT-based tickets while maintaining the integrity of the NFTs.


## Prerequisites
- Node.js (version 14 or higher)
- Yarn
 ### Install Node.js
- Go to the Node.js website and download the latest version for Windows.
- Run the downloaded installer and follow the instructions to install Node.js.

### Installation

 - Start by creating a new Next.js project if you don’t have one set up already. The most common approach is to use Create Next App.
 ```bash
 npx create-next-app@latest my-project --typescript --eslint
cd my-project
```
- Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both tailwind.config.js and postcss.config.js.
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```
- Add the paths to all of your template files in your tailwind.config.js file.

```bash
  /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- Add the @tailwind directives for each Tailwind’s layers to your globals.css file.

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Run your build process with npm run dev.
```bash
npm run dev
```
 - Start using Tailwind’s utility classes to style your content.
 
```bash
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```





## Deployment

To deploy this project run

1)Go to the hardhat directory then run the following commands:
```bash
  npx hardhat compile
  npx hardhat ./scripts/deploy.js --network mumbai
```

2)Go to the frontend directory then run the following commands:
```bash
  npm run dev
```

## Authors

- [@Tanishka borkar](https://github.com/BorkarTanishkaBhushan)
- [@Meet Dama](https://github.com/4bitbot)
- [@ Avisha Shah](https://github.com/Avisha19)
- [@ Nidhi Bhanushali](https://github.com/Nidhi20-7)
## Acknowledgements
PolyTix was built with the help of the following open-source libraries:
- OpenZeppelin
- React
- Web3.js
- Axios
- Chainlinks
We would also like to thank the Polygon team for their support and guidance throughout the development of this project.



## License

 PolyTix is released under the MIT License. See [MIT](https://choosealicense.com/licenses/mit/) for details.


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    

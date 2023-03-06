## Decentralized Mobile Game

- This game created using react-native
- App can be run on Android successfully, for Ios some settings not integrated, in later updates it will full support Ios
- It stores user data on solana network
- The smart-contract deployed to devnet
- If you want to deploy smart-contract of this app on local, you can access from [here](https://github.com/antinucleus/findit-solana-smart-contract)

## How can you install it ?
> You can install directly from [findit releases](https://github.com/antinucleus/findit/releases)

> Or you can clone this repo

- Clone repo to your machine
- Run this command `yarn install` or `yarn` 
- After that run this command `yarn start` and it will start **metro** after that type `a` or open another terminal and run this command `yarn android`

## How To Play ?
- You have to install Phantom wallet on your device and **set Phantom wallet network to devnet**
- Also you should have SOL in your account. For testing you can import this private key to Phantom wallet
`2tURF4eRVVBYMX7yrs5o6skd9FDpK1nP4UZx3EaSKPGEb8yPFPL6ieJYxGE8hQRABwE3o3bNjm4yph7evVsBwCts`
- After that run the findit game
- Press connect to wallet button
- If Phantom wallet is installed on your device, app will ask for connection

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/connect-wallet.png" width="250" height="500"/>

- If not installed,app redirects you to download link
- After connection, for first time you have to enter your username

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/enter-user-name.png" width="250" height="500"/>

- Your username will be automatically read from the store in the next use

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/later-start.png" width="250" height="500"/>

- When enter your username start button will be active. Press start button and play the game

## The Logic of The Game
- Game shows you box collecttions for each level and some of this box has green color. You have to memorize these boxes

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/memorized-boxes.png" width="250" height="500"/>

- After a short time all of the boxes will have white color
- Click the boxes that you memorized them. When click the box its color will be blue

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/user-selected-boxes.png" width="250" height="500"/>

- You have 3 rights. When you select wrong boxes your rights will be decreased

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/wrong-boxes.png" width="250" height="500"/>

- When you lose your all rights you will see your score

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/score-screen.png" width="250" height="500"/>

- If you press save score button, app redirect you to Pahtom wallet. If you approve your score will be stored on solana network

<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/approve-saving-score.png" width="250" height="500"/>

## Demo

<div align="center">
<p>Game Play</p>
<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/demo1.gif" width="250" height="600"/>
</div>

<div align="center">
<p>Transaction history on Phantom wallet</p>
<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/demo2.gif" width="250" height="600"/>
</div>


<div align="center" >
<p>Program (smart-contract) logs on Sol Scan</p>
<img src="https://github.com/antinucleus/repo-medias/blob/main/findit/result.png" width="300" height="600"/>
</div>


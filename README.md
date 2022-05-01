# Demo

https://user-images.githubusercontent.com/68787800/166133625-d2464a44-e950-4138-bdc4-a970e28de9ea.mp4

https://user-images.githubusercontent.com/68787800/166133640-dea5e617-1045-40f7-bf3e-8935a78143be.mp4

[Sample page](https://terrier-lover.github.io/Genie_Take_Home_Exam_Sample/)

# How to install
`npm start`

# Notes
- Requirements
  - Use SWR for data fetching (https://swr.vercel.app/docs/getting-started ) and React as the front end framework
  - Get data from POST https://v2.api.genie.xyz/assets
  - Add infinite scroll, loading 25 NFTs at a time
- Specs
  - It only supports **contract address** search
  - **contract address** can be non-checksummed version (0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d) or checksummed version (0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D). It also accept address without ``0x`` prefix (bc4ca0eda7647a8ab7c2061c2e118a18a936f13d)
 

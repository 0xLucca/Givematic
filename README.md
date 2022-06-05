# Givematic

## Inspiration
Do you remember those ads on TV where you stared at a sad puppy that could only dream of being adopted for just pennies a day? What if I told you that it cost $34,000 to get that puppy adopted? Well, this is exactly how much it costs the ASPCA to get each animal adopted. We believe that philanthropists of all sizes should be able to easily understand how much of their donations goes to the things they believe in, and how much goes into the CEO's pockets and into TV ads. 

Additionally, these principals can be utilized for many organizations that need to be more transparent about how funds are allocated and improve speed of getting money to those who need it.

## What it does
Provides an interface where philanthropists get a transparent view of what charities are spending their donations on. Likewise, it is a place for charities to rapidly adapt their allocations for different missions to test out what inspires philanthropists to donate.

## How we built it
Used mostly Typescript, Javascript and solidity languages, using Figment DataHub for nodes, and a subgraph to feed data from the Polygon Mumbai testnet to the user interface, and used RainbowKit to interface with Coinbase wallet. Additionally we evaluated the Android application for Coinbase wallet for various bugs and potential improvements (information, including videos in the PPTX version of the presentation slides).

## Challenges we ran into
- Coming up with an idea was challenging since we all met at the first day of Graph Hack and had to coordinate our skills to figure out what was possible to build in the limited time.
- The mapping during subgraph development was the most difficult part. Since we didn't have static contracts (instead they were dynamically changing in size) it made the subgraphs more complicated than we were used to.
- The UI was difficult to piece together since we needed the subgraph to make it work, so a pre-prototype infrastructure was made directly talking to polygon prior to switching over to the subgraph.
- Doing things in parallel proved to be essential for all of us since the UI depended on UX design and the subgraph design, and the presentation slides required the prototype to be completed.

## Accomplishments that we're proud of
We are proud of building a program that utilizes several of the tools made by the community in a very short amount of time with people we didn't know 72 hours ago.

## What we learned
How to integrate new tools like RainbowKit, DataHub by Figment, interacting with Polygon and subgraphs as a base, and how to ask for help to make sure we were able to get over some of our hurdles in time for submission.

## What's next for Givematic
Givematic needs to figure out how we could verify that the entities are who they are claiming they are, pulling in real-world identity to ensure that these organizations are not missrepresented.

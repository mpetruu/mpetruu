~ yo, my name's Matthew. I'm a U4 Software Engineering student at McGill. I'm very interested in product R&D. I'm not interested if it doesn't genuinely impact people. Here's some stuff I've done:

## Experience

### Software Engineer, Shopify Foundations - [shopify.com](https://www.shopify.com)
*April 2026 - August 2026*

Organizations Team: business platform and multi-shop + partners-related features

Stack: Ruby, Rails, GraphQL, Postgres, TypeScript, Elasticsearch

### Software Engineer, Core - [shopify.com](https://www.shopify.com)
*January 2026 - April 2026*

Access Team: auth infra + foundational permissions

Stack: Ruby, Rails, GraphQL, Postgres, TypeScript, Elasticsearch

### Software Engineer, Growth RnD - [botpress.com](https://botpress.com/)
*April 2025 - August 2025*

Growth RnD: Building features that make customers spend more

Stack: TypeScript, Node.js, React.js, Express.js

### Forward Deployed Engineer, Growth - [botpress.com](https://botpress.com/)
*December 2024 - April 2025*

1. talk to customer to diagnose issue.
2. join their team / work on their behalf.
3. resolve issue(s). they sign a longer contract. win-win.

Stack: TypeScript, my mouth

### Software Engineer, IAM - [rustica](https://rusticafoods.com/)
*February 2024 - August 2024*

Working on internal sites / internal tools related to inventory, ticketing systems, data pipelines,
and identity/access management.

Stack: PHP, SQL, Microsoft stack (entra / azure, power automate, etc...)

## Projects

### Jarvis - [jarvis.botpress.sh](https://jarvis.botpress.sh)
*June 2025 - August 2025*

Developed the backend for Jarvis, an automated AI agent creation platform for interactive sales demos. Entirely coded in TypeScript on a Next.js app deployed to Vercel, I worked on implementing the API endpoints, database sync, user authentication/user accounts, auto-deployment of bots, website crawling capability, and auto-install of workflows/integrations.

I also developed the repository’s initial GitHub Actions workflows to automate standard checks ranging from ensuring code quality to testing bot deployments and deletion endpoints triggered whenever a pull request is opened or merged into the main branch.

---

### FAQ Analyzer Plugin on Botpress
*May 2025*

Developed an open-source plugin which autocreates a table and a hook using the Botpress Vanilla Client. The hook attached to your Agent will run in the background everytime a conversation ends (thus not affecting the original conversation and any conversations that come after it from the same user --> it runs entirely in the background).

Essentially, the hook uses the Botpress ZAI package, ZUI (Zod + UI) + AI, to analyze the user messages and context to keep a track of the most frequently asked questions by all of the users that use your Agent. The analytics is provided in the table that was autocreated.

The issue with just storing messages directly without using ZAI is that conversations aren't static. For instance, a user may have the following conversation:

"How much GDP does Canada have?"
"What about the U.S?"

Just storing messages directly would not work as "What about the U.S?" is not a real question. It needs to be stored as "How much GDP does the U.S. have?"

Additionally, we need to use zai checking and extraction to see if the same question has been asked before because we don't want duplicates of the same question.
I.e: "How much GDP does the U.S. have?" and "How much GDP does the U.S.A. have?". These should be the same entry in the table.

Thus, using TypeScript with zod schemas + ZAI, I managed to make an open-source plugin used by many high-priority clients!

---

### BigCommerce Sync Integration with Botpress
*March 2025 - April 2025*

I developed an open-source integration that was requested by many high-priority clients. An integration which allows your BigCommerce product table to sync with your AI Agent's internal table/knowledge base. This allows the Agent to use RAG for accurate product recommendations.

It is coded entirely in TypeScript and creates 3 webhooks to your store upon initial configuration.
1. Whenever a product is created.
2. Whenever a product is updated.
3. Whenever a product is deleted.

When one of those 3 events occur, the Agent's table is updated to match the store.
It keeps track of many fields (cost, weight, quantity left, etc...) so that the bot can make accurate recommendations.

I have a video demo on how to set it up [here](https://www.youtube.com/watch?v=3Y_WlvMT8AA)

---

### ConUHacks IX - Sun Life Sponsored Challenge Winner
*February 2025*

You can find the project specs [here](https://devpost.com/software/finsurance). The open-source repository is [here](https://github.com/SophiaClifton/hashbrown-app).

My contributions are under the '@mpetruu' handle located [here](https://github.com/SophiaClifton/hashbrown-app/commits/master/?author=mpetruu).

What the project entails:

Developed a full-stack financial wellness web application that secured first place in the Sun Life Sponsored Challenge. Integrated a friendly AI chatbot “Fin”, built with Botpress, to fetch transactions from a PostgreSQL backend and provide real-time budgeting advice on a React/Node.js frontend.

Designed interactive budgeting tools, a financial literacy quiz, and accessibility features (e.g. screen-reader support, audio playback) to improve financial literacy and inclusivity for all users.

Leveraged a Python FastAPI framework for secure user authentication and account data retrieval.

---

### McGill Rocket Team - Software Team Member (Radios Subteam)
*September 2024 - November 2024*

Built test software for sending and receiving radio signals from the ground station to the rocket using C++ and Teensy 4.0/4.1 microcontrollers.

---

### Ilys Programming Language
*August 2024*

Created a lexer and parser for a custom programming language called Ilys. Both are written in C++. I started this project to get prepared for my OCaml course. I do want to learn compiler design in the future and will come back to this project. See it [here](https://github.com/mpetruu/mpetruu/tree/main/Ilys).

---

## Languages used in Projects

- **TypeScript** — 60.6%
- **CSS** — 19.4%
- **C++** — 10.5%
- **Python** — 6.1%
- **JavaScript** — 1.7%
- **HTML** — 1.7%

## Open Source Contributions

Click the following links to see my open source contributions to Botpress! I contributed to the main [Botpress repository](https://github.com/botpress/botpress/commits/?author=mpetruu). I also contributed to the [Botpress Growth repository](https://github.com/botpress/growth/commits/?author=mpetruu) and [Botpress Docs repo](https://github.com/botpress/readme/commits/?author=mpetruu).

## 📫 Contact
- Email: matthew.petruzziello@mail.mcgill.ca
- LinkedIn: [matthew-petruzziello](https://linkedin.com/in/matthew-petruzziello)

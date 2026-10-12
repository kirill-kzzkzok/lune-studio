# Luné Studio

Responsive salon website built with vanilla JavaScript, HTML, CSS and Vite. The project focuses on a six-step booking interface rather than a static landing page.

## Task

Let a visitor browse services and specialists, choose a date and a time, and enter contact details through one compact booking flow.

## Technical solution

The interface is implemented without a UI framework or runtime dependencies. Booking state lives in a small JavaScript module; a separate calendar module handles month navigation and date selection. Each step validates the required selection before the visitor can continue.

## Implementation

- Service and specialist lists are rendered from local data modules.
- The booking flow filters eligible specialists, provides a calendar and time slots, and validates name and phone on the client.
- Responsive layouts and menu interactions are implemented with CSS and vanilla JavaScript.
- Images are imported through Vite so production asset URLs are generated correctly.
- The booking flow is a frontend demo. It does not reserve a real appointment or send personal data.

## Stack

Vanilla JavaScript · HTML · CSS · Vite

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Live demo

[https://sajt-manikyura.vercel.app](https://sajt-manikyura.vercel.app)

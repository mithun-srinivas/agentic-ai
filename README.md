# Agentic AI: From Concepts to Real-World Applications

A 31-slide React deck for a 45-minute beginner session, with built-in interactive demos.

## Run
    npm install
    npm run dev        # open http://localhost:5173

For a venue with no internet: `npm run build`, then `npm run preview` (or serve `dist/`).

## Presenter keys
| Key | Action |
|---|---|
| → / Space / PageDown (clicker) | next step / next slide |
| ← / PageUp | back |
| **N** | speaker notes + timer (shows whether you're ahead or behind the 45-min plan) |
| **O** | overview: jump to any slide |
| **F** | fullscreen |
| **L** | switch between the light (default) and dark theme |
| **T** | reset the timer (press it when you start) |
| Esc | leave a text box / close the overview |

Link straight to a slide with `#/22`, or to a build step with `#/22/3`.

## Structure
- `src/slides/part1.jsx`: welcome, computers, programming, ML, autocomplete, LLMs
- `src/slides/part2.jsx`: tools, agents, case studies, risks, roadmap, Q&A
- `src/demos.jsx`: autocomplete model, next-token, chatbot vs agent, agent trace, error compounding
- Each slide has `notes` (speaker script) and `minutes` (time budget) fields you can edit.

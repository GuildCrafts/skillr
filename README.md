# Skillr


Skillr helps you track the development of skills over time.


On Skillr you can:
  - enter your own skills
  - tag skills
  - filter your skills by tag
  - filter your skills by fuzzy text
  - view you skill level over time
  - enter skill level on a week-over-week table


## User Stories

When adding a new skill the user is presenting with fuzzy matched existing skills to discourage duplicate skills.

As a logged in user I can…

- hide a skill without loosing their rankings
- toggle hidden skills on the skills page
- view my rankings in a table of skills over weeks
- toggle between days, weeks, months and years



## Architecture

```js
{
  user: {
    id: Number,
    email: String,
    github_id: Number,
    name: String,
    avatar_url: String,
  },
  skill: {
    id: Number,
    name: String,
  },
  ranking: {
    id: Number,
    skill_id: Number,
    user_id: Number,
    at: Date,
  },
  hiddenSkill: {
    skill_id: Number,
    user_id: Number,
  },
}
```

The users skills is derived from the rankings you have


## Unknowns:

Do we organize by tag or heierarchy?
Do we have some concept of prerequisite?
Do we have user defined categories?


How are we going to do tags?
can anyone modify skill tags? are they global?
maybe instead of tags we just have `saved filters` or `saved searches`?

How are we going to order the skills?

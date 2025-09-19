const e=`---
title: "Writing a fullstack web app with Go and React"
date: "2025-09-18"
---

[GitLab repository](https://gitlab.com/sanassi/ff-manager).

# Motivation

As I find myself looking for an entry level Software Engineer position, I wanted
to build something resume-worthy, and useful enough for my personal needs.

## Stack

At my previous professional experience (SWE Internship at Datadog), I mostly worked
with Go, and found it really fun. Even though it was a 6-month internship, I feel that
I have barely scratched the surface with what I can do with the language (ex: concurrency),
and I have mostly built on top of existing (pretty well maintained) code.
Therefore I went in deadset on using Go for the backend of this project.

I don't have a specific technical reason for choosing React for the frontend. I have built a few projects
using React, and it was intuitive and I was able to sketch UIs relatively fast.

The finality of this project is to host it on AWS and make it available for other users.
Why AWS ? Perhaps recency bias, I interned at Datadog in the \`AWS Integrations\` team. Also AWS skills are
highly marketable in today's job market. I will attempt to only use the free tier features, it should
be enough for a "student" project.

---
# Feature Flags

A Feature flag is useful to dynamically control the behavior of a program without altering the source code.
It can be used using an \`if/else\` logic, to check if a new feature is enabled.

\`\`\`go
if isEnabled(flag) {
    /* new feature code */
} else {
    /* previous implementation */
}
\`\`\`

It can be implemented using configuration property files, using a key/value format to define if a feature is enabled:

\`\`\`
darkThemeEnabled=false
optimizeDataFetch=true
\`\`\`

However this approach is quite limited, for example if we wanted to add more conditions for enabling the dark theme here, we would have to update the code.

A good feature flagging system should be able to determine if a feature is enabled given variables, that way the specific cases for which a flag should be enabled could be controlled.

---

# Implementation

## Flag Definition

For that we need to add a \`rule\` when defining a flag, ie. a combination of conditions that need to be met for a feature to be enabled.

A rule condition is basic:

\`\`\`
type Condition struct {
    VarName *string \`json:"varName"\`
    Op      *string \`json:"op"\`
    Type    string  \`json:"type"\`
    Str     *string \`json:"str"\` 
    Int     *int    \`json:"int"\`
    Arr     *[]any  \`json:"arr"\`
}
\`\`\`

It takes the name of a variable, an operation, and value placeholders based on the type of the variable:

\`\`\`json
// Dark Theme Flag Condition
{
    varName: "userId",
    op: "IN",
    type: "Int",
    arr: [4242, 6767]
}
\`\`\`

Then on the user code, variables are passed in a request to the feature flag system, to check if a feature is enabled.

\`\`\`go
enabled, err := ffClient.IsEnabled(context.Background(), 
                                    "darkThemeEnabled", 
                                    map[string]any{
                                        "userId": 4242
                                    })
\`\`\`

## High Level Design

The goal of this app is to be used by multiple users.
Users can create and modify flags.

I've split the project in 3 different applications, and added support for user authentication.


### Auth
I use Okta's \`Auth0\` for user authentication. Using the free tier I have access to basic authentication features for my apps.

### Frontend

React Single Page Application to perform CRUD operation on feature flags.
Allows users to login, display existing flags, update/create flags by asking for approval from another user.

### Backend

Go application that handles the CRUD operations of feature flags.
It is a REST service built with Go Chi Router.
The feature flag data is stored in a Postgres database.
This database is the source of truth for feature flags.

Most requests to the backend need to be authenticated.

### Runtime

Go application to evaluate the feature flag rules.
It it a REST API built with Go Gin.
Since the application is read-heavy, I use Redis as a cache to store the feature flags that were previously read.
In case of cache misses, the application will hit the primary Postgres DB, to get a flag.

The runtime is alerted that a feature flag was modified in the backend using a Redis \`PubSub\` channel. Then the flag is removed from the runtime cache.
`;export{e as default};

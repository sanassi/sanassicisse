---
title: "Writing a fullstack web app with Go and React"
date: "2025-09-18"
---

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

The finality of this project would be to host it on AWS and make it available for other users.
Why AWS ? Perhaps recency bias, I interned at Datadog in the AWS Integrations team. Also AWS skills are
quite marketable in today's job market. I will attempt to only use the free tier features, it should
be enough for a "student" project.

---
# Feature Flags

notes: 

1 - explain why ff, extensively used at DD in production code

2 - useful to dynamically alter the behavior of a program

3 - can be powerful if we could control the percentage of users for which a feature flag is enabled

4 - the behavior is straightforward, but can lead to interesting implementation problems

---
# Design

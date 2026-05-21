---
title: "Building a code execution engine (kind of like the Go Playground website)"
date: "2026-05-09"
---

# Links

GitHub [Repository](https://github.com/sanassi/rem) (if it's still private it's because I'm not ready to show it yet).

# Motivation

I want to get back to writing interpreters and designing toy programming languages. However it is not always
easy to test out the languages during interviews (having to open the repo, compile, launch commands and stuff).
So I have decided to build something similar to the [**Go Playground**](https://go.dev/play/) website, but
for my custom domain specific languages.

Small excerpt from the page:

> The Go Playground is a web service that runs on go.dev's servers.
> The service receives a Go program, vets, compiles, links, and runs the program inside a sandbox, then returns the output.

I want it to be simple (no user login, or long sessions or whatever), and mostly mimic what Playground does. Also display
syntax/grammar information about the languages.

Of course since this is also a learning experience, I won't look **too much** at the Playground source code. :)

I'll think about extending the features later, to support user login, and perhaps saving previous programs for logged users, we'll see.

I'll be working with Go, and React.

# Brainstorm + MVP First Implem

I use Docker to provide a sandboxed environment with minimal features to execute the client's scripts.
The [`Moby Project`](https://github.com/moby/moby) provides a Go api to programmatically create Docker containers.

The app starts as an HTTP server, built on top of [Go Gin](https://github.com/gin-gonic/gin).
The main endpoint is a POST `/run`, that accepts a script to run, for testing purposes the app only accepts Python scripts for now.

On each call to the `/run` endpoint, a Docker container is created ([docs](https://github.com/moby/moby/blob/master/client/container_create.go)), with a Python image, a folder is created in `/tmp` to store the Python script, per user request. In the container config, the folder is mounted to a `/tmp/sandbox` folder in the container, which will contain the client script. For cleanup the containers set to be deleted after the code is executed (at first via `AutoRemove: true` in the config, but I had to manually delete then in a `defer` statement, due to them being marked for delete, preventing the access to the logs).

When the container is started ([docs](https://github.com/moby/moby/blob/master/client/container_create.go)), the script is executed using the container CMD command.

I use an client method to extract the logs ([docs](https://github.com/moby/moby/blob/master/client/container_logs.go)) from the container, on stdout and stderr.

Then I wait until the state of the container changes to `Not Running` ([docs](https://github.com/moby/moby/blob/master/client/container_wait.go)), and return the outputs to the user.

# v1

The first version of the project is a config based multilanguage support code execution engine.
Domain specific languages configurations are defined in YAML files:

```yaml
languages:
  python:
    image: python:latest
    cmd:
      - python
      - script.in

  tiger:
    image: tiger-dsl:latest
    cmd:
      - sh
      - -c
      - /app/src/tc --target-ia32 -S script.in > file.s && gcc -m32 file.s -o a.out && ./a.out


  evalexpr:
    image: evalexpr:latest
    cmd:

. . .
```

A docker image is required to create a Docker container, along with a list of commands to execute the client script (ex: compile the program for compiled languages, or send file contents via `stdin`).

> Note: here the docker images are built from personal/school projects, some that must remain private.

The app will create and start a container for each user request, mounting a temporary folder containing the
user script to run. It will then start the container, wait for the state to change to `not-running`, capture the outputs and error code, and manually remove the container.

![v1 System Design](rem-v1-svg-dark.svg "Interaction diagram")

## Limitations

A docker container is created per user request, meaning that `n` requests generate `n` mounts (although I've added a username parameter to reduce the number of folders for testing purposes), and `n` containers are executed.

This does not scale well.

A better implementation would be to have a fixed number of containers per language (kind of what Go playground does). User run requests will be added to a job queue, and workers will dequeue those jobs, run the client program in an available container and return the result.

This new implementation will make it harder to manage the containers lifecycle, and looks a little challenging but that's fun.

Also I still don't know how I will be deploying this yet, stay tuned gang.

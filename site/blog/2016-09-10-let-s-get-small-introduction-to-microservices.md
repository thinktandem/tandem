---
layout: Post
title: 'Let''s Get Small: Introduction to Microservices'
tags:
    - devops
author: 'Alec Reynolds'
private: false
mainImage: 'https://thinktandem.io//images/articles/microservices.png'
img-src: 'https://thinktandem.io//images/articles/microservices.png'
byline: 'In software development, things change. Learn how a microservice architecture can help you adapt to changing requirements and scale applications in the cloud.'
date: '2016-09-10'
meta:
    - { name: description, content: 'In software development, things change. Learn how a microservice architecture can help you adapt to changing requirements and scale applications in the cloud.' }
    - { name: keywords, content: devops }
---

Let's repeat a mantra together: "change" is the essence of web application development. No sooner have we developed a "complete" web project than does our API datasource change, our business needs grow, or (the best possible problem) our userbase swells beyond the capacity of our system.


> If change is our only constant, we must work with tools that embrace it.

## Introducing Microservices: Adaptable Components for Change

There are many ways to embrace change, but after many years, I'm convinced that creating small, specialized apps in a standardized manner is the best way to accomodate the realities of software development.

"Microservices" are simply very small applications that do one or two things very well. They communicate with one another via well-defined APIs, which allows easy refactoring and extension of the application as a whole: if one feature becomes outdated, simply refactor or replace the resposible microservice(s). Since the microservices program to an API, significant data migration and unexpected data model tusseling can be avoided.

## Docker and NodeJS: Tools for Building Microservices

NodeJS gives us a convenient framework for building microservices that can handle a high throughput of requests. Because of its non-blocking asynchronous nature, Node is an ideal candidate for creating API servers and highly available microservices alike (check out [this blog post](https://www.codeschool.com/blog/2014/10/30/understanding-node-js) if you're unfamiliar with these advantages of NodeJS). And the sheer range of modules available through the Node Package Manager (NPM) makes the ecosystem a strong choice.

Once we have multiple microservices in our application, it's essential that we have automated tools for deployment and scaling. This is where Docker comes in. Docker allows us to package our microservices into isolated "containers," tiny virtual environments that can be created and destroyed much more quickly than traditional virtual machines (VMs).

Everything that a microservice needs to run is described within a single Dockerfile, the set of instructions that build a Docker container. For example, if we're creating a small NodeJS application, the Dockerfile for our app would reference the offical NodeJS Docker image. We'd then include an "entrypoint" which would start running our Node app. The [offical NodeJS post](https://nodejs.org/en/docs/guides/nodejs-docker-webapp) on Dockerizing a Node app does a good job of explaining this process, and we'll be going into the technical details in a subsequent blog post as well.

## Deploy and Scale Microservice Applications with Docker Cloud

Even if the process of creating single microservices may seem clear, the idea of networking, deploying, and scaling dozens of microservices may seem daunting. Fortunately, there are many good Docker "orchestration" tools that provide ways to perform these tasks. A great one to start with is Docker Cloud.

Docker Cloud gives even novice programmers a simple interface to host Docker-powered applications. Tasks that were formerly complex, like connecting networks of microservices together properly or scaling services, are made trivial by Docker Cloud. For a small monthly fee, it gives you a powerful set of tools and the option to host your apps on AWS, Microsoft Azure, Digital Ocean, and more. We'll be showing you the ropes with Docker Cloud in a future post, so stay tuned for that!

UPDATE: My follow-up post is [now available](/blog/2016/09/23/node-microservices-on-docker-cloud), so you can continue with some hands-on fun.

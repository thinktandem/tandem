---
title: 'Goodbye VirtualBox: Kalabox 2.1.1'
tags:
    - localdev
    - support
    - testing
author: 'Mike Pirog'
private: false
mainImage: 'https://thinktandem.io/images/articles/dockerTNG.png'
img-src: 'https://thinktandem.io/images/articles/dockerTNG.png'
byline: 'With our newest version of Kalabox, we say goodbye to VirtualBox and hello to better performance and stability with Docker for Mac and Windows.'
date: '2016-11-08'
---

It's appropriate that today is Election Day in the US because after a few months of shakedown on Kalabox 2.0.x we feel like the **PEOPLE HAVE SPOKEN**:

> FREE US FROM THE SHACKLES OF VIRTUALBOX & SLOW FILE SHARING
  <small>Vox Populi</small>

Until recently, this populist upheavel would have been met with elitist consensus **"IT CAN'T BE DONE! YOU ASK THE IMPOSSIBLE!"** The times, however, are a changing and with some great new beta tech from the Docker folks we can now **GIVE THE PEOPLE WHAT THEY WANT**.

So, without further ado, here's what's new in Kalabox 2(.1.x).

## 1. Backend Swap

We've removed VirtualBox on Mac and Windows as our backend in favor of the new [Docker for Mac](https://docs.docker.com/docker-for-mac/) and [Docker for Windows](https://docs.docker.com/docker-for-windows/) projects. These allow us to run Docker containers "natively" using low level tech bundled into each OS. Specifically what this means is that on macOS (10.10+) you are now running everything inside of a super lightweight [xhyve](https://github.com/mist64/xhyve) VM and on Windows (Windows 10 Pro+) you are using its [Hyper-V](https://en.wikipedia.org/wiki/Hyper-V) engine. Kalabox on Linux is unaffected since we've been running Docker natively for awhile now.

This change has vastly reduced the amount of system resources Kalabox requires. For example my computer went from 40%+ to ~5% CPU usage. If you ever felt like your computer was about to rocket launch to Mars then this update is for you!

## 2. File sharing

If you have used either of the above Docker for Mac/Windows products in the past then your next question is likely: **Aha! But what about file sharing?** Good news here is we have 2+ years of expertise working on this exact problem. Taking advantage of some of the new features inherent to Docker for Mac/Windows and using some tips we've picked up along the way we now can provide almost instantaneous file sync. You will find file sharing and syncing on Kalabox 2.1.x to be **RIDICULOUSLY** better than it was on 2.0.x.

If you were getting tired of refreshing your browser to see a change propagate, then you should love this new version.

## 3. DNS Handling

While macOS and Linux provided some nice ways for us to handle `*.kbox` domains it was just too unreliable on Windows. As a result we've completely ripped out our DNS implementation and are now **LETTING THE INTERNET** do the work with our new `*.kbox.site` and `*.kbox.host` addresses. This should provide improved response times and should **DRASTICALLY** improve reliability for Windows users.

We even wrote up some docs about how to [work offline](http://docs.kalabox.io/en/v2.1/troubleshooting/#common-issues).

## Caveats

While these changes put Kalabox on a much more tenable foundation they also introduce their own set of (much more manageable) issues. Here are a couple of things worth mentioning to intrepid local dev pioneers across the interwebs.

  1. Docker for Mac/Windows are still **BETA PRODUCTS**.

  While Docker for Mac/Windows seems to work pretty good for most users, most of the time, you may find yourself [restarting the Docker engine](http://docs.kalabox.io/en/v2.1/general/engine/) often. You may also find it neccessary to upgrade to their [latest Beta](https://docs.docker.com/docker-for-mac/) so that everything works right. We are going to be releasing new versions of Kalabox every time Docker releases a new Stable version so we can be pulling in all their awesome work and bugfixes.

  2. You will need to make sure it plays nice with other things like MAMP, WAMP, etc

  Because of the way Docker for Mac/Windows works you are going to need to make sure you have ports `80`, `443`, and `8160` free. If you don't, then Kalabox is likely not going to work for you. As soon as Docker provides more customization options we are hoping to isolate these.

  3. On Windows you will still need to manually set up file sharing.

  Luckily this is fairly [straightforward](https://docs.docker.com/docker-for-windows/#/shared-drives).

## Roadmap

You might also be wondering what our medium (read 6 month-ish) term development roadmap looks like. If you were wondering that then you are in luck because here are our top priorities:

  1. Introduction of another major platform provider (or two!) to complement our Pantheon integration.
  2. Establishment of a suite of easy-to-install plugins so users can add functionality like `wraith` or `drupal-console`.
  3. Overhaul of the GUI

## Conclusion

With the introduction of the Kalabox 2.1.x series we can finally say that this is **PRETTY DARN CLOSE** to the product that we wanted to build from the beginning. We encourage you all to try it and give us your feedback!

However, we also realize that words are sometimes not the ideal form of communication so I'll close with:

<div class="row">
  <div class="col-md-6">
    ![teddy-with-rifle](images/articles/teddy200.jpg "You'll shoot your eye out!")
  </div>
  <div class="col-md-6">
    ![teddy-with-machinegun](images/articles/teddy210.jpg "I AM ALL THAT IS PRESIDENT")
  </div>
</div>

**ARE YOU A YETI SLAYER?**

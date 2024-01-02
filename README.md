## What is this ??

A Simple React App to generate a custom YouTube Music now-playing screen with configurable image and content.

## Why is this ??

Basically, I wanted to understand the basics of image processing.

More specifically, generating a color palette out of an image. The star of the show is [Color Quantization](https://en.wikipedia.org/wiki/Color_quantization). There are many algorithms out there for it, but this implements the [Median-Cut Algorithm](https://en.wikipedia.org/wiki/Median_cut), as described in [this dev.to post](https://dev.to/producthackers/creating-a-color-palette-with-javascript-44ip)

## How is this ??

Read the dev.to post to understand how the image processing works.

But more importantly, we optimize it for the user. This project employs [Web Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to offload the heady processing of the image onto a separate thread so the user can continue to fill out other configuration parameters while the system performs the necessary calculation to generate a palette.

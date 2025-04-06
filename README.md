# Datahacks-25-Website

## How to use
- Allow camera usage
- Take a clear photo of your face
- Wait to see what celebrities you look like!
- To try again, click `Again`
- To save, click `Save` and tap and hold the image to save / share

## Inspiration

When people say "You kinda look like ___", they're always wrong. Using deep learning, we can **REALLY**_ see who you look like. 

## What it does

It's simple, take a nice picture of yourself and instantly find your top 3 celebrity look-a-likes. Then you can easily share your results with friends.

## How we built it

Handpicking 500+ celebrities with 1500+ images, we pass the images through a facial embedding model. When you send your photo in we pass it through the same model and finds your top 3 look-a-likes.

For the front end, we decided to go with a more traditional approach that's more performant than other frameworks: HTML, CSS, and Javascript!! We first used Figma to brainstorm and plan out our UI on iPhone and then scaled that to work on tablets and desktop screen sizes. To allow users to take our input photos, we used a webAPI to request access to the user's webcam, after which we would save the image onto a canvas and send the base64 image to our model. In order to capture the results as a sharable image, we used an html2canvas script and displayed it as a popup for users to save and share with their peers.

## Challenges we ran into

Our biggest challenges we encountered were deployment of our API and data quality issues. Another challenge we encountered was adjusting the canvas that held the user's input image and scaling said images in order to keep a consistent aspect ratio that minimizes the amount of quality reduction.

## Accomplishments that we're proud of

Making something actually fun and interesting to use.

## What we learned

How important data pre-processing and quality control is.

## What's next for Like Me

More celebrities, more users, even DEEPER learning.

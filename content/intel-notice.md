# A note for Intel Mac users

If you've tried ACE on an Intel Mac before this version, you may have run into one of these:

- The app opened to a blank white window
- The setup wizard never appeared
- The app icon bounced in the dock and nothing happened
- Setup got stuck and never finished downloading the AI model

That wasn't your Mac. It was a packaging mistake on our end that affected every Intel install we shipped, from the very first release through v1.5.7.

## What was wrong

ACE is built from two pieces that have to work together: the app you see on screen, and a small helper underneath that handles the heavy lifting — listening to the microphone, transcribing speech, finding the right slide. Both pieces have to be built specifically for the kind of Mac they'll run on.

For every release up to v1.5.7, we accidentally shipped Intel Macs the helper meant for Apple Silicon Macs. The visible app launched, but the helper couldn't run, so nothing the app needed was actually happening underneath. From the outside it looked like a blank or broken app.

Apple Silicon Macs (M1, M2, M3, M4) were never affected — they always got the right helper.

## What we fixed

Starting with this release, the Intel build ships with the right helper for Intel Macs. Both versions are tested on real hardware before each release going forward, so you can install with confidence.

## If you tried ACE on Intel before and gave up

Please grab a fresh copy from the download button. The first launch will walk you through a short setup — microphone permissions, a one-time AI model download — about five minutes total.

If anything still doesn't work, email **hello@ace-presenter.app** and we'll respond personally. Tell us what you see on screen and which version of macOS you're on.

## How to know which Mac you have

Click the Apple menu in the top-left corner of your screen, then choose **About This Mac**.

- If it says **Apple M1**, **M2**, **M3**, or **M4** → grab the **Apple Silicon** build
- If it says **Intel** → grab the **Intel** build

If you grab the wrong one it just won't open — nothing breaks, but you'll waste the download. The app is about 600 MB.

## A small thank you

If you tried ACE on Intel before and we let you down, thank you for giving us another shot. We're a small team and we read every email.

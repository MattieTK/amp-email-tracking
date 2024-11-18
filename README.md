# amp-email-tracking

This is a proof of concept repo to show how you can track time spent reading newsletter style emails in Gmail and Yahoo mail via Google AMP.

It was originally generated with [bolt.new](https://bolt.net) to save time, and then a few bugs fixed manually.

It accompanies a blog post at [tk.gg](https://tk.gg) here: [Tracking email read time](https://tk.gg/posts/tracking-newsletter-read-time)

## Instructions

Download the repo with `git clone` or whatever you usually do.

Run `npm install`.

Run `npm run dev` to start a development server.

_Note: You will require a way to expose your local webserver over the internet for this to work. You can use a tool like ngrok, or tailscale._

Go to `localhost:3000` and enter in your remote tunnel domain into the dialog.

Hit generate.

Take the resulting AMP HTML and make sure to remove any escape characters that may interfere with the HTML.

Use [this](https://amp.dev/documentation/guides-and-tutorials/develop/testing_amp_emails) guide to send a test to your own Gmail account.

Open the test email and watch the events come in in your console.

To look up stats, take the `sendId` provided by pressing the button in the first stage, and visit `localhost:3000/stats?sid=<your-send-id>`.

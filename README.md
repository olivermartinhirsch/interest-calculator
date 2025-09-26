# interest-calculator

This is my suite of automated tests for the interest calculator.

To run them:

    npm install

then run:

    npm run test
    
to run the tests headlessly or:

    npm run test:headed

to run them in the chromium browser.

Please note you will have to provide your credentials on line 9 of `main.spec.ts` as I didn't have time to set up env vars!

My approach was to manually check the application first against the spec, then wrote tests as if there were no issues. Because of this there are 3 failing tests but these are expected to fail as I have written them as if the application worked as expected. 

I have left some comments in the code to show my thought processes around issues I found etc.

p.s. I wrote this on my personal windows pc which I don't normally use for coding so I didn't have time to set up a linter so apologies for the sloppy syntax
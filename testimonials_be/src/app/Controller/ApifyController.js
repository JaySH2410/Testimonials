import { ApifyClient } from 'apify-client';
import https from 'https';

https.globalAgent.options.rejectUnauthorized = false;

export async function GetApifyTweet(req, res) {

    try {
        const { tweetLink } = req.query;
        const client = new ApifyClient({
            token: 'apify_api_l8dl6YHJbTxFzRaERaho5MUjaKDjZa0KZIoJ',

        });

        const input = {
            "tweetsDesired": 1,
            "addUserInfo": true,
            "startUrls": [
                { "url": tweetLink }  // Replace with the actual tweet URL
            ],
            // "proxyConfig": {
            //     "useApifyProxy": true,
            //     "apifyProxyGroups": ["RESIDENTIAL"],
            //     "apifyProxyCountry": "US"
            // }
        };

        console.log(tweetLink, input);
        // Run the Actor task and wait for it to finish
        const run = await client.task("u6ppkMWAx2E2MpEuF").call(input);

        // Fetch and print Actor task results from the run's dataset (if any)
        console.log('Results from dataset');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        items.forEach((item) => {
            console.dir(item);
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({ error: err.message });
    }

}



import { BskyAgent } from '@atproto/api'
import { assert } from 'console';
import express from 'express';
import morgan from 'morgan';


const config = {
    BSKY_IDENTIFIER: process.env.BSKY_IDENTIFIER as string,
    BSKY_PASSWORD: process.env.BSKY_PASSWORD as string,
}

const app = express();
app.use(express.text());
app.use(morgan('dev'));


app.post('/', async ( req, res ) => {
    const message = req.body;
    assert(message instanceof String, "Message must be a string, instead message is %o", message);
    const agent = new BskyAgent({ service: "https://bsky.social" });
    await agent.login({
        identifier: config.BSKY_IDENTIFIER,
        password: config.BSKY_PASSWORD,
    });
    await agent.post({"text": message, "visibility": "public"})
    res.send("OK");
});

app.get('/health', ( req, res ) => { res.status(200).send("OK"); });

app.listen(3000);

console.log("Listening on port 3000");
const sjcl = require("sjcl");
const { v4: uuidv4 } = require("uuid");

global.parties = {};

async function party(fastify, options) {
    fastify.get("/fortnite/api/game/v2/voice/:accountId/login", async (request, reply) => {
        const { accountId } = request.params;
        const user_uri = `sip:.24753-evora-89674-udash.${accountId}.@mtu1xp.vivox.com`;

        const d = new Date();
        d.setHours(d.getHours() + 2);
        const vivoxClaims = {
            "iss": "24753-evora-89674-udash",
            "exp": Math.floor(d.getTime() / 1000),
            "vxa": "login",
            "vxi": Math.round(Math.random() * 1000000),
            "f": user_uri,
        };

        const token = vxGenerateToken("zcETsPpEAysznTyDXK4TEzwLQPcTvTAO", JSON.stringify(vivoxClaims));

        return reply.status(200).send({ token: token });
    });

    fastify.get("/fortnite/api/game/v2/voice/:accountId/join/:pid", async (request, reply) => {
        const { accountId, pid } = request.params;
        const channel_uri = `sip:confctl-g-24753-evora-89674-udash.${pid}@mtu1xp.vivox.com`;
        const user_uri = `sip:.24753-evora-89674-udash.${accountId}.@mtu1xp.vivox.com`;

        const d = new Date();
        d.setHours(d.getHours() + 2);
        const vivoxClaims = {
            "iss": "24753-evora-89674-udash",
            "exp": Math.floor(d.getTime() / 1000),
            "vxa": "join",
            "vxi": Math.round(Math.random() * 1000000),
            "f": user_uri,
            "t": channel_uri,
        };

        const token = vxGenerateToken("zcETsPpEAysznTyDXK4TEzwLQPcTvTAO", JSON.stringify(vivoxClaims));

        return reply.status(200).send({ token: token });
    });

    fastify.get('/party/api/v1/Fortnite/user/:accountId/notifications/undelivered/count', async (request, reply) => {
        return reply.status(200).send({
            "pings": 0,
            "invites": 0,
        });
    });

    fastify.get('/party/api/v1/Fortnite/user/:accountId', async (request, reply) => {
        return reply.status(200).send({
            "current": [],
            "pending": [],
            "invites": [],
            "pings": []
        });
    });

    fastify.post("/party/api/v1/Fortnite/parties", async (request, reply) => {
        if (!request.body.join_info) return reply.status(200).send({});
        if (!request.body.join_info.connection) return reply.status(200).send({});

        const id = uuidv4().replace(/-/ig, "");
        var party = {
            "id": id,
            "created_at": new Date().toISOString(),
            "updated_at": new Date().toISOString(),
            "config": request.body.config,
            "members": [{
                "account_id": (request.body.join_info.connection.id || "").split("@prod")[0],
                "meta": request.body.join_info.meta || {},
                "connections": [
                    {
                        "id": request.body.join_info.connection.id || "",
                        "connected_at": new Date().toISOString(),
                        "updated_at": new Date().toISOString(),
                        "yield_leadership": request.body.join_info.connection.yield_leadership || false,
                        "meta": request.body.join_info.connection.meta || {}
                    }
                ],
                "revision": 0,
                "updated_at": new Date().toISOString(),
                "joined_at": new Date().toISOString(),
                "role": "CAPTAIN"
            }],
            "applicants": [],
            "meta": request.body.meta || {},
            "invites": [],
            "revision": 0,
            "intentions": []
        };
        global.parties[id] = party;
        reply.status(200).send(party);
    })

    fastify.patch("/party/api/v1/Fortnite/parties/:pid", async (request, reply) => {
        reply.status(204).send();
    });

    fastify.patch("/party/api/v1/Fortnite/parties/:pid/members/:accountId/meta", async (request, reply) => {
        reply.status(204).send();
    });

    fastify.get("/party/api/v1/Fortnite/parties/:pid", async (request, reply) => {
        var newp = global.parties[request.params.pid];
        if (!newp) return reply.status(404).send();
        reply.status(200).send(newp);
    });

    fastify.delete("/party/api/v1/Fortnite/parties/:pid/members/:accountId", async (request, reply) => {
        reply.status(204).send();
    });

    fastify.post("/party/api/v1/Fortnite/parties/:pid/members/:accountId/join", async (request, reply) => {
        var newp = global.parties[request.params.pid];
        if (!newp) return reply.status(404).send();
        reply.status(200).send({
            status: "JOINED",
            party_id: newp.id,
        });
    });

    fastify.post("/party/api/v1/Fortnite/parties/:pid/members/:accountId/promote", async (request, reply) => {
        reply.status(204).send();
    });

    fastify.post("/party/api/v1/Fortnite/user/:accountId/pings/:pingerId", async (request, reply) => {
        reply.status(200).send({
            sent_by: request.params.pingerId,
            sent_to: request.params.accountId,
            sent_at: new Date().toISOString(),
            expires_at: new Date().toISOString(),
            meta: request.body.meta
        });
    });

    fastify.delete("/party/api/v1/Fortnite/user/:accountId/pings/:pingerId", async (request, reply) => {
        reply.status(204).send();
    });

    // idk
    fastify.get("/party/api/v1/Fortnite/user/:accountId/pings/:pingerId/parties", async (request, reply) => {
        reply.status(204).send();
    });

    // idk
    fastify.post("/party/api/v1/Fortnite/user/:accountId/pings/:pingerId/join", async (request, reply) => {
        reply.status(204).send();
    });

    fastify.post('/party/api/v1/Fortnite/parties/:pid/invites/:accountId', async (request, reply) => {
        reply.status(204).send();
    });

    // idk
    fastify.post("/party/api/v1/Fortnite/members/:accountId/intentions/:senderId", async (request, reply) => {
        reply.status(204).send();
    });

    // idk
    fastify.post("/party/api/v1/Fortnite/parties/:pid/members/:accountId/conferences/connection", async (request, reply) => {
        reply.status(204).send();
    });

    fastify.get('/party/api/v1/Fortnite/user/:accountId/settings/privacy', (request, reply) => {
        reply.status(200).send({
            "receiveInvites": "ALL",
            "receiveIntentions": "ALL"
        })
    })
}

function base64URLEncode(value) {
    return Buffer.from(value).toString('base64')
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/\=+$/, "");
}

function vxGenerateToken(key, payload) {
    const base64urlHeader = base64URLEncode("{}");
    const base64urlPayload = base64URLEncode(payload);
    const segments = [base64urlHeader, base64urlPayload];
    const toSign = segments.join(".");
    const hmac = new sjcl.misc.hmac(sjcl.codec.utf8String.toBits(key), sjcl.hash.sha256);
    const signature = sjcl.codec.base64.fromBits(hmac.encrypt(toSign));
    const base64urlSigned = signature
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/\=+$/, "");

    segments.push(base64urlSigned);

    return segments.join(".");
}

module.exports = party;
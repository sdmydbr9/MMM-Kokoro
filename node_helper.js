const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const { spawn } = require("child_process");

module.exports = NodeHelper.create({
    start() {
        console.log("MMM-Kokoro helper started...");
        this.config = null;
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "SET_CONFIG") {
            this.config = payload;
            console.log("MMM-Kokoro config received:", this.config);
        } else if (notification === "PLAY_TTS") {
            if (!this.config) {
                console.error("MMM-Kokoro: Config not set!");
                return;
            }

            // Ensure we send only the text string
            const text = typeof payload === "string" ? payload : payload.text || payload.payload || "";
            if (!text) {
                console.error("MMM-Kokoro: Empty input text!");
                return;
            }

            this.processTTS(text);
        }
    },

    async processTTS(text) {
        const apiUrl = `http://${this.config.apiHost}:${this.config.apiPort}/v1/audio/speech`;

        const payload = {
            model: "kokoro",
            input: text, // Now always a string
            voice: this.config.voice,
            response_format: "mp3",
            speed: this.config.speed,
            stream: true,
            return_download_link: false
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status} - ${await response.text()}`);
            }

            const audioStream = response.body;
            this.playAudio(audioStream);
        } catch (error) {
            console.error("MMM-Kokoro Error:", error.message);
            this.sendSocketNotification("TTS_ERROR", error.message);
        }
    },

    playAudio(audioStream) {
        const mpg123 = spawn("mpg123", ["-"]);

        audioStream.pipe(mpg123.stdin);

        mpg123.on("close", (code) => {
            if (code !== 0) {
                console.error(`mpg123 process exited with code ${code}`);
            }
        });
    }
});

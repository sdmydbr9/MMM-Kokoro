Module.register("MMM-Kokoro", {
    defaults: {
        apiHost: "192.168.29.105",
        apiPort: 8880,
        voice: "af_bella",
        speed: 1
    },

    start() {
        Log.info("Starting module: MMM-Kokoro");
        this.sendSocketNotification("SET_CONFIG", this.config); // Send config to node_helper.js
    },

    notificationReceived(notification, payload, sender) {
        if (notification === "KOKORO_SAY" && payload) {
            this.sendSocketNotification("PLAY_TTS", payload);
        } else if (notification === "SHOW_ALERT" && payload && payload.message) {
            this.sendSocketNotification("PLAY_TTS", payload.message);
        }
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "TTS_ERROR") {
            Log.error("MMM-Kokoro TTS Error: " + payload);
        }
    }
});

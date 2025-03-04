


# MMM-Kokoro

MMM-Kokoro is a [MagicMirror²](https://magicmirror.builders/) module that integrates the [Kokoro TTS model](https://github.com/hexgrad/kokoro) to add text-to-speech capabilities to your MagicMirror setup. 
This set up uses the [kokoro fast api](https://github.com/remsky/Kokoro-FastAPI). Visit for set up instructions
## Features

- **Text-to-Speech:** Leverage the Kokoro TTS model to convert text into natural-sounding speech.
- **Easy Integration:** Designed as a MagicMirror module, it’s simple to install and configure.
- **Customizable Options:** Configure voice, pitch, speed, and volume to suit your needs.
- **Note:** By default the module works with SHOW_ALERT notification and an additional KOKORO_SAY notification is added, tweak it to suit your needs.

## Installation

1. **Clone the repository into your MagicMirror modules directory:**
   ```bash
   cd ~/MagicMirror/modules
   git clone https://github.com/sdmydbr9/MMM-Kokoro.git
   ```
   

2. **Navigate to the module folder:**
   ```bash
   cd MMM-Kokoro
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```


## Configuration

1. **Edit your MagicMirror config file (`config.js`):**

   Open your `config.js` file (typically located in the MagicMirror root folder) and add the following configuration block to the modules array:
   ```js
   {
     module: "MMM-Kokoro",
     position: "lower_third", // Change this to your preferred display location
     config: {
       // configuration options
       apiHost: "192.168.29.105",   // ip of the instance running kokoro
       apiPort: 8880,         // port
       speed: 1.0,         // Adjust the speed of speech (default is 1.0)
       voice: "af_bella",        // Set the voice
       
     }
   }
   ```

2. **Restart MagicMirror:**

   Save your changes to `config.js` and restart MagicMirror to see the module in action.


## Customization

- **Voice Options:** Refer to the [Kokoro TTS model documentation](https://github.com/hexgrad/kokoro) for additional voices and configuration options.
- **Advanced Settings:** You can extend the module by adding more custom settings and integrating additional MagicMirror functionalities.

## Credits

- **Kokoro TTS Model:** [hexgrad/kokoro](https://github.com/hexgrad/kokoro)
- **MagicMirror²:** [MagicMirror Builders](https://magicmirror.builders/)


## License

This project is licensed under the MIT License.
```


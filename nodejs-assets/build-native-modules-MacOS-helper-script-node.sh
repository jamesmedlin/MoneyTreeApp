#!/bin/bash
      # Helper script for Gradle to call node on macOS in case it is not found
      export PATH=$PATH:/Users/jamesmedlin/.nvm/versions/node/v12.18.2/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/jamesmedlin/TestApp/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/jamesmedlin/TestApp/node_modules/.bin:/Users/jamesmedlin/opt/anaconda3/bin:/Users/jamesmedlin/.nvm/versions/node/v12.18.2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/Library/Apple/usr/bin:/Users/jamesmedlin/Library/Android/sdk/emulator:/Users/jamesmedlin/Library/Android/sdk/tools:/Users/jamesmedlin/Library/Android/sdk/tools/bin:/Users/jamesmedlin/Library/Android/sdk/platform-tools
      node $@
    
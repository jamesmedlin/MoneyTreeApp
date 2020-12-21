#!/bin/bash
      # Helper script for Gradle to call node on macOS in case it is not found
      export PATH=$PATH:/Users/jamesmedlin/.nvm/versions/node/v8.11.4/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/jamesmedlin/TestApp/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/jamesmedlin/TestApp/node_modules/.bin:/Users/jamesmedlin/opt/anaconda3/bin:/Users/jamesmedlin/opt/anaconda3/condabin:/Users/jamesmedlin/.nvm/versions/node/v8.11.4/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/Library/Apple/usr/bin
      node $@
    
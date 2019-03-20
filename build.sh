#!/bin/bash
rsync -a static/ dist/
../prep/index.js src/components > src/components.html
cat src/before.html src/components.html src/after.html > dist/index.html
cd dist
python -m SimpleHTTPServer
